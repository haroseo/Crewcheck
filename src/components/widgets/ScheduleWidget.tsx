"use client";

import { Calendar } from "lucide-react";

export default function ScheduleWidget() {
  // DB 연동 예정: 다음 다가오는 모임 일정
  const nextSchedule = {
    title: "정규 활동 및 스터디",
    date: "이번 주 금요일 오후 7:00",
    dday: "D-2"
  };

  return (
    <div className="card" style={{ background: 'linear-gradient(135deg, var(--bg-elevated), var(--bg-float))' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={18} color="var(--blue)" />
          <span className="t-h3">다음 일정</span>
        </div>
        <span className="badge badge-gray">{nextSchedule.dday}</span>
      </div>
      <p style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>{nextSchedule.title}</p>
      <p style={{ fontSize: '14px', color: 'var(--text-tertiary)', marginTop: '4px' }}>{nextSchedule.date}</p>
    </div>
  );
}
