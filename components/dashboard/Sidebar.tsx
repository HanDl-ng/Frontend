'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, type ReactNode } from 'react';
import {
  GridIcon, ChatIcon, CartIcon, PackageIcon, ShoppingBagIcon,
  LinkIcon, BarChartIcon, GearIcon,
  ChevronDownIcon, ChevronRightIcon,
  UserIcon, SparklesIcon, LogOutIcon,
} from '@/components/icons';

interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
  badge?: number;
  children?: { label: string; href: string }[];
}

const navSections: { label: string; items: NavItem[] }[] = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', href: '/app/dashboard', icon: <GridIcon /> },
      { label: 'Conversations', href: '/app/conversations', icon: <ChatIcon />, badge: 5 },
    ],
  },
  {
    label: 'Business',
    items: [
      { label: 'Orders', href: '/app/orders', icon: <CartIcon /> },
      { label: 'Products', href: '/app/products', icon: <PackageIcon /> },
    ],
  },
  {
    label: 'Connect',
    items: [
      { label: 'Integrations', href: '/app/integrations', icon: <LinkIcon /> },
      { label: 'Storefront', href: '/app/storefront', icon: <ShoppingBagIcon /> },
    ],
  },
  {
    label: 'Insights',
    items: [
      { label: 'Reports', href: '/app/reports', icon: <BarChartIcon /> },
    ],
  },
  {
    label: 'Workspace',
    items: [
      {
        label: 'Settings',
        href: '/app/settings',
        icon: <GearIcon />,
        children: [
          { label: 'Business', href: '/app/settings' },
          { label: 'AI Agent', href: '/app/settings/agent' },
          { label: 'Channels', href: '/app/settings/channels' },
          { label: 'Billing', href: '/app/settings/billing' },
          { label: 'API', href: '/app/settings/api' },
          { label: 'Appearance', href: '/app/settings/appearance' },
        ],
      },
    ],
  },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    if (profileOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [profileOpen]);

  const isActive = (href: string) => {
    if (href === '/app/dashboard') return pathname === '/app/dashboard';
    return pathname.startsWith(href);
  };

  const isParentActive = (item: NavItem) => {
    if (item.children) return item.children.some((c) => pathname.startsWith(c.href));
    return isActive(item.href);
  };

  return (
    <>
      <div
        className={`sidebar-overlay${open ? ' open' : ''}`}
        onClick={onClose}
      />
      <aside className={`sidebar${open ? ' open' : ''}`}>
        <Link href="/" className="sidebar-logo">
          <div className="logo-mark" />
          HanDl
        </Link>

        <nav className="sidebar-nav">
          {navSections.map((section) => (
            <div key={section.label} className="sidebar-section">
              <div className="sidebar-section-label">{section.label}</div>
              {section.items.map((item) => (
                <div key={item.href}>
                  {item.children ? (
                    <>
                      <button
                        className={`sidebar-item${isParentActive(item) ? ' active' : ''}`}
                        onClick={() =>
                          setExpanded(expanded === item.label ? null : item.label)
                        }
                      >
                        <span className="sidebar-icon">{item.icon}</span>
                        {item.label}
                        <span style={{ marginLeft: 'auto', width: 12, height: 12, opacity: 0.5, display: 'flex', alignItems: 'center' }}>
                          {expanded === item.label || isParentActive(item) ? <ChevronDownIcon /> : <ChevronRightIcon />}
                        </span>
                      </button>
                      {(expanded === item.label || isParentActive(item)) && (
                        <div className="sidebar-sub">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`sidebar-item${isActive(child.href) ? ' active' : ''}`}
                              onClick={onClose}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`sidebar-item${isActive(item.href) ? ' active' : ''}`}
                      onClick={onClose}
                    >
                      <span className="sidebar-icon">{item.icon}</span>
                      {item.label}
                      {item.badge && <span className="sidebar-badge">{item.badge}</span>}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="profile-trigger" ref={profileRef}>
            <div className="sidebar-user" onClick={() => setProfileOpen((v) => !v)}>
              <div className="sidebar-avatar">JD</div>
              <div className="sidebar-user-info">
                <div className="sidebar-user-name">John Doe</div>
                <div className="sidebar-user-role">Admin</div>
              </div>
            </div>
            {profileOpen && (
              <div className="profile-dropdown profile-dropdown-bottom">
                <div className="profile-dd-header">
                  <div className="profile-dd-name">John Doe</div>
                  <div className="profile-dd-email">john@handl.ai</div>
                </div>
                <div className="profile-dd-items">
                  <Link href="/app/settings" className="profile-dd-item" onClick={() => { setProfileOpen(false); onClose(); }}>
                    <UserIcon /> Account
                  </Link>
                  <Link href="/app/settings/agent" className="profile-dd-item" onClick={() => { setProfileOpen(false); onClose(); }}>
                    <SparklesIcon /> AI Agent
                  </Link>
                  <div className="profile-dd-sep" />
                  <button className="profile-dd-item danger" onClick={() => { setProfileOpen(false); }}>
                    <LogOutIcon /> Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
