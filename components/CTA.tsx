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
      <div className="cta-shell reveal">
        <div className="cta-copy">
          <div className="sec-label">● Get started today</div>
          <h2 className="cta-title">
            Your business deserves
            <br />an <span className="cta-accent">AI agent</span>.
          </h2>
          <p className="cta-sub">
            Set up in under 10 minutes. Connect WhatsApp, configure your AI agent, and let HanDl handle the rest.
          </p>
          <div className="cta-actions-row">
            <a href="/signup" className="btn btn-primary btn-xl">Start for free →</a>
            <a href="#" className="btn btn-ghost btn-xl">Book a demo</a>
          </div>
          <div className="cta-note">
            No credit card required · Free forever on Starter · Cancel anytime
          </div>
        </div>

        <div className="cta-panel">
          <div className="cta-panel-title">What happens next</div>
          <div className="cta-steps">
            <div className="cta-step"><span className="cta-step-dot" />Connect channels in minutes</div>
            <div className="cta-step"><span className="cta-step-dot" />Train your AI with your tone & policies</div>
            <div className="cta-step"><span className="cta-step-dot" />Go live and monitor performance</div>
          </div>
          <div className="cta-metrics">
            <div className="cta-metric">
              <div className="cta-metric-num">10m</div>
              <div className="cta-metric-label">Avg setup</div>
            </div>
            <div className="cta-metric">
              <div className="cta-metric-num">90%</div>
              <div className="cta-metric-label">Auto-resolution</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
