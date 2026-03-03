'use client';

import { useState } from 'react';
import SettingsNavigation from '../_components/SettingsNavigation';

export default function AppearanceSettingsPage() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [accentColor, setAccentColor] = useState('#2E8B6E');
  const [density, setDensity] = useState<'comfortable' | 'compact'>('comfortable');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const themes: { id: 'light' | 'dark' | 'system'; label: string; icon: string }[] = [
    { id: 'light', label: 'Light', icon: '☀️' },
    { id: 'dark', label: 'Dark', icon: '🌙' },
    { id: 'system', label: 'System', icon: '💻' },
  ];

  const accents = [
    { color: '#2E8B6E', label: 'Teal' },
    { color: '#3B82F6', label: 'Blue' },
    { color: '#8B5CF6', label: 'Purple' },
    { color: '#EC4899', label: 'Pink' },
    { color: '#F59E0B', label: 'Amber' },
    { color: '#EF4444', label: 'Red' },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Appearance</h1>
            <p className="page-desc">Theme, layout, and visual preferences.</p>
          </div>
        </div>
      </div>

      <div className="settings-layout">
        <SettingsNavigation />

        <div style={{ display: 'grid', gap: 24 }}>
          {/* Theme */}
          <div className="settings-section">
            <div className="settings-section-title">Theme</div>
            <p style={{ fontSize: 13, color: 'var(--ink-f)', marginBottom: 16 }}>
              Choose how HanDl looks for you. This only affects your view.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  style={{
                    padding: '20px 16px',
                    borderRadius: 10,
                    border: theme === t.id ? '2px solid var(--teal)' : '1.5px solid var(--border)',
                    background: theme === t.id ? 'rgba(46,139,110,.04)' : 'transparent',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all .15s',
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{t.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{t.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Accent Color */}
          <div className="settings-section">
            <div className="settings-section-title">Accent Color</div>
            <p style={{ fontSize: 13, color: 'var(--ink-f)', marginBottom: 16 }}>
              Primary color used for active states, buttons, and highlights.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {accents.map((a) => (
                <button
                  key={a.color}
                  onClick={() => setAccentColor(a.color)}
                  title={a.label}
                  style={{
                    width: 40, height: 40, borderRadius: '50%', border: 'none', cursor: 'pointer',
                    background: a.color, position: 'relative',
                    boxShadow: accentColor === a.color ? `0 0 0 3px var(--paper), 0 0 0 5px ${a.color}` : 'none',
                    transition: 'box-shadow .15s',
                  }}
                >
                  {accentColor === a.color && (
                    <span style={{ color: '#fff', fontSize: 18, lineHeight: 1 }}>✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Density */}
          <div className="settings-section">
            <div className="settings-section-title">Layout Density</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
              {([
                { id: 'comfortable' as const, label: 'Comfortable', desc: 'More spacing, easier to scan' },
                { id: 'compact' as const, label: 'Compact', desc: 'Denser layout, more on screen' },
              ]).map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDensity(d.id)}
                  style={{
                    padding: 16, borderRadius: 10, cursor: 'pointer', textAlign: 'left',
                    border: density === d.id ? '2px solid var(--teal)' : '1.5px solid var(--border)',
                    background: density === d.id ? 'rgba(46,139,110,.04)' : 'transparent',
                    transition: 'all .15s',
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{d.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-f)', marginTop: 4 }}>{d.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="settings-section">
            <div className="settings-section-title">Sidebar</div>
            <div className="settings-row">
              <div>
                <div className="settings-label">Collapse sidebar by default</div>
                <div className="settings-desc">Only show icons until you hover</div>
              </div>
              <label className="toggle">
                <input type="checkbox" checked={sidebarCollapsed} onChange={e => setSidebarCollapsed(e.target.checked)} />
                <span className="toggle-slider" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
