'use client';

import { useEffect, useRef } from 'react';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      navRef.current?.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav ref={navRef} id="nav">
      <a href="#" className="nav-logo">
        <div className="logo-mark">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="2" y="2" width="6" height="6" rx="1.5" fill="white" opacity=".9" />
            <rect x="10" y="2" width="6" height="6" rx="1.5" fill="white" opacity=".5" />
            <rect x="2" y="10" width="6" height="6" rx="1.5" fill="white" opacity=".5" />
          </svg>
        </div>
        HanDl
      </a>
      <ul className="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#automations">Automations</a></li>
        <li><a href="#channels">Channels</a></li>
        <li><a href="#pricing">Pricing</a></li>
      </ul>
      <div className="nav-actions">
        <a href="#" className="btn btn-ghost">Sign in</a>
        <a href="#" className="btn btn-primary">Start free →</a>
      </div>
    </nav>
  );
}
