"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, Send, Lock } from "lucide-react";
import Link from "next/link";

export default function ChatRoomPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<{id: string, text: string, isMe: boolean}[]>([]);
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), text, isMe: true }]);
    setText("");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg)' }}>
      {/* Header with X button */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 20px', paddingTop: 'max(12px, env(safe-area-inset-top))',
        background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-light)',
        flexShrink: 0
      }}>
        <div>
          <p style={{ fontSize: '16px', fontWeight: 700 }}>대화방</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
            <Lock size={10} color="var(--green)" />
            <span style={{ fontSize: '11px', color: 'var(--green)' }}>암호화됨</span>
          </div>
        </div>
        <Link href="/chat" style={{
          width: '36px', height: '36px', borderRadius: '50%', display: 'flex',
          alignItems: 'center', justifyContent: 'center', background: 'var(--bg-float)',
          color: 'var(--text-secondary)', textDecoration: 'none'
        }}>
          <X size={20} />
        </Link>
      </header>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {messages.length === 0 && (
          <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-disabled)', padding: '40px 0' }}>
            메시지를 보내 대화를 시작하세요.<br/>모든 내용은 암호화되어 전송됩니다.
          </p>
        )}
        {messages.map((m) => (
          <motion.div
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            key={m.id}
            style={{ alignSelf: m.isMe ? 'flex-end' : 'flex-start', maxWidth: '75%' }}
          >
            <div style={{
              padding: '10px 14px', fontSize: '14px', lineHeight: 1.5,
              color: m.isMe ? '#fff' : 'var(--text-primary)',
              background: m.isMe ? 'var(--blue)' : 'var(--bg-float)',
              borderRadius: m.isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
            }}>
              {m.text}
            </div>
          </motion.div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: '12px 20px', paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
        background: 'var(--bg-elevated)', borderTop: '1px solid var(--border-light)', flexShrink: 0
      }}>
        <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text" value={text} onChange={(e) => setText(e.target.value)}
            placeholder="메시지 입력..."
            className="input"
            style={{ borderRadius: '100px', padding: '12px 18px' }}
          />
          <button type="submit" disabled={!text.trim()} className="btn btn-blue" style={{
            width: '44px', height: '44px', borderRadius: '50%', padding: 0, flexShrink: 0,
            minWidth: '44px', opacity: text.trim() ? 1 : 0.4
          }}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
