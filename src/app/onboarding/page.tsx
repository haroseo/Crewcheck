import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { updateUserProfile } from "@/app/actions/user";
import { Loader2 } from "lucide-react";

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ nickname: "", track: "", color: "#3182f6" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const steps = [
    { 
      question: "반가워요! 🎉", 
      desc: "앞으로 동아리에서 사용할\n멋진 닉네임을 알려주세요.", 
      placeholder: "예: 코딩천재, 디자인마스터",
      key: "nickname" 
    },
    { 
      question: "어떤 분야에 관심이 있나요? 💻", 
      desc: "주력 직군이나 포지션을 입력해주시면\n프로필에 배지처럼 달아드릴게요.", 
      placeholder: "예: 프론트엔드, 마케터, 기획",
      key: "track" 
    },
    { 
      question: "마지막으로 나만의 색상을! 🎨", 
      desc: "프로필 배경(배너)을 장식할\n가장 좋아하는 색상을 골라주세요.", 
      isColor: true,
      key: "color" 
    }
  ];

  const currentStep = steps[step];

  const handleNext = async () => {
    if (loading) return;

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setLoading(true);
      try {
        await updateUserProfile({
          nickname: formData.nickname,
          track: formData.track,
          bannerColor: formData.color
        });
        router.push("/dashboard");
      } catch (err) {
        alert("이름 등록 실패! 다시 로그인해주세요.");
        setLoading(false);
      }
    }
  };

  return (
    <main style={{ 
      height: '100vh', display: 'flex', flexDirection: 'column', 
      padding: '40px 24px', justifyContent: 'center', backgroundColor: 'var(--background)' 
    }}>
      
      {/* 상단 프로그레스 바 */}
      <div style={{ position: 'absolute', top: 40, left: 24, right: 24, height: 4, backgroundColor: 'var(--border)', borderRadius: 2 }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
          style={{ height: '100%', backgroundColor: 'var(--primary)', borderRadius: 2 }}
        />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <h1 className="title-lg" style={{ fontSize: '32px', marginBottom: '12px', whiteSpace: 'pre-wrap' }}>
              {currentStep.question}
            </h1>
            <p className="text-muted" style={{ fontSize: '18px', lineHeight: 1.5, marginBottom: '40px', whiteSpace: 'pre-wrap' }}>
              {currentStep.desc}
            </p>

            {currentStep.isColor ? (
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {['#3182f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'].map(color => (
                  <button
                    key={color}
                    onClick={() => setFormData({...formData, color})}
                    style={{
                      width: '48px', height: '48px', borderRadius: '50%', backgroundColor: color,
                      border: formData.color === color ? '4px solid var(--foreground)' : 'none',
                      cursor: 'pointer', transition: 'transform 0.2s'
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
                style={{
                  width: '100%', padding: '20px 0', fontSize: '24px', fontWeight: 600,
                  border: 'none', borderBottom: '2px solid var(--border)', 
                  backgroundColor: 'transparent', color: 'var(--foreground)', outline: 'none'
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <button 
        className="btn-primary" 
        onClick={handleNext}
        disabled={loading}
        style={{ marginTop: 'auto', height: '60px', fontSize: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        {loading ? <Loader2 className="animate-spin" /> : (step === steps.length - 1 ? "Crewcheck 시작하기 🚀" : "다음으로 가기")}
      </button>
    </main>
  );
}
