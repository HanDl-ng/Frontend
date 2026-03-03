'use client';

import { useState } from 'react';
import SettingsNavigation from './_components/SettingsNavigation';

export default function SettingsPage() {
  const [workspaceName, setWorkspaceName] = useState('HanDl Workspace');
  const [timezone, setTimezone] = useState('Africa/Lagos');
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('NGN');

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Business Profile</h1>
            <p className="page-desc">Your business identity and regional settings.</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-teal">Save Changes</button>
          </div>
        </div>
      </div>

      <div className="settings-layout">
        <SettingsNavigation />

        <div style={{ display: 'grid', gap: 24 }}>
          {/* Business Profile */}
          <div className="settings-section">
            <div className="settings-section-title">Business Details</div>
            <div className="d-form-group">
              <label className="d-form-label">Business Name</label>
              <input className="d-form-input" value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)} />
            </div>
            <div className="d-form-group">
              <label className="d-form-label">Business Description</label>
              <textarea className="d-form-input" rows={3} placeholder="Describe what your business does..." style={{ resize: 'vertical' }} />
            </div>
            <div className="d-form-group">
              <label className="d-form-label">Contact Email</label>
              <input className="d-form-input" type="email" placeholder="hello@yourbusiness.com" />
            </div>
            <div className="d-form-group">
              <label className="d-form-label">Phone Number</label>
              <input className="d-form-input" type="tel" placeholder="+234 800 000 0000" />
            </div>
          </div>

          {/* Regional */}
          <div className="settings-section">
            <div className="settings-section-title">Regional Settings</div>
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
            <div className="d-form-group">
              <label className="d-form-label">Default Currency</label>
              <select className="d-form-input d-form-select" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value="NGN">Nigerian Naira (₦)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="GBP">British Pound (£)</option>
                <option value="EUR">Euro (€)</option>
                <option value="GHS">Ghanaian Cedi (₵)</option>
                <option value="KES">Kenyan Shilling (KSh)</option>
              </select>
            </div>
          </div>

          {/* Notifications */}
          <div className="settings-section">
            <div className="settings-section-title">Notifications</div>
            <div className="d-form-group">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <label className="d-form-label" style={{ marginBottom: 0 }}>Email notifications</label>
                  <div className="d-form-hint">Receive email alerts for new orders and escalated conversations</div>
                </div>
                <button className="d-form-toggle on" />
              </div>
            </div>
            <div className="d-form-group">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <label className="d-form-label" style={{ marginBottom: 0 }}>Low stock alerts</label>
                  <div className="d-form-hint">Get notified when product stock falls below threshold</div>
                </div>
                <button className="d-form-toggle on" />
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
