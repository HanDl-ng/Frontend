'use client';

import { useEffect, useState } from 'react';
import DashboardPage from '@/app/app/dashboard/page';

type SlideKey = 'conversations' | 'dashboard';

const slides: Array<{ key: SlideKey; label: string; title: string; sub: string }> = [
  {
    key: 'conversations',
    label: 'Conversations',
    title: 'One inbox. Every channel.',
    sub: 'WhatsApp, Instagram, SMS, and email in a single thread-based inbox with AI + human handoff.',
  },
  {
    key: 'dashboard',
    label: 'Dashboard',
    title: 'Real-time business command center.',
    sub: 'Track activity, monitor team response quality, and catch urgent issues in one view.',
  },
];

export default function ConversationsDemo() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;

  useEffect(() => {
    if (paused) return;

    const id = window.setInterval(() => {
      setActive((p) => (p + 1) % total);
    }, 6500);
    return () => window.clearInterval(id);
  }, [total, paused]);

  const prev = () => setActive((p) => (p - 1 + total) % total);
  const next = () => setActive((p) => (p + 1) % total);
  const current = slides[active];

  return (
    <section>
      <div className="section">
        <div className="reveal">
          <div className="sec-label">● Product Tour</div>
          <h2 className="sec-title">{current.title}</h2>
          <p className="sec-sub">{current.sub}</p>
        </div>

        <div className="reveal showcase-wrap d1">
          <div className="showcase-head">
            <div className="showcase-kicker">{current.label}</div>
            <div className="showcase-controls">
              <button className="showcase-arrow" onClick={prev} aria-label="Previous slide">←</button>
              <button className="showcase-arrow" onClick={next} aria-label="Next slide">→</button>
              <button
                className={`showcase-pause${paused ? ' active' : ''}`}
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? 'Resume slideshow' : 'Pause slideshow'}
                title={paused ? 'Resume slideshow' : 'Pause slideshow'}
              >
                {paused ? '▶' : '⏸'}
              </button>
            </div>
          </div>

          <div className="showcase-frame is-locked" key={current.key}>
            {current.key === 'conversations' && <ConversationsSlide />}
            {current.key === 'dashboard' && <DashboardSlide />}
          </div>

          <div className="showcase-dots" role="tablist" aria-label="Product tour slides">
            {slides.map((slide, idx) => (
              <button
                key={slide.key}
                role="tab"
                aria-selected={idx === active}
                className={`showcase-dot${idx === active ? ' active' : ''}`}
                onClick={() => setActive(idx)}
                aria-label={`Go to ${slide.label}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ConversationsSlide() {
  return (
    <div className="conv-screen">
      <div className="conv-list">
        <div className="conv-list-hdr">
          <div className="conv-list-title">Inbox</div>
          <div className="search-box">Search conversations...</div>
        </div>
        <div className="filter-tabs">
          <div className="ft active">All</div>
          <div className="ft">Unread</div>
        </div>
        <div className="conv-items">
          <div className="cli active"><div className="cli-av b">B</div><div className="cli-m"><div className="cli-top"><span className="cli-name">Bolu Adeyemi</span><span className="cli-time">5m</span></div><div className="cli-msg">When will my order arrive?</div><div className="cli-channel"><span>WhatsApp</span></div></div></div>
          <div className="cli"><div className="cli-av">A</div><div className="cli-m"><div className="cli-top"><span className="cli-name">Adaeze Obi</span><span className="cli-time">8m</span></div><div className="cli-msg">I want to order jollof rice</div><div className="cli-channel"><span>WhatsApp</span></div></div></div>
          <div className="cli"><div className="cli-av c">C</div><div className="cli-m"><div className="cli-top"><span className="cli-name">Chidi Eze</span><span className="cli-time">12m</span></div><div className="cli-msg">Payment received, thanks</div><div className="cli-channel"><span>Instagram</span></div></div></div>
        </div>
      </div>

      <div className="chat-center">
        <div className="chat-topbar">
          <div className="chat-cust"><div className="chat-av">B</div><div><div className="chat-name">Bolu Adeyemi</div><div className="chat-ch">WhatsApp · Open</div></div></div>
          <div className="chat-toggle-ai"><span>Let AI handle</span></div>
        </div>
        <div className="chat-msgs">
          <div className="msg msg-c">Hi, I ordered 30 mins ago. Any ETA?<div className="msg-meta">10:22 AM · WhatsApp</div></div>
          <div className="msg msg-ai">Your rider is on the way. ETA is 10:40 AM.<div className="msg-meta">10:23 AM · AI ✓✓</div></div>
          <div className="msg msg-sys">AI agent created Order #1835 for Coke 500ml</div>
        </div>
        <div className="chat-input"><div className="chat-input-box">Type a message...</div><div className="chat-send">↑</div></div>
      </div>

      <div className="ctx-panel">
        <div className="ctx-sec"><div className="ctx-title">Customer</div><div className="ctx-cust"><div className="ctx-av">B</div><div><div className="ctx-name">Bolu Adeyemi</div><div className="ctx-contact">+234 803 000 0001</div></div></div></div>
        <div className="ctx-sec"><div className="ctx-title">Quick Actions</div><div className="ctx-actions"><div className="ctx-act"><span>Create Order</span></div><div className="ctx-act"><span>Send Payment Link</span></div><div className="ctx-act"><span>Track Delivery</span></div></div></div>
      </div>
    </div>
  );
}

function DashboardSlide() {
  return (
    <div className="replica-shell"><DashboardPage /></div>
  );
}
