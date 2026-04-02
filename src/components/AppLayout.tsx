"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, UserCircle, BellRing, Settings } from "lucide-react";
import { useSession } from "next-auth/react";
// @ts-ignore
import NoticeBanner from "./widgets/NoticeBanner";

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  
  const tabs = [
    { href: "/dashboard", icon: Home, label: "홈" },
    { href: "/profile", icon: UserCircle, label: "프로필" },
    { href: "/settings", icon: Settings, label: "설정" },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <NoticeBanner />
      <div className="app-container" style={{ flex: 1 }}>
        {/* Desktop Sidebar */}
        <nav className="sidebar-nav">
          <div style={{ padding: '0 12px 24px' }}>
            <h1 className="t-h2" style={{ color: 'var(--blue)' }}>Crewcheck</h1>
            <p className="t-caption" style={{ marginTop: '4px' }}>하이웍스 인트라넷</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {tabs.map(({ href, icon: Icon, label }) => {
              const isActive = pathname === href || (href !== '/dashboard' && pathname?.startsWith(href));
              return (
                <Link key={href} href={href} style={{
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px',
                  borderRadius: '12px', textDecoration: 'none',
                  background: isActive ? 'var(--blue-light)' : 'transparent',
                  color: isActive ? 'var(--blue)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 700 : 500
                }}>
                  <Icon size={20} />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Main Workspace */}
        <main className="main-content safe-bottom hide-scrollbar" style={{ overflowY: 'auto' }}>
          {children}
        </main>

        {/* Mobile Bottom Nav */}
        <nav className="bottom-nav">
          {tabs.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href || (href !== '/dashboard' && pathname?.startsWith(href));
            return (
              <Link key={href} href={href} className={`nav-item ${isActive ? 'active' : ''}`}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

