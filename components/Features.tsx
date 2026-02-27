export default function Features() {
  const features = [
    { icon: '💬', title: 'Omnichannel Inbox', desc: 'Handle conversations from WhatsApp, Instagram, SMS, and email in a single unified inbox with smart routing and AI handoff controls.', delay: 'd1' },
    { icon: '⚡', title: 'Visual Flow Builder', desc: 'Drag-and-drop automation canvas. Connect triggers, AI steps, conditions, and actions like a pipeline diagram — no code needed.', delay: 'd2' },
    { icon: '🧠', title: 'AI That Actually Works', desc: 'AI handles end-to-end customer conversations, qualifies leads, takes orders, and hands off to humans exactly when needed.', delay: 'd3' },
    { icon: '💳', title: 'Payments Built In', desc: 'Send payment links, confirm transactions, and trigger the next step automatically. Native integrations with Paystack, Flutterwave, and more.', delay: 'd1' },
    { icon: '🛵', title: 'Delivery Dispatch', desc: 'Call a rider, track deliveries, update customers in real time, and handle failed deliveries — all without leaving HanDl.', delay: 'd2' },
    { icon: '📊', title: 'Analytics & Reports', desc: 'See messaging performance, conversion rates, automation success, and delivery metrics across all channels in one dashboard.', delay: 'd3' },
  ];

  return (
    <section id="features">
      <div className="section">
        <div className="reveal">
          <div className="sec-label">● Features</div>
          <h2 className="sec-title">
            Like CI/CD,<br />but for your ops.
          </h2>
          <p className="sec-sub">
            Build automated workflows that connect messaging channels, AI, orders, payments, and delivery into one seamless pipeline.
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
