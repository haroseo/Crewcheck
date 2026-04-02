import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import GrassWidget from "@/components/widgets/GrassWidget";
import { Lock } from "lucide-react";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const name = session?.user?.name || "부원";
  const role = (session?.user as any)?.role;

  return (
    <div className="safe-top" style={{ paddingBottom: '16px' }}>
      <header className="section" style={{ paddingTop: '8px', paddingBottom: '20px' }}>
        <h1 className="t-h1">내 프로필</h1>
      </header>

      {/* Profile Header */}
      <div className="section" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%',
          background: 'var(--bg-elevated)', border: '2px solid var(--blue)',
          padding: '4px', flexShrink: 0
        }}>
          <img
            src={session?.user?.image || "https://api.dicebear.com/7.x/initials/svg?seed=" + name}
            alt="profile"
            style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
          />
        </div>
        <div>
          <h2 className="t-h2" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {name}
            {role === "OWNER" && <span className="badge badge-red" style={{ fontSize: '10px' }}><Lock size={10} style={{ marginRight: '2px' }}/>최고 관리자</span>}
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
            백엔드 엔지니어의 길을 걷고 있습니다.
          </p>
        </div>
      </div>

      <div className="divider" style={{ margin: '24px -20px' }} />

      {/* GitHub-style Grass */}
      <div className="section">
        <GrassWidget />
      </div>

      {/* Recent Commits/Checks */}
      <div className="section" style={{ marginTop: '24px' }}>
        <div className="section-title">
          <span className="section-title-text">최근 활동 기록</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ display: 'flex', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '20px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--blue)', marginTop: '4px' }} />
                {i !== 3 && <div style={{ flex: 1, width: '2px', background: 'var(--border-light)', marginTop: '4px' }} />}
              </div>
              <div style={{ paddingBottom: '16px' }}>
                <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>정규 회의 출석 완료</p>
                <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '2px' }}>2026. 04. 1{0-i} (금) 오후 7:00</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
