"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle, ShieldAlert } from "lucide-react";

export default function AdminDashboardPage() {
  const prList = [
    { id: 1, name: "이아무개", date: "2026. 04. 12", reason: "전공 시험공부 벼락치기로 인한 불참 ㅠㅠ", isApproved: null },
    { id: 2, name: "디자인천재", date: "2026. 04. 05", reason: "어제 무리해서 감기몸살로 인한 병원 내원", isApproved: true }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ marginBottom: '24px' }}>
        <h2 className="title-lg" style={{ fontSize: '28px', display: 'flex', alignItems: 'center', gap:'8px', color: '#ef4444' }}>
          관리자 통제실 <ShieldAlert size={28} />
        </h2>
        <p className="text-muted" style={{ fontSize: '14px', marginTop: '6px' }}>오직 Owner 권한만 접근 가능한 숨겨진 영역입니다.</p>
      </header>
      
      {/* 1. 하이웍스급 잔디 모니터링 현황판 */}
      <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>현황 모니터링 (목표 80%)</h3>
      <div className="widget" style={{ marginBottom: '32px', border: '2px solid rgba(239, 68, 68, 0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>동아리 평균 달성률</span>
            <p style={{ fontSize: '32px', fontWeight: 800 }}>72%</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#ef4444' }}>위험군 (80% 미달성)</span>
            <p style={{ fontSize: '24px', fontWeight: 800, color: '#ef4444' }}>4명</p>
          </div>
        </div>
        <button className="btn-primary" style={{ background: '#1c1c1e' }}>위험군에게 알림(사이렌) 보내기 🚨</button>
      </div>

      {/* 2. 결석계(Pull Request) 통제실 */}
      <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>결석계 (PR) 심사 대기열</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {prList.map((pr) => (
          <div key={pr.id} className="widget" style={{ padding: '20px', background: pr.isApproved === true ? 'rgba(34, 197, 94, 0.05)' : 'var(--card-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 700, background: 'var(--border)', padding: '2px 8px', borderRadius: '4px' }}>
                  {pr.date} 결석
                </span>
                <h4 style={{ fontSize: '18px', fontWeight: 800, marginTop: '8px' }}>{pr.name}의 결석 PR</h4>
              </div>
              {pr.isApproved === true && <span style={{ color: '#22c55e', fontWeight: 800, fontSize: '14px' }}>MERGED (승인됨)</span>}
            </div>
            
            <p style={{ fontSize: '14px', lineHeight: 1.5, marginBottom: '20px', padding: '12px', background: 'var(--background)', borderRadius: '8px' }}>
              {pr.reason}
            </p>

            {pr.isApproved === null && (
              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: '#22c55e', color: '#fff', fontWeight: 700, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle size={18}/> Approve (공결 승인)
                </button>
                <button style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: '#ef4444', color: '#fff', fontWeight: 700, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
                  <XCircle size={18}/> Close (무단 거절)
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
