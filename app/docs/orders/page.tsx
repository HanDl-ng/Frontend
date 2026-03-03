'use client';

import { CodeBlock, Callout, Endpoint, ParamTable, NavFooter } from '../_components/shared';

export default function OrdersDocsPage() {
  return (
    <>
      <div className="docs-breadcrumb">
        <a href="/docs">Docs</a>
        <span className="sep">/</span>
        <span>Orders</span>
      </div>

      <h1 className="docs-title">Orders</h1>
      <p className="docs-subtitle">
        Create, retrieve, and manage orders. Orders can be created by the AI agent during conversations or programmatically via the API.
      </p>

      <h2 className="docs-h2">Create an Order</h2>
      <Endpoint method="POST" path="/v1/orders" />

      <ParamTable params={[
        { name: 'customer', type: 'object', required: true, desc: 'Customer details: name, phone, email, address.' },
        { name: 'items', type: 'array', required: true, desc: 'Array of line items with product_id, quantity, and optional unit_price override.' },
        { name: 'channel', type: 'string', desc: "Source channel: 'whatsapp', 'web', 'api'. Defaults to 'api'." },
        { name: 'notes', type: 'string', desc: 'Internal notes about the order.' },
        { name: 'metadata', type: 'object', desc: 'Arbitrary key-value pairs.' },
      ]} />

      <CodeBlock
        lang="curl"
        code={`curl -X POST https://api.handl-ng.com/v1/orders \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "customer": {
      "name": "Amara Obi",
      "phone": "+2348012345678"
    },
    "items": [
      { "product_id": "prod_jollof", "quantity": 2 },
      { "product_id": "prod_chapman", "quantity": 1 }
    ],
    "notes": "Extra spicy"
  }'`}
      />

      <CodeBlock
        lang="javascript"
        code={`const order = await fetch('https://api.handl-ng.com/v1/orders', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk_live_...',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    customer: { name: 'Amara Obi', phone: '+2348012345678' },
    items: [
      { product_id: 'prod_jollof', quantity: 2 },
      { product_id: 'prod_chapman', quantity: 1 },
    ],
    notes: 'Extra spicy',
  }),
}).then(r => r.json());

console.log(order.id); // "ord_1042"`}
      />

      <h3 className="docs-h3">Response</h3>
      <CodeBlock
        lang="json"
        code={`{
  "id": "ord_1042",
  "object": "order",
  "status": "pending",
  "customer": {
    "name": "Amara Obi",
    "phone": "+2348012345678"
  },
  "items": [
    {
      "product_id": "prod_jollof",
      "name": "Jollof Rice (Large)",
      "quantity": 2,
      "unit_price": 3500,
      "subtotal": 7000
    },
    {
      "product_id": "prod_chapman",
      "name": "Chapman",
      "quantity": 1,
      "unit_price": 1500,
      "subtotal": 1500
    }
  ],
  "subtotal": 8500,
  "total": 8500,
  "currency": "NGN",
  "payment_status": "unpaid",
  "channel": "api",
  "notes": "Extra spicy",
  "created_at": "2025-06-15T14:30:00Z"
}`}
      />

      <h2 className="docs-h2">List Orders</h2>
      <Endpoint method="GET" path="/v1/orders" />

      <ParamTable params={[
        { name: 'status', type: 'string', desc: "Filter: 'pending', 'confirmed', 'preparing', 'delivered', 'cancelled'." },
        { name: 'payment_status', type: 'string', desc: "Filter: 'unpaid', 'paid', 'refunded'." },
        { name: 'created_after', type: 'string', desc: 'ISO 8601 timestamp. Only orders created after this time.' },
        { name: 'limit', type: 'integer', desc: 'Number of results (1–100). Default 25.' },
        { name: 'starting_after', type: 'string', desc: 'Cursor for pagination.' },
      ]} />

      <CodeBlock
        lang="curl"
        code={`curl "https://api.handl-ng.com/v1/orders?status=pending&limit=10" \\
  -H "Authorization: Bearer sk_live_..."`}
      />

      <h2 className="docs-h2">Retrieve an Order</h2>
      <Endpoint method="GET" path="/v1/orders/:id" />

      <h2 className="docs-h2">Update an Order</h2>
      <Endpoint method="PATCH" path="/v1/orders/:id" />

      <p className="docs-p">
        Update order status, notes, or metadata. To add/remove items, cancel the order and create a new one.
      </p>

      <ParamTable params={[
        { name: 'status', type: 'string', desc: "Transition to: 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'." },
        { name: 'notes', type: 'string', desc: 'Update internal notes.' },
        { name: 'metadata', type: 'object', desc: 'Merge new metadata. Existing keys are preserved unless overwritten.' },
      ]} />

      <CodeBlock
        lang="curl"
        code={`curl -X PATCH https://api.handl-ng.com/v1/orders/ord_1042 \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{ "status": "confirmed" }'`}
      />

      <Callout type="info">
        When an order status changes, the customer is automatically notified through their original channel (if auto-notifications are enabled in Settings → AI Agent).
      </Callout>

      <h2 className="docs-h2">Order Statuses</h2>
      <div style={{ margin: '12px 0' }}>
        {[
          { status: 'pending', desc: 'Order created, awaiting confirmation' },
          { status: 'confirmed', desc: 'Order accepted by the business' },
          { status: 'preparing', desc: 'Order is being prepared/picked' },
          { status: 'out_for_delivery', desc: 'Order dispatched for delivery' },
          { status: 'delivered', desc: 'Order completed and delivered' },
          { status: 'cancelled', desc: 'Order cancelled (terminal state)' },
        ].map(s => (
          <div key={s.status} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13, alignItems: 'baseline' }}>
            <span className="docs-inline-code" style={{ minWidth: 120 }}>{s.status}</span>
            <span style={{ color: 'var(--ink-m)' }}>{s.desc}</span>
          </div>
        ))}
      </div>

      <NavFooter
        prev={{ href: '/docs/messages', label: 'Messages' }}
        next={{ href: '/docs/products', label: 'Products' }}
      />
    </>
  );
}
