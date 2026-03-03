'use client';

import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      navRef.current?.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
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
          <li><a href="/how-it-works">How It Works</a></li>
          <li><a href="/pricing">Pricing</a></li>
          <li><a href="/docs">Docs</a></li>
        </ul>
        <div className="nav-actions">
          <a href="/signin" className="btn btn-ghost">Sign in</a>
          <a href="/signup" className="btn btn-primary">Start free →</a>
          <button className="nav-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile slide-out menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <div className="mobile-menu-header">
          <a href="#" className="nav-logo" onClick={() => setMenuOpen(false)}>
            <div className="logo-mark">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="2" width="6" height="6" rx="1.5" fill="white" opacity=".9" />
                <rect x="10" y="2" width="6" height="6" rx="1.5" fill="white" opacity=".5" />
                <rect x="2" y="10" width="6" height="6" rx="1.5" fill="white" opacity=".5" />
              </svg>
            </div>
            HanDl
          </a>
          <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="mobile-menu-nav">
          <a href="/how-it-works" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>How It Works</a>
          <a href="/pricing" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>Pricing</a>
          <a href="/docs" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>Docs</a>
          <a href="/changelog" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>Changelog</a>
          <a href="/contact" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
        <div className="mobile-menu-actions">
          <a href="/signin" className="btn btn-ghost" onClick={() => setMenuOpen(false)}>Sign in</a>
          <a href="/signup" className="btn btn-teal" onClick={() => setMenuOpen(false)}>Start free →</a>
        </div>
      </div>
    </>
  );
}
