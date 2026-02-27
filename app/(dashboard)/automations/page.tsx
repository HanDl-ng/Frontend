'use client';

import Link from 'next/link';
import { useState } from 'react';

const automations = [
  {
    id: '1', name: 'Order Confirmation Flow', desc: 'Sends order confirmation with tracking details via WhatsApp and email',
    status: 'live' as const, icon: '🛒', iconType: 'commerce', runs: '2,340', success: '99.1%',
    lastRun: '2 min ago', trigger: 'New Order Created',
  },
  {
    id: '2', name: 'Abandoned Cart Recovery', desc: 'Re-engages customers who left items in cart after 1 hour',
    status: 'live' as const, icon: '🛍', iconType: 'commerce', runs: '890', success: '97.8%',
    lastRun: '15 min ago', trigger: 'Cart Abandoned (1h)',
  },
  {
    id: '3', name: 'AI Support Router', desc: 'Routes incoming support queries to AI or human agents based on complexity',
    status: 'live' as const, icon: '🤖', iconType: 'ai', runs: '1,456', success: '95.2%',
    lastRun: '5 min ago', trigger: 'New Message Received',
  },
  {
    id: '4', name: 'Delivery Notification', desc: 'Sends real-time delivery updates to customers via their preferred channel',
    status: 'live' as const, icon: '📦', iconType: 'commerce', runs: '1,120', success: '99.6%',
    lastRun: '8 min ago', trigger: 'Delivery Status Changed',
  },
  {
    id: '5', name: 'Lead Qualifier', desc: 'Qualifies incoming leads with AI conversation and scores them',
    status: 'paused' as const, icon: '⚡', iconType: 'trigger', runs: '234', success: '92.3%',
    lastRun: '1 hour ago', trigger: 'New Contact Created',
  },
  {
    id: '6', name: 'Weekly Report Generator', desc: 'Generates and sends weekly performance reports to the team',
    status: 'live' as const, icon: '📊', iconType: 'ai', runs: '48', success: '100%',
    lastRun: '3 days ago', trigger: 'Scheduled (Every Monday)',
  },
  {
    id: '7', name: 'Return & Refund Handler', desc: 'Processes return requests with AI, creates tickets for approval',
    status: 'draft' as const, icon: '🔄', iconType: 'commerce', runs: '0', success: '—',
    lastRun: 'Never', trigger: 'Return Request',
  },
];

const statusOptions = ['All', 'Live', 'Paused', 'Draft'];

export default function AutomationsPage() {
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = automations.filter((a) => {
    if (statusFilter !== 'All' && a.status !== statusFilter.toLowerCase()) return false;
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Automations</h1>
            <p className="page-desc">Build and manage your business automation workflows.</p>
          </div>
          <div className="page-actions">
            <Link href="/automations/builder" className="btn btn-teal">
              + New Automation
            </Link>
          </div>
        </div>
      </div>

      <div className="filter-bar">
        <input
          className="filter-input"
          placeholder="Search automations…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {statusOptions.map((s) => (
          <button
            key={s}
            className={`inbox-filter${statusFilter === s ? ' active' : ''}`}
            onClick={() => setStatusFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="auto-list-grid">
        {filtered.map((a) => (
          <Link key={a.id} href="/automations/builder" style={{ textDecoration: 'none' }}>
            <div className="auto-list-card">
              <div className="auto-list-card-header">
                <div className={`auto-list-card-icon ${a.iconType}`}>{a.icon}</div>
                <span className={`chip chip-${a.status}`}>
                  <span className="chip-dot" />
                  {a.status}
                </span>
              </div>
              <div className="auto-list-card-name">{a.name}</div>
              <div className="auto-list-card-desc">{a.desc}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-f)', marginBottom: 10 }}>
                ⚡ {a.trigger}
              </div>
              <div className="auto-list-card-footer">
                <div className="auto-list-card-stats">
                  <span className="auto-list-card-stat">
                    <strong>{a.runs}</strong> runs
                  </span>
                  <span className="auto-list-card-stat">
                    <strong>{a.success}</strong> success
                  </span>
                </div>
                <span style={{ fontSize: 10, color: 'var(--ink-f)' }}>{a.lastRun}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
