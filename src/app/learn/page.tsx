"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Lock, GitBranch, Loader2 } from "lucide-react";
import { completeCurriculumNode } from "@/app/actions/edu";

export default function LearnPage() {
  const [loadingId, setLoadingId] = useState<number | null>(null);

  // 모바일 게임처럼 상하로 이어진 스킬트리 맵 데이터
  const skillTree = [
    { id: 1, title: "웹 브라우저의 원리", xp: 50, status: "completed" },
    { id: 2, title: "HTML/CSS로 뼈대 세우기", xp: 100, status: "completed" },
    { id: 3, title: "Javascript의 비동기 처리", xp: 150, status: "current" },
    { id: 4, title: "React State와 훅스 완벽 이해", xp: 200, status: "locked" },
    { id: 5, title: "Next.js App Router 정복", xp: 300, status: "locked" }
  ];

  const handleCompleteTask = async (id: number, xp: number, title: string, status: string) => {
    if (status !== 'current' || loadingId) return;

    setLoadingId(id);
    try {
      const res = await completeCurriculumNode(id, xp, title);
      alert(`🎉 축하합니다! +${xp} EXP 획득!\n현재 누적 경험치: ${res.newExp}\n(새로고침을 통해 임시 반영됩니다)`);
    } catch(err) {
      alert("로그인이 풀렸거나 오류가 발생했습니다.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div style={{ padding: '20px 20px 100px', backgroundColor: 'var(--background)', minHeight: '100vh' }}>
      <header style={{ marginBottom: '32px' }}>
        <h2 className="title-lg" style={{ fontSize: '32px', display: 'flex', alignItems: 'center', gap:'8px', color: 'var(--primary)' }}>
          프론트엔드 성장 트랙 <GitBranch size={32} />
        </h2>
        <p className="text-muted" style={{ fontSize: '15px', marginTop: '6px', lineHeight: 1.4 }}>
          동아리 필수 이수 과정입니다.<br/>스테이지를 클리어하고 잔디에 코인을 심으세요!
        </p>
      </header>
      
      {/* 듀올링고 감성의 스킬트리 UI */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        
        {/* 뒤에 깔리는 연결선 */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, width: '4px', background: 'var(--border)', zIndex: 0 }} />

        {skillTree.map((node, i) => {
          // 달성 상태에 따른 렌더링 스타일 계산
          const isCompleted = node.status === 'completed';
          const isCurrent = node.status === 'current';
          const isLocked = node.status === 'locked';

          let bgColor = 'var(--card-bg)';
          let borderColor = 'var(--border)';
          let iconColor = '#8e8e93';

          if (isCompleted) {
            bgColor = 'rgba(34, 197, 94, 0.1)';
            borderColor = '#22c55e';
            iconColor = '#22c55e';
          } else if (isCurrent) {
            bgColor = '#fff';
            borderColor = 'var(--primary)';
            iconColor = 'var(--primary)';
          }

            return (
              <motion.div 
                key={node.id}
                whileTap={{ scale: isLocked ? 1 : 0.95 }}
                onClick={() => handleCompleteTask(node.id, node.xp, node.title, node.status)}
                style={{ 
                  zIndex: 1, 
                  width: '100%', 
                  maxWidth: '320px',
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '16px',
                  marginBottom: '40px',
                  cursor: isLocked ? 'not-allowed' : 'pointer',
                  opacity: isLocked ? 0.6 : 1,
                  // 스네이크 모양 배치 (듀올링고 감성)
                  transform: `translateX(${i % 2 === 0 ? '-10%' : '10%'})`
                }}
              >
                {/* 노드 동그라미 */}
                <div style={{
                  flexShrink: 0,
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: bgColor, border: `4px solid ${borderColor}`,
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  boxShadow: isCurrent ? '0 8px 24px rgba(49, 130, 246, 0.3)' : 'var(--shadow-sm)'
                }}>
                  {loadingId === node.id ? <Loader2 className="animate-spin" color={iconColor}/> : (
                    <>
                      {isCompleted && <CheckCircle2 size={32} color={iconColor} />}
                      {isCurrent && <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: iconColor }} />}
                      {isLocked && <Lock size={28} color={iconColor} />}
                    </>
                  )}
                </div>

              {/* 노드 설명 말풍선 */}
              <div style={{
                background: 'var(--card-bg)', padding: '12px 16px', borderRadius: '16px', 
                boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)', flex: 1
              }}>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--foreground)' }}>{node.title}</h4>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#f59e0b', marginTop: '4px', display: 'block' }}>+{node.xp} EXP</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
