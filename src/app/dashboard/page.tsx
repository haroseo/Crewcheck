"use client";

import { useState } from "react";
import ClockInWidget from "@/components/widgets/ClockInWidget";
import ScheduleWidget from "@/components/widgets/ScheduleWidget";
import { useSession } from "next-auth/react";
import { ShieldAlert, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session } = useSession();
  const name = session?.user?.name || "부원";
  const role = (session?.user as any)?.role;
  const router = useRouter();

  const [isSudoModalOpen, setSudoModalOpen] = useState(false);
  const [sudoEmail, setSudoEmail] = useState("");
  const [sudoPassword, setSudoPassword] = useState("");

  const handleSudoLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (sudoEmail && sudoPassword) {
      // 실제로는 API로 한 번 더 검증해야 하지만 Mock 처리
      sessionStorage.setItem("sudo_unlocked", "true");
      router.push("/admin");
    }
  };

  const participation = { attended: 5, total: 6, rate: 83 };

  return (
    <div className="safe-top" style={{ paddingBottom: '16px' }}>
      {/* 관리자 통제실 진입 위젯 */}
      {role === "OWNER" && (
        <div className="section" style={{ paddingTop: '8px' }}>
          <div 
            onClick={() => setSudoModalOpen(true)}
            className="card" style={{ padding: '12px 16px', background: 'var(--red)', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={18} />
              <span style={{ fontSize: '14px', fontWeight: 700 }}>동아리 통제실 진입</span>
            </div>
            <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: '100px' }}>
              보안 인증 필요
            </span>
          </div>
        </div>
      )}

      {/* Sudo Modal */}
      {isSudoModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }} onClick={() => setSudoModalOpen(false)} />
          <div className="card" style={{ position: 'relative', width: '100%', maxWidth: '320px', zIndex: 1001 }}>
            <button onClick={() => setSudoModalOpen(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)' }}><X size={20}/></button>
            <h2 className="t-h2" style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldAlert size={22} color="var(--red)"/> 최고 관리자 인증
            </h2>
            <p className="t-caption" style={{ marginBottom: '20px' }}>통제실 접근을 위해 이메일과 비밀번호를 다시 입력하세요.</p>
            <form onSubmit={handleSudoLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="email" placeholder="관리자 이메일" className="input" value={sudoEmail} onChange={e => setSudoEmail(e.target.value)} required />
              <input type="password" placeholder="비밀번호" className="input" value={sudoPassword} onChange={e => setSudoPassword(e.target.value)} required />
              <button type="submit" className="btn btn-primary" style={{ marginTop: '8px', background: 'var(--red)' }}>인증 및 진입</button>
            </form>
          </div>
        </div>
      )}

      <header className="section" style={{ paddingTop: '8px', paddingBottom: '20px' }}>
        <p style={{ fontSize: '14px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
          {new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' })}
        </p>
        <h1 className="t-h1">{name}님, 안녕하세요</h1>
      </header>

      <div className="section"><ScheduleWidget /></div>
      <div className="section" style={{ marginTop: '16px' }}><ClockInWidget /></div>

      <div className="section" style={{ marginTop: '16px' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span className="t-h3">이번 학기 참여율</span>
            <span style={{ fontSize: '20px', fontWeight: 800, color: participation.rate >= 80 ? 'var(--blue)' : 'var(--red)' }}>
              {participation.rate}%
            </span>
          </div>
          <div className="progress-track" style={{ background: 'var(--bg-float)' }}>
            <div className="progress-fill" style={{ width: `${participation.rate}%`, background: participation.rate >= 80 ? 'linear-gradient(90deg, var(--blue), #60a5fa)' : 'linear-gradient(90deg, var(--red), #fb7185)' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
