'use client';

import { useEffect, useRef } from 'react';
import DashboardPreview from './DashboardPreview';

export default function Hero() {
  const meshRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const factors = [0.08, 0.05, 0.1];
      meshRefs.current.forEach((m, i) => {
        if (m) m.style.transform = `translateY(${window.scrollY * factors[i]}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  return (
    <section className="hero">
      <div className="mesh mesh-1" ref={(el) => { meshRefs.current[0] = el; }} />
      <div className="mesh mesh-2" ref={(el) => { meshRefs.current[1] = el; }} />
      <div className="mesh mesh-3" ref={(el) => { meshRefs.current[2] = el; }} />
      <div className="hero-grid" />

      <div className="hero-content">
        <div className="hero-badge" style={{ visibility: 'hidden' }}>
          <span className="badge-dot" />
          &nbsp;
        </div>
        <h1 className="hero-headline">
          An <span className="uw">AI agent</span>
          <br />
          for your
          <br />
          <span className="accent">business ops.</span>
        </h1>
        <p className="hero-sub">
          One AI agent that handles customer conversations, takes orders, manages products, and
          connects your channels — so you can focus on growing.
        </p>
        <div className="hero-actions">
          <a href="/signup" className="btn btn-primary btn-xl">Get started free</a>
          <a href="#" className="btn btn-ghost btn-xl">▶&nbsp;&nbsp;Watch 3-min demo</a>
        </div>
      </div>

      <DashboardPreview />
    </section>
  );
}
