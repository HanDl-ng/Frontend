export default function Features() {
  const features = [
    { icon: '🤖', title: 'AI Business Agent', desc: 'An always-on agent that handles customer conversations end-to-end — answers questions, takes orders, and escalates to humans when needed.', delay: 'd1' },
    { icon: '💬', title: 'Omnichannel Inbox', desc: 'Handle conversations from WhatsApp, Instagram, SMS, and email in a single unified inbox with smart routing and AI handoff controls.', delay: 'd2' },
    { icon: '📦', title: 'Orders & Products', desc: 'Manage your product catalog, track orders, and let your AI agent create orders directly from conversations — no manual data entry.', delay: 'd3' },
    { icon: '💳', title: 'Payments Built In', desc: 'Send payment links, confirm transactions, and update order status automatically. Native integrations with Paystack, Flutterwave, and more.', delay: 'd1' },
    { icon: '🏪', title: 'Storefront', desc: 'A simple, shareable online storefront for your products. Customers browse, order, and pay — with your AI agent assisting in real time.', delay: 'd2' },
    { icon: '📊', title: 'Reports & Insights', desc: 'See messaging performance, AI resolution rates, order volumes, and revenue metrics across all channels in one dashboard.', delay: 'd3' },
  ];

  return (
    <section id="features">
      <div className="section">
        <div className="reveal">
          <div className="sec-label">● Features</div>
          <h2 className="sec-title">
            Everything your<br />business needs.
          </h2>
          <p className="sec-sub">
            An AI agent that connects your channels, handles conversations, and manages operations — all from one platform.
          </p>
        </div>
        <div className="features-grid">
          {features.map((feat, i) => (
            <div className={`feat-card reveal ${feat.delay}`} key={i}>
              <div className="feat-icon">{feat.icon}</div>
              <div className="feat-title">{feat.title}</div>
              <div className="feat-desc">{feat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
