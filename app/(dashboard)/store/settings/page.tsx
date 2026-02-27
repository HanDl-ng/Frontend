'use client';

import { useState } from 'react';

export default function StoreSettingsPage() {
  const [storeName, setStoreName] = useState('HanDl Store');
  const [currency, setCurrency] = useState('NGN');
  const [autoConfirm, setAutoConfirm] = useState(true);
  const [lowStockThreshold, setLowStockThreshold] = useState('5');
  const [taxRate, setTaxRate] = useState('7.5');

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Store Settings</h1>
            <p className="page-desc">Configure your storefront preferences.</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-teal">Save Changes</button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 24, maxWidth: 720 }}>
        {/* General */}
        <div className="settings-section">
          <div className="settings-section-title">General</div>
          <div className="d-form-group">
            <label className="d-form-label">Store Name</label>
            <input className="d-form-input" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="d-form-group">
              <label className="d-form-label">Currency</label>
              <select className="d-form-input d-form-select" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value="NGN">Nigerian Naira (₦)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="GBP">British Pound (£)</option>
                <option value="EUR">Euro (€)</option>
              </select>
            </div>
            <div className="d-form-group">
              <label className="d-form-label">Tax Rate (%)</label>
              <input className="d-form-input" type="number" step="0.1" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Order Settings */}
        <div className="settings-section">
          <div className="settings-section-title">Order Settings</div>
          <div className="d-form-group">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <label className="d-form-label" style={{ marginBottom: 0 }}>Auto-confirm orders</label>
                <div className="d-form-hint">Automatically confirm orders when payment is received</div>
              </div>
              <button className={`d-form-toggle${autoConfirm ? ' on' : ''}`} onClick={() => setAutoConfirm(!autoConfirm)} />
            </div>
          </div>
          <div className="d-form-group">
            <label className="d-form-label">Low Stock Alert Threshold</label>
            <input className="d-form-input" type="number" value={lowStockThreshold} onChange={(e) => setLowStockThreshold(e.target.value)} />
            <div className="d-form-hint">Get notified when stock drops below this level</div>
          </div>
        </div>

        {/* Notifications */}
        <div className="settings-section">
          <div className="settings-section-title">Notifications</div>
          <div className="d-form-group">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <label className="d-form-label" style={{ marginBottom: 0 }}>New order notification</label>
                <div className="d-form-hint">Send alert when a new order is placed</div>
              </div>
              <button className="d-form-toggle on" />
            </div>
          </div>
          <div className="d-form-group">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <label className="d-form-label" style={{ marginBottom: 0 }}>Low stock notification</label>
                <div className="d-form-hint">Alert when product stock is low</div>
              </div>
              <button className="d-form-toggle on" />
            </div>
          </div>
          <div className="d-form-group">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <label className="d-form-label" style={{ marginBottom: 0 }}>Return request notification</label>
                <div className="d-form-hint">Alert on new return or refund requests</div>
              </div>
              <button className="d-form-toggle on" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
