"use client";

import { ShieldAlert, CheckCircle, XCircle, Users, AlertTriangle, Bell, Calendar, Settings2, Inbox } from "lucide-react";

export default function AdminDashboardPage() {
  const prList: any[] = []; // 실제로는 DB에서 가져올 결석계 목록

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
          { label: '전체 부원', value: '0', icon: <Users size={18}/>, color: 'var(--blue)', bg: 'var(--blue-light)' },
          { label: '평균 달성', value: '0%', icon: <Calendar size={18}/>, color: 'var(--green)', bg: '#e8faf0' },
          { label: '위험군', value: '0명', icon: <AlertTriangle size={18}/>, color: 'var(--red)', bg: '#fff0f1' },
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
          <span className="badge badge-gray">0건</span>
        </div>
        {prList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <Inbox size={40} color="var(--text-disabled)" style={{ margin: '0 auto 12px' }} />
            <p style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>
              대기 중인 결석계가 없습니다
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
