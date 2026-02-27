'use client';

import WorkflowCanvas from './WorkflowCanvas';

interface AutomationsProps {
  onOpenTemplates?: () => void;
}

export default function Automations({ onOpenTemplates }: AutomationsProps) {
  return (
    <section id="automations" className="auto-section">
      <div className="auto-bg-grid" />
      <div className="auto-inner">
        {/* Left text */}
        <div className="auto-text reveal">
          <div className="sec-label">● Automations</div>
          <h2 className="sec-title">
            Your business,<br />on autopilot.
          </h2>
          <p className="sec-sub">
            Build flows that handle the full customer journey — from first message to delivered order — without lifting a finger.
          </p>
          <div className="auto-ctas">
            <a
              href="#"
              className="btn btn-teal btn-lg"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                onOpenTemplates?.();
              }}
            >
              See templates ↗
            </a>
            <a href="#" className="btn btn-outline-white btn-lg">Build a flow →</a>
          </div>
          {/* Live stats */}
          <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 14, padding: 16 }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: -1, marginBottom: 4 }}>1,240</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.45)' }}>Flows run today</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 14, padding: 16 }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: 'var(--teal)', letterSpacing: -1, marginBottom: 4 }}>98.2%</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.45)' }}>Success rate</div>
            </div>
          </div>
        </div>

        {/* Interactive workflow canvas */}
        <WorkflowCanvas />
      </div>
    </section>
  );
}
