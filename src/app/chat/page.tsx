"use client";

import { motion } from "framer-motion";
import { MessageCircle, Lock, Inbox } from "lucide-react";
import Link from "next/link";

export default function ChatListPage() {
  const chats: any[] = []; // 실제로는 DB에서 가져올 채팅 목록

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
        {chats.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <Inbox size={48} color="var(--text-disabled)" style={{ margin: '0 auto 16px' }} />
            <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: '6px' }}>
              아직 대화가 없습니다
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-disabled)' }}>
              동아리원과 1:1 암호화 채팅을 시작해보세요
            </p>
          </div>
        ) : (
          chats.map((chat: any) => (
            <Link key={chat.id} href={`/chat/${chat.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="list-item" style={{ cursor: 'pointer' }}>
                <div className="list-content">
                  <span className="list-title">{chat.name}</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
