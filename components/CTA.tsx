export default function CTA() {
  return (
    <section className="cta-section">
      <div
        className="cta-blob"
        style={{
          width: 500, height: 500,
          background: 'radial-gradient(circle,rgba(46,139,110,.12),transparent 70%)',
          top: -100, right: -100,
        }}
      />
      <div
        className="cta-blob"
        style={{
          width: 400, height: 400,
          background: 'radial-gradient(circle,rgba(255,200,100,.08),transparent 70%)',
          bottom: -100, left: -100,
        }}
      />
      <div className="cta-inner reveal">
        <div className="sec-label" style={{ justifyContent: 'center' }}>● Get started today</div>
        <h2 className="sec-title" style={{ fontSize: 'clamp(40px,5vw,64px)' }}>
          Your business<br />deserves an <span style={{ color: 'var(--teal)' }}>AI agent.</span>
        </h2>
        <p className="sec-sub" style={{ margin: '0 auto 40px' }}>
          Set up in under 10 minutes. Connect WhatsApp, configure your AI agent, and let HanDl handle the rest.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/signup" className="btn btn-primary btn-xl">Start for free →</a>
          <a href="#" className="btn btn-ghost btn-xl">Book a demo</a>
        </div>
        <div style={{ marginTop: 24, fontSize: 13, color: 'var(--ink-f)' }}>
          No credit card required · Free forever on Starter · Cancel anytime
        </div>
      </div>
    </section>
  );
}
