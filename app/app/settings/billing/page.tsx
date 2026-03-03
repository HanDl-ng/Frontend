'use client';

import SettingsNavigation from '../_components/SettingsNavigation';

const currentPlan = {
  name: 'Growth',
  price: '₦29,000',
  period: '/month + usage',
  renewsOn: 'Jul 1, 2025',
};

const usageSummary = [
  { label: 'Messages', used: 3420, limit: 5000, unit: 'messages' },
  { label: 'AI Responses', used: 2870, limit: 4000, unit: 'responses' },
  { label: 'Orders Processed', used: 187, limit: 500, unit: 'orders' },
  { label: 'API Calls', used: 1200, limit: 10000, unit: 'calls' },
];

const invoices = [
  { date: 'Jun 1, 2025', amount: '₦29,000', status: 'Paid' },
  { date: 'May 1, 2025', amount: '₦29,000', status: 'Paid' },
  { date: 'Apr 1, 2025', amount: '₦24,500', status: 'Paid' },
];

export default function BillingSettingsPage() {
  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Billing & Usage</h1>
            <p className="page-desc">Your plan, unit consumption, and payment history.</p>
          </div>
        </div>
      </div>

      <div className="settings-layout">
        <SettingsNavigation />

        <div style={{ display: 'grid', gap: 24 }}>
          {/* Current Plan */}
          <div className="settings-section" style={{ background: 'rgba(46,139,110,.03)', borderColor: 'rgba(46,139,110,.15)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <div className="settings-section-title" style={{ margin: 0 }}>Current Plan</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 8 }}>
                  <span style={{ fontSize: 28, fontWeight: 800, fontFamily: "'Syne', sans-serif", color: 'var(--ink)' }}>{currentPlan.price}</span>
                  <span style={{ fontSize: 13, color: 'var(--ink-f)' }}>{currentPlan.period}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-f)', marginTop: 4 }}>
                  <span className="chip chip-live" style={{ fontSize: 10 }}><span className="chip-dot" />{currentPlan.name}</span>
                  &nbsp;· Renews {currentPlan.renewsOn}
                </div>
              </div>
              <button className="btn btn-ghost" style={{ fontSize: 13 }}>Change Plan</button>
            </div>
          </div>

          {/* Usage */}
          <div className="settings-section">
            <div className="settings-section-title">Unit Consumption</div>
            <div style={{ display: 'grid', gap: 16 }}>
              {usageSummary.map((u) => {
                const pct = Math.round((u.used / u.limit) * 100);
                return (
                  <div key={u.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{u.label}</span>
                      <span style={{ fontSize: 12, color: 'var(--ink-f)' }}>
                        {u.used.toLocaleString()} / {u.limit.toLocaleString()} {u.unit}
                      </span>
                    </div>
                    <div style={{ height: 6, borderRadius: 3, background: 'var(--paper)', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', borderRadius: 3, transition: 'width .3s',
                        width: `${pct}%`,
                        background: pct > 90 ? '#e05252' : pct > 70 ? '#c49400' : 'var(--teal)',
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 16 }}>
              <button className="btn btn-teal" style={{ fontSize: 13 }}>Buy More Units</button>
            </div>
          </div>

          {/* Invoices */}
          <div className="settings-section">
            <div className="settings-section-title">Payment History</div>
            <div className="table-wrap">
              <table className="d-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv.date}>
                      <td style={{ fontSize: 13 }}>{inv.date}</td>
                      <td style={{ fontSize: 13, fontWeight: 600 }}>{inv.amount}</td>
                      <td><span className="chip chip-live" style={{ fontSize: 10 }}><span className="chip-dot" />{inv.status}</span></td>
                      <td><button className="d-card-action" style={{ fontSize: 12 }}>Download</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
