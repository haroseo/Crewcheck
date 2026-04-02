"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Lock, Zap, Loader2 } from "lucide-react";
import { completeCurriculumNode } from "@/app/actions/edu";

export default function LearnPage() {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  const skillTree = [
    { id: 1, title: "웹 브라우저의 원리", xp: 50, status: "completed" as const },
    { id: 2, title: "HTML/CSS 핵심 기초", xp: 80, status: "completed" as const },
    { id: 3, title: "JavaScript 동작 원리", xp: 100, status: "current" as const },
    { id: 4, title: "React 상태관리와 훅", xp: 200, status: "locked" as const },
    { id: 5, title: "Next.js App Router", xp: 300, status: "locked" as const },
    { id: 6, title: "데이터베이스 기초", xp: 150, status: "locked" as const },
    { id: 7, title: "REST API 설계", xp: 200, status: "locked" as const },
  ];

  const handleComplete = async (id: number, xp: number, title: string, status: string) => {
    if (status !== 'current' || loadingId) return;
    setLoadingId(id);
    try {
      const res = await completeCurriculumNode(id, xp, title);
      setCompletedIds(prev => [...prev, id]);
      alert(`+${xp} EXP 획득! 누적: ${res.newExp}`);
    } catch {
      alert("오류가 발생했습니다.");
    } finally {
      setLoadingId(null);
    }
  };

  const getStatus = (node: typeof skillTree[0]) => {
    if (completedIds.includes(node.id)) return "completed";
    return node.status;
  };

  return (
    <div className="safe-top" style={{ paddingBottom: '16px' }}>
      <header className="section" style={{ paddingTop: '8px', paddingBottom: '24px' }}>
        <h1 className="t-h1">스킬트리</h1>
        <p style={{ fontSize: '14px', color: 'var(--text-tertiary)', marginTop: '6px' }}>
          단계별로 학습하고 경험치를 획득하세요
        </p>
      </header>

      {/* Skill tree */}
      <div className="section">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {skillTree.map((node, i) => {
            const status = getStatus(node);
            const isCompleted = status === "completed";
            const isCurrent = status === "current";
            const isLocked = status === "locked";

            return (
              <motion.div
                key={node.id}
                whileTap={{ scale: isLocked ? 1 : 0.98 }}
                onClick={() => handleComplete(node.id, node.xp, node.title, status)}
                className="card"
                style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  cursor: isLocked ? 'not-allowed' : 'pointer',
                  opacity: isLocked ? 0.5 : 1,
                  borderColor: isCurrent ? 'var(--blue)' : 'var(--border-light)',
                  borderWidth: isCurrent ? '2px' : '1px',
                }}
              >
                {/* Icon */}
                <div style={{
                  width: '48px', height: '48px', borderRadius: '14px', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isCompleted ? '#e8faf0' : isCurrent ? 'var(--blue-light)' : 'var(--bg-float)',
                }}>
                  {loadingId === node.id ? (
                    <Loader2 size={22} className="animate-spin" color="var(--blue)" />
                  ) : isCompleted ? (
                    <CheckCircle2 size={22} color="var(--green)" />
                  ) : isCurrent ? (
                    <Zap size={22} color="var(--blue)" />
                  ) : (
                    <Lock size={20} color="var(--text-disabled)" />
                  )}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>{node.title}</p>
                  <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginTop: '2px' }}>+{node.xp} EXP</p>
                </div>

                {/* Status */}
                {isCompleted && <span className="badge badge-green">완료</span>}
                {isCurrent && <span className="badge badge-blue">도전</span>}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
