'use client';

import Link from 'next/link';
import { useState } from 'react';
import SettingsNavigation from '../_components/SettingsNavigation';

export default function StorefrontSettingsPage() {
  const [storeName, setStoreName] = useState('My HanDl Store');
  const [storeUrlSlug, setStoreUrlSlug] = useState('my-store');
  const [themeColor, setThemeColor] = useState('#2e8b6e');

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Storefront Settings</h1>
            <p className="page-desc">Control how your public storefront looks and behaves.</p>
          </div>
          <div className="page-actions" style={{ display: 'flex', gap: 8 }}>
            <Link href="/app/storefront" className="btn btn-ghost">Back to Storefront</Link>
            <button className="btn btn-teal">Save Changes</button>
          </div>
        </div>
      </div>

      <div className="settings-layout">
        <SettingsNavigation />

        <div style={{ display: 'grid', gap: 24 }}>
          <div className="settings-section">
            <div className="settings-section-title">Brand & Identity</div>
            <div className="d-form-group">
              <label className="d-form-label">Store Name</label>
              <input className="d-form-input" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
            </div>
            <div className="d-form-group">
              <label className="d-form-label">Store URL Slug</label>
              <input className="d-form-input" value={storeUrlSlug} onChange={(e) => setStoreUrlSlug(e.target.value)} />
              <div className="d-form-hint">Your URL: https://store.handl.ng/{storeUrlSlug}</div>
            </div>
            <div className="d-form-group">
              <label className="d-form-label">Accent Color</label>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <input
                  type="color"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  style={{ width: 40, height: 40, border: '1px solid var(--border)', borderRadius: 0, cursor: 'pointer' }}
                />
                <input className="d-form-input" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} style={{ maxWidth: 140 }} />
              </div>
            </div>
          </div>

          <div className="settings-section">
            <div className="settings-section-title">Storefront Behavior</div>
            <div className="d-form-group">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <label className="d-form-label" style={{ marginBottom: 0 }}>Enable AI assistant</label>
                  <div className="d-form-hint">Let visitors ask questions and place orders through chat.</div>
                </div>
                <button className="d-form-toggle on" />
              </div>
            </div>
            <div className="d-form-group">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <label className="d-form-label" style={{ marginBottom: 0 }}>Show out-of-stock products</label>
                  <div className="d-form-hint">Display unavailable items with restock notices.</div>
                </div>
                <button className="d-form-toggle" />
              </div>
            </div>
            <div className="d-form-group">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <label className="d-form-label" style={{ marginBottom: 0 }}>Require phone verification</label>
                  <div className="d-form-hint">Request OTP before checkout for fraud protection.</div>
                </div>
                <button className="d-form-toggle on" />
              </div>
            </div>
          </div>

          <div className="settings-section">
            <div className="settings-section-title">Checkout Experience</div>
            <div className="d-form-group">
              <label className="d-form-label">Default fulfillment mode</label>
              <select className="d-form-input d-form-select" defaultValue="delivery">
                <option value="delivery">Delivery</option>
                <option value="pickup">Pickup</option>
                <option value="both">Both delivery and pickup</option>
              </select>
            </div>
            <div className="d-form-group">
              <label className="d-form-label">Customer instructions placeholder</label>
              <input className="d-form-input" defaultValue="Any notes for your order?" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
