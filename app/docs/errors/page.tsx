'use client';

import { CodeBlock, Callout, NavFooter } from '../_components/shared';

export default function ErrorsDocsPage() {
  return (
    <>
      <div className="docs-breadcrumb">
        <a href="/docs">Docs</a>
        <span className="sep">/</span>
        <span>Errors</span>
      </div>

      <h1 className="docs-title">Errors</h1>
      <p className="docs-subtitle">
        The HanDl API uses conventional HTTP status codes and returns structured error responses to help you handle issues gracefully.
      </p>

      <h2 className="docs-h2">Error Response Format</h2>
      <p className="docs-p">
        All errors follow the same structure:
      </p>

      <CodeBlock
        lang="json"
        code={`{
  "error": {
    "type": "invalid_request_error",
    "code": "missing_required_field",
    "message": "The 'name' field is required when creating a product.",
    "param": "name",
    "doc_url": "https://docs.handl-ng.com/errors#missing_required_field"
  }
}`}
      />

      <table className="docs-param-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span className="docs-param-name">type</span></td>
            <td><span className="docs-param-desc">Error category (see below)</span></td>
          </tr>
          <tr>
            <td><span className="docs-param-name">code</span></td>
            <td><span className="docs-param-desc">Machine-readable error code for programmatic handling</span></td>
          </tr>
          <tr>
            <td><span className="docs-param-name">message</span></td>
            <td><span className="docs-param-desc">Human-readable description of what went wrong</span></td>
          </tr>
          <tr>
            <td><span className="docs-param-name">param</span></td>
            <td><span className="docs-param-desc">The parameter that caused the error (if applicable)</span></td>
          </tr>
          <tr>
            <td><span className="docs-param-name">doc_url</span></td>
            <td><span className="docs-param-desc">Link to the relevant docs section</span></td>
          </tr>
        </tbody>
      </table>

      <h2 className="docs-h2">HTTP Status Codes</h2>
      <div style={{ margin: '12px 0' }}>
        {[
          { code: '200', label: 'OK', desc: 'Request succeeded.', color: 'var(--teal)' },
          { code: '201', label: 'Created', desc: 'Resource created successfully.', color: 'var(--teal)' },
          { code: '400', label: 'Bad Request', desc: 'Invalid parameters or missing required fields.', color: '#b45309' },
          { code: '401', label: 'Unauthorized', desc: 'Missing or invalid API key.', color: '#dc2626' },
          { code: '403', label: 'Forbidden', desc: 'Valid key but insufficient permissions (e.g., publishable key trying to write).', color: '#dc2626' },
          { code: '404', label: 'Not Found', desc: 'The requested resource does not exist.', color: '#b45309' },
          { code: '409', label: 'Conflict', desc: 'The request conflicts with the current state (e.g., duplicate idempotency key).', color: '#b45309' },
          { code: '422', label: 'Unprocessable', desc: 'Syntactically valid but semantically incorrect (e.g., negative price).', color: '#b45309' },
          { code: '429', label: 'Too Many Requests', desc: 'Rate limit exceeded. Check the Retry-After header.', color: '#dc2626' },
          { code: '500', label: 'Server Error', desc: 'Something went wrong on our end. These are rare and automatically reported.', color: '#dc2626' },
        ].map(s => (
          <div key={s.code} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: 13, alignItems: 'baseline' }}>
            <div>
              <span style={{ fontFamily: "'SF Mono', 'Consolas', monospace", fontWeight: 700, color: s.color }}>{s.code}</span>
              <span style={{ color: 'var(--ink-f)', marginLeft: 6 }}>{s.label}</span>
            </div>
            <span style={{ color: 'var(--ink-m)' }}>{s.desc}</span>
          </div>
        ))}
      </div>

      <h2 className="docs-h2">Error Types</h2>

      <h3 className="docs-h3">invalid_request_error</h3>
      <p className="docs-p">
        You sent an invalid request — missing fields, wrong types, or bad formatting. Fix the request and retry.
      </p>

      <h3 className="docs-h3">authentication_error</h3>
      <p className="docs-p">
        Your API key is missing, invalid, or revoked. Check that you&apos;re using the right key and that it hasn&apos;t been deleted.
      </p>

      <h3 className="docs-h3">permission_error</h3>
      <p className="docs-p">
        Your key doesn&apos;t have permission for this action. Publishable keys (<span className="docs-inline-code">pk_</span>) are read-only. Switch to a secret key (<span className="docs-inline-code">sk_</span>) for write operations.
      </p>

      <h3 className="docs-h3">not_found_error</h3>
      <p className="docs-p">
        The resource you requested doesn&apos;t exist or has been deleted. Double-check the ID.
      </p>

      <h3 className="docs-h3">rate_limit_error</h3>
      <p className="docs-p">
        You&apos;ve exceeded your plan&apos;s rate limit. Wait for the duration specified in the <span className="docs-inline-code">Retry-After</span> header, then retry.
      </p>

      <h3 className="docs-h3">api_error</h3>
      <p className="docs-p">
        An error on HanDl&apos;s side. These are automatically reported. If persistent, contact support.
      </p>

      <h2 className="docs-h2">Handling Errors</h2>
      <p className="docs-p">
        Here&apos;s a recommended pattern for handling API errors:
      </p>

      <CodeBlock
        lang="javascript"
        code={`async function callHanDl(path, options = {}) {
  const res = await fetch(\`https://api.handl-ng.com/v1\${path}\`, {
    ...options,
    headers: {
      'Authorization': 'Bearer sk_live_...',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const body = await res.json();

  if (!res.ok) {
    const { error } = body;
    switch (error.type) {
      case 'authentication_error':
        throw new Error('Invalid API key — check your credentials');
      case 'rate_limit_error':
        const retryAfter = res.headers.get('Retry-After');
        await new Promise(r => setTimeout(r, retryAfter * 1000));
        return callHanDl(path, options); // Retry
      case 'invalid_request_error':
        throw new Error(\`Bad request: \${error.message}\`);
      default:
        throw new Error(\`HanDl API error: \${error.message}\`);
    }
  }

  return body;
}`}
      />

      <Callout type="tip">
        Implement exponential backoff for <span className="docs-inline-code">429</span> and <span className="docs-inline-code">500</span> errors. For <span className="docs-inline-code">400</span> errors, fix the request — retrying won&apos;t help.
      </Callout>

      <h2 className="docs-h2">Idempotency</h2>
      <p className="docs-p">
        For POST requests, you can include an <span className="docs-inline-code">Idempotency-Key</span> header to safely retry requests without creating duplicates:
      </p>

      <CodeBlock
        lang="curl"
        code={`curl -X POST https://api.handl-ng.com/v1/orders \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Idempotency-Key: unique-request-id-123" \\
  -H "Content-Type: application/json" \\
  -d '{ ... }'`}
      />

      <p className="docs-p">
        Idempotency keys expire after 24 hours. If the same key is reused within that window, HanDl returns the original response without creating a new resource.
      </p>

      <NavFooter
        prev={{ href: '/docs/webhooks', label: 'Webhooks' }}
      />
    </>
  );
}
