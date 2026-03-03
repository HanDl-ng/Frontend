'use client';

import { CodeBlock, Endpoint, ParamTable, Callout, NavFooter } from '../_components/shared';

export default function PaymentsDocsPage() {
  return (
    <>
      <div className="docs-breadcrumb">
        <a href="/docs">Docs</a>
        <span className="sep">/</span>
        <span>Payments</span>
      </div>

      <h1 className="docs-title">Payments</h1>
      <p className="docs-subtitle">
        Track payment status for orders. HanDl integrates with payment providers like Paystack to handle collection — the Payments API gives you visibility and control.
      </p>

      <Callout type="info">
        HanDl does not process payments directly. We generate payment links via your connected provider (e.g., Paystack) and track status automatically through webhooks.
      </Callout>

      <h2 className="docs-h2">Retrieve a Payment</h2>
      <Endpoint method="GET" path="/v1/payments/:id" />

      <CodeBlock
        lang="curl"
        code={`curl https://api.handl-ng.com/v1/payments/pay_abc123 \\
  -H "Authorization: Bearer sk_live_..."`}
      />

      <h3 className="docs-h3">Response</h3>
      <CodeBlock
        lang="json"
        code={`{
  "id": "pay_abc123",
  "object": "payment",
  "order_id": "ord_1042",
  "amount": 850000,
  "formatted_amount": "₦8,500",
  "currency": "NGN",
  "status": "paid",
  "provider": "paystack",
  "provider_reference": "PSK_txn_1234567",
  "payment_url": "https://paystack.com/pay/abc123",
  "paid_at": "2025-06-15T14:35:00Z",
  "created_at": "2025-06-15T14:30:00Z"
}`}
      />

      <h2 className="docs-h2">List Payments</h2>
      <Endpoint method="GET" path="/v1/payments" />

      <ParamTable params={[
        { name: 'order_id', type: 'string', desc: 'Filter by order.' },
        { name: 'status', type: 'string', desc: "'pending', 'paid', 'failed', 'refunded'." },
        { name: 'created_after', type: 'string', desc: 'ISO 8601 timestamp.' },
        { name: 'limit', type: 'integer', desc: 'Number of results (1–100). Default 25.' },
      ]} />

      <CodeBlock
        lang="curl"
        code={`curl "https://api.handl-ng.com/v1/payments?status=paid&limit=20" \\
  -H "Authorization: Bearer sk_live_..."`}
      />

      <h2 className="docs-h2">Create a Payment Link</h2>
      <Endpoint method="POST" path="/v1/payments" />

      <p className="docs-p">
        Generate a payment link for an order. The link is sent to the customer via their conversation channel.
      </p>

      <ParamTable params={[
        { name: 'order_id', type: 'string', required: true, desc: 'The order to create a payment link for.' },
        { name: 'send_to_customer', type: 'boolean', desc: 'Automatically send the link in the conversation. Default true.' },
      ]} />

      <CodeBlock
        lang="curl"
        code={`curl -X POST https://api.handl-ng.com/v1/payments \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "order_id": "ord_1042",
    "send_to_customer": true
  }'`}
      />

      <CodeBlock
        lang="javascript"
        code={`const payment = await fetch('https://api.handl-ng.com/v1/payments', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk_live_...',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    order_id: 'ord_1042',
    send_to_customer: true,
  }),
}).then(r => r.json());

console.log(payment.payment_url);
// "https://paystack.com/pay/abc123"`}
      />

      <h2 className="docs-h2">Refund a Payment</h2>
      <Endpoint method="POST" path="/v1/payments/:id/refund" />

      <ParamTable params={[
        { name: 'amount', type: 'integer', desc: 'Partial refund amount in smallest unit. Omit for full refund.' },
        { name: 'reason', type: 'string', desc: 'Reason for the refund (for your records).' },
      ]} />

      <CodeBlock
        lang="curl"
        code={`curl -X POST https://api.handl-ng.com/v1/payments/pay_abc123/refund \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{ "reason": "Customer changed their mind" }'`}
      />

      <Callout type="warn">
        Refunds are processed through your payment provider. Processing time depends on the provider and the customer&apos;s bank (usually 1–5 business days).
      </Callout>

      <h2 className="docs-h2">Payment Statuses</h2>
      <div style={{ margin: '12px 0' }}>
        {[
          { status: 'pending', desc: 'Payment link generated, awaiting customer payment' },
          { status: 'paid', desc: 'Payment confirmed by the provider' },
          { status: 'failed', desc: 'Payment attempt failed (expired, declined, etc.)' },
          { status: 'refunded', desc: 'Payment has been fully refunded' },
          { status: 'partially_refunded', desc: 'A partial amount has been refunded' },
        ].map(s => (
          <div key={s.status} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13, alignItems: 'baseline' }}>
            <span className="docs-inline-code" style={{ minWidth: 140 }}>{s.status}</span>
            <span style={{ color: 'var(--ink-m)' }}>{s.desc}</span>
          </div>
        ))}
      </div>

      <NavFooter
        prev={{ href: '/docs/products', label: 'Products' }}
        next={{ href: '/docs/webhooks', label: 'Webhooks' }}
      />
    </>
  );
}
