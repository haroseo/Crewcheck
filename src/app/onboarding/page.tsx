"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ nickname: "", track: "", color: "#3182f6" });
  const router = useRouter();

  const steps = [
    { question: "반가워요!", desc: "앞으로 동아리에서 사용할\n닉네임을 알려주세요.", placeholder: "예: 코딩천재", key: "nickname" },
    { question: "어떤 분야에 관심이 있나요?", desc: "주력 직군이나 포지션을\n입력해주세요.", placeholder: "예: 프론트엔드", key: "track" },
    { question: "마지막으로 나만의 색상!", desc: "프로필 배경을 장식할\n색상을 골라주세요.", isColor: true, key: "color" }
  ];

  const currentStep = steps[step];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '0 24px', justifyContent: 'center', background: 'var(--bg)' }}>
      {/* X button */}
      <button
        onClick={() => router.push('/dashboard')}
        style={{
          position: 'absolute', top: '16px', right: '16px',
          width: '36px', height: '36px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--bg-float)', border: 'none', cursor: 'pointer',
          color: 'var(--text-secondary)'
        }}
      >
        <X size={20} />
      </button>

      {/* 프로그레스 바 */}
      <div style={{ position: 'absolute', top: '60px', left: '24px', right: '24px' }}>
        <div className="progress-track" style={{ height: '4px' }}>
          <div className="progress-fill" style={{ width: `${((step + 1) / steps.length) * 100}%`, transition: 'width 0.4s ease' }} />
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '80px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
          >
            <h1 className="t-h1" style={{ fontSize: '28px', marginBottom: '10px', whiteSpace: 'pre-wrap' }}>
              {currentStep.question}
            </h1>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '36px', whiteSpace: 'pre-wrap' }}>
              {currentStep.desc}
            </p>

            {currentStep.isColor ? (
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                {['#3182f6', '#00c471', '#f59e0b', '#f04452', '#8b5cf6'].map(color => (
                  <button
                    key={color}
                    onClick={() => setFormData({...formData, color})}
                    style={{
                      width: '48px', height: '48px', borderRadius: '50%', backgroundColor: color,
                      border: formData.color === color ? '3px solid var(--text-primary)' : '3px solid transparent',
                      cursor: 'pointer', transition: 'border 0.2s'
                    }}
                  />
                ))}
              </div>
            ) : (
              <input
                autoFocus
                type="text"
                placeholder={currentStep.placeholder}
                value={formData[currentStep.key as keyof typeof formData]}
                onChange={(e) => setFormData({...formData, [currentStep.key]: e.target.value})}
                onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                className="input"
                style={{ fontSize: '18px', fontWeight: 600, padding: '16px 0', background: 'transparent', borderRadius: 0, borderBottom: '2px solid var(--border)' }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ paddingBottom: '40px' }}>
        <button className="btn btn-blue btn-lg" onClick={handleNext}>
          {step === steps.length - 1 ? "시작하기" : "다음"}
        </button>
      </div>
    </main>
  );
}
