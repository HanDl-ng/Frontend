'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'How long does setup take?',
    a: 'Most teams connect a channel and launch their first AI flow in under 15 minutes. You can start simple and expand gradually without downtime.',
  },
  {
    q: 'Can I use HanDl with WhatsApp and Instagram at the same time?',
    a: 'Yes. You can connect multiple channels and manage everything from one inbox while keeping channel-specific automations and response rules.',
  },
  {
    q: 'What happens when the AI is not confident?',
    a: 'Low-confidence conversations can be routed to a human automatically. You can define confidence thresholds, escalation rules, and priority queues.',
  },
  {
    q: 'Do you support local payments like Paystack?',
    a: 'Yes. You can send payment links in chat and track payment status updates with supported providers including Paystack and Stripe.',
  },
  {
    q: 'Can my team collaborate with different permissions?',
    a: 'Yes. You can assign roles, control who can edit automations, and restrict sensitive actions such as refunds or payment updates.',
  },
  {
    q: 'Is there a free plan before upgrading?',
    a: 'Yes. The Starter tier is free, so you can test flows, onboard your team, and upgrade only when your usage grows.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="faq-section">
      <div className="section">
        <div className="reveal">
          <div className="sec-label">● FAQs</div>
          <h2 className="sec-title">Questions, answered clearly.</h2>
          <p className="sec-sub">
            Everything teams usually ask before switching to HanDl.
          </p>
        </div>

        <div className="faq-list reveal d1">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div className={`faq-item${isOpen ? ' open' : ''}`} key={item.q}>
                <button
                  className="faq-question"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="faq-plus">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen ? (
                  <div className="faq-answer-wrap">
                    <p className="faq-answer">{item.a}</p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
