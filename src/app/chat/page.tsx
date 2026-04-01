"use client";

import { motion } from "framer-motion";
import { Search, Lock } from "lucide-react";
import Link from "next/link";

export default function ChatListPage() {
  const dummyChats = [
    { id: '1', name: "개발천재", track: "Front-end", lastMsg: "나 오늘 결석계 승인 났어!! 🎉", time: "10분 전", unread: 2, online: true },
    { id: '2', name: "오너(회장)", track: "Admin", lastMsg: "이번주 수요일 세미나 자료 준비 부탁해요.", time: "1시간 전", unread: 0, online: false },
    { id: '3', name: "디자인장인", track: "Design", lastMsg: "아까 내가 말한 레퍼런스 링크 ⬇️", time: "어제", unread: 0, online: true }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h2 className="title-lg" style={{ fontSize: '28px', display: 'flex', alignItems: 'center', gap:'8px' }}>
            비밀 커넥트 <Lock size={20} color="var(--primary)"/>
          </h2>
          <p className="text-muted" style={{ fontSize: '13px', marginTop: '6px' }}>서버 관리자도 절대 열람 불가 (E2EE 암호화)</p>
        </div>
        <div style={{ padding: '8px', background: 'var(--card-bg)', borderRadius: '50%', boxShadow: 'var(--shadow-sm)' }}>
          <Search size={20} color="var(--primary)" />
        </div>
      </header>

      {/* 부원 친추 리스트 (인스타 스토리 혹은 가로 리스트 감성) */}
      <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px' }}>온라인 멤버 (2)</h3>
      <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '24px', margin: '0 -20px', padding: '0 20px 24px' }}>
        {dummyChats.filter(c => c.online).map(c => (
           <div key={`on-${c.id}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), #a855f7)', padding: '2px' }}>
                  <div style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: '#fff', border: '2px solid var(--background)' }} />
                </div>
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '16px', height: '16px', background: '#22c55e', borderRadius: '50%', border: '3px solid var(--background)' }} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600 }}>{c.name}</span>
           </div>
        ))}
      </div>

      <div style={{ height: '1px', background: 'var(--border)', marginBottom: '24px' }} />

      {/* DM 목록 */}
      <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px' }}>메시지</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {dummyChats.map((chat) => (
          <motion.div whileTap={{ scale: 0.98 }} key={chat.id}>
            <Link href={`/chat/${chat.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="widget" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', border: 'none' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(0,0,0,0.05)' }} />
                  {chat.online && <div style={{ position: 'absolute', bottom: -2, right: -2, width: '14px', height: '14px', background: '#22c55e', borderRadius: '50%', border: '3px solid var(--card-bg)' }} />}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 800 }}>{chat.name}</h4>
                    <span className="text-muted" style={{ fontSize: '12px' }}>{chat.time}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: '14px', opacity: chat.unread > 0 ? 1 : 0.6, fontWeight: chat.unread > 0 ? 600 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {chat.lastMsg}
                    </p>
                    {chat.unread > 0 && (
                      <div style={{ background: '#ef4444', color: '#fff', fontSize: '11px', fontWeight: 800, padding: '2px 6px', borderRadius: '10px' }}>
                        {chat.unread}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
