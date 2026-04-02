"use client";

import { Inbox } from "lucide-react";

export default function GrassWidget() {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <span className="t-h3">활동 잔디</span>
        <span className="badge badge-gray">0 commits</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(15, 1fr)', gap: '3px' }}>
        {Array.from({ length: 105 }).map((_, i) => (
          <div
            key={i}
            style={{
              aspectRatio: '1/1',
              borderRadius: '3px',
              backgroundColor: 'var(--commit-0)',
            }}
          />
        ))}
      </div>
      <p style={{ fontSize: '12px', color: 'var(--text-disabled)', textAlign: 'center', marginTop: '12px' }}>
        출석하거나 학습을 완료하면 잔디가 채워집니다
      </p>
    </div>
  );
}
