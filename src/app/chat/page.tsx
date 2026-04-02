"use client";

import { motion } from "framer-motion";
import { MessageCircle, Lock } from "lucide-react";
import Link from "next/link";

export default function ChatListPage() {
  const chats = [
    { id: "user-1", name: "김개발", lastMsg: "내일 스터디 참석 어때?", time: "오후 3:24", unread: 2 },
    { id: "user-2", name: "이디자인", lastMsg: "피그마 파일 공유했어", time: "오전 11:05", unread: 0 },
    { id: "user-3", name: "박기획", lastMsg: "회의록 확인해주세요", time: "어제", unread: 1 },
  ];

  return (
    <div className="safe-top" style={{ paddingBottom: '16px' }}>
      <header className="section" style={{ paddingTop: '8px', paddingBottom: '8px' }}>
        <h1 className="t-h1">비밀톡</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
          <Lock size={12} color="var(--green)" />
          <p style={{ fontSize: '12px', color: 'var(--green)', fontWeight: 500 }}>종단간 암호화 적용</p>
        </div>
      </header>

      <div className="section" style={{ marginTop: '16px' }}>
        {chats.map((chat, i) => (
          <Link key={chat.id} href={`/chat/${chat.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <motion.div
              whileTap={{ scale: 0.98 }}
              className="list-item"
              style={{ cursor: 'pointer' }}
            >
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0,
                background: `hsl(${i * 90 + 200}, 60%, 70%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: '18px'
              }}>
                {chat.name[0]}
              </div>
              <div className="list-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="list-title">{chat.name}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-disabled)' }}>{chat.time}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3px' }}>
                  <span className="list-desc" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{chat.lastMsg}</span>
                  {chat.unread > 0 && (
                    <span style={{
                      minWidth: '20px', height: '20px', borderRadius: '100px',
                      background: 'var(--red)', color: '#fff', fontSize: '11px', fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px', flexShrink: 0, marginLeft: '8px'
                    }}>
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
