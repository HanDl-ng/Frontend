'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  SearchIcon, BellIcon, MenuIcon, HelpCircleIcon, XIcon,
  GridIcon, ChatIcon, BoltIcon, ShoppingBagIcon, LinkIcon,
  BarChartIcon, CreditCardIcon, GearIcon, PackageIcon, UserIcon, CartIcon, WarningIcon,
  SparklesIcon, LogOutIcon,
} from '@/components/icons';

interface TopbarProps {
  title: string;
  onMenuClick: () => void;
}

/* ── Search command palette data ────────────────── */
const searchItems = [
  { label: 'Dashboard', href: '/dashboard', icon: <GridIcon />, section: 'Pages' },
  { label: 'Conversations', href: '/conversations', icon: <ChatIcon />, section: 'Pages' },
  { label: 'Automations', href: '/automations', icon: <BoltIcon />, section: 'Pages' },
  { label: 'Automation Builder', href: '/automations/builder', icon: <BoltIcon />, section: 'Pages' },
  { label: 'Catalog', href: '/store/catalog', icon: <ShoppingBagIcon />, section: 'Pages' },
  { label: 'Orders', href: '/store/orders', icon: <CartIcon />, section: 'Pages' },
  { label: 'Deliveries', href: '/store/deliveries', icon: <PackageIcon />, section: 'Pages' },
  { label: 'Channels', href: '/channels', icon: <LinkIcon />, section: 'Pages' },
  { label: 'Analytics', href: '/analytics', icon: <BarChartIcon />, section: 'Pages' },
  { label: 'Billing', href: '/billing', icon: <CreditCardIcon />, section: 'Pages' },
  { label: 'Settings', href: '/settings', icon: <GearIcon />, section: 'Pages' },
  { label: 'Developer', href: '/settings/developer', icon: <GearIcon />, section: 'Pages' },
  { label: 'Logs', href: '/settings/logs', icon: <GearIcon />, section: 'Pages' },
  { label: 'Help & Support', href: '/help', icon: <HelpCircleIcon />, section: 'Pages' },
];

/* ── Notification data ──────────────────────────── */
const notifications = [
  { id: 1, icon: <BoltIcon />, color: 'teal', title: 'Automation completed', desc: '"Order Confirmation" processed 45 messages successfully.', time: '5 min ago', unread: true },
  { id: 2, icon: <CartIcon />, color: 'blue', title: 'New order received', desc: 'Order #ORD-2847 from WhatsApp — ₦24,500.', time: '12 min ago', unread: true },
  { id: 3, icon: <UserIcon />, color: 'orange', title: 'Escalation alert', desc: 'Adebayo O. has been escalated to a human agent.', time: '18 min ago', unread: true },
  { id: 4, icon: <WarningIcon />, color: 'red', title: 'Automation error', desc: '"Lead Qualifier" hit error rate above 5%.', time: '32 min ago', unread: false },
  { id: 5, icon: <PackageIcon />, color: 'teal', title: 'Delivery completed', desc: 'Delivery #DEL-1923 marked as completed.', time: '1 hr ago', unread: false },
];

export default function Topbar({ title, onMenuClick }: TopbarProps) {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
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

  /* Keyboard shortcut: Cmd+K / Ctrl+K */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setNotifOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
                  <Link href="/settings/logs" className="notif-view-all" onClick={() => setNotifOpen(false)}>
                    View all activity
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Help */}
          <Link href="/help" className="topbar-btn" title="Help & Support">
            <HelpCircleIcon />
          </Link>

          <div className="profile-trigger" ref={profileRef}>
            <div className="topbar-avatar" onClick={() => setProfileOpen((v) => !v)}>JD</div>
            {profileOpen && (
              <div className="profile-dropdown profile-dropdown-top">
                <div className="profile-dd-header">
                  <div className="profile-dd-name">John Doe</div>
                  <div className="profile-dd-email">john@handl.ai</div>
                </div>
                <div className="profile-dd-items">
                  <Link href="/settings" className="profile-dd-item" onClick={() => setProfileOpen(false)}>
                    <UserIcon /> Account
                  </Link>
                  <Link href="/billing" className="profile-dd-item" onClick={() => setProfileOpen(false)}>
                    <CreditCardIcon /> Billing
                  </Link>
                  <Link href="/help" className="profile-dd-item" onClick={() => setProfileOpen(false)}>
                    <HelpCircleIcon /> Help & Support
                  </Link>
                  <div className="profile-dd-sep" />
                  <Link href="/billing" className="profile-dd-item upgrade" onClick={() => setProfileOpen(false)}>
                    <SparklesIcon /> Upgrade Plan
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
    </>
  );
}
