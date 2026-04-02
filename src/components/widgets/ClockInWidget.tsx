"use client";

import { useState } from "react";
import { Play, Square, Clock } from "lucide-react";

export default function ClockInWidget() {
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsed, setElapsed] = useState("00:00:00");

  const handleToggle = () => {
    if (!isActive) {
      setStartTime(new Date());
      setIsActive(true);
      const start = Date.now();
      const timer = setInterval(() => {
        const diff = Date.now() - start;
        const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
        const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
        const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
        setElapsed(`${h}:${m}:${s}`);
      }, 1000);
      (window as any).__clockTimer = timer;
    } else {
      clearInterval((window as any).__clockTimer);
      setIsActive(false);
    }
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={18} color="var(--text-tertiary)" />
          <span className="t-h3">출퇴근</span>
        </div>
        {isActive && <span className="badge badge-green">활동 중</span>}
      </div>

      <p style={{
        fontSize: '36px', fontWeight: 800, letterSpacing: '-1px',
        textAlign: 'center', margin: '8px 0 20px',
        fontVariantNumeric: 'tabular-nums',
        color: isActive ? 'var(--text-primary)' : 'var(--text-disabled)'
      }}>
        {elapsed}
      </p>

      <button
        className={`btn ${isActive ? 'btn-danger' : 'btn-blue'} btn-lg`}
        onClick={handleToggle}
      >
        {isActive ? <><Square size={18} /> 퇴근하기</> : <><Play size={18} /> 출근하기</>}
      </button>

      {startTime && (
        <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', textAlign: 'center', marginTop: '10px' }}>
          {startTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}에 시작
        </p>
      )}
    </div>
  );
}
