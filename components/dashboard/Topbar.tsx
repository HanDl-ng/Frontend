'use client';

import { SearchIcon, BellIcon, MenuIcon } from '@/components/icons';

interface TopbarProps {
  title: string;
  onMenuClick: () => void;
}

export default function Topbar({ title, onMenuClick }: TopbarProps) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="topbar-hamburger" onClick={onMenuClick}>
          <MenuIcon />
        </button>
        <span className="topbar-breadcrumb">{title}</span>
      </div>
      <div className="topbar-right">
        <button className="topbar-search">
          <SearchIcon />
          <span>Search…</span>
          <kbd>⌘K</kbd>
        </button>
        <button className="topbar-btn" title="Notifications">
          <BellIcon />
          <span className="notif-dot" />
        </button>
        <button className="topbar-btn" title="Help">?</button>
        <div className="topbar-avatar">JD</div>
      </div>
    </header>
  );
}
