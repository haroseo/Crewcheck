"use client";

import { useState, useEffect } from "react";
import { ShieldAlert, Users, Calendar, Plus, Save, Megaphone, CheckSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [activeTab, setActiveTab] = useState<"SCHEDULE" | "CRM" | "NOTICE" | "APPROVAL">("SCHEDULE");
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    
    const role = (session?.user as any)?.role;
    const sudoUnlocked = sessionStorage.getItem("sudo_unlocked");
    
    if (role !== "OWNER" || sudoUnlocked !== "true") {
      alert("최고 관리자 인증(Sudo)이 해제되었거나 권한이 없습니다.");
      router.push("/dashboard");
    } else {
      setIsAuthorized(true);
    }
  }, [session, status, router]);

  if (!isAuthorized) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>보안 터널 연결 중...</div>;
  }

  // Mock: CRM 멤버 출결 편집용
  const mockMembers = [
    { id: 1, name: "강동원", total: 6, attended: 6, rate: 100 },
    { id: 2, name: "김태리", total: 6, attended: 4, rate: 66 },
    { id: 3, name: "박보검", total: 6, attended: 2, rate: 33 },
  ];

  // Mock: 일정표 추가용
  const mockSchedules = [
    { id: 1, date: "2026. 04. 10 (금)", title: "정기 회의 및 프로젝트랩", required: true },
    { id: 2, date: "2026. 04. 14 (화)", title: "온라인 스터디 (자율)", required: false },
  ];

  return (
    <div className="safe-top" style={{ paddingBottom: '16px' }}>
      <header className="section" style={{ paddingTop: '8px', paddingBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldAlert size={20} color="var(--red)" />
          <h1 className="t-h1">동아리 관리실</h1>
        </div>
      </header>

      {/* 탭 네비게이션 */}
      <div className="section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '4px', background: 'var(--bg-float)', borderRadius: 'var(--radius-sm)', padding: '4px' }}>
          <button 
            onClick={() => setActiveTab("SCHEDULE")}
            style={{ padding: '10px 0', border: 'none', background: activeTab === "SCHEDULE" ? 'var(--bg-elevated)' : 'transparent', borderRadius: '8px', fontSize: '13px', fontWeight: 700, color: activeTab === "SCHEDULE" ? 'var(--text-primary)' : 'var(--text-tertiary)', boxShadow: activeTab === "SCHEDULE" ? 'var(--shadow-xs)' : 'none', cursor: 'pointer' }}>
            <Calendar size={14} style={{ display: 'block', margin: '0 auto 4px' }} />스케줄
          </button>
          <button 
            onClick={() => setActiveTab("CRM")}
            style={{ padding: '10px 0', border: 'none', background: activeTab === "CRM" ? 'var(--bg-elevated)' : 'transparent', borderRadius: '8px', fontSize: '13px', fontWeight: 700, color: activeTab === "CRM" ? 'var(--text-primary)' : 'var(--text-tertiary)', boxShadow: activeTab === "CRM" ? 'var(--shadow-xs)' : 'none', cursor: 'pointer' }}>
            <Users size={14} style={{ display: 'block', margin: '0 auto 4px' }} />CRM
          </button>
          <button 
            onClick={() => setActiveTab("NOTICE")}
            style={{ padding: '10px 0', border: 'none', background: activeTab === "NOTICE" ? 'var(--bg-elevated)' : 'transparent', borderRadius: '8px', fontSize: '13px', fontWeight: 700, color: activeTab === "NOTICE" ? 'var(--text-primary)' : 'var(--text-tertiary)', boxShadow: activeTab === "NOTICE" ? 'var(--shadow-xs)' : 'none', cursor: 'pointer' }}>
            <Megaphone size={14} style={{ display: 'block', margin: '0 auto 4px' }} />공지사항
          </button>
          <button 
            onClick={() => setActiveTab("APPROVAL")}
            style={{ padding: '10px 0', border: 'none', background: activeTab === "APPROVAL" ? 'var(--bg-elevated)' : 'transparent', borderRadius: '8px', fontSize: '13px', fontWeight: 700, color: activeTab === "APPROVAL" ? 'var(--text-primary)' : 'var(--text-tertiary)', boxShadow: activeTab === "APPROVAL" ? 'var(--shadow-xs)' : 'none', cursor: 'pointer' }}>
            <CheckSquare size={14} style={{ display: 'block', margin: '0 auto 4px' }} />결재/승인
          </button>
        </div>
      </div>

      {activeTab === "SCHEDULE" && (
        <div className="section" style={{ marginTop: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span className="t-h3">동아리 일정표</span>
            <button className="btn btn-blue btn-sm" style={{ width: 'auto' }}><Plus size={16}/> 새 일정 추가</button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {mockSchedules.map(sch => (
              <div key={sch.id} className="card" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-tertiary)' }}>{sch.date}</span>
                    <p style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>{sch.title}</p>
                  </div>
                  {sch.required ? <span className="badge badge-red">필수 참여</span> : <span className="badge badge-gray">자율 참여</span>}
                </div>
                {sch.required && (
                  <p style={{ fontSize: '11px', color: 'var(--red)', marginTop: '12px' }}>* 이 일정에 출석하지 않으면 결근으로 자동 처리됩니다.</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "CRM" && (
        <div className="section" style={{ marginTop: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span className="t-h3">출결 데이터 강제 정정 (CRM)</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {mockMembers.map(m => (
              <div key={m.id} className="card" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-float)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Users size={16} /></div>
                    <div>
                      <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>{m.name}</span>
                      <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginLeft: '6px' }}>출석 {m.attended} / {m.total}회 ({m.rate}%)</span>
                    </div>
                  </div>
                  <button className="btn btn-outline btn-sm" style={{ width: 'auto', gap: '4px', padding: '6px 12px' }}>
                    <Save size={14}/> 편집
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '16px', textAlign: 'center', lineHeight: 1.5 }}>
            앱 오류가 발생하거나 특별 결석 승인이 있었을 때,<br/>관리자가 임의로 출결 데이터를 되돌려주거나 +1 조작할 수 있습니다.
          </p>
        </div>
      )}

      {activeTab === "NOTICE" && (
        <div className="section" style={{ marginTop: '24px' }}>
          <div className="card">
            <h3 className="t-h3" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Megaphone size={18} color="var(--orange)"/> 전체 공지사항 발송
            </h3>
            <p className="t-caption" style={{ marginBottom: '20px' }}>작성된 공지는 모든 부원의 최상단 배너에 빨간 점 알림과 함께 즉시 노출됩니다.</p>
            
            <form onSubmit={async (e) => {
              e.preventDefault();
              const target = e.target as any;
              const title = target.title.value;
              const content = target.content.value;
              
              try {
                const res = await fetch("/api/admin/notice", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ title, content }),
                });
                if (res.ok) {
                  alert("공지사항이 성공적으로 발송되었습니다!");
                  target.reset();
                } else {
                  alert("발송 실패: " + (await res.json()).error);
                }
              } catch (err) {
                console.error(err);
                alert("네트워크 오류가 발생했습니다.");
              }
            }}>
              <div className="input-group" style={{ marginBottom: '16px' }}>
                <label className="t-label">공지 제목</label>
                <input name="title" type="text" className="input" placeholder="예: [필독] 이번 주 회의 장소 변경" required />
              </div>
              <div className="input-group" style={{ marginBottom: '24px' }}>
                <label className="t-label">상세 내용</label>
                <textarea name="content" className="input" style={{ minHeight: '120px', padding: '12px' }} placeholder="공지할 내용을 상세히 적어주세요." required />
              </div>
              <button type="submit" className="btn btn-blue" style={{ width: '100%', gap: '8px' }}>
                <Megaphone size={18}/> 공지사항 즉시 발송
              </button>
            </form>
          </div>
        </div>
      )}

      {activeTab === "APPROVAL" && (
        <div className="section" style={{ marginTop: '24px', textAlign: 'center', padding: '40px 20px' }}>
          <CheckSquare size={40} color="var(--text-disabled)" style={{ margin: '0 auto 12px' }} />
          <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>온라인 사유서 결재 모듈 연동 준비 중</p>
          <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginTop: '4px' }}>부원들이 제출한 결석계를 여기서 승인/반려합니다.</p>
        </div>
      )}
    </div>
  );
}
