'use client';

import { useEffect, useRef } from 'react';

export default function DashboardPreview() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const wrap = card.parentElement;

    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const ry = ((e.clientX - r.left - r.width / 2) / r.width) * 5;
      card.style.transform = `rotateX(2deg) rotateY(${ry}deg)`;
    };
    const onLeave = () => {
      card.style.transform = 'rotateX(5deg) rotateY(0deg)';
    };

    wrap?.addEventListener('mousemove', onMove);
    wrap?.addEventListener('mouseleave', onLeave);
    return () => {
      wrap?.removeEventListener('mousemove', onMove);
      wrap?.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className="hero-preview">
      <div className="preview-wrap">
        <div className="preview-card" ref={cardRef}>
          <div className="preview-bar">
            <span className="pb-dot pb-r" />
            <span className="pb-dot pb-y" />
            <span className="pb-dot pb-g" />
            <span className="pb-url">app.handl.io/dashboard</span>
            <div style={{ width: 40, height: 24, background: 'var(--border)', borderRadius: 4 }} />
          </div>
          <div className="preview-body">
            {/* Sidebar */}
            <div className="ps">
              <div className="ps-logo">
                <div className="ps-ld" />
                HanDl
              </div>
              <div className="ps-sec">Overview</div>
              <div className="ps-item active">
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                  <rect x="1" y="1" width="5" height="5" rx="1" fill="currentColor" opacity=".8" />
                  <rect x="8" y="1" width="5" height="5" rx="1" fill="currentColor" opacity=".4" />
                  <rect x="1" y="8" width="5" height="5" rx="1" fill="currentColor" opacity=".4" />
                  <rect x="8" y="8" width="5" height="5" rx="1" fill="currentColor" opacity=".4" />
                </svg>
                Dashboard
              </div>
              <div className="ps-item">
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                  <path d="M2 3h10v7a2 2 0 01-2 2H4a2 2 0 01-2-2V3z" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M5 3V2h4v1" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                Conversations
              </div>
              <div className="ps-item">
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                  <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M4.5 7h5M7 4.5v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                Automations
              </div>
              <div className="ps-sec">Commerce</div>
              <div className="ps-item">
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                  <path d="M3 3h8l-1 7H4L3 3z" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="5.5" cy="12" r="1" fill="currentColor" opacity=".6" />
                  <circle cx="9.5" cy="12" r="1" fill="currentColor" opacity=".6" />
                </svg>
                Storefront
              </div>
              <div className="ps-item">
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                  <rect x="1" y="4" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M4 4V3a3 3 0 016 0v1" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                Orders
              </div>
              <div className="ps-sec">System</div>
              <div className="ps-item">
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                  <path d="M2 10l3-4 3 3 4-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                Analytics
              </div>
              <div className="ps-item">
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                  <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M7 1v2M7 11v2M1 7h2M11 7h2" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                Settings
              </div>
            </div>

            {/* Main panel */}
            <div className="pm">
              <div className="pm-hdr">
                <div className="pm-title">Dashboard</div>
                <div className="pm-right">
                  <div className="pm-date">Today, Feb 26</div>
                  <div className="pm-av">J</div>
                </div>
              </div>
              <div className="kpi-grid">
                <div className="kpi-card">
                  <div className="kpi-lbl">Conversations</div>
                  <div className="kpi-val">148</div>
                  <div className="kpi-delta">↑ 12% vs yesterday</div>
                  <div className="sparkline">
                    <svg width="100%" height="22" viewBox="0 0 80 22">
                      <polyline points="0,18 10,14 20,16 30,8 40,12 50,6 60,8 70,3 80,5" fill="none" stroke="#2e8b6e" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                <div className="kpi-card">
                  <div className="kpi-lbl">Orders Today</div>
                  <div className="kpi-val">37</div>
                  <div className="kpi-delta">↑ 8% vs yesterday</div>
                  <div className="sparkline">
                    <svg width="100%" height="22" viewBox="0 0 80 22">
                      <polyline points="0,16 10,13 20,18 30,10 40,7 50,10 60,5 70,7 80,3" fill="none" stroke="#2e8b6e" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                <div className="kpi-card">
                  <div className="kpi-lbl">Revenue</div>
                  <div className="kpi-val">₦284k</div>
                  <div className="kpi-delta">↑ 23% vs yesterday</div>
                  <div className="sparkline">
                    <svg width="100%" height="22" viewBox="0 0 80 22">
                      <polyline points="0,20 10,16 20,14 30,12 40,14 50,9 60,5 70,7 80,2" fill="none" stroke="#2e8b6e" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                <div className="kpi-card">
                  <div className="kpi-lbl">AI Handled</div>
                  <div className="kpi-val">84%</div>
                  <div className="kpi-delta neg">↓ 2% vs yesterday</div>
                  <div className="sparkline">
                    <svg width="100%" height="22" viewBox="0 0 80 22">
                      <polyline points="0,7 10,5 20,9 30,7 40,11 50,7 60,9 70,5 80,7" fill="none" stroke="#5a7fd4" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bottom-grid">
                <div className="b-card">
                  <div className="b-card-title">Recent Conversations</div>
                  <div className="ci">
                    <div className="ci-av">A</div>
                    <div className="ci-info">
                      <div className="ci-name">Adaeze Obi</div>
                      <div className="ci-msg">I want to order the jollof rice</div>
                    </div>
                    <span className="tag tag-ai">AI</span>
                  </div>
                  <div className="ci">
                    <div className="ci-av b">B</div>
                    <div className="ci-info">
                      <div className="ci-name">Bolu Adeyemi</div>
                      <div className="ci-msg">When will my order arrive?</div>
                    </div>
                    <span className="tag tag-wait">Wait</span>
                  </div>
                  <div className="ci">
                    <div className="ci-av c">C</div>
                    <div className="ci-info">
                      <div className="ci-name">Chidi Eze</div>
                      <div className="ci-msg">Order #1847 has been paid ✓</div>
                    </div>
                    <span className="tag tag-human">Human</span>
                  </div>
                </div>
                <div className="b-card">
                  <div className="b-card-title">Automation Health</div>
                  <div className="bar-row">
                    <div className="bar-lbl">Sales Flow</div>
                    <div className="bar-bg"><div className="bar-fill bar-teal" style={{ width: '85%' }} /></div>
                    <div style={{ fontSize: 9, color: 'var(--ink-f)', width: 28, textAlign: 'right' }}>85%</div>
                  </div>
                  <div className="bar-row">
                    <div className="bar-lbl">Support</div>
                    <div className="bar-bg"><div className="bar-fill bar-blue" style={{ width: '72%' }} /></div>
                    <div style={{ fontSize: 9, color: 'var(--ink-f)', width: 28, textAlign: 'right' }}>72%</div>
                  </div>
                  <div className="bar-row">
                    <div className="bar-lbl">Delivery</div>
                    <div className="bar-bg"><div className="bar-fill bar-orange" style={{ width: '60%' }} /></div>
                    <div style={{ fontSize: 9, color: 'var(--ink-f)', width: 28, textAlign: 'right' }}>60%</div>
                  </div>
                  <div style={{ display: 'flex', gap: 4, marginTop: 10 }}>
                    <span className="tag tag-live">● 4 Live</span>
                    <span className="tag tag-draft">2 Draft</span>
                    <span className="tag tag-error">1 Error</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
