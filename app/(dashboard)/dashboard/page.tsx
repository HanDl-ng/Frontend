'use client';

import Link from 'next/link';

const kpis = [
  { label: 'Revenue (MTD)', value: '₦4.2M', delta: '+18%', up: true },
  { label: 'Active Automations', value: '24', delta: '+3', up: true },
  { label: 'Open Conversations', value: '38', delta: '-12%', up: false },
  { label: 'Orders Today', value: '156', delta: '+24%', up: true },
  { label: 'Avg Response Time', value: '1.2m', delta: '-8%', up: true },
];

const recentAutomations = [
  { name: 'Order Confirmation Flow', status: 'live' as const, runs: '2,340', success: '99.1%' },
  { name: 'Abandoned Cart Recovery', status: 'live' as const, runs: '890', success: '97.8%' },
  { name: 'Support Ticket Router', status: 'paused' as const, runs: '456', success: '95.2%' },
  { name: 'Delivery Notification', status: 'live' as const, runs: '1,120', success: '99.6%' },
];

const channels = [
  { name: 'WhatsApp Business', status: 'connected' as const, icon: '💬', messages: '3.2K' },
  { name: 'Instagram DM', status: 'connected' as const, icon: '📸', messages: '890' },
  { name: 'Web Chat Widget', status: 'connected' as const, icon: '🌐', messages: '1.1K' },
  { name: 'Email', status: 'disconnected' as const, icon: '✉️', messages: '—' },
];

const conversations = [
  { name: 'Adebayo O.', msg: 'When will my order arrive?', channel: 'WhatsApp', time: '2m ago', type: 'ai' as const },
  { name: 'Funke A.', msg: 'I want to return this item', channel: 'Instagram', time: '8m ago', type: 'human' as const },
  { name: 'Chidi E.', msg: 'Do you have size 42?', channel: 'Web Chat', time: '12m ago', type: 'ai' as const },
  { name: 'Ngozi I.', msg: 'Payment issue with my order', channel: 'WhatsApp', time: '15m ago', type: 'human' as const },
];

const activities = [
  { icon: '⚡', color: 'teal', text: 'Automation "Order Confirmation" processed 45 messages', time: '5 min ago' },
  { icon: '🛒', color: 'blue', text: 'New order #ORD-2847 received from WhatsApp', time: '12 min ago' },
  { icon: '👤', color: 'orange', text: 'Adebayo O. escalated to human agent', time: '18 min ago' },
  { icon: '📦', color: 'teal', text: 'Delivery #DEL-1923 marked as completed', time: '25 min ago' },
  { icon: '⚠️', color: 'red', text: 'Automation "Lead Qualifier" hit error rate > 5%', time: '32 min ago' },
];

export default function DashboardPage() {
  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Good morning, John 👋</h1>
            <p className="page-desc">Here&apos;s what&apos;s happening with your business today.</p>
          </div>
          <div className="page-actions">
            <Link href="/automations/builder" className="btn btn-teal">
              + New Automation
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-row">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="kpi-item">
            <div className="kpi-item-label">{kpi.label}</div>
            <div className="kpi-item-value">{kpi.value}</div>
            <div className={`kpi-item-delta ${kpi.up ? 'up' : 'down'}`}>
              {kpi.up ? '↑' : '↓'} {kpi.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Automations Health */}
        <div className="d-card">
          <div className="d-card-header">
            <span className="d-card-title">Automations Health</span>
            <Link href="/automations" className="d-card-action">View all →</Link>
          </div>
          <table className="d-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Runs</th>
                <th>Success</th>
              </tr>
            </thead>
            <tbody>
              {recentAutomations.map((a) => (
                <tr key={a.name}>
                  <td style={{ fontWeight: 600 }}>{a.name}</td>
                  <td>
                    <span className={`chip chip-${a.status}`}>
                      <span className="chip-dot" />
                      {a.status}
                    </span>
                  </td>
                  <td>{a.runs}</td>
                  <td>{a.success}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Channels Status */}
        <div className="d-card">
          <div className="d-card-header">
            <span className="d-card-title">Channels Status</span>
            <Link href="/channels" className="d-card-action">Manage →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {channels.map((ch) => (
              <div key={ch.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: 20 }}>{ch.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{ch.name}</div>
                  <span className={`chip chip-${ch.status}`}>
                    <span className="chip-dot" />{ch.status}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-f)' }}>{ch.messages} msgs</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Open Conversations */}
        <div className="d-card">
          <div className="d-card-header">
            <span className="d-card-title">Open Conversations</span>
            <Link href="/conversations" className="d-card-action">Inbox →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {conversations.map((c) => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: c.type === 'ai' ? 'var(--teal)' : '#5a7fd4',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700, flexShrink: 0
                }}>
                  {c.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{c.name}</span>
                    <span style={{ fontSize: 10, color: 'var(--ink-f)' }}>{c.time}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ink-f)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.msg}</div>
                </div>
                <span className={`chip chip-${c.type}`}>{c.type === 'ai' ? '🤖 AI' : '👤 Human'}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="d-card">
          <div className="d-card-header">
            <span className="d-card-title">Activity Timeline</span>
          </div>
          <div className="timeline">
            {activities.map((a, i) => (
              <div key={i} className="timeline-item">
                <div className={`timeline-dot ${a.color}`}>{a.icon}</div>
                <div className="timeline-body">
                  <div className="timeline-text">{a.text}</div>
                  <div className="timeline-time">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
