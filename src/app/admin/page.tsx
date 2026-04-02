"use client";

import { motion } from "framer-motion";
import { ShieldAlert, CheckCircle, XCircle, Users, AlertTriangle, Bell, Calendar, Settings2 } from "lucide-react";

export default function AdminDashboardPage() {
  const prList = [
    { id: 1, name: "이아무개", date: "2026. 04. 12", reason: "전공 시험공부로 인한 불참", status: null as boolean | null },
    { id: 2, name: "디자인천재", date: "2026. 04. 05", reason: "감기몸살로 병원 내원", status: true },
  ];

  return (
    <div className="safe-top" style={{ paddingBottom: '16px' }}>
      <header className="section" style={{ paddingTop: '8px', paddingBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <ShieldAlert size={20} color="var(--red)" />
          <h1 className="t-h1">관리자</h1>
        </div>
        <p style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>동아리 운영 통제실</p>
      </header>

      {/* Stats Grid */}
      <div className="section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
        {[
          { label: '전체 부원', value: '24', icon: <Users size={18}/>, color: 'var(--blue)', bg: 'var(--blue-light)' },
          { label: '평균 달성', value: '72%', icon: <Calendar size={18}/>, color: 'var(--green)', bg: '#e8faf0' },
          { label: '위험군', value: '4명', icon: <AlertTriangle size={18}/>, color: 'var(--red)', bg: '#fff0f1' },
        ].map((stat, i) => (
          <div key={i} className="card" style={{ textAlign: 'center', padding: '16px 12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color, margin: '0 auto 8px' }}>
              {stat.icon}
            </div>
            <p style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>{stat.value}</p>
            <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="section" style={{ marginTop: '24px' }}>
        <div className="section-title">
          <span className="section-title-text">빠른 관리</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button className="btn btn-outline btn-sm" style={{ justifyContent: 'flex-start' }}>
            <Bell size={16}/> 알림 전송
          </button>
          <button className="btn btn-outline btn-sm" style={{ justifyContent: 'flex-start' }}>
            <Calendar size={16}/> 일정 등록
          </button>
          <button className="btn btn-outline btn-sm" style={{ justifyContent: 'flex-start' }}>
            <Settings2 size={16}/> 온보딩 설정
          </button>
          <button className="btn btn-outline btn-sm" style={{ justifyContent: 'flex-start' }}>
            <Users size={16}/> 부원 관리
          </button>
        </div>
      </div>

      {/* PR List */}
      <div className="section" style={{ marginTop: '24px' }}>
        <div className="section-title">
          <span className="section-title-text">결석계 심사 대기</span>
          <span className="badge badge-red">{prList.filter(p => p.status === null).length}건</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {prList.map((pr) => (
            <div key={pr.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div>
                  <p style={{ fontSize: '15px', fontWeight: 600 }}>{pr.name}</p>
                  <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '2px' }}>{pr.date} 결석</p>
                </div>
                {pr.status === true && <span className="badge badge-green">승인됨</span>}
                {pr.status === null && <span className="badge badge-red">대기중</span>}
              </div>

              <div className="card-flat" style={{ marginBottom: '12px' }}>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{pr.reason}</p>
              </div>

              {pr.status === null && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-success btn-sm" style={{ flex: 1 }}>
                    <CheckCircle size={16} /> 승인
                  </button>
                  <button className="btn btn-danger btn-sm" style={{ flex: 1 }}>
                    <XCircle size={16} /> 거절
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
