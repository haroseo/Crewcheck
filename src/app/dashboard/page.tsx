import GrassWidget from "@/components/widgets/GrassWidget";
import ClockInWidget from "@/components/widgets/ClockInWidget";
import KnowledgeWidget from "@/components/widgets/KnowledgeWidget";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const name = session?.user?.name || "부원";

  return (
    <div className="safe-top" style={{ paddingBottom: '16px' }}>
      {/* Header */}
      <header className="section" style={{ paddingTop: '8px', paddingBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '14px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
              {new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' })}
            </p>
            <h1 className="t-h1">{name}님, 안녕하세요</h1>
          </div>
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--blue), #8b5cf6)',
            padding: '2px', flexShrink: 0
          }}>
            <img
              src={session?.user?.image || "https://api.dicebear.com/7.x/initials/svg?seed=" + name}
              alt="profile"
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', background: 'var(--bg-elevated)' }}
            />
          </div>
        </div>
      </header>

      {/* 1분 개발 상식 */}
      <div className="section">
        <KnowledgeWidget />
      </div>

      {/* 출퇴근 */}
      <div className="section" style={{ marginTop: '16px' }}>
        <ClockInWidget />
      </div>

      {/* 출석률 + 스트릭 */}
      <div className="section" style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div className="card" style={{ background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)', color: '#fff', padding: '18px' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, opacity: 0.8 }}>연속 출석</p>
          <p style={{ fontSize: '28px', fontWeight: 800, marginTop: '4px', letterSpacing: '-1px' }}>0일</p>
          <span style={{ fontSize: '11px', fontWeight: 600, background: 'rgba(255,255,255,0.25)', padding: '3px 8px', borderRadius: '100px', marginTop: '8px', display: 'inline-block' }}>출석을 시작하세요</span>
        </div>
        <div className="card" style={{ background: 'linear-gradient(135deg, var(--blue), #6366f1)', color: '#fff', padding: '18px' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, opacity: 0.8 }}>누적 경험치</p>
          <p style={{ fontSize: '28px', fontWeight: 800, marginTop: '4px', letterSpacing: '-1px' }}>0</p>
          <span style={{ fontSize: '11px', fontWeight: 600, background: 'rgba(255,255,255,0.25)', padding: '3px 8px', borderRadius: '100px', marginTop: '8px', display: 'inline-block' }}>EXP</span>
        </div>
      </div>

      {/* 학기 목표 달성률 */}
      <div className="section" style={{ marginTop: '16px' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span className="t-h3">학기 목표 달성률</span>
            <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--blue)' }}>0%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: '0%' }} />
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginTop: '8px' }}>
            80% 달성을 목표로 출석을 시작해보세요
          </p>
        </div>
      </div>

      {/* 잔디 히트맵 */}
      <div className="section" style={{ marginTop: '16px' }}>
        <GrassWidget />
      </div>
    </div>
  );
}
