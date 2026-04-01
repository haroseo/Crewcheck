"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ShieldAlert, Award } from "lucide-react";
import GrassWidget from "./widgets/GrassWidget"; // 잔디 컴포넌트 재사용

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: any;
}

export default function ProfileModal({ isOpen, onClose, user }: ProfileModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: '480px', height: '85vh',
          background: 'var(--card-bg)', borderRadius: '32px 32px 0 0',
          boxShadow: '0 -20px 60px rgba(0,0,0,0.15)', zIndex: 999,
          overflowY: 'auto', display: 'flex', flexDirection: 'column'
        }}
      >
        {/* 모달 드래그 핸들 (토스 바텀시트 감성) */}
        <div style={{ width: '100%', height: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={onClose} >
          <div style={{ width: '40px', height: '5px', borderRadius: '3px', background: 'var(--border)' }} />
        </div>

        {/* 1. 디스코드식 커스텀 배너 */}
        <div style={{ width: '100%', height: '120px', background: 'var(--primary)', position: 'relative' }}>
          {/* 프로필 이미지 (디스코드식 공중에 뜬 아바타) */}
          <div style={{ 
            position: 'absolute', bottom: '-40px', left: '24px', 
            width: '90px', height: '90px', borderRadius: '50%', 
            background: 'var(--card-bg)', padding: '4px' 
          }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#ff9a9e' }} />
          </div>
        </div>

        <div style={{ padding: '50px 24px 24px' }}>
          {/* 2. 정보 및 디스코드 Role 태그 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 800 }}>코딩마스터</h1>
              <p className="text-muted" style={{ fontSize: '15px', marginTop: '4px' }}>하루라도 코드를 안 짜면 가시가 돋는 사람</p>
              
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, padding: '4px 8px', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', display: 'flex', alignItems: 'center', gap:'4px' }}><ShieldAlert size={14}/> 관리자</span>
                <span style={{ fontSize: '12px', fontWeight: 700, padding: '4px 8px', borderRadius: '6px', background: 'var(--border)' }}>프론트엔드</span>
              </div>
            </div>

            <button style={{
              width: '48px', height: '48px', borderRadius: '50%', border: 'none', background: 'var(--primary)', color: '#fff',
              display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: 'var(--shadow-sm)'
            }}>
              <MessageCircle fill="currentColor"/>
            </button>
          </div>

          <div style={{ height: '1px', background: 'var(--border)', margin: '24px 0' }} />

          {/* 3. 인스타 감성 통계 및 뱃지 그리드 */}
          <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', marginBottom: '24px' }}>
            <div><p style={{ fontSize: '20px', fontWeight: 800 }}>112<span style={{ fontSize: '12px', opacity: 0.6 }}>h</span></p><p className="text-muted" style={{ fontSize: '12px' }}>누적 타임</p></div>
            <div><p style={{ fontSize: '20px', fontWeight: 800 }}>34</p><p className="text-muted" style={{ fontSize: '12px' }}>팔로워</p></div>
            <div><p style={{ fontSize: '20px', fontWeight: 800 }}>18</p><p className="text-muted" style={{ fontSize: '12px' }}>획득 뱃지</p></div>
          </div>

          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>수집한 뱃지 쇼룸 ✨</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '32px' }}>
            {Array.from({length: 4}).map((_, i) => (
              <div key={i} style={{ aspectRatio: '1/1', background: 'var(--border)', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Award size={28} color={i === 0 ? "var(--primary)" : "#8e8e93"} />
              </div>
            ))}
          </div>

          {/* 4. 깃허브 잔디 어택 (GrassWidget 재활용) */}
          <GrassWidget />

        </div>
      </motion.div>
      
      {/* 바깥 영역 클릭 시 모달 닫기 용도의 오버레이 */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.6)', zIndex: 998 }}
      />
    </AnimatePresence>
  );
}
