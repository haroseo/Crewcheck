"use client";

export default function GrassWidget() {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <span className="t-h3">활동 잔디</span>
        <span className="badge badge-green">124 commits</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(15, 1fr)', gap: '3px' }}>
        {Array.from({ length: 105 }).map((_, i) => {
          const level = Math.random() > 0.4 ? Math.floor(Math.random() * 4) + 1 : 0;
          return (
            <div
              key={i}
              style={{
                aspectRatio: '1/1',
                borderRadius: '3px',
                backgroundColor: `var(--commit-${level})`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
