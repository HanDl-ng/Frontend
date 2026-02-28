'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import '@/app/dashboard.css';
import './automations/automations.css';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/conversations': 'Conversations',
  '/automations': 'Automations',
  '/automations/builder': 'Automation Builder',
  '/store/catalog': 'Catalog',
  '/store/orders': 'Orders',
  '/store/deliveries': 'Deliveries',
  '/store/settings': 'Store Settings',
  '/channels': 'Channels',
  '/analytics': 'Analytics',
  '/billing': 'Billing',
  '/settings': 'Settings',
  '/settings/developer': 'Developer',
  '/settings/logs': 'Logs',
  '/help': 'Help & Support',
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
