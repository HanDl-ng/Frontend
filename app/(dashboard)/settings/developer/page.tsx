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

const apiKeys = [
  { name: 'Production Key', key: 'hndl_live_sk_...7f3a', created: 'Jun 15, 2024', lastUsed: '2 min ago' },
  { name: 'Test Key', key: 'hndl_test_sk_...b2c1', created: 'May 20, 2024', lastUsed: '1 day ago' },
];

const webhooks = [
  { url: 'https://api.myapp.com/webhooks/handl', events: ['order.created', 'message.received'], status: 'active' as const, lastTriggered: '5 min ago' },
  { url: 'https://hooks.zapier.com/hooks/...', events: ['order.shipped'], status: 'active' as const, lastTriggered: '2 hr ago' },
];

export default function DeveloperSettingsPage() {
  const [showCreateKey, setShowCreateKey] = useState(false);
  const [showAddWebhook, setShowAddWebhook] = useState(false);

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Developer</h1>
            <p className="page-desc">API keys, webhooks, and developer tools.</p>
          </div>
        </div>
      </div>

      <div className="settings-layout">
        <SettingsNavigation />

        <div style={{ display: 'grid', gap: 24 }}>
          {/* API Keys */}
          <div className="settings-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div className="settings-section-title" style={{ margin: 0 }}>API Keys</div>
              <button className="btn btn-teal" style={{ height: 36, fontSize: 13 }} onClick={() => setShowCreateKey(true)}>
                + Create Key
              </button>
            </div>
            <div className="table-wrap">
              <table className="d-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Key</th>
                    <th>Created</th>
                    <th>Last Used</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {apiKeys.map((k) => (
                    <tr key={k.key}>
                      <td style={{ fontWeight: 600 }}>{k.name}</td>
                      <td>
                        <code style={{ fontSize: 12, background: 'var(--paper)', padding: '2px 8px', borderRadius: 4, fontFamily: 'monospace' }}>
                          {k.key}
                        </code>
                      </td>
                      <td style={{ fontSize: 12, color: 'var(--ink-f)' }}>{k.created}</td>
                      <td style={{ fontSize: 12, color: 'var(--ink-f)' }}>{k.lastUsed}</td>
                      <td>
                        <button className="d-card-action" style={{ color: '#e05252' }}>Revoke</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Webhooks */}
          <div className="settings-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div className="settings-section-title" style={{ margin: 0 }}>Webhooks</div>
              <button className="btn btn-ghost" style={{ height: 36, fontSize: 13 }} onClick={() => setShowAddWebhook(true)}>
                + Add Webhook
              </button>
            </div>
            {webhooks.map((wh, i) => (
              <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 16, marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <code style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--ink)', wordBreak: 'break-all' }}>
                    {wh.url}
                  </code>
                  <span className="chip chip-live"><span className="chip-dot" />{wh.status}</span>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                  {wh.events.map((ev) => (
                    <span key={ev} className="chip chip-draft" style={{ fontSize: 10 }}>
                      {ev}
                    </span>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: 'var(--ink-f)' }}>Last triggered: {wh.lastTriggered}</div>
              </div>
            ))}
          </div>

          {/* API Reference */}
          <div className="settings-section">
            <div className="settings-section-title">API Reference</div>
            <div style={{ fontSize: 13, color: 'var(--ink-m)', lineHeight: 1.6, marginBottom: 16 }}>
              The HanDl API allows you to programmatically manage conversations, orders, contacts, and automations.
            </div>
            <div style={{ background: 'var(--ink)', borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', marginBottom: 8 }}>Base URL</div>
              <code style={{ fontSize: 13, color: 'var(--teal-l)', fontFamily: 'monospace' }}>
                https://api.handl.ng/v1
              </code>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
              {[
                { method: 'GET', path: '/conversations', desc: 'List conversations' },
                { method: 'POST', path: '/messages', desc: 'Send a message' },
                { method: 'GET', path: '/orders', desc: 'List orders' },
                { method: 'POST', path: '/automations/:id/run', desc: 'Trigger automation' },
              ].map((ep) => (
                <div key={ep.path} style={{ border: '1px solid var(--border)', borderRadius: 10, padding: 12 }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, fontFamily: 'monospace',
                      padding: '1px 6px', borderRadius: 4,
                      background: ep.method === 'GET' ? 'rgba(46,139,110,.1)' : 'rgba(90,127,212,.1)',
                      color: ep.method === 'GET' ? 'var(--teal)' : '#5a7fd4',
                    }}>
                      {ep.method}
                    </span>
                    <code style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ink)' }}>{ep.path}</code>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--ink-f)' }}>{ep.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Key Modal */}
      <div className={`slide-over-overlay${showCreateKey ? ' open' : ''}`}>
        <div className="slide-over">
          <div className="slide-over-header">
            <span className="slide-over-title">Create API Key</span>
            <button className="slide-over-close" onClick={() => setShowCreateKey(false)}>✕</button>
          </div>
          <div className="slide-over-body">
            <div className="d-form-group">
              <label className="d-form-label">Key Name</label>
              <input className="d-form-input" placeholder="e.g., Production Key" />
            </div>
            <div className="d-form-group">
              <label className="d-form-label">Environment</label>
              <select className="d-form-input d-form-select">
                <option>Live</option>
                <option>Test</option>
              </select>
            </div>
          </div>
          <div className="slide-over-footer">
            <button className="btn btn-ghost" onClick={() => setShowCreateKey(false)}>Cancel</button>
            <button className="btn btn-teal" onClick={() => setShowCreateKey(false)}>Create Key</button>
          </div>
        </div>
      </div>

      {/* Add Webhook Modal */}
      <div className={`slide-over-overlay${showAddWebhook ? ' open' : ''}`}>
        <div className="slide-over">
          <div className="slide-over-header">
            <span className="slide-over-title">Add Webhook</span>
            <button className="slide-over-close" onClick={() => setShowAddWebhook(false)}>✕</button>
          </div>
          <div className="slide-over-body">
            <div className="d-form-group">
              <label className="d-form-label">Endpoint URL</label>
              <input className="d-form-input" placeholder="https://your-app.com/webhooks" />
            </div>
            <div className="d-form-group">
              <label className="d-form-label">Events</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['order.created', 'order.shipped', 'order.delivered', 'message.received', 'message.sent', 'contact.created'].map((evt) => (
                  <label key={evt} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
                    <input type="checkbox" />
                    <code style={{ fontFamily: 'monospace', fontSize: 12 }}>{evt}</code>
                  </label>
                ))}
              </div>
            </div>
            <div className="d-form-group">
              <label className="d-form-label">Secret (optional)</label>
              <input className="d-form-input" type="password" placeholder="Signing secret" />
              <div className="d-form-hint">Used to verify webhook signatures</div>
            </div>
          </div>
          <div className="slide-over-footer">
            <button className="btn btn-ghost" onClick={() => setShowAddWebhook(false)}>Cancel</button>
            <button className="btn btn-teal" onClick={() => setShowAddWebhook(false)}>Add Webhook</button>
          </div>
        </div>
      </div>
    </div>
  );
}
