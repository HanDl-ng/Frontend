'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import '@/app/dashboard.css';

const pageTitles: Record<string, string> = {
  '/app/dashboard': 'Dashboard',
  '/app/conversations': 'Conversations',
  '/app/orders': 'Orders',
  '/app/products': 'Products',
  '/app/integrations': 'Integrations',
  '/app/storefront': 'Storefront',
  '/app/reports': 'Reports',
  '/app/settings': 'Settings',
  '/app/settings/agent': 'AI Agent',
  '/app/settings/developer': 'Developer',
  '/app/settings/business': 'Business Profile',
  '/app/settings/channels': 'Channel Config',
  '/app/settings/billing': 'Billing & Usage',
  '/app/settings/api': 'API & Webhooks',
  '/app/settings/appearance': 'Appearance',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? 'HanDl';

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <Topbar title={title} onMenuClick={() => setSidebarOpen((v) => !v)} />
        {children}
      </div>
    </div>
  );
}
