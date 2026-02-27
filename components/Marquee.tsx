export default function Marquee() {
  const items = [
    { icon: '💬', text: 'WhatsApp Business API' },
    { icon: '📸', text: 'Instagram DM' },
    { icon: '📧', text: 'Email' },
    { icon: '📱', text: 'SMS' },
    { icon: '🤖', text: 'AI Conversations' },
    { icon: '💳', text: 'Paystack · Flutterwave' },
    { icon: '🛵', text: 'Delivery Riders' },
    { icon: '📦', text: 'Order Management' },
    { icon: '🔗', text: 'Webhooks & APIs' },
  ];

  // Duplicate for seamless loop
  const allItems = [...items, ...items];

  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {allItems.map((item, i) => (
          <div className="marquee-item" key={i}>
            <span className="mq-icon">{item.icon}</span>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}
