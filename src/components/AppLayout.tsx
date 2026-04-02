"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Compass, MessageCircle, Shield } from "lucide-react";

const tabs = [
  { href: "/dashboard", icon: Home, label: "홈" },
  { href: "/learn", icon: BookOpen, label: "성장" },
  { href: "/explore", icon: Compass, label: "피드" },
  { href: "/chat", icon: MessageCircle, label: "톡" },
  { href: "/admin", icon: Shield, label: "관리" },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <main className="safe-bottom hide-scrollbar" style={{ flex: 1, overflowY: 'auto' }}>
        {children}
      </main>

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
  );
}
