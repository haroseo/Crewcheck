"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { User, LogOut, Trash2, ArrowLeft, RefreshCw, Save } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  
  const [name, setName] = useState(session?.user?.name || "");
  const [bio, setBio] = useState((session?.user as any)?.bio || "");
  const [image, setImage] = useState(session?.user?.image || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [withdrawReason, setWithdrawReason] = useState("");
  const [showWithdraw, setShowWithdraw] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, bio, image }),
      });
      if (res.ok) {
        await update({ name, image }); // Sync local session
        alert("프로필이 성공적으로 수정되었습니다.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleWithdrawal = async () => {
    if (!confirm("정말로 탈퇴하시겠습니까? 관리자의 승인 전까지는 데이터가 유지됩니다.")) return;
    try {
      const res = await fetch("/api/user/withdraw", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({ reason: withdrawReason }),
      });
      if (res.ok) {
        alert("탈퇴 신청이 완료되었습니다. 관리자 승인 대기 중입니다.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="safe-top" style={{ paddingBottom: '40px' }}>
      <header className="section" style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px' }}>
        <button onClick={() => router.back()} className="btn-icon" style={{ background: 'var(--bg-float)' }}><ArrowLeft size={18}/></button>
        <h1 className="t-h1">설정</h1>
      </header>

      <div className="section">
        <div className="card">
          <h3 className="t-h3" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={18} color="var(--blue)"/> 프로필 수정
          </h3>
          <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="input-group">
              <label className="t-label">이름</label>
              <input type="text" className="input" value={name} onChange={e => setName(e.target.value)} placeholder="닉네임" required />
            </div>
            <div className="input-group">
              <label className="t-label">프로필 이미지 URL</label>
              <input type="text" className="input" value={image} onChange={e => setImage(e.target.value)} placeholder="https://..." />
            </div>
            <div className="input-group">
              <label className="t-label">소개글</label>
              <textarea className="input" style={{ minHeight: '80px', padding: '12px' }} value={bio} onChange={e => setBio(e.target.value)} placeholder="자기소개 한 줄" />
            </div>
            <button type="submit" disabled={isUpdating} className="btn btn-blue" style={{ width: '100%', gap: '8px' }}>
              <Save size={18}/> {isUpdating ? '저장 중...' : '변경 내용 저장'}
            </button>
          </form>
        </div>
      </div>

      <div className="section" style={{ marginTop: '24px' }}>
        <div className="card" style={{ padding: '8px' }}>
          <button 
            onClick={() => router.push("/onboarding")}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: 'none', background: 'transparent', borderRadius: '12px', cursor: 'pointer', textAlign: 'left' }}>
            <RefreshCw size={18} color="var(--text-secondary)"/>
            <div style={{ flex: 1 }}><p className="t-h3" style={{ fontSize: '15px' }}>온보딩 다시하기</p></div>
            <ChevronRight size={18} color="var(--text-disabled)"/>
          </button>
          
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: 'none', background: 'transparent', borderRadius: '12px', cursor: 'pointer', textAlign: 'left' }}>
            <LogOut size={18} color="var(--red)"/>
            <div style={{ flex: 1 }}><p className="t-h3" style={{ fontSize: '15px', color: 'var(--red)' }}>로그아웃</p></div>
          </button>
        </div>
      </div>

      <div className="section" style={{ marginTop: '24px' }}>
        {!showWithdraw ? (
          <button 
            onClick={() => setShowWithdraw(true)}
            style={{ width: '100%', padding: '16px', border: 'none', background: 'transparent', color: 'var(--text-disabled)', fontSize: '13px', textDecoration: 'underline', cursor: 'pointer' }}>
            계정 탈퇴하기
          </button>
        ) : (
          <div className="card" style={{ border: '1px solid var(--red-light)', background: '#fffcfc' }}>
            <h3 className="t-h3" style={{ color: 'var(--red)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Trash2 size={18}/> 정말로 떠나시겠어요?
            </h3>
            <p className="t-caption" style={{ marginTop: '8px', marginBottom: '16px' }}>탈퇴 사유를 적어주시면 동아리 발전에 참고하겠습니다.</p>
            <textarea className="input" placeholder="탈퇴 사유 (선택)" style={{ marginBottom: '12px' }} value={withdrawReason} onChange={e => setWithdrawReason(e.target.value)} />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={() => setShowWithdraw(false)}
                className="btn btn-outline" style={{ flex: 1 }}>취소</button>
              <button 
                onClick={handleWithdrawal}
                className="btn btn-red" style={{ flex: 1, background: 'var(--red)' }}>탈퇴 신청</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ChevronRight({ size, color }: { size: number, color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
