"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

export default function KnowledgeWidget() {
  return (
    <motion.div 
      whileTap={{ scale: 0.98 }}
      className="widget" 
      style={{ 
        background: '#fff', border: '1px solid var(--border)',
        boxShadow: '0 8px 24px rgba(255, 171, 0, 0.1)', cursor: 'pointer'
      }}
    >
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        <div style={{ padding: '8px', background: 'rgba(255, 171, 0, 0.15)', borderRadius: '12px' }}>
          <Lightbulb size={24} color="#f59e0b" strokeWidth={2.5} />
        </div>
        <div>
          <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#f59e0b', marginBottom: '4px' }}>하루 1분 지식 조각</h3>
          <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#1c1c1e', marginBottom: '6px', lineHeight: 1.3 }}>
            CORS 오류, 대체 왜 뜨는 걸까?
          </h4>
          <p style={{ fontSize: '13px', color: '#8e8e93', lineHeight: 1.4, fontWeight: 500 }}>
            교차 출처 리소스 공유(CORS) 정책은 해커가 여러분의 브라우저를 좀비로 만드는 걸 막기 위한 착한 철벽이랍니다.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
