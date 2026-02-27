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

export default function SettingsPage() {
  const [workspaceName, setWorkspaceName] = useState('HanDl Workspace');
  const [timezone, setTimezone] = useState('Africa/Lagos');
  const [language, setLanguage] = useState('en');
  const [aiPersonality, setAiPersonality] = useState('professional');
  const [autoEscalate, setAutoEscalate] = useState(true);
  const [escalateThreshold, setEscalateThreshold] = useState('3');

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Settings</h1>
            <p className="page-desc">Configure your workspace and AI behavior.</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-teal">Save Changes</button>
          </div>
        </div>
      </div>

      <div className="settings-layout">
        <SettingsNavigation />

        <div style={{ display: 'grid', gap: 24 }}>
          {/* Workspace */}
          <div className="settings-section">
            <div className="settings-section-title">Workspace</div>
            <div className="d-form-group">
              <label className="d-form-label">Workspace Name</label>
              <input className="d-form-input" value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="d-form-group">
                <label className="d-form-label">Timezone</label>
                <select className="d-form-input d-form-select" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                  <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                  <option value="America/New_York">America/New_York (EST)</option>
                </select>
              </div>
              <div className="d-form-group">
                <label className="d-form-label">Language</label>
                <select className="d-form-input d-form-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="yo">Yoruba</option>
                  <option value="ig">Igbo</option>
                  <option value="ha">Hausa</option>
                </select>
              </div>
            </div>
          </div>

          {/* AI Configuration */}
          <div className="settings-section">
            <div className="settings-section-title">AI Configuration</div>
            <div className="d-form-group">
              <label className="d-form-label">AI Personality</label>
              <select className="d-form-input d-form-select" value={aiPersonality} onChange={(e) => setAiPersonality(e.target.value)}>
                <option value="professional">Professional — Formal, precise responses</option>
                <option value="friendly">Friendly — Warm, casual tone</option>
                <option value="concise">Concise — Short, direct answers</option>
              </select>
            </div>
            <div className="d-form-group">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <label className="d-form-label" style={{ marginBottom: 0 }}>Auto-escalate to human</label>
                  <div className="d-form-hint">Automatically route complex queries to human agents</div>
                </div>
                <button className={`d-form-toggle${autoEscalate ? ' on' : ''}`} onClick={() => setAutoEscalate(!autoEscalate)} />
              </div>
            </div>
            {autoEscalate && (
              <div className="d-form-group">
                <label className="d-form-label">Escalation after failed attempts</label>
                <input className="d-form-input" type="number" min="1" max="10" value={escalateThreshold} onChange={(e) => setEscalateThreshold(e.target.value)} />
                <div className="d-form-hint">Number of AI attempts before escalating to a human agent</div>
              </div>
            )}
            <div className="d-form-group">
              <label className="d-form-label">Knowledge Base</label>
              <div style={{
                border: '2px dashed var(--border)', borderRadius: 12, padding: 24,
                textAlign: 'center', color: 'var(--ink-f)', fontSize: 13, cursor: 'pointer',
              }}>
                📄 Upload documents to train your AI (PDF, DOCX, TXT)<br />
                <span style={{ fontSize: 11, marginTop: 4, display: 'inline-block' }}>Max 10MB per file</span>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="settings-section" style={{ borderColor: 'rgba(224,82,82,.2)' }}>
            <div className="settings-section-title" style={{ color: '#e05252' }}>Danger Zone</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>Delete Workspace</div>
                <div style={{ fontSize: 12, color: 'var(--ink-f)' }}>Permanently delete this workspace and all data.</div>
              </div>
              <button className="btn btn-ghost" style={{ color: '#e05252', borderColor: 'rgba(224,82,82,.3)' }}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
