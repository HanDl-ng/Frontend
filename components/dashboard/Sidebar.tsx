'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type ReactNode } from 'react';
import {
  GridIcon, ChatIcon, BoltIcon, ShoppingBagIcon,
  LinkIcon, BarChartIcon, CreditCardIcon, GearIcon,
  ChevronDownIcon, ChevronRightIcon,
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
      { label: 'Dashboard', href: '/dashboard', icon: <GridIcon /> },
      { label: 'Conversations', href: '/conversations', icon: <ChatIcon />, badge: 12 },
      { label: 'Automations', href: '/automations', icon: <BoltIcon /> },
    ],
  },
  {
    label: 'Commerce',
    items: [
      {
        label: 'Storefront',
        href: '/store/catalog',
        icon: <ShoppingBagIcon />,
        children: [
          { label: 'Catalog', href: '/store/catalog' },
          { label: 'Orders', href: '/store/orders' },
          { label: 'Deliveries', href: '/store/deliveries' },
          { label: 'Settings', href: '/store/settings' },
        ],
      },
    ],
  },
  {
    label: 'Connect',
    items: [
      { label: 'Channels', href: '/channels', icon: <LinkIcon /> },
      { label: 'Analytics', href: '/analytics', icon: <BarChartIcon /> },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { label: 'Billing', href: '/billing', icon: <CreditCardIcon /> },
      {
        label: 'Settings',
        href: '/settings',
        icon: <GearIcon />,
        children: [
          { label: 'General', href: '/settings' },
          { label: 'Developer', href: '/settings/developer' },
          { label: 'Logs', href: '/settings/logs' },
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

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
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
          <div className="sidebar-user">
            <div className="sidebar-avatar">JD</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">John Doe</div>
              <div className="sidebar-user-role">Admin</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
