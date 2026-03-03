'use client';

import { CodeBlock, Callout, NavFooter } from './_components/shared';

export default function DocsOverviewPage() {
  return (
    <>
      <div className="docs-breadcrumb">
        <a href="/docs">Docs</a>
        <span className="sep">/</span>
        <span>Overview</span>
      </div>

      <h1 className="docs-title">HanDl API Documentation</h1>
      <p className="docs-subtitle">
        Build on top of HanDl. Send messages, manage orders, sync products, and handle payments — all through a simple REST API.
      </p>

      <Callout type="tip">
        The HanDl API is currently in <strong>beta</strong>. Endpoints are stable, but we may add new fields. Breaking changes will be communicated 30 days in advance.
      </Callout>

      <h2 className="docs-h2">Base URL</h2>
      <CodeBlock lang="text" code="https://api.handl-ng.com/v1" />

      <p className="docs-p">
        All API requests are made to this base URL. Responses are returned as JSON. All timestamps are in ISO 8601 format (UTC).
      </p>

      <h2 className="docs-h2">Quick Start</h2>
      <p className="docs-p">
        Here&apos;s the fastest path from zero to your first API call:
      </p>

      <h3 className="docs-h3">1. Get your API key</h3>
      <p className="docs-p">
        Go to <a href="/app/settings/api" style={{ color: 'var(--teal)', textDecoration: 'none', fontWeight: 500 }}>Settings → API</a> in your dashboard to create a secret key. Keep it safe — secret keys can access your entire account.
      </p>

      <h3 className="docs-h3">2. Make your first request</h3>
      <p className="docs-p">
        Try listing your products:
      </p>

      <CodeBlock
        lang="curl"
        code={`curl https://api.handl-ng.com/v1/products \\
  -H "Authorization: Bearer sk_live_your_secret_key" \\
  -H "Content-Type: application/json"`}
      />

      <CodeBlock
        lang="javascript"
        code={`const res = await fetch('https://api.handl-ng.com/v1/products', {
  headers: {
    'Authorization': 'Bearer sk_live_your_secret_key',
    'Content-Type': 'application/json',
  },
});

const { data } = await res.json();
console.log(data); // [{ id: "prod_abc", name: "Jollof Rice", ... }]`}
      />

      <h3 className="docs-h3">3. Explore the resources</h3>
      <p className="docs-p">
        The API is organized around core resources that mirror your HanDl dashboard:
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '16px 0' }}>
        {[
          { href: '/docs/messages', label: 'Messages', desc: 'Send & receive across all channels', icon: '💬' },
          { href: '/docs/orders', label: 'Orders', desc: 'Create, update, and track orders', icon: '📦' },
          { href: '/docs/products', label: 'Products', desc: 'Manage your catalog', icon: '🏷️' },
          { href: '/docs/payments', label: 'Payments', desc: 'Track payments and refunds', icon: '💳' },
          { href: '/docs/webhooks', label: 'Webhooks', desc: 'Get real-time event notifications', icon: '🔔' },
          { href: '/docs/errors', label: 'Errors', desc: 'Handle errors gracefully', icon: '⚠️' },
        ].map(r => (
          <a key={r.href} href={r.href} style={{
            display: 'flex', gap: 12, padding: 16, borderRadius: 10, border: '1px solid var(--border)',
            background: '#fff', textDecoration: 'none', transition: 'all .15s',
          }}>
            <span style={{ fontSize: 24 }}>{r.icon}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{r.label}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-f)', marginTop: 2 }}>{r.desc}</div>
            </div>
          </a>
        ))}
      </div>

      <h2 className="docs-h2">SDKs & Libraries</h2>
      <p className="docs-p">
        Official SDKs are coming soon. In the meantime, the API works great with any HTTP client — <span className="docs-inline-code">fetch</span>, <span className="docs-inline-code">axios</span>, <span className="docs-inline-code">requests</span>, or <span className="docs-inline-code">curl</span>.
      </p>

      <Callout type="info">
        Need help? Reach out at <strong>developers@handl-ng.com</strong> or open a ticket from your dashboard.
      </Callout>

      <NavFooter next={{ href: '/docs/authentication', label: 'Authentication' }} />
    </>
  );
}
