'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const settingsNav = [
  { label: 'General', href: '/settings' },
  { label: 'Developer', href: '/settings/developer' },
  { label: 'Logs', href: '/settings/logs' },
];

function SettingsNavigation() {
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

type LogLevel = 'info' | 'warning' | 'error' | 'success';

interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  source: string;
  message: string;
  details?: string;
}

const logs: LogEntry[] = [
  { id: '1', timestamp: '2024-07-15 10:28:34', level: 'info', source: 'Automation', message: 'Order Confirmation Flow triggered for ORD-2847', details: 'Processed in 1.2s' },
  { id: '2', timestamp: '2024-07-15 10:28:30', level: 'success', source: 'Webhook', message: 'Webhook delivered to https://api.myapp.com/webhooks/handl', details: 'Status: 200 OK' },
  { id: '3', timestamp: '2024-07-15 10:25:12', level: 'warning', source: 'AI', message: 'AI confidence below threshold (42%) for conversation #1847', details: 'Auto-escalated to human agent' },
  { id: '4', timestamp: '2024-07-15 10:23:45', level: 'info', source: 'Channel', message: 'New WhatsApp message from +234 801 234 5678' },
  { id: '5', timestamp: '2024-07-15 10:20:18', level: 'error', source: 'Automation', message: 'Lead Qualifier failed: timeout connecting to AI service', details: 'Retry scheduled in 30s' },
  { id: '6', timestamp: '2024-07-15 10:18:55', level: 'info', source: 'Auth', message: 'User amina@handl.ng signed in from 102.89.xx.xx' },
  { id: '7', timestamp: '2024-07-15 10:15:30', level: 'success', source: 'Payment', message: 'Payment of ₦45,000 received via Paystack for ORD-2847' },
  { id: '8', timestamp: '2024-07-15 10:12:00', level: 'info', source: 'System', message: 'Daily backup completed successfully', details: '14.2 MB backed up' },
  { id: '9', timestamp: '2024-07-15 10:08:22', level: 'warning', source: 'Usage', message: 'Message quota at 72% (7,240 / 10,000)' },
  { id: '10', timestamp: '2024-07-15 10:05:10', level: 'error', source: 'Channel', message: 'Instagram API rate limit exceeded', details: 'Requests paused for 60s' },
  { id: '11', timestamp: '2024-07-15 10:02:45', level: 'info', source: 'Automation', message: 'Weekly Report Generator completed — 3 recipients notified' },
  { id: '12', timestamp: '2024-07-15 10:00:00', level: 'success', source: 'System', message: 'System health check passed — all services operational' },
];

const levelStyles: Record<LogLevel, { color: string; bg: string; icon: string }> = {
  info: { color: '#5a7fd4', bg: 'rgba(90,127,212,.08)', icon: 'ℹ️' },
  warning: { color: '#c49400', bg: 'rgba(254,188,46,.08)', icon: '⚠️' },
  error: { color: '#e05252', bg: 'rgba(224,82,82,.08)', icon: '❌' },
  success: { color: '#2e8b6e', bg: 'rgba(46,139,110,.08)', icon: '✅' },
};

const levelFilters: LogLevel[] = ['info', 'warning', 'error', 'success'];
const sourceFilters = ['All', 'Automation', 'AI', 'Channel', 'Webhook', 'Auth', 'Payment', 'System', 'Usage'];

export default function LogsPage() {
  const [levelFilter, setLevelFilter] = useState<LogLevel | 'all'>('all');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  const filtered = logs.filter((l) => {
    if (levelFilter !== 'all' && l.level !== levelFilter) return false;
    if (sourceFilter !== 'All' && l.source !== sourceFilter) return false;
    if (search && !l.message.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Activity Logs</h1>
            <p className="page-desc">Monitor all system events and activities.</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-ghost">📥 Export Logs</button>
          </div>
        </div>
      </div>

      <div className="settings-layout">
        <SettingsNavigation />

        <div>
          <div className="filter-bar">
            <input
              className="filter-input"
              placeholder="Search logs…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className={`inbox-filter${levelFilter === 'all' ? ' active' : ''}`}
              onClick={() => setLevelFilter('all')}
            >
              All
            </button>
            {levelFilters.map((l) => (
              <button
                key={l}
                className={`inbox-filter${levelFilter === l ? ' active' : ''}`}
                onClick={() => setLevelFilter(l)}
                style={{ textTransform: 'capitalize' }}
              >
                {levelStyles[l].icon} {l}
              </button>
            ))}
            <select
              className="filter-select"
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
            >
              {sourceFilters.map((s) => (
                <option key={s} value={s}>{s === 'All' ? 'All Sources' : s}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {filtered.map((log) => {
              const style = levelStyles[log.level];
              const isExpanded = expandedLog === log.id;
              return (
                <div
                  key={log.id}
                  style={{
                    background: '#fff',
                    border: '1px solid var(--border)',
                    borderRadius: 10,
                    padding: '12px 16px',
                    cursor: log.details ? 'pointer' : 'default',
                    transition: 'all .15s',
                    borderLeftWidth: 3,
                    borderLeftColor: style.color,
                  }}
                  onClick={() => log.details && setExpandedLog(isExpanded ? null : log.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 14 }}>{style.icon}</span>
                    <code style={{ fontSize: 11, color: 'var(--ink-f)', fontFamily: 'monospace', flexShrink: 0 }}>
                      {log.timestamp}
                    </code>
                    <span className="chip" style={{ background: style.bg, color: style.color, fontSize: 10, textTransform: 'capitalize' }}>
                      {log.source}
                    </span>
                    <span style={{ fontSize: 13, color: 'var(--ink)', flex: 1 }}>{log.message}</span>
                    {log.details && (
                      <span style={{ fontSize: 10, color: 'var(--ink-f)' }}>{isExpanded ? '▴' : '▾'}</span>
                    )}
                  </div>
                  {isExpanded && log.details && (
                    <div style={{
                      marginTop: 10,
                      padding: '10px 14px',
                      background: 'var(--paper)',
                      borderRadius: 8,
                      fontSize: 12,
                      color: 'var(--ink-m)',
                      fontFamily: 'monospace',
                    }}>
                      {log.details}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="empty-state">
              <span className="empty-state-icon">📋</span>
              <div className="empty-state-title">No logs found</div>
              <div className="empty-state-desc">Try adjusting your filters to see more results.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
