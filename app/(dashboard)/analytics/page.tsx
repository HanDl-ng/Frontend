'use client';

import { useState } from 'react';

const periods = ['Today', '7 Days', '30 Days', '90 Days'];

const kpis = [
  { label: 'Total Conversations', value: '2,847', delta: '+22%', up: true },
  { label: 'AI Resolution Rate', value: '78%', delta: '+5%', up: true },
  { label: 'Avg. Response Time', value: '1.2m', delta: '-18%', up: true },
  { label: 'Customer Satisfaction', value: '4.6/5', delta: '+0.3', up: true },
  { label: 'Revenue', value: '₦4.2M', delta: '+18%', up: true },
];

const barData = [
  { label: 'Mon', value: 65 },
  { label: 'Tue', value: 82 },
  { label: 'Wed', value: 71 },
  { label: 'Thu', value: 90 },
  { label: 'Fri', value: 85 },
  { label: 'Sat', value: 45 },
  { label: 'Sun', value: 38 },
];

const channelBreakdown = [
  { name: 'WhatsApp', value: 58, color: '#25D366' },
  { name: 'Instagram', value: 22, color: '#E1306C' },
  { name: 'Web Chat', value: 15, color: '#2e8b6e' },
  { name: 'Email', value: 5, color: '#5a7fd4' },
];

const topAutomations = [
  { name: 'Order Confirmation', runs: '2,340', saved: '39h', satisfaction: '4.8' },
  { name: 'Abandoned Cart', runs: '890', saved: '14h', satisfaction: '4.2' },
  { name: 'Delivery Updates', runs: '1,120', saved: '18h', satisfaction: '4.7' },
  { name: 'Support Router', runs: '1,456', saved: '24h', satisfaction: '4.1' },
  { name: 'Lead Qualifier', runs: '234', saved: '3h', satisfaction: '3.9' },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('30 Days');

  const maxBar = Math.max(...barData.map((d) => d.value));

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Analytics</h1>
            <p className="page-desc">Monitor your business performance and AI efficiency.</p>
          </div>
          <div className="page-actions">
            {periods.map((p) => (
              <button
                key={p}
                className={`inbox-filter${period === p ? ' active' : ''}`}
                onClick={() => setPeriod(p)}
              >
                {p}
              </button>
            ))}
            <button className="btn btn-ghost">📥 Export</button>
          </div>
        </div>
      </div>

      <div className="kpi-row">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="kpi-item">
            <div className="kpi-item-label">{kpi.label}</div>
            <div className="kpi-item-value">{kpi.value}</div>
            <div className={`kpi-item-delta ${kpi.up ? 'up' : 'down'}`}>
              {kpi.up ? '↑' : '↓'} {kpi.delta}
            </div>
          </div>
        ))}
      </div>

      <div className="analytics-grid">
        {/* Conversations over time */}
        <div className="analytics-chart-card">
          <div className="analytics-chart-title">Conversations Over Time</div>
          <div className="analytics-chart-placeholder">
            <div className="chart-bar-group">
              {barData.map((d) => (
                <div key={d.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div
                    className="chart-bar teal"
                    style={{ height: `${(d.value / maxBar) * 160}px` }}
                  />
                  <span style={{ fontSize: 10, color: 'var(--ink-f)' }}>{d.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Channel breakdown */}
        <div className="analytics-chart-card">
          <div className="analytics-chart-title">Channel Breakdown</div>
          <div style={{ padding: 20 }}>
            {channelBreakdown.map((ch) => (
              <div key={ch.name} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{ch.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: ch.color }}>{ch.value}%</span>
                </div>
                <div style={{ height: 8, background: 'var(--paper)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${ch.value}%`, height: '100%', background: ch.color, borderRadius: 4, transition: 'width .6s' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI vs Human */}
        <div className="analytics-chart-card">
          <div className="analytics-chart-title">AI vs Human Resolution</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, gap: 32 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 100, height: 100, borderRadius: '50%', border: '8px solid var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: 'var(--teal)' }}>78%</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-f)' }}>AI Handled</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 100, height: 100, borderRadius: '50%', border: '8px solid #5a7fd4', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: '#5a7fd4' }}>22%</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-f)' }}>Human Agent</div>
            </div>
          </div>
        </div>

        {/* Top Automations */}
        <div className="analytics-chart-card">
          <div className="analytics-chart-title">Top Automations</div>
          <table className="d-table">
            <thead>
              <tr>
                <th>Automation</th>
                <th>Runs</th>
                <th>Time Saved</th>
                <th>CSAT</th>
              </tr>
            </thead>
            <tbody>
              {topAutomations.map((a) => (
                <tr key={a.name}>
                  <td style={{ fontWeight: 600 }}>{a.name}</td>
                  <td>{a.runs}</td>
                  <td style={{ color: 'var(--teal)' }}>{a.saved}</td>
                  <td>⭐ {a.satisfaction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
