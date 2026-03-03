'use client';

import { CodeBlock, Callout, Endpoint, ParamTable, NavFooter } from '../_components/shared';

export default function MessagesDocsPage() {
  return (
    <>
      <div className="docs-breadcrumb">
        <a href="/docs">Docs</a>
        <span className="sep">/</span>
        <span>Messages</span>
      </div>

      <h1 className="docs-title">Messages</h1>
      <p className="docs-subtitle">
        Send and receive messages across all connected channels. The Messages API provides a unified interface regardless of whether the message goes via WhatsApp, web chat, or email.
      </p>

      <h2 className="docs-h2">Send a Message</h2>
      <Endpoint method="POST" path="/v1/messages" />

      <p className="docs-p">
        Send a message to a customer on any connected channel. HanDl automatically routes the message through the correct channel based on the conversation context.
      </p>

      <ParamTable params={[
        { name: 'conversation_id', type: 'string', required: true, desc: 'The conversation to send the message in.' },
        { name: 'body', type: 'string', required: true, desc: 'The message content. Supports plain text. Max 4096 characters.' },
        { name: 'type', type: 'string', desc: "Message type: 'text', 'image', 'template'. Defaults to 'text'." },
        { name: 'media_url', type: 'string', desc: "URL of the media attachment. Required when type is 'image'." },
        { name: 'metadata', type: 'object', desc: 'Arbitrary key-value pairs to attach to the message.' },
      ]} />

      <CodeBlock
        lang="curl"
        code={`curl -X POST https://api.handl-ng.com/v1/messages \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "conversation_id": "conv_8xk2m",
    "body": "Hi! Your order #1042 has been shipped 🚚",
    "metadata": {
      "order_id": "ord_abc123"
    }
  }'`}
      />

      <CodeBlock
        lang="javascript"
        code={`const res = await fetch('https://api.handl-ng.com/v1/messages', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk_live_...',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    conversation_id: 'conv_8xk2m',
    body: 'Hi! Your order #1042 has been shipped 🚚',
    metadata: { order_id: 'ord_abc123' },
  }),
});

const message = await res.json();
console.log(message.id); // "msg_xyz789"`}
      />

      <h3 className="docs-h3">Response</h3>
      <CodeBlock
        lang="json"
        code={`{
  "id": "msg_xyz789",
  "object": "message",
  "conversation_id": "conv_8xk2m",
  "body": "Hi! Your order #1042 has been shipped 🚚",
  "type": "text",
  "direction": "outbound",
  "channel": "whatsapp",
  "status": "sent",
  "metadata": {
    "order_id": "ord_abc123"
  },
  "created_at": "2025-06-15T14:30:00Z"
}`}
      />

      <h2 className="docs-h2">List Messages</h2>
      <Endpoint method="GET" path="/v1/messages" />

      <p className="docs-p">
        Retrieve messages, optionally filtered by conversation.
      </p>

      <ParamTable params={[
        { name: 'conversation_id', type: 'string', desc: 'Filter by conversation.' },
        { name: 'direction', type: 'string', desc: "'inbound' or 'outbound'." },
        { name: 'limit', type: 'integer', desc: 'Number of results (1–100). Default 25.' },
        { name: 'starting_after', type: 'string', desc: 'Cursor for pagination. Pass the last message ID.' },
      ]} />

      <CodeBlock
        lang="curl"
        code={`curl "https://api.handl-ng.com/v1/messages?conversation_id=conv_8xk2m&limit=10" \\
  -H "Authorization: Bearer sk_live_..."`}
      />

      <h3 className="docs-h3">Response</h3>
      <CodeBlock
        lang="json"
        code={`{
  "object": "list",
  "data": [
    {
      "id": "msg_xyz789",
      "body": "Hi! Your order #1042 has been shipped 🚚",
      "direction": "outbound",
      "status": "delivered",
      "created_at": "2025-06-15T14:30:00Z"
    }
  ],
  "has_more": true
}`}
      />

      <h2 className="docs-h2">Retrieve a Message</h2>
      <Endpoint method="GET" path="/v1/messages/:id" />

      <CodeBlock
        lang="curl"
        code={`curl https://api.handl-ng.com/v1/messages/msg_xyz789 \\
  -H "Authorization: Bearer sk_live_..."`}
      />

      <Callout type="info">
        Messages sent via the API appear in your Conversations inbox just like any other message. Your AI agent and team can see and respond to them.
      </Callout>

      <h2 className="docs-h2">Message Statuses</h2>
      <div style={{ margin: '12px 0 16px' }}>
        {[
          { status: 'queued', desc: 'Message accepted by HanDl, waiting to be sent to the channel' },
          { status: 'sent', desc: 'Message delivered to the channel provider (e.g., WhatsApp)' },
          { status: 'delivered', desc: 'Message confirmed delivered to the recipient' },
          { status: 'read', desc: 'Recipient has read the message (channel-dependent)' },
          { status: 'failed', desc: 'Message could not be delivered. Check the error field.' },
        ].map(s => (
          <div key={s.status} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13, alignItems: 'baseline' }}>
            <span className="docs-inline-code" style={{ minWidth: 80 }}>{s.status}</span>
            <span style={{ color: 'var(--ink-m)' }}>{s.desc}</span>
          </div>
        ))}
      </div>

      <NavFooter
        prev={{ href: '/docs/authentication', label: 'Authentication' }}
        next={{ href: '/docs/orders', label: 'Orders' }}
      />
    </>
  );
}
