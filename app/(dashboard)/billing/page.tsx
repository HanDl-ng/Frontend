'use client';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    current: false,
    features: ['500 messages/mo', '1 channel', '1 team member', 'Basic automations', 'Community support'],
  },
  {
    name: 'Growth',
    price: '₦25,000',
    period: '/month',
    current: true,
    features: ['10,000 messages/mo', '3 channels', '5 team members', 'AI automations', 'Priority support', 'Analytics'],
  },
  {
    name: 'Business',
    price: '₦75,000',
    period: '/month',
    current: false,
    features: ['50,000 messages/mo', 'Unlimited channels', '20 team members', 'Advanced AI', 'Dedicated support', 'Custom integrations'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    current: false,
    features: ['Unlimited messages', 'Unlimited channels', 'Unlimited team', 'Custom AI models', 'SLA guarantee', 'On-premise option'],
  },
];

const usageData = [
  { label: 'Messages', used: 7240, limit: 10000, unit: 'msgs' },
  { label: 'AI Tokens', used: 2800000, limit: 5000000, unit: 'tokens' },
  { label: 'Team Members', used: 3, limit: 5, unit: 'seats' },
  { label: 'Automations', used: 24, limit: 50, unit: 'flows' },
];

const invoices = [
  { id: 'INV-2024-007', date: 'Jul 1, 2024', amount: '₦25,000', status: 'Paid' },
  { id: 'INV-2024-006', date: 'Jun 1, 2024', amount: '₦25,000', status: 'Paid' },
  { id: 'INV-2024-005', date: 'May 1, 2024', amount: '₦25,000', status: 'Paid' },
  { id: 'INV-2024-004', date: 'Apr 1, 2024', amount: '₦25,000', status: 'Paid' },
  { id: 'INV-2024-003', date: 'Mar 1, 2024', amount: '₦15,000', status: 'Paid' },
];

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export default function BillingPage() {
  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Billing & Usage</h1>
            <p className="page-desc">Manage your plan, usage, and invoices.</p>
          </div>
        </div>
      </div>

      {/* Usage Cards */}
      <div className="usage-cards">
        {usageData.map((u) => {
          const pct = Math.round((u.used / u.limit) * 100);
          const warn = pct > 80;
          const danger = pct > 95;
          return (
            <div key={u.label} className="usage-card">
              <div className="usage-card-label">{u.label}</div>
              <div className="usage-card-value">{formatNumber(u.used)}</div>
              <div className="usage-progress">
                <div
                  className={`usage-progress-fill${danger ? ' danger' : warn ? ' warn' : ''}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="usage-card-limit">
                {formatNumber(u.used)} / {formatNumber(u.limit)} {u.unit} ({pct}%)
              </div>
            </div>
          );
        })}
      </div>

      {/* Plans */}
      <div className="d-card" style={{ marginBottom: 24 }}>
        <div className="d-card-header">
          <span className="d-card-title">Plans</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              style={{
                border: plan.current ? '2px solid var(--teal)' : '1px solid var(--border)',
                borderRadius: 14,
                padding: 20,
                background: plan.current ? 'rgba(46,139,110,.03)' : '#fff',
                position: 'relative',
              }}
            >
              {plan.current && (
                <span className="chip chip-live" style={{ position: 'absolute', top: 12, right: 12, fontSize: 10 }}>
                  Current
                </span>
              )}
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>
                {plan.name}
              </div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: 'var(--ink)', marginBottom: 4 }}>
                {plan.price}
                {plan.period && <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--ink-f)' }}>{plan.period}</span>}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ fontSize: 12, color: 'var(--ink-m)', padding: '4px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
                    ✓ {f}
                  </li>
                ))}
              </ul>
              <button
                className={`btn ${plan.current ? 'btn-ghost' : 'btn-teal'}`}
                style={{ width: '100%', marginTop: 16, height: 38, fontSize: 13 }}
              >
                {plan.current ? 'Current Plan' : plan.price === 'Custom' ? 'Contact Sales' : 'Upgrade'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Invoices */}
      <div className="d-card">
        <div className="d-card-header">
          <span className="d-card-title">Invoice History</span>
          <button className="d-card-action">📥 Download All</button>
        </div>
        <div className="table-wrap" style={{ border: 'none' }}>
          <table className="d-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td style={{ fontWeight: 600, color: 'var(--teal)' }}>{inv.id}</td>
                  <td>{inv.date}</td>
                  <td style={{ fontWeight: 600 }}>{inv.amount}</td>
                  <td><span className="chip chip-live">{inv.status}</span></td>
                  <td><button className="d-card-action">Download</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
