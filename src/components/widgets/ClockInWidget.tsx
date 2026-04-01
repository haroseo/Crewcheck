"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Play, Square, Loader2 } from "lucide-react";
import { toggleClockIn, getActiveClockIn } from "@/app/actions/checkin";

export default function ClockInWidget() {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mins, setMins] = useState(0);

  useEffect(() => {
    getActiveClockIn().then((res) => {
      if (res) {
        setIsClockedIn(res.isClockedIn);
        setMins(res.currentDuration || 0);
      }
      setLoading(false);
    });
  }, []);

  const handleToggle = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const result: any = await toggleClockIn();
      if (!result) return;

      if (!result.isClockedIn) {
        // 퇴근 완료
        setIsClockedIn(false);
        setMins(result.duration || 0);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3500);
      } else {
        // 출근 시작
        setIsClockedIn(true);
        setMins(0);
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "서버 통신 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="widget" style={{ 
      position: 'relative', overflow: 'hidden', padding: '24px', 
      background: isClockedIn ? 'var(--card-bg)' : 'linear-gradient(135deg, var(--primary), #a855f7)',
      color: isClockedIn ? 'var(--foreground)' : '#fff',
      transition: 'background 0.5s ease'
    }}>
      {/* 팡파레 이펙트 */}
      {showConfetti && (
        <motion.div 
          initial={{ opacity: 1, scale: 0 }} animate={{ opacity: 0, scale: 2 }} transition={{ duration: 1.5 }}
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '200px', height: '200px', background: 'radial-gradient(circle, #fecfef 0%, transparent 70%)', zIndex: 0 }}
        />
      )}

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, opacity: isClockedIn ? 1 : 0.95 }}>
            {showConfetti ? `축하합니다! ${mins}분 달성 🎉` : (isClockedIn ? '🔥 미션 수행 중...' : '오늘 일정 시작할까요?')}
          </h3>
          <p style={{ fontSize: '14px', marginTop: '6px', opacity: 0.8, fontWeight: 600 }}>
            {showConfetti ? '기록이 잔디밭에 영구 박제되었습니다.' : (isClockedIn ? `총 ${mins}분 경과 (클릭하여 퇴근)` : '버튼 한 번으로 즉시 출근 기록 저장')}
          </p>
        </div>

        <motion.button 
           whileTap={{ scale: loading ? 1 : 0.9 }}
           onClick={handleToggle}
           disabled={loading}
           style={{
             width: '56px', height: '56px', borderRadius: '50%', border: 'none', cursor: loading ? 'wait' : 'pointer',
             background: isClockedIn ? '#ffe4e6' : '#fff',
             color: isClockedIn ? '#e11d48' : 'var(--primary)',
             display: 'flex', alignItems: 'center', justifyContent: 'center',
             boxShadow: 'var(--shadow-lg)', flexShrink: 0
           }}
        >
          {loading ? <Loader2 className="animate-spin" size={24}/> : (isClockedIn ? <Square fill="currentColor" strokeWidth={0}/> : <Play fill="currentColor" strokeWidth={0} style={{ marginLeft: '4px' }}/>)}
        </motion.button>
      </div>
    </div>
  );
}
