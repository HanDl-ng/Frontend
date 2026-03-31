export default function Features() {
  const features = [
    { 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      ),
      title: 'AI Business Agent', 
      desc: 'An always-on agent that handles customer conversations end-to-end — answers questions, takes orders, and escalates to humans when needed.', 
      delay: 'd1' 
    },
    { 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          <path d="M12 8v4"/>
          <circle cx="12" cy="16" r="0.5" fill="currentColor"/>
        </svg>
      ),
      title: 'Omnichannel Inbox', 
      desc: 'Handle conversations from WhatsApp, Instagram, SMS, and email in a single unified inbox with smart routing and AI handoff controls.', 
      delay: 'd2' 
    },
    { 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
          <line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
      ),
      title: 'Orders & Products', 
      desc: 'Manage your product catalog, track orders, and let your AI agent create orders directly from conversations — no manual data entry.', 
      delay: 'd3' 
    },
    { 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
          <line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
      ),
      title: 'Payments Built In', 
      desc: 'Send payment links, confirm transactions, and update order status automatically. Native integrations with Paystack, Flutterwave, and more.', 
      delay: 'd1' 
    },
    { 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      title: 'Storefront', 
      desc: 'A simple, shareable online storefront for your products. Customers browse, order, and pay — with your AI agent assisting in real time.', 
      delay: 'd2' 
    },
    { 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="18" y1="20" x2="18" y2="10"/>
          <line x1="12" y1="20" x2="12" y2="4"/>
          <line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
      ),
      title: 'Reports & Insights', 
      desc: 'See messaging performance, AI resolution rates, order volumes, and revenue metrics across all channels in one dashboard.', 
      delay: 'd3' 
    },
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
              <div className="feat-icon-wire">{feat.icon}</div>
              <div className="feat-title">{feat.title}</div>
              <div className="feat-desc">{feat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
