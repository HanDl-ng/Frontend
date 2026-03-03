'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import './docs.css';

const navSections = [
  {
    title: 'Getting Started',
    items: [
      { href: '/docs', label: 'Overview', icon: '📖' },
      { href: '/docs/authentication', label: 'Authentication', icon: '🔑' },
    ],
  },
  {
    title: 'Core Resources',
    items: [
      { href: '/docs/messages', label: 'Messages', icon: '💬' },
      { href: '/docs/orders', label: 'Orders', icon: '📦' },
      { href: '/docs/products', label: 'Products', icon: '🏷️' },
      { href: '/docs/payments', label: 'Payments', icon: '💳' },
    ],
  },
  {
    title: 'Platform',
    items: [
      { href: '/docs/webhooks', label: 'Webhooks', icon: '🔔' },
      { href: '/docs/errors', label: 'Errors', icon: '⚠️' },
    ],
  },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="docs-layout">
      {/* Sidebar */}
      <aside className="docs-sidebar">
        <Link href="/docs" className="docs-sidebar-logo">
          <span>HanDl</span>
          <span>Docs</span>
        </Link>

        {navSections.map((section) => (
          <div key={section.title} className="docs-nav-section">
            <div className="docs-nav-section-title">{section.title}</div>
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`docs-nav-link ${pathname === item.href ? 'active' : ''}`}
              >
                <span style={{ fontSize: 14 }}>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        ))}

        <div className="docs-sidebar-footer">
          <a href="https://handl-ng.com" target="_blank" rel="noreferrer">← Back to HanDl</a>
          <a href="/app/settings/api">Dashboard API Keys</a>
          <a href="/contact">Contact Support</a>
        </div>
      </aside>

      {/* Content */}
      <main className="docs-main">
        {children}
      </main>
    </div>
  );
}
