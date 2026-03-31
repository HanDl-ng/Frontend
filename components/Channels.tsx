export default function Channels() {
  const channels = [
    {
      title: 'WhatsApp',
      desc: 'Run support and sales from official WhatsApp Business conversations with AI-assisted replies.',
      meta: 'Business API',
      delay: 'd1',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M20 11.5a8 8 0 1 1-14.3 4.9L4 20l3.8-1.5A8 8 0 1 1 20 11.5Z" />
          <path d="M9.5 10.2c.4 1.2 1.3 2.3 2.5 3.1" />
          <path d="M11.8 13.3c.6.4 1.4.7 2.2.8" />
        </svg>
      )
    },
    {
      title: 'Telegram',
      desc: 'Handle inbound Telegram chats in the same workflow as your other customer channels.',
      meta: 'Bot + Inbox sync',
      delay: 'd2',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M21 4 3 11l6 2 2 7 3-4 4 3 3-15Z" />
          <path d="m9 13 9-9" />
        </svg>
      )
    },
    {
      title: 'Instagram',
      desc: 'Reply to DMs, qualify leads, and convert conversations without leaving your control room.',
      meta: 'Meta DM support',
      delay: 'd3',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      )
    },
    {
      title: 'Facebook Messenger',
      desc: 'Unify Facebook page messages into one inbox with SLA tracking and smart handoff rules.',
      meta: 'Page inbox connected',
      delay: 'd1',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.4 4.9 3.7 6.4V21l3.1-1.7c.7.2 1.4.3 2.2.3 5 0 9-3.7 9-8.3S17 3 12 3Z" />
          <path d="m8.5 12 2.5 2 4.5-4" />
        </svg>
      )
    },
    {
      title: 'Slack',
      desc: 'Send escalations to Slack channels and keep agents updated instantly when context changes.',
      meta: 'Ops notifications',
      delay: 'd2',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M8 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm0 0v6" />
          <path d="M4 8a2 2 0 1 1 0-4h6" />
          <path d="M20 16a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm0 0v-6" transform="translate(-4 0)" />
          <path d="M20 12a2 2 0 1 1 0 4h-6" />
        </svg>
      )
    },
    {
      title: 'Shopify',
      desc: 'Sync products, inventory, and orders so your AI can sell directly from live conversations.',
      meta: 'Catalog + order sync',
      delay: 'd3',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M6 7h12l-1 13H7L6 7Z" />
          <path d="M9 7a3 3 0 1 1 6 0" />
          <path d="M9 11h6" />
        </svg>
      )
    },
    {
      title: 'WooCommerce',
      desc: 'Connect your WooCommerce store and keep checkout status + order updates in sync automatically.',
      meta: 'Store sync',
      delay: 'd1',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="5" width="18" height="14" rx="3" />
          <path d="m8 10 2 4 2-3 2 3 2-4" />
        </svg>
      )
    },
    {
      title: 'Stripe',
      desc: 'Create secure payment links in-chat and verify payment state instantly for faster fulfillment.',
      meta: 'Global payments',
      delay: 'd2',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M3 10h18" />
          <path d="M8 14h4" />
        </svg>
      )
    },
    {
      title: 'Paystack',
      desc: 'Collect local payments and reconcile successful transactions with order and chat history.',
      meta: 'Africa-first checkout',
      delay: 'd3',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 7h16v10H4z" />
          <path d="M8 7v10" />
          <path d="M12 7v10" />
          <path d="M16 7v10" />
        </svg>
      )
    },
    {
      title: 'Zapier',
      desc: 'Trigger follow-ups and backend workflows from conversation and payment events without code.',
      meta: 'Automation workflows',
      delay: 'd1',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="2" />
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
          <path d="m5.6 5.6 2.8 2.8m7.2 7.2 2.8 2.8M18.4 5.6l-2.8 2.8m-7.2 7.2-2.8 2.8" />
        </svg>
      )
    },
  ];

  return (
    <section id="integrations" className="channels-bg">
      <div className="section">
        <div className="reveal">
          <div className="sec-label">● Integrations</div>
          <h2 className="sec-title">
            Meet your customers<br />where they are.
          </h2>
          <p className="sec-sub">
            Connect once, manage everything from HanDl. New channels added regularly.
          </p>
        </div>
        <div className="integrations-grid">
          {channels.map((ch, i) => (
            <div className={`integration-card reveal ${ch.delay}`} key={i}>
              <div className="integration-icon-wire">{ch.icon}</div>
              <div className="integration-title">{ch.title}</div>
              <div className="integration-desc">{ch.desc}</div>
              <div className="integration-meta">
                <span className="cdot" />
                {ch.meta}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
