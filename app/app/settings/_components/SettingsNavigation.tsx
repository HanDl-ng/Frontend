'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const settingsNav = [
  { label: 'Business', href: '/app/settings' },
  { label: 'AI Agent', href: '/app/settings/agent' },
  { label: 'Channels', href: '/app/settings/channels' },
  { label: 'Billing', href: '/app/settings/billing' },
  { label: 'API', href: '/app/settings/api' },
  { label: 'Appearance', href: '/app/settings/appearance' },
];

export default function SettingsNavigation() {
  const pathname = usePathname();
  return (
    <div className="settings-nav">
      {settingsNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`settings-nav-item${pathname === item.href ? ' active' : ''}`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
