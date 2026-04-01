import GrassWidget from "@/components/widgets/GrassWidget";
import ClockInWidget from "@/components/widgets/ClockInWidget";
import MemoWidget from "@/components/widgets/MemoWidget";
import KnowledgeWidget from "@/components/widgets/KnowledgeWidget";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div style={{ padding: '0 20px 20px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '16px' }}>
      
      {/* 헤더 (인스타/디스코드 감성 프로필 노출 영역) */}
      <header style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '16px 0 8px' }}>
        <div>
          <h2 className="title-lg" style={{ fontSize: '28px' }}>안녕하세요,<br/>{session?.user?.name || '부원'}님! 👋</h2>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), #a855f7)', padding: '2px', cursor: 'pointer' }}>
            <img src={session?.user?.image || "https://github.com/identicons/default.png"} alt="profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', background: '#fff' }} />
          </div>
          <div style={{ position: 'absolute', bottom: -4, right: -4, background: '#1c1c1e', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', color: '#fff', fontWeight: 800 }}>👑 Owner</div>
        </div>
      </header>
      
      {/* 💡 [NEW] 1분 개발 상식 (매일 변경됨) */}
      <div style={{ gridColumn: 'span 2', marginBottom: '4px' }}>
        <KnowledgeWidget />
      </div>

      {/* 상단 꽉 찬 크기: 출근/퇴근 하이웍스 기능 위젯 */}
      <div style={{ gridColumn: 'span 2' }}>
         <ClockInWidget />
      </div>

      {/* 좌측 블록: 스냅챗 감성의 연속 출석 Streak */}
      <div className="widget" style={{ gridColumn: 'span 1', background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)', color: '#1c1c1e' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, opacity: 0.8 }}>나의 불꽃</h3>
        <p style={{ fontSize: '36px', fontWeight: 800, marginTop: '4px', letterSpacing: '-1px' }}>🔥 13일</p>
        <span style={{ fontSize: '12px', fontWeight: 700, background: 'rgba(255,255,255,0.6)', padding: '4px 10px', borderRadius: '12px', marginTop: '12px', display: 'inline-block' }}>상위 5%</span>
      </div>

      {/* 우측 블록: 퀵 메모 iOS 감성 */}
      <div style={{ gridColumn: 'span 1' }}>
        <MemoWidget />
      </div>

      {/* 100% (80%) 달성률 진행 바 (핵심 목표) */}
      <div className="widget" style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '14px', border: '2px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <h3 style={{ fontSize: '17px', fontWeight: 700 }}>학기 목표 (80%) 달성률</h3>
          <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)' }}>65%</span>
        </div>
        <div style={{ height: '14px', background: 'var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ width: '65%', height: '100%', background: 'linear-gradient(90deg, var(--primary), #60a5fa)', borderRadius: '8px' }} />
        </div>
        <p className="text-muted" style={{ fontSize: '13px', textAlign: 'right' }}>80% 돌파까지 15% 남음 🚀</p>
      </div>

      {/* 하단 꽉 찬 크기: 거대한 깃허브 잔디 히트맵 */}
      <div style={{ gridColumn: 'span 2' }}>
        <GrassWidget />
      </div>
    </div>
  );
}
