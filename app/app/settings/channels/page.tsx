'use client';

import { useState } from 'react';
import SettingsNavigation from '../_components/SettingsNavigation';

const channelConfigs = [
  {
    name: 'WhatsApp Business',
    icon: '💬',
    status: 'connected' as const,
    details: 'Connected to +234 801 234 5678',
    settings: [
      { label: 'Auto-reply when offline', enabled: true },
      { label: 'AI agent handles first response', enabled: true },
      { label: 'Send order confirmations', enabled: true },
    ],
  },
  {
    name: 'Web Chat',
    icon: '🌐',
    status: 'connected' as const,
    details: 'Widget on app.handl.io',
    settings: [
      { label: 'Show typing indicator', enabled: true },
      { label: 'Collect email before chat', enabled: false },
      { label: 'AI agent handles first response', enabled: true },
    ],
  },
  {
    name: 'Email',
    icon: '📧',
    status: 'disconnected' as const,
    details: 'Not connected',
    settings: [],
  },
];

export default function ChannelSettingsPage() {
  const [configs] = useState(channelConfigs);

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Channel Config</h1>
            <p className="page-desc">Manage per-channel settings and behavior.</p>
          </div>
        </div>
      </div>

      <div className="settings-layout">
        <SettingsNavigation />

        <div style={{ display: 'grid', gap: 24 }}>
          {configs.map((ch) => (
            <div className="settings-section" key={ch.name}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, background: 'var(--paper)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                  }}>
                    {ch.icon}
                  </div>
                  <div>
                    <div className="settings-section-title" style={{ margin: 0 }}>{ch.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-f)' }}>{ch.details}</div>
                  </div>
                </div>
                <span className={`chip ${ch.status === 'connected' ? 'chip-live' : 'chip-error'}`}>
                  <span className="chip-dot" />
                  {ch.status}
                </span>
              </div>

              {ch.settings.length > 0 ? (
                <div style={{ display: 'grid', gap: 12 }}>
                  {ch.settings.map((s) => (
                    <div className="d-form-group" key={s.label} style={{ margin: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <label className="d-form-label" style={{ marginBottom: 0, fontSize: 13 }}>{s.label}</label>
                        <button className={`d-form-toggle${s.enabled ? ' on' : ''}`} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: 20, color: 'var(--ink-f)', fontSize: 13 }}>
                  Connect this channel in{' '}
                  <a href="/app/integrations" style={{ color: 'var(--teal)', fontWeight: 600 }}>Integrations</a>
                  {' '}to configure settings.
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
