"use client";

import { Lightbulb, ChevronRight } from "lucide-react";

const tips = [
  { title: "CORS가 뭘까?", summary: "Cross-Origin Resource Sharing. 다른 출처의 리소스를 요청할 때 브라우저가 보안을 위해 차단하는 정책입니다." },
  { title: "REST vs GraphQL", summary: "REST는 엔드포인트별로 데이터를 가져오고, GraphQL은 필요한 데이터만 쿼리로 요청할 수 있습니다." },
  { title: "SSR과 CSR의 차이", summary: "SSR은 서버에서 페이지를 렌더링해 보내고, CSR은 브라우저에서 JavaScript로 렌더링합니다." },
  { title: "Git Rebase vs Merge", summary: "Merge는 병합 커밋을 만들고, Rebase는 커밋 히스토리를 깔끔하게 일렬로 만듭니다." },
];

export default function KnowledgeWidget() {
  const today = new Date().getDate();
  const tip = tips[today % tips.length];

  return (
    <div className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', cursor: 'pointer' }}>
      <div style={{
        width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0,
        background: '#fff8e1', display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <Lightbulb size={20} color="#f59e0b" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--orange)' }}>오늘의 개발 상식</span>
          <ChevronRight size={16} color="var(--text-disabled)" />
        </div>
        <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>{tip.title}</p>
        <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any }}>{tip.summary}</p>
      </div>
    </div>
  );
}
