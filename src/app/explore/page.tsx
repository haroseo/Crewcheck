"use client";

import { motion } from "framer-motion";
import { Heart, Search, MessageCircle } from "lucide-react";

export default function ExplorePage() {
  const recommendations = [
    { title: "오늘의 미니 챌린지 🏆", desc: "이 문서까지 읽고 잔디 하나 더 심어보기" },
    { title: "영감 충전소 💡", desc: "다른 팀원들은 어떻게 미션을 깨고 있을까?" },
    { title: "개발자 필독서 📘", desc: "자바스크립트 딥 다이브 추천" }
  ];

  const feedItems = [
    { name: "프론트마스터", track: "Front-end", time: "2시간 전", content: "메인 페이지 CSS 다크모드 대응 완료! 너무 뿌듯함 🔥", likes: 12 },
    { name: "백엔드신", track: "Back-end", time: "4시간 전", content: "Prisma 스키마 갈아엎고 푸시 완료. 내일은 API 연동갑니다.", likes: 8 },
    { name: "오너", track: "Admin", time: "1일 전", content: "이번주 수요일 세미나 잊지 마세요! 지각하면 학점 깎습니다 😡", likes: 45 }
  ];

  return (
    <div style={{ padding: '20px' }}>
      {/* 상단 검색 / 헤더 */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 className="title-lg" style={{ fontSize: '28px' }}>탐색 👀</h2>
        <div style={{ padding: '8px', background: 'var(--card-bg)', borderRadius: '50%', boxShadow: 'var(--shadow-sm)' }}>
          <Search size={20} color="var(--primary)" />
        </div>
      </header>

      {/* 가로 넷플릭스형 오늘의 추천 시스템 */}
      <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>오늘의 추천</h3>
      <div style={{ 
        display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px', 
        scrollSnapType: 'x mandatory', margin: '0 -20px', padding: '0 20px 16px' 
      }}>
        {recommendations.map((rec, i) => (
          <motion.div 
            key={i}
            whileTap={{ scale: 0.95 }}
            className="widget"
            style={{ 
              minWidth: '240px', scrollSnapAlign: 'start', 
              background: i === 0 ? 'linear-gradient(135deg, var(--primary), #a855f7)' : 'var(--card-bg)',
              color: i === 0 ? '#fff' : 'var(--foreground)', border: 'none'
            }}
          >
            <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>{rec.title}</h4>
            <p style={{ fontSize: '14px', opacity: 0.9, lineHeight: 1.4 }}>{rec.desc}</p>
          </motion.div>
        ))}
      </div>

      <div style={{ height: '1px', background: 'var(--border)', margin: '16px 0 24px' }} />

      {/* 부원들의 실시간 커밋(다짐) 피드 - 인스타 피드 감성 */}
      <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>커루들의 최근 커밋 🌿</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '40px' }}>
        {feedItems.map((item, i) => (
          <div key={i} className="widget" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), #a855f7)' }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 700 }}>{item.name}</span>
                  <span style={{ fontSize: '10px', fontWeight: 700, background: 'rgba(49, 130, 246, 0.1)', color: 'var(--primary)', padding: '2px 6px', borderRadius: '8px' }}>{item.track}</span>
                </div>
                <span className="text-muted" style={{ fontSize: '12px' }}>{item.time}</span>
              </div>
            </div>
            
            <p style={{ fontSize: '15px', lineHeight: 1.5, marginBottom: '16px', fontWeight: 500 }}>
              {item.content}
            </p>

            <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--foreground)' }}>
                <Heart size={20} color="var(--primary)" />
                <span style={{ fontSize: '13px', fontWeight: 600 }}>{item.likes}</span>
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--foreground)' }}>
                <MessageCircle size={20} color="#8e8e93" />
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#8e8e93' }}>응원하기</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
