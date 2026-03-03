'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const steps = [
  {
    num: '01',
    title: 'Connect Your Channels',
    desc: 'Link WhatsApp, web chat, email, or any messaging channel in under 2 minutes. Your customers stay on the platforms they already use.',
    icon: '🔌',
    details: ['WhatsApp Business API', 'Web chat embed (1 line of code)', 'Email forwarding', 'More channels coming soon'],
  },
  {
    num: '02',
    title: 'AI Handles Conversations',
    desc: 'HanDl\'s AI agent responds to customers in your tone, answers questions, and handles common requests — 24/7, in natural language.',
    icon: '💬',
    details: ['Custom tone & personality', 'Understands context and intent', 'Escalates to you when needed', 'Learns from your products & instructions'],
  },
  {
    num: '03',
    title: 'Orders & Payments Created',
    desc: 'When a customer wants to buy, the AI creates the order, sends a payment link, and tracks fulfillment — without you lifting a finger.',
    icon: '🛒',
    details: ['Auto-creates orders from chat', 'Sends payment links (Paystack, etc.)', 'Tracks delivery status', 'Sends receipts & confirmations'],
  },
  {
    num: '04',
    title: 'Storefront & API',
    desc: 'Optionally share a mini storefront link or build custom integrations via our developer API. Your business data, your way.',
    icon: '🌐',
    details: ['Shareable storefront — no website needed', 'REST API for everything', 'Webhooks for real-time events', 'Build on top of HanDl'],
  },
];

export default function HowItWorksPage() {
  return (
    <div className="landing-page" style={{ cursor: 'auto' }}>
      <Navbar />
      <div style={{ paddingTop: 120, paddingBottom: 80 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 72px', padding: '0 40px' }}>
          <div className="sec-label" style={{ justifyContent: 'center', marginBottom: 16 }}>● How it works</div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-2px', lineHeight: 1.05, color: 'var(--ink)', marginBottom: 20 }}>
            From zero to<br />running in minutes.
          </h1>
          <p style={{ fontSize: 17, color: 'var(--ink-m)', lineHeight: 1.7, fontWeight: 300 }}>
            No dev required. Connect a channel, let the AI handle conversations, and watch orders come in automatically.
          </p>
        </div>

        {/* Steps */}
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 40px', display: 'grid', gap: 48 }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: 24, alignItems: 'start' }}>
              <div style={{
                width: 64, height: 64, borderRadius: 16, background: 'rgba(46,139,110,.06)', border: '1px solid rgba(46,139,110,.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0,
              }}>
                {step.icon}
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 6 }}>
                  Step {step.num}
                </div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, color: 'var(--ink)', marginBottom: 8, letterSpacing: '-.5px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-m)', marginBottom: 16 }}>
                  {step.desc}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 20px' }}>
                  {step.details.map((d, j) => (
                    <div key={j} style={{ fontSize: 13, color: 'var(--ink-m)', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ color: 'var(--teal)', fontWeight: 700 }}>✓</span> {d}
                    </div>
                  ))}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div style={{ gridColumn: 1, display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: 2, height: 48, background: 'var(--border)' }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 80, padding: '0 40px' }}>
          <a href="/signup" className="btn btn-teal btn-xl">Get started free →</a>
          <p style={{ fontSize: 12, color: 'var(--ink-f)', marginTop: 12 }}>No credit card required · Free Starter plan forever</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
