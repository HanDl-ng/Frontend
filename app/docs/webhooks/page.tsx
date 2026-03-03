'use client';

import { CodeBlock, Callout, Endpoint, ParamTable, NavFooter } from '../_components/shared';

export default function WebhooksDocsPage() {
  return (
    <>
      <div className="docs-breadcrumb">
        <a href="/docs">Docs</a>
        <span className="sep">/</span>
        <span>Webhooks</span>
      </div>

      <h1 className="docs-title">Webhooks</h1>
      <p className="docs-subtitle">
        Receive real-time notifications when events happen in your HanDl account. Webhooks let you build reactive integrations without polling the API.
      </p>

      <h2 className="docs-h2">How Webhooks Work</h2>
      <p className="docs-p">
        When an event occurs (e.g., a new order is created), HanDl sends an HTTP POST request to your configured endpoint with the event payload. Your server should respond with a <span className="docs-inline-code">200</span> status within 10 seconds.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', gap: 8, alignItems: 'center', margin: '24px 0', textAlign: 'center' }}>
        <div style={{ padding: 12, background: 'rgba(46,139,110,.06)', borderRadius: 8, fontSize: 12, fontWeight: 600, color: 'var(--teal)' }}>Event occurs</div>
        <span style={{ color: 'var(--ink-f)' }}>→</span>
        <div style={{ padding: 12, background: 'var(--paper)', borderRadius: 8, fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>HanDl sends POST</div>
        <span style={{ color: 'var(--ink-f)' }}>→</span>
        <div style={{ padding: 12, background: 'rgba(59,130,246,.06)', borderRadius: 8, fontSize: 12, fontWeight: 600, color: '#2563eb' }}>Your endpoint</div>
      </div>

      <h2 className="docs-h2">Configuring Webhooks</h2>
      <p className="docs-p">
        Set up webhooks from <a href="/app/settings/api" style={{ color: 'var(--teal)', textDecoration: 'none', fontWeight: 500 }}>Settings → API</a> or via the API.
      </p>

      <Endpoint method="POST" path="/v1/webhooks" />

      <ParamTable params={[
        { name: 'url', type: 'string', required: true, desc: 'The HTTPS URL to receive webhook events.' },
        { name: 'events', type: 'array', required: true, desc: "List of event types to subscribe to. Use '*' for all events." },
        { name: 'description', type: 'string', desc: 'A label for this webhook endpoint.' },
      ]} />

      <CodeBlock
        lang="curl"
        code={`curl -X POST https://api.handl-ng.com/v1/webhooks \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://your-server.com/webhooks/handl",
    "events": ["order.created", "order.updated", "payment.completed"],
    "description": "Production webhook"
  }'`}
      />

      <h2 className="docs-h2">Event Types</h2>
      <div style={{ margin: '12px 0' }}>
        {[
          { event: 'message.received', desc: 'A new inbound message from a customer' },
          { event: 'message.sent', desc: 'An outbound message has been sent' },
          { event: 'conversation.created', desc: 'A new conversation started' },
          { event: 'order.created', desc: 'A new order was created' },
          { event: 'order.updated', desc: 'An order status changed' },
          { event: 'payment.completed', desc: 'A payment was confirmed' },
          { event: 'payment.failed', desc: 'A payment attempt failed' },
          { event: 'product.created', desc: 'A new product was added' },
          { event: 'product.updated', desc: 'A product was modified' },
        ].map(e => (
          <div key={e.event} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13, alignItems: 'baseline' }}>
            <span className="docs-inline-code" style={{ minWidth: 170 }}>{e.event}</span>
            <span style={{ color: 'var(--ink-m)' }}>{e.desc}</span>
          </div>
        ))}
      </div>

      <h2 className="docs-h2">Event Payload</h2>
      <p className="docs-p">
        Every webhook delivery has the same envelope structure:
      </p>

      <CodeBlock
        lang="json"
        code={`{
  "id": "evt_abc123",
  "object": "event",
  "type": "order.created",
  "created_at": "2025-06-15T14:30:00Z",
  "data": {
    "id": "ord_1042",
    "object": "order",
    "status": "pending",
    "customer": {
      "name": "Amara Obi",
      "phone": "+2348012345678"
    },
    "total": 850000,
    "currency": "NGN"
  }
}`}
      />

      <h2 className="docs-h2">Verifying Signatures</h2>
      <p className="docs-p">
        Every webhook request includes a <span className="docs-inline-code">X-HanDl-Signature</span> header containing an HMAC-SHA256 signature. Verify it to ensure the request came from HanDl.
      </p>

      <CodeBlock
        lang="javascript"
        code={`import crypto from 'crypto';

function verifyWebhook(body, signature, secret) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(body, 'utf8')
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}

// In your webhook handler:
app.post('/webhooks/handl', (req, res) => {
  const sig = req.headers['x-handl-signature'];
  const valid = verifyWebhook(req.rawBody, sig, 'whsec_...');

  if (!valid) return res.status(401).send('Invalid signature');

  const event = JSON.parse(req.body);
  console.log(event.type); // "order.created"

  res.status(200).send('OK');
});`}
      />

      <Callout type="danger">
        <strong>Always verify webhook signatures.</strong> Without verification, an attacker could send fake events to your endpoint.
      </Callout>

      <h2 className="docs-h2">Retry Policy</h2>
      <p className="docs-p">
        If your endpoint returns a non-2xx status or times out, HanDl retries with exponential backoff:
      </p>
      <div style={{ margin: '12px 0' }}>
        {[
          { attempt: '1st retry', delay: '30 seconds' },
          { attempt: '2nd retry', delay: '5 minutes' },
          { attempt: '3rd retry', delay: '30 minutes' },
          { attempt: '4th retry', delay: '2 hours' },
          { attempt: '5th retry (final)', delay: '24 hours' },
        ].map(r => (
          <div key={r.attempt} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
            <span style={{ color: 'var(--ink)' }}>{r.attempt}</span>
            <span style={{ color: 'var(--ink-f)' }}>{r.delay}</span>
          </div>
        ))}
      </div>
      <p className="docs-p">
        After 5 failed attempts, the endpoint is marked as unhealthy. You&apos;ll receive an email notification. Re-enable from Settings → API.
      </p>

      <NavFooter
        prev={{ href: '/docs/payments', label: 'Payments' }}
        next={{ href: '/docs/errors', label: 'Errors' }}
      />
    </>
  );
}
