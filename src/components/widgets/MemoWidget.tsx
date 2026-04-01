"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Edit3 } from "lucide-react";

export default function MemoWidget() {
  const [memoText, setMemoText] = useState("오늘 동아리에서 꼭 끝내야 할 일...");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="widget" style={{ 
      background: '#fef08a', // 힙한 포스트잇 노란색
      color: '#422006',
      height: '100%',
      minHeight: '140px',
      position: 'relative',
      boxShadow: '2px 4px 12px rgba(253, 224, 71, 0.4)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 800 }}>📌 퀵 메모</h3>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#854d0e' }}
        >
          <Edit3 size={16} />
        </button>
      </div>

      {isEditing ? (
        <textarea
          autoFocus
          value={memoText}
          onChange={(e) => setMemoText(e.target.value)}
          onBlur={() => setIsEditing(false)}
          style={{
            width: '100%', height: '80px', background: 'transparent', 
            border: 'none', resize: 'none', fontFamily: 'inherit',
            fontSize: '14px', fontWeight: 600, color: 'inherit', outline: 'none'
          }}
        />
      ) : (
        <p 
          onClick={() => setIsEditing(true)} 
          style={{ fontSize: '14px', fontWeight: 600, whiteSpace: 'pre-wrap', cursor: 'text', lineHeight: 1.4 }}
        >
          {memoText}
        </p>
      )}
    </div>
  );
}
