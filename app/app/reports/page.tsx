'use client';

import { useState } from 'react';
import './_components/styles.css';

const periods = ['Today', '7 Days', '30 Days', '90 Days'];

const kpis = [
  { label: 'Total Messages', value: '12,480', delta: '+22%', up: true },
  { label: 'AI-Handled', value: '87%', delta: '+5%', up: true },
  { label: 'Orders Created', value: '342', delta: '+18%', up: true },
  { label: 'Revenue', value: '₦4.2M', delta: '+24%', up: true },
  { label: 'Conversion Rate', value: '34%', delta: '+3%', up: true },
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
  { name: 'WhatsApp', value: 62, color: '#25D366' },
  { name: 'Web Chat', value: 28, color: '#2e8b6e' },
  { name: 'Email', value: 6, color: '#5a7fd4' },
  { name: 'API', value: 4, color: '#d4845a' },
];

const usageData = [
  { label: 'Messages', used: 7240, limit: 10000, unit: 'msgs' },
  { label: 'AI Responses', used: 6300, limit: 10000, unit: 'responses' },
  { label: 'Orders', used: 342, limit: 500, unit: 'orders' },
  { label: 'API Calls', used: 1280, limit: 5000, unit: 'calls' },
];

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export default function ReportsPage() {
  const [period, setPeriod] = useState('30 Days');

  const maxBar = Math.max(...barData.map((d) => d.value));

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Reports</h1>
            <p className="page-desc">Monitor your business performance and AI agent efficiency.</p>
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
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="reports-kpi-row">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="reports-kpi">
            <div className="reports-kpi-label">{kpi.label}</div>
            <div className="reports-kpi-value">{kpi.value}</div>
            <div className={`reports-kpi-delta ${kpi.up ? 'up' : 'down'}`}>
              {kpi.up ? '↑' : '↓'} {kpi.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="reports-grid">
        {/* Messages over time */}
        <div className="reports-chart-card">
          <div className="reports-chart-title">Messages Over Time</div>
          <div className="reports-chart-body">
            <div className="chart-bar-group">
              {barData.map((d) => (
                <div key={d.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  <div
                    className="chart-bar teal"
                    style={{ height: `${(d.value / maxBar) * 160}px` }}
                  />
                  <span className="chart-bar-label">{d.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Channel breakdown */}
        <div className="reports-chart-card">
          <div className="reports-chart-title">Channel Breakdown</div>
          <div className="reports-chart-body">
            {channelBreakdown.map((ch) => (
              <div key={ch.name} className="reports-channel-bar">
                <div className="reports-channel-bar-header">
                  <span className="reports-channel-bar-name">{ch.name}</span>
                  <span className="reports-channel-bar-pct" style={{ color: ch.color }}>{ch.value}%</span>
                </div>
                <div className="reports-channel-bar-track">
                  <div className="reports-channel-bar-fill" style={{ width: `${ch.value}%`, background: ch.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI vs Human */}
        <div className="reports-chart-card">
          <div className="reports-chart-title">AI vs Human Resolution</div>
          <div className="reports-chart-body">
            <div className="reports-resolution-rings">
              <div className="reports-ring">
                <div className="reports-ring-circle" style={{ borderColor: 'var(--teal)' }}>
                  <span className="reports-ring-value" style={{ color: 'var(--teal)' }}>87%</span>
                </div>
                <div className="reports-ring-label">AI Handled</div>
              </div>
              <div className="reports-ring">
                <div className="reports-ring-circle" style={{ borderColor: '#5a7fd4' }}>
                  <span className="reports-ring-value" style={{ color: '#5a7fd4' }}>13%</span>
                </div>
                <div className="reports-ring-label">Human Agent</div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue by source */}
        <div className="reports-chart-card">
          <div className="reports-chart-title">Revenue by Source</div>
          <div className="reports-chart-body">
            {[
              { name: 'AI Agent (Conversations)', value: 68, color: 'var(--teal)' },
              { name: 'Storefront', value: 22, color: '#5a7fd4' },
              { name: 'API / Manual', value: 10, color: '#d4845a' },
            ].map((s) => (
              <div key={s.name} className="reports-channel-bar">
                <div className="reports-channel-bar-header">
                  <span className="reports-channel-bar-name">{s.name}</span>
                  <span className="reports-channel-bar-pct" style={{ color: s.color }}>{s.value}%</span>
                </div>
                <div className="reports-channel-bar-track">
                  <div className="reports-channel-bar-fill" style={{ width: `${s.value}%`, background: s.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Units Usage */}
      <div className="reports-usage-card">
        <div className="reports-usage-title">Unit Consumption</div>
        <div className="reports-usage-grid">
          {usageData.map((u) => {
            const pct = Math.round((u.used / u.limit) * 100);
            const warn = pct > 80;
            const danger = pct > 95;
            return (
              <div key={u.label} className="reports-usage-item">
                <div className="reports-usage-item-label">{u.label}</div>
                <div className="reports-usage-item-value">{formatNumber(u.used)}</div>
                <div className="reports-usage-bar">
                  <div
                    className={`reports-usage-bar-fill${danger ? ' danger' : warn ? ' warn' : ''}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="reports-usage-item-sub">
                  {formatNumber(u.used)} / {formatNumber(u.limit)} {u.unit}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
