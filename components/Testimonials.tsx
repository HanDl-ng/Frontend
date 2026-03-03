export default function Testimonials() {
  const testimonials = [
    {
      text: '"We went from managing 3 different apps to just HanDl. Our AI handles 90% of WhatsApp orders automatically. Revenue is up 40%."',
      name: 'Amaka Okafor',
      role: "Owner, Amaka's Kitchen · Lagos",
      avatarClass: 'ta1',
      letter: 'A',
      delay: '',
    },
    {
      text: '"I set up the AI agent and connected WhatsApp in 20 minutes. My team used to spend 4 hours a day replying to messages — now it\'s 20 minutes."',
      name: 'Biodun Adeleke',
      role: 'Founder, QuickDrop · Abuja',
      avatarClass: 'ta2',
      letter: 'B',
      delay: 'd1',
    },
    {
      text: '"Finally an AI tool that understands how Nigerian businesses actually work. Local payment providers, rider APIs. This is the one."',
      name: 'Chidinma Eze',
      role: 'CEO, FashionHub NG · PH',
      avatarClass: 'ta3',
      letter: 'C',
      delay: 'd2',
    },
  ];

  return (
    <section className="testi-bg">
      <div className="section">
        <div className="reveal" style={{ textAlign: 'center' }}>
          <div className="sec-label" style={{ justifyContent: 'center' }}>● Testimonials</div>
          <h2 className="sec-title">
            Loved by small businesses<br />doing big things.
          </h2>
        </div>
        <div className="testi-grid">
          {testimonials.map((t, i) => (
            <div className={`testi-card reveal ${t.delay}`} key={i}>
              <div className="testi-stars">★★★★★</div>
              <p className="testi-text">{t.text}</p>
              <div className="testi-author">
                <div className={`ta ${t.avatarClass}`}>{t.letter}</div>
                <div>
                  <div className="ta-name">{t.name}</div>
                  <div className="ta-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
