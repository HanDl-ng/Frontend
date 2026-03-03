'use client';

import { useState } from 'react';
import { ShoppingBagIcon, GlobeIcon, RobotIcon } from '@/components/icons';
import './_components/styles.css';

export default function StorefrontPage() {
  const [enabled, setEnabled] = useState(true);
  const [storeName, setStoreName] = useState('My HanDl Store');
  const [storeUrl] = useState('https://store.handl.ng/my-store');

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Storefront</h1>
            <p className="page-desc">Your hosted storefront — optional for businesses without a custom website.</p>
          </div>
          <div className="page-actions">
            <a href={storeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <GlobeIcon /> Visit Store
            </a>
          </div>
        </div>
      </div>

      {/* Status Banner */}
      <div className="storefront-status-banner">
        <div className="storefront-status-left">
          <div className={`storefront-status-icon ${enabled ? 'active' : 'inactive'}`}>
            <ShoppingBagIcon />
          </div>
          <div>
            <div className="storefront-status-title">
              {enabled ? 'Storefront is live' : 'Storefront is offline'}
            </div>
            <div className="storefront-status-desc">
              {enabled ? storeUrl : 'Enable your storefront to start accepting orders from the web.'}
            </div>
          </div>
        </div>
        <button
          className={`btn ${enabled ? 'btn-ghost' : 'btn-teal'}`}
          onClick={() => setEnabled(!enabled)}
        >
          {enabled ? 'Disable' : 'Enable Storefront'}
        </button>
      </div>

      {/* Preview */}
      <div className="storefront-preview">
        <div className="storefront-preview-header">
          <span className="storefront-preview-title">Store Preview</span>
          <button className="btn btn-ghost" style={{ height: 32, fontSize: 12 }}>Customize</button>
        </div>
        <div className="storefront-preview-body">
          <div className="storefront-preview-mockup">
            <div className="storefront-mockup-nav">
              <div className="storefront-mockup-dot" />
              <div className="storefront-mockup-dot" />
              <div className="storefront-mockup-dot" />
            </div>
            <div className="storefront-mockup-content">
              {[1, 2, 3].map((i) => (
                <div key={i} className="storefront-mockup-card">
                  <div className="storefront-mockup-card-img" />
                  <div className="storefront-mockup-card-body">
                    <div className="storefront-mockup-card-line" />
                    <div className="storefront-mockup-card-line short" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="storefront-settings-grid">
        <div className="storefront-settings-section">
          <div className="storefront-settings-section-title">Branding</div>
          <div className="d-form-group">
            <label className="d-form-label">Store Name</label>
            <input className="d-form-input" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
          </div>
          <div className="d-form-group">
            <label className="d-form-label">Store URL</label>
            <input className="d-form-input" value={storeUrl} readOnly />
            <div className="d-form-hint">Custom domains coming soon</div>
          </div>
          <div className="d-form-group">
            <label className="d-form-label">Primary Color</label>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="color" defaultValue="#2e8b6e" style={{ width: 36, height: 36, border: 'none', borderRadius: 8, cursor: 'pointer' }} />
              <input className="d-form-input" defaultValue="#2e8b6e" style={{ width: 120 }} />
            </div>
          </div>
        </div>

        <div className="storefront-settings-section">
          <div className="storefront-settings-section-title">Features</div>
          <div className="ch-modal-toggle-row">
            <RobotIcon className="ch-modal-row-icon" />
            <span className="ch-modal-row-label">AI chat assistant</span>
            <div className="ch-modal-toggle on"><div className="ch-modal-toggle-knob" /></div>
          </div>
          <div className="d-form-hint" style={{ marginTop: 4, marginBottom: 16 }}>
            Your AI agent will be available to assist customers directly on the storefront.
          </div>
          <div className="ch-modal-toggle-row">
            <ShoppingBagIcon className="ch-modal-row-icon" />
            <span className="ch-modal-row-label">Product catalog</span>
            <div className="ch-modal-toggle on"><div className="ch-modal-toggle-knob" /></div>
          </div>
          <div className="d-form-hint" style={{ marginTop: 4 }}>
            Displays your products from the Products page with checkout functionality.
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn btn-teal">Save Changes</button>
      </div>
    </div>
  );
}
