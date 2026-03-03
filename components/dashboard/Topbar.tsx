'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  SearchIcon, BellIcon, MenuIcon, XIcon,
  GridIcon, ChatIcon, ShoppingBagIcon, LinkIcon,
  BarChartIcon, GearIcon, PackageIcon, UserIcon, CartIcon, WarningIcon,
  SparklesIcon, LogOutIcon, RobotIcon,
} from '@/components/icons';
import ShortcutsModal from '@/components/ShortcutsModal';

interface TopbarProps {
  title: string;
  onMenuClick: () => void;
}

/* ── Search command palette data ────────────────── */
const searchItems = [
  { label: 'Dashboard', href: '/app/dashboard', icon: <GridIcon />, section: 'Pages' },
  { label: 'Conversations', href: '/app/conversations', icon: <ChatIcon />, section: 'Pages' },
  { label: 'Orders', href: '/app/orders', icon: <CartIcon />, section: 'Pages' },
  { label: 'Products', href: '/app/products', icon: <PackageIcon />, section: 'Pages' },
  { label: 'Integrations', href: '/app/integrations', icon: <LinkIcon />, section: 'Pages' },
  { label: 'Storefront', href: '/app/storefront', icon: <ShoppingBagIcon />, section: 'Pages' },
  { label: 'Reports', href: '/app/reports', icon: <BarChartIcon />, section: 'Pages' },
  { label: 'Settings', href: '/app/settings', icon: <GearIcon />, section: 'Pages' },
  { label: 'AI Agent', href: '/app/settings/agent', icon: <RobotIcon />, section: 'Pages' },
  { label: 'Developer', href: '/app/settings/developer', icon: <GearIcon />, section: 'Pages' },
];

/* ── Notification data ──────────────────────────── */
const notifications = [
  { id: 1, icon: <RobotIcon />, color: 'teal', title: 'AI resolved conversation', desc: 'AI agent handled order inquiry from Adebayo O. automatically.', time: '5 min ago', unread: true },
  { id: 2, icon: <CartIcon />, color: 'blue', title: 'New order received', desc: 'Order #ORD-2847 from WhatsApp — ₦24,500.', time: '12 min ago', unread: true },
  { id: 3, icon: <UserIcon />, color: 'orange', title: 'Escalation alert', desc: 'Ngozi I. escalated to human — payment complaint.', time: '18 min ago', unread: true },
  { id: 4, icon: <WarningIcon />, color: 'red', title: 'Payment failed', desc: 'Payment for order #ORD-2845 failed — retry needed.', time: '32 min ago', unread: false },
  { id: 5, icon: <PackageIcon />, color: 'teal', title: 'Low stock alert', desc: '"Ankara Print Dress" is below 5 units in stock.', time: '1 hr ago', unread: false },
];

export default function Topbar({ title, onMenuClick }: TopbarProps) {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const gPressedRef = useRef(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  /* Filter search results */
  const filteredItems = searchItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* Group by section */
  const groupedResults = filteredItems.reduce<Record<string, typeof searchItems>>((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  /* Keyboard shortcut: Cmd+K / Ctrl+K + G-key navigation + ? for shortcuts */
  useEffect(() => {
    let gTimer: ReturnType<typeof setTimeout>;
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore when typing in inputs
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement).isContentEditable) return;

      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
        return;
      }
      // Cmd+D / Ctrl+D to toggle dark mode
      if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault();
        const html = document.documentElement;
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('handl_theme', next);
        return;
      }
      if (e.key === '?') {
        e.preventDefault();
        setShortcutsOpen(true);
        return;
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setNotifOpen(false);
        setShortcutsOpen(false);
        return;
      }
      // G-key + second key navigation
      if (e.key === 'g' || e.key === 'G') {
        if (!gPressedRef.current) {
          gPressedRef.current = true;
          gTimer = setTimeout(() => { gPressedRef.current = false; }, 800);
          return;
        }
      }
      if (gPressedRef.current) {
        gPressedRef.current = false;
        clearTimeout(gTimer);
        const routes: Record<string, string> = {
          d: '/app/dashboard',
          c: '/app/conversations',
          o: '/app/orders',
          p: '/app/products',
          s: '/app/settings',
          r: '/app/reports',
          i: '/app/integrations',
        };
        const route = routes[e.key.toLowerCase()];
        if (route) {
          e.preventDefault();
          router.push(route);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => { window.removeEventListener('keydown', handleKeyDown); clearTimeout(gTimer); };
  }, [router]);

  /* Focus input when search opens */
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
      setSearchQuery('');
      setSelectedIndex(0);
    }
  }, [searchOpen]);

  /* Close notif dropdown on outside click */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    if (notifOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [notifOpen]);

  /* Close profile dropdown on outside click */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    if (profileOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [profileOpen]);

  /* Keyboard navigation in search */
  const handleSearchKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filteredItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault();
      router.push(filteredItems[selectedIndex].href);
      setSearchOpen(false);
    }
  }, [filteredItems, selectedIndex, router]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <>
      <header className="topbar">
        <div className="topbar-left">
          <button className="topbar-hamburger" onClick={onMenuClick}>
            <MenuIcon />
          </button>
          <span className="topbar-breadcrumb">{title}</span>
        </div>
        <div className="topbar-right">
          <button className="topbar-search" onClick={() => setSearchOpen(true)}>
            <SearchIcon />
            <span>Search…</span>
            <kbd>⌘K</kbd>
          </button>

          {/* Notifications */}
          <div ref={notifRef} style={{ position: 'relative' }}>
            <button className="topbar-btn" title="Notifications" onClick={() => setNotifOpen((v) => !v)}>
              <BellIcon />
              {unreadCount > 0 && <span className="notif-dot" />}
            </button>

            {notifOpen && (
              <div className="notif-dropdown">
                <div className="notif-dropdown-header">
                  <span className="notif-dropdown-title">Notifications</span>
                  <button className="notif-mark-read">Mark all read</button>
                </div>
                <div className="notif-dropdown-list">
                  {notifications.map((n) => (
                    <div key={n.id} className={`notif-item${n.unread ? ' unread' : ''}`}>
                      <div className={`notif-item-icon ${n.color}`}>{n.icon}</div>
                      <div className="notif-item-body">
                        <div className="notif-item-title">{n.title}</div>
                        <div className="notif-item-desc">{n.desc}</div>
                        <div className="notif-item-time">{n.time}</div>
                      </div>
                      {n.unread && <div className="notif-item-badge" />}
                    </div>
                  ))}
                </div>
                <div className="notif-dropdown-footer">
                  <Link href="/app/reports" className="notif-view-all" onClick={() => setNotifOpen(false)}>
                    View all activity
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="profile-trigger" ref={profileRef}>
            <div className="topbar-avatar" onClick={() => setProfileOpen((v) => !v)}>JD</div>
            {profileOpen && (
              <div className="profile-dropdown profile-dropdown-top">
                <div className="profile-dd-header">
                  <div className="profile-dd-name">John Doe</div>
                  <div className="profile-dd-email">john@handl.ai</div>
                </div>
                <div className="profile-dd-items">
                  <Link href="/app/settings" className="profile-dd-item" onClick={() => setProfileOpen(false)}>
                    <UserIcon /> Account
                  </Link>
                  <Link href="/app/settings/agent" className="profile-dd-item" onClick={() => setProfileOpen(false)}>
                    <SparklesIcon /> AI Agent
                  </Link>
                  <div className="profile-dd-sep" />
                  <button className="profile-dd-item danger" onClick={() => setProfileOpen(false)}>
                    <LogOutIcon /> Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Search Command Palette ───────────────── */}
      {searchOpen && (
        <div className="cmd-palette-overlay" onClick={() => setSearchOpen(false)}>
          <div className="cmd-palette" onClick={(e) => e.stopPropagation()}>
            <div className="cmd-palette-input-wrap">
              <SearchIcon className="cmd-palette-search-icon" />
              <input
                ref={searchInputRef}
                className="cmd-palette-input"
                placeholder="Search pages, features…"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setSelectedIndex(0); }}
                onKeyDown={handleSearchKeyDown}
              />
              <button className="cmd-palette-close" onClick={() => setSearchOpen(false)}>
                <XIcon />
              </button>
            </div>

            <div className="cmd-palette-results">
              {Object.keys(groupedResults).length === 0 && (
                <div className="cmd-palette-empty">No results found</div>
              )}
              {Object.entries(groupedResults).map(([section, items]) => (
                <div key={section}>
                  <div className="cmd-palette-section">{section}</div>
                  {items.map((item) => {
                    const globalIdx = filteredItems.indexOf(item);
                    return (
                      <button
                        key={item.href}
                        className={`cmd-palette-item${globalIdx === selectedIndex ? ' active' : ''}`}
                        onClick={() => { router.push(item.href); setSearchOpen(false); }}
                        onMouseEnter={() => setSelectedIndex(globalIdx)}
                      >
                        <span className="cmd-palette-item-icon">{item.icon}</span>
                        <span className="cmd-palette-item-label">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="cmd-palette-footer">
              <span><kbd>↑↓</kbd> Navigate</span>
              <span><kbd>↵</kbd> Open</span>
              <span><kbd>Esc</kbd> Close</span>
            </div>
          </div>
        </div>
      )}

      <ShortcutsModal open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
    </>
  );
}
