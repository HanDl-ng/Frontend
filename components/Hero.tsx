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
      <div className="mesh mesh-1" ref={(el) => (meshRefs.current[0] = el)} />
      <div className="mesh mesh-2" ref={(el) => (meshRefs.current[1] = el)} />
      <div className="mesh mesh-3" ref={(el) => (meshRefs.current[2] = el)} />
      <div className="hero-grid" />

      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          Now with AI-powered order creation
        </div>
        <h1 className="hero-headline">
          The <span className="uw">automation</span>
          <br />
          layer for your
          <br />
          <span className="accent">business ops.</span>
        </h1>
        <p className="hero-sub">
          Connect messaging channels, let AI handle conversations, create orders, trigger delivery,
          and build automated workflows — all in one place.
        </p>
        <div className="hero-actions">
          <a href="#" className="btn btn-primary btn-xl">Get started free</a>
          <a href="#" className="btn btn-ghost btn-xl">▶&nbsp;&nbsp;Watch 3-min demo</a>
        </div>
        <div className="hero-social">
          <div className="avatars">
            <div className="avatar av1">A</div>
            <div className="avatar av2">B</div>
            <div className="avatar av3">C</div>
            <div className="avatar av4">D</div>
          </div>
          <span className="hero-social-text">Trusted by 2,400+ small businesses</span>
        </div>
      </div>

      <DashboardPreview />
    </section>
  );
}
