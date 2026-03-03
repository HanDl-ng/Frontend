export default function Channels() {
  const channels = [
    { emoji: '💬', name: 'WhatsApp', desc: 'Business API supported', delay: 'd1' },
    { emoji: '📸', name: 'Instagram DM', desc: 'Meta API integration', delay: 'd2' },
    { emoji: '📧', name: 'Email', desc: 'SMTP & Inbox', delay: 'd3' },
    { emoji: '📱', name: 'SMS', desc: "Africa's Talking, Twilio", delay: 'd4' },
    { emoji: '🌐', name: 'Web Chat', desc: 'Embeddable widget', delay: 'd1' },
    { emoji: '💙', name: 'Facebook Messenger', desc: 'Page inbox connected', delay: 'd2' },
    { emoji: '💳', name: 'Paystack', desc: 'Payments & webhooks', delay: 'd3' },
    { emoji: '🛵', name: 'Delivery APIs', desc: 'Gokada, Kwik, custom', delay: 'd4' },
  ];

  return (
    <section id="channels" className="channels-bg">
      <div className="section">
        <div className="reveal" style={{ textAlign: 'center' }}>
          <div className="sec-label" style={{ justifyContent: 'center' }}>● Integrations</div>
          <h2 className="sec-title">
            Meet your customers<br />where they are.
          </h2>
          <p className="sec-sub" style={{ margin: '0 auto' }}>
            Connect once, manage everything from HanDl. New channels added regularly.
          </p>
        </div>
        <div className="channels-grid">
          {channels.map((ch, i) => (
            <div className={`ch-card reveal ${ch.delay}`} key={i}>
              <span className="ch-emoji">{ch.emoji}</span>
              <div className="ch-name">{ch.name}</div>
              <div className="ch-desc">
                <span className="cdot" />
                {ch.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
