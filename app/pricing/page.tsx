'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Pricing from '@/components/Pricing';

export default function PricingPage() {
  return (
    <div className="landing-page" style={{ cursor: 'auto' }}>
      <Navbar />
      <div style={{ paddingTop: 100 }}>
        <Pricing />

        {/* FAQ */}
        <section style={{ maxWidth: 720, margin: '0 auto', padding: '40px 40px 80px' }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, letterSpacing: '-.5px', marginBottom: 32, textAlign: 'center', color: 'var(--ink)' }}>
            Frequently Asked Questions
          </h3>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              { q: 'What counts as a message?', a: 'Any inbound or outbound message across your connected channels — WhatsApp, web chat, email, etc. System messages like delivery receipts don\'t count.' },
              { q: 'What happens when I hit my limit?', a: 'You\'ll get a heads-up at 80% usage. After that, we apply soft limits — no hard cutoffs. You can buy extra units anytime from Settings → Billing.' },
              { q: 'Can I switch plans anytime?', a: 'Yes. Upgrades take effect immediately, downgrades apply at the end of your billing cycle. No lock-in, no penalties.' },
              { q: 'Do you offer a free trial?', a: 'The Starter plan is free forever. No credit card required. When you\'re ready to grow, upgrade is instant.' },
              { q: 'How does usage billing work?', a: 'Each plan includes a base allocation. Additional units are billed at a flat per-unit rate — visible on your billing dashboard in real time.' },
            ].map((faq, i) => (
              <details key={i} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
                <summary style={{ padding: '16px 20px', fontSize: 14, fontWeight: 600, color: 'var(--ink)', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {faq.q}
                  <span style={{ color: 'var(--ink-f)', fontSize: 18, transition: 'transform .2s' }}>+</span>
                </summary>
                <div style={{ padding: '0 20px 16px', fontSize: 13, lineHeight: 1.7, color: 'var(--ink-m)' }}>{faq.a}</div>
              </details>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
