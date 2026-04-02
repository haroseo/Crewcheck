"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Megaphone, ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";

export default function NoticeBanner() {
  const { data: session, update } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [latestNotice, setLatestNotice] = useState<{ id: string; title: string; content: string } | null>(null);
  const [hasNewNotice, setHasNewNotice] = useState(false);

  useEffect(() => {
    async function fetchLatest() {
      try {
        const res = await fetch("/api/notice/latest");
        const data = await res.json();
        if (data && data.id) {
          setLatestNotice(data);
          // Check if this notice is new for the user
          const lastReadId = (session?.user as any)?.lastReadNoticeId;
          if (data.id !== lastReadId) {
            setHasNewNotice(true);
          }
        }
      } catch (err) {
        console.error("Notice fetch error:", err);
      }
    }
    
    if (session?.user) {
      fetchLatest();
    }
  }, [session]);

  const handleOpenNotice = async () => {
    setIsOpen(true);
    if (hasNewNotice && latestNotice) {
      // Mark as read in DB
      try {
        await fetch("/api/notice/read", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ noticeId: latestNotice.id }),
        });
        setHasNewNotice(false);
        // Sync local session
        await update({ lastReadNoticeId: latestNotice.id });
      } catch (err) {
        console.error("Failed to mark as read:", err);
      }
    }
  };

  if (!latestNotice) return null;

  return (
    <>
      <div 
        onClick={handleOpenNotice}
        style={{
          background: 'linear-gradient(90deg, #1e293b, #0f172a)',
          color: '#fff',
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          position: 'sticky',
          top: 0,
          zIndex: 40
        }}
      >
        <div style={{ position: 'relative' }}>
          <Megaphone size={16} color="var(--orange)" />
          {hasNewNotice && (
            <div style={{
              position: 'absolute', top: '-4px', right: '-4px',
              width: '8px', height: '8px', background: 'var(--red)',
              borderRadius: '50%', border: '1.5px solid #1e293b'
            }} />
          )}
        </div>
        <span style={{ fontSize: '14px', fontWeight: 600 }}>{latestNotice.title}</span>
        <ChevronRight size={16} color="rgba(255,255,255,0.5)" />
      </div>

      <AnimatePresence>
        {isOpen && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 100,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px'
          }}>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }} 
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="card"
              style={{
                position: 'relative', width: '100%', maxWidth: '420px',
                padding: '24px', boxShadow: 'var(--shadow-lg)', zIndex: 101
              }}
            >
              <button 
                onClick={() => setIsOpen(false)}
                style={{
                  position: 'absolute', top: '16px', right: '16px',
                  background: 'var(--bg-float)', border: 'none',
                  width: '32px', height: '32px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'var(--text-secondary)'
                }}
              >
                <X size={18} />
              </button>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fff8e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Megaphone size={20} color="var(--orange)" />
                </div>
                <div style={{ flex: 1, paddingRight: '24px' }}>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--orange)' }}>전체 공지사항</p>
                  <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>{latestNotice.title}</p>
                </div>
              </div>

              <div style={{ background: 'var(--bg-float)', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>
                  {latestNotice.content}
                </p>
              </div>

              <button className="btn btn-outline" style={{ width: '100%' }}>
                과거 공지사항 더 보기
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
