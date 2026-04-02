"use client";

import { motion } from "framer-motion";
import { TrendingUp, Star, Clock } from "lucide-react";

export default function ExplorePage() {
  const trending = [
    { title: "React 19의 새로운 기능 정리", author: "김개발", likes: 42 },
    { title: "Next.js에서 서버 컴포넌트 잘 쓰는 법", author: "이코드", likes: 38 },
    { title: "TypeScript 5.0 마이그레이션 가이드", author: "박타입", likes: 29 },
  ];

  const recent = [
    { title: "오늘 스터디 후기 & 정리 노트", author: "최기록", time: "2시간 전" },
    { title: "이번 주 미션 완료했습니다!", author: "정열정", time: "5시간 전" },
    { title: "CSS Grid vs Flexbox 언제 뭘 쓸까?", author: "한레이아웃", time: "어제" },
  ];

  return (
    <div className="safe-top" style={{ paddingBottom: '16px' }}>
      <header className="section" style={{ paddingTop: '8px', paddingBottom: '24px' }}>
        <h1 className="t-h1">피드</h1>
        <p style={{ fontSize: '14px', color: 'var(--text-tertiary)', marginTop: '6px' }}>동아리 소식과 트렌딩 글</p>
      </header>

      {/* Trending */}
      <div className="section">
        <div className="section-title">
          <span className="section-title-text">인기 글</span>
          <TrendingUp size={16} color="var(--text-tertiary)" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {trending.map((post, i) => (
            <motion.div key={i} whileTap={{ scale: 0.98 }} className="card" style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '10px', flexShrink: 0,
                  background: i === 0 ? '#fff8e1' : 'var(--bg-float)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', fontWeight: 800, color: i === 0 ? '#f59e0b' : 'var(--text-tertiary)'
                }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>{post.title}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{post.author}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '12px', color: 'var(--orange)' }}>
                      <Star size={12} fill="var(--orange)" /> {post.likes}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="divider" style={{ marginTop: '24px', marginBottom: '24px' }} />

      {/* Recent */}
      <div className="section">
        <div className="section-title">
          <span className="section-title-text">최근 글</span>
          <Clock size={16} color="var(--text-tertiary)" />
        </div>
        {recent.map((post, i) => (
          <div key={i} className="list-item" style={{ cursor: 'pointer' }}>
            <div className="list-content">
              <span className="list-title">{post.title}</span>
              <div style={{ display: 'flex', gap: '8px', marginTop: '3px' }}>
                <span className="list-desc">{post.author}</span>
                <span className="list-desc">·</span>
                <span className="list-desc">{post.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
