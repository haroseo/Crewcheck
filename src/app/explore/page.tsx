"use client";

import { TrendingUp, Clock, Inbox } from "lucide-react";

export default function ExplorePage() {
  const posts: any[] = []; // 실제로는 DB에서 가져올 게시글 목록

  return (
    <div className="safe-top" style={{ paddingBottom: '16px' }}>
      <header className="section" style={{ paddingTop: '8px', paddingBottom: '24px' }}>
        <h1 className="t-h1">피드</h1>
        <p style={{ fontSize: '14px', color: 'var(--text-tertiary)', marginTop: '6px' }}>동아리 소식과 트렌딩 글</p>
      </header>

      <div className="section">
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <Inbox size={48} color="var(--text-disabled)" style={{ margin: '0 auto 16px' }} />
            <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: '6px' }}>
              아직 게시글이 없습니다
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-disabled)' }}>
              동아리원들의 첫 글을 기다리고 있어요
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
