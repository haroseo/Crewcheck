"use client";

import { motion } from "framer-motion";
import { signIn } from "next-auth/react";

export default function LandingView() {
  return (
    <main style={{ padding: '40px 24px', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        <div style={{ marginBottom: '40px' }}>
          <h1 className="title-lg" style={{ fontSize: '42px', lineHeight: 1.2, marginBottom: '16px' }}>
            압도적인 출결관리<br/>
            그리고 잔디심기.
          </h1>
          <p className="text-muted" style={{ fontSize: '18px', lineHeight: 1.5 }}>
            디스코드, 인스타, 깃허브, 토스의 장점만 모은<br/>
            완벽한 완전체 PWA 앱
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ width: '100%', maxWidth: '300px', margin: '0 auto 40px', background: 'var(--card-bg)', padding: '24px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}
        >
          {/* Mock Heatmap Art */}
          <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {Array.from({length: 21}).map((_, i) => (
              <div key={i} style={{ width: '16px', height: '16px', borderRadius: '4px', backgroundColor: `var(--commit-${Math.floor(Math.random()*5)})` }} />
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{ paddingBottom: '20px' }}
      >
        <button 
          className="btn-primary" 
          onClick={() => signIn("github")}
          style={{ marginBottom: '12px', backgroundColor: '#24292e' }}
        >
          GitHub로 계속하기
        </button>
        <button 
          className="btn-primary" 
          onClick={() => signIn("credentials")}
          style={{ backgroundColor: 'var(--card-bg)', color: 'var(--foreground)', border: '1px solid var(--border)' }}
        >
          이메일로 시작하기
        </button>
      </motion.div>
    </main>
  );
}
