'use client';

import { CodeBlock, Callout, NavFooter } from '../_components/shared';

export default function AuthenticationDocsPage() {
  return (
    <>
      <div className="docs-breadcrumb">
        <a href="/docs">Docs</a>
        <span className="sep">/</span>
        <span>Authentication</span>
      </div>

      <h1 className="docs-title">Authentication</h1>
      <p className="docs-subtitle">
        HanDl uses API keys to authenticate requests. You can manage keys from your dashboard at Settings → API.
      </p>

      <h2 className="docs-h2">Key Types</h2>
      <p className="docs-p">
        HanDl issues two types of keys per environment:
      </p>

      <div style={{ display: 'grid', gap: 12, margin: '16px 0' }}>
        <div style={{ padding: 16, borderRadius: 10, border: '1px solid var(--border)', background: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span className="docs-inline-code" style={{ background: 'rgba(239,68,68,.08)', color: '#dc2626', border: 'none' }}>sk_live_...</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#dc2626' }}>Secret Key</span>
          </div>
          <p className="docs-p" style={{ margin: 0 }}>
            Full access to your account. Use server-side only. Never expose in client code, Git repos, or public channels.
          </p>
        </div>
        <div style={{ padding: 16, borderRadius: 10, border: '1px solid var(--border)', background: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span className="docs-inline-code" style={{ background: 'rgba(46,139,110,.08)', color: 'var(--teal)', border: 'none' }}>pk_live_...</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--teal)' }}>Publishable Key</span>
          </div>
          <p className="docs-p" style={{ margin: 0 }}>
            Limited read-only access. Safe for client-side use (storefront embeds, web chat widgets). Cannot create or modify resources.
          </p>
        </div>
      </div>

      <Callout type="danger">
        <strong>Never share secret keys.</strong> If a secret key is compromised, revoke it immediately from Settings → API and generate a new one.
      </Callout>

      <h2 className="docs-h2">Using Your Key</h2>
      <p className="docs-p">
        Pass your API key in the <span className="docs-inline-code">Authorization</span> header as a Bearer token:
      </p>

      <CodeBlock
        lang="curl"
        code={`curl https://api.handl-ng.com/v1/orders \\
  -H "Authorization: Bearer sk_live_your_secret_key"`}
      />

      <CodeBlock
        lang="javascript"
        code={`const response = await fetch('https://api.handl-ng.com/v1/orders', {
  headers: {
    'Authorization': 'Bearer sk_live_your_secret_key',
  },
});`}
      />

      <h2 className="docs-h2">Test Mode</h2>
      <p className="docs-p">
        Use test keys (<span className="docs-inline-code">sk_test_...</span>) during development. Test keys interact with a sandboxed environment — no real messages are sent and no charges are made.
      </p>

      <CodeBlock
        lang="text"
        code={`# Test keys
sk_test_abc123...  → Secret (test)
pk_test_xyz789...  → Publishable (test)

# Live keys
sk_live_abc123...  → Secret (live)
pk_live_xyz789...  → Publishable (live)`}
      />

      <Callout type="tip">
        Switch between test and live mode from the toggle in Settings → API. Your test data is completely isolated from production.
      </Callout>

      <h2 className="docs-h2">Rate Limits</h2>
      <p className="docs-p">
        API requests are rate-limited per key:
      </p>
      <div style={{ margin: '12px 0 16px' }}>
        {[
          { plan: 'Starter', limit: '60 req/min' },
          { plan: 'Growth', limit: '300 req/min' },
          { plan: 'Enterprise', limit: 'Custom' },
        ].map(r => (
          <div key={r.plan} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
            <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{r.plan}</span>
            <span className="docs-inline-code">{r.limit}</span>
          </div>
        ))}
      </div>
      <p className="docs-p">
        When rate-limited, the API returns <span className="docs-inline-code">429 Too Many Requests</span> with a <span className="docs-inline-code">Retry-After</span> header in seconds.
      </p>

      <NavFooter
        prev={{ href: '/docs', label: 'Overview' }}
        next={{ href: '/docs/messages', label: 'Messages' }}
      />
    </>
  );
}
