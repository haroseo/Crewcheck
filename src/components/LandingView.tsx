"use client";

import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { CheckCircle2, Shield, Zap, Users } from "lucide-react";

export default function LandingView() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      {/* Hero */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        >
          <div style={{ marginBottom: '12px' }}>
            <span style={{ 
              display: 'inline-block', padding: '6px 14px', borderRadius: '100px',
              background: 'var(--blue-light)', color: 'var(--blue)',
              fontSize: '13px', fontWeight: 600
            }}>
              v1.0 출시
            </span>
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-0.6px', lineHeight: 1.3, marginBottom: '14px' }}>
            동아리 운영의<br/>모든 것, 한 곳에서.
          </h1>
          <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '40px' }}>
            출결 관리부터 학습, 소통까지.<br/>
            Crewcheck로 팀의 성장을 관리하세요.
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '48px' }}
        >
          {[
            { icon: <CheckCircle2 size={20}/>, label: '실시간 출결', color: '#00c471', bg: '#e8faf0' },
            { icon: <Zap size={20}/>, label: '스킬트리 학습', color: '#f59e0b', bg: '#fff8e1' },
            { icon: <Shield size={20}/>, label: 'E2E 암호화 톡', color: '#8b5cf6', bg: '#f3f0ff' },
            { icon: <Users size={20}/>, label: '관리자 대시보드', color: '#3182f6', bg: '#e8f3ff' },
          ].map((f, i) => (
            <div key={i} className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: f.color, flexShrink: 0 }}>
                {f.icon}
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{f.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        style={{ padding: '0 24px 40px', display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        <button className="btn btn-dark btn-lg" onClick={() => signIn("github")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          GitHub로 시작하기
        </button>
        <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-disabled)', marginTop: '4px' }}>
          가입 시 서비스 이용약관에 동의하게 됩니다.
        </p>
      </motion.div>
    </main>
  );
}
