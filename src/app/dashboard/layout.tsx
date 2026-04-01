import { ReactNode } from "react";
import Link from "next/link";
import { Home, Compass, MessageCircle, Settings, BookOpen } from "lucide-react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <main style={{ flex: 1, overflowY: 'auto', paddingBottom: '100px', paddingTop: 'env(safe-area-inset-top)' }}>
        {children}
      </main>
      
      {/* 탭 바 (하단 네비게이션) - iOS/앱 감성 */}
      <nav style={{ 
        position: 'fixed', bottom: 0, width: '100%', maxWidth: '480px', left: '50%', transform: 'translateX(-50%)',
        height: '80px', display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        background: 'var(--card-bg)', borderTop: '1px solid var(--border)',
        boxShadow: '0 -10px 30px rgba(0,0,0,0.03)', zIndex: 50,
        paddingBottom: 'env(safe-area-inset-bottom)'
      }}>
        <Link href="/dashboard" style={{ color: 'var(--primary)', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <Home size={26} strokeWidth={2.5}/>
          <span style={{ fontSize: '11px', fontWeight: 700 }}>홈</span>
        </Link>
        <Link href="/learn" style={{ color: 'var(--foreground)', opacity: 0.4, textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <BookOpen size={26} strokeWidth={2.5}/>
          <span style={{ fontSize: '11px', fontWeight: 700 }}>성장</span>
        </Link>
        <Link href="/explore" style={{ color: 'var(--foreground)', opacity: 0.4, textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <Compass size={26} strokeWidth={2.5}/>
          <span style={{ fontSize: '11px', fontWeight: 700 }}>피드</span>
        </Link>
        <Link href="/chat" style={{ color: 'var(--foreground)', opacity: 0.4, textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <MessageCircle size={26} strokeWidth={2.5}/>
          <span style={{ fontSize: '11px', fontWeight: 700 }}>비밀톡</span>
        </Link>
        <Link href="/admin" style={{ color: 'var(--foreground)', opacity: 0.4, textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <Settings size={26} strokeWidth={2.5}/>
          <span style={{ fontSize: '11px', fontWeight: 700 }}>관리실</span>
        </Link>
      </nav>
    </div>
  );
}
