"use client";

import { Flame, Medal } from "lucide-react";

export default function GrassWidget() {
  return (
    <div className="widget" style={{ padding: '20px' }}>
      {/* 듀올링고 감성 요약 바 (불꽃 + 메달 코인) */}
      <div style={{ 
        display: 'flex', justifyContent: 'space-around', marginBottom: '24px', 
        background: 'var(--background)', padding: '12px', borderRadius: '16px',
        border: '1px solid var(--border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Flame fill="#ef4444" color="#ef4444" size={28}/>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#ef4444', display: 'block' }}>연속 출석</span>
            <span style={{ fontSize: '18px', fontWeight: 900, color: 'var(--foreground)' }}>14일 🔥</span>
          </div>
        </div>
        
        <div style={{ width: '1px', background: 'var(--border)', margin: '4px 0' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Medal fill="#f59e0b" color="#b45309" size={28}/>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#f59e0b', display: 'block' }}>누적 EXP</span>
            <span style={{ fontSize: '18px', fontWeight: 900, color: 'var(--foreground)' }}>1,250 💎</span>
          </div>
        </div>
      </div>

      {/* 깃허브 잔디 (Heatmap) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center' }}>
        <h3 className="title-sm" style={{ fontSize: '15px' }}>올해의 잔디 🌿</h3>
        <span className="text-muted" style={{ fontWeight: 800, fontSize: '13px' }}>124 Commits</span>
      </div>
      
      {/* 모바일 뷰에 맞춘 미니 잔디밭 (7 x M) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4px', height: '100px' }}>
         {Array.from({length: 84}).map((_, i) => {
            // 잔디 모형 생성 (랜덤 투명도로 분포도 시뮬레이팅)
            const isActive = Math.random() > 0.4;
            const level = isActive ? Math.floor(Math.random()*4)+1 : 0;
            return (
              <div 
                key={i} 
                style={{ 
                  width: '100%', aspectRatio: '1/1', borderRadius: '3px', 
                  backgroundColor: `var(--commit-${level})`,
                  opacity: 0.9
                }} 
              />
            )
         })}
      </div>
    </div>
  );
}
