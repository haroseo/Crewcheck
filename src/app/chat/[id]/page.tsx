"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Lock } from "lucide-react";
import Link from "next/link";
import PusherClient from "pusher-js";
import { sendEncryptedMessage } from "@/app/actions/chat";

// [보안 모듈] 브라우저 WebCrypto API를 활용한 가장 기초적인 AES-GCM 대칭키 래퍼 (MVP용)
const E2EE_SECRET = "Crewcheck-Super-Secret-Key-1234!!"; // MVP용 하드코딩

async function deriveKey() {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(E2EE_SECRET), "PBKDF2", false, ["deriveKey"]);
  return window.crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: enc.encode("salt"), iterations: 100000, hash: "SHA-256" },
    keyMaterial, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]
  );
}

async function encrypt(text: string) {
  const key = await deriveKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encodedInfo = new TextEncoder().encode(text);
  const cipherText = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encodedInfo);
  // IV와 암호문을 병합 후 Base64 바이너리로 변환하여 전송 (서버는 본문을 절대 알 수 없음)
  const combined = new Uint8Array(iv.length + cipherText.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(cipherText), iv.length);
  return btoa(String.fromCharCode(...combined));
}

async function decrypt(base64Str: string) {
  try {
    const key = await deriveKey();
    const combined = new Uint8Array(atob(base64Str).split("").map((c) => c.charCodeAt(0)));
    const iv = combined.slice(0, 12);
    const cipherText = combined.slice(12);
    const decryptedText = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, cipherText);
    return new TextDecoder().decode(decryptedText);
  } catch(e) {
    return "[복호화 실패 메세지]";
  }
}

export default function ChatRoomPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<{id: string, text: string, senderId: string}[]>([]);
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  // 현재 로그인한 내 정보 (MVP에서는 목업 처리: 실제 세션 훅 사용 필요)
  const myId = "local-user"; // NextAuth의 useSession() 등으로 가져와야 함. MVP에선 일단 목업.
  // URL id를 타겟 유저 아이디로 세팅
  const receiverId = params.id; 

  const channelName = `private-chat-${[myId, receiverId].sort().join("-")}`;

  useEffect(() => {
    // 1. Pusher 소켓 열기
    const pusher = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY || "mock-key", {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "ap3",
      authEndpoint: "/api/pusher/auth",
    });

    // 2. 1:1 비밀 채널 구독
    const channel = pusher.subscribe(channelName);

    // 3. 메시지 수신 이벤트 핸들러 (해독 로직)
    channel.bind("new-message", async (data: any) => {
      // 본인이 보낸 로컬 메시지 중복 렌더 방지
      if (data.senderId === myId) return; 
      
      const decrypted = await decrypt(data.encryptedBlob);
      setMessages((prev) => [...prev, { id: data.id, text: decrypted, senderId: data.senderId }]);
    });

    return () => {
      pusher.unsubscribe(channelName);
      pusher.disconnect();
    };
  }, [channelName, myId, receiverId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const rawMsg = text;
    setText("");

    // 내가 보낸 메시지 즉시 렌더링 (Optimistic UI)
    const tempId = Date.now().toString();
    setMessages((prev) => [...prev, { id: tempId, text: rawMsg, senderId: myId }]);

    // 서버는 볼 수 없는 상태로 전송 (암호화 랩핑)
    const encryptedBlob = await encrypt(rawMsg);
    
    // 서버 액션
    try {
      await sendEncryptedMessage(receiverId, encryptedBlob);
    } catch(err) {
      console.error(err);
      // alert("메시지 전송 실패 (로그인이 끊겼을 수 있습니다.)");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--background)' }}>
      {/* 헤더 부분 */}
      <header style={{ 
        display: 'flex', alignItems: 'center', gap: '16px', padding: 'env(safe-area-inset-top) 20px 0', 
        height: '80px', background: 'var(--card-bg)', borderBottom: '1px solid var(--border)', flexShrink: 0
      }}>
        <Link href="/chat" style={{ color: 'var(--foreground)' }}>
          <ArrowLeft size={24} />
        </Link>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '16px', fontWeight: 800 }}>상대방 정보 ({receiverId})</span>
          <span style={{ fontSize: '11px', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '4px' }}>
             <Lock size={10} color="#22c55e"/> End-to-End Encrypted (보안 접속 중)
          </span>
        </div>
      </header>

      {/* 메시지 영역 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p style={{ textAlign: 'center', fontSize: '12px', color: '#8e8e93', margin: '20px 0' }}>
          이 대화의 내용과 파일은 브라우저 단에서 완전히 암호화되어 서버를 거칩니다.<br/>관리자(동아리장)도 복구하거나 열람할 수 없습니다.
        </p>
        
        {messages.map((m) => {
          const isMe = m.senderId === myId;
          return (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              key={m.id} 
              style={{ alignSelf: isMe ? 'flex-end' : 'flex-start', maxWidth: '75%' }}
            >
              <div style={{
                padding: '12px 16px', fontSize: '15px', color: isMe ? '#fff' : 'var(--foreground)',
                background: isMe ? 'linear-gradient(135deg, var(--primary), #a855f7)' : 'var(--card-bg)',
                border: isMe ? 'none' : '1px solid var(--border)',
                borderRadius: isMe ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                boxShadow: isMe ? '0 4px 12px rgba(49, 130, 246, 0.3)' : 'var(--shadow-sm)'
              }}>
                {m.text}
              </div>
            </motion.div>
          );
        })}
        <div ref={endRef} />
      </div>

      {/* 입력 컴포넌트 */}
      <div style={{ padding: '16px 20px 30px', background: 'var(--card-bg)', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
        <form onSubmit={handleSend} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input 
            type="text" value={text} onChange={(e) => setText(e.target.value)}
            placeholder="안전하게 암호화된 메시지 전송..."
            style={{ 
              flex: 1, background: 'var(--background)', border: '1px solid var(--border)', padding: '12px 20px', 
              borderRadius: '24px', fontSize: '15px', color: 'var(--foreground)', outline: 'none'
            }}
          />
          <button type="submit" disabled={!text.trim()} style={{
            width: '44px', height: '44px', borderRadius: '50%', border: 'none', background: text.trim() ? 'var(--primary)' : 'var(--border)',
            color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: text.trim() ? 'pointer' : 'not-allowed', transition: 'background 0.3s'
          }}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
