'use client';

import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

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
          <li 
            className="nav-dropdown"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <span className="nav-dropdown-trigger">
              Products
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
            <div className={`nav-dropdown-menu${productsOpen ? ' open' : ''}`}>
              <a href="/products/sales-agent" className="nav-dropdown-item">
                <div className="nav-dropdown-icon" style={{ background: 'linear-gradient(135deg, #2e8b6e 0%, #3da882 100%)' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <polyline points="17 11 19 13 23 9" />
                  </svg>
                </div>
                <div className="nav-dropdown-content">
                  <div className="nav-dropdown-title">Sales Agent</div>
                  <div className="nav-dropdown-desc">Sells products and provides customer support</div>
                </div>
              </a>
              <a href="/products/support-agent" className="nav-dropdown-item">
                <div className="nav-dropdown-icon" style={{ background: 'linear-gradient(135deg, #5a7fd4 0%, #7094e8 100%)' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className="nav-dropdown-content">
                  <div className="nav-dropdown-title">Support Agent</div>
                  <div className="nav-dropdown-desc">Customer support without sales features</div>
                </div>
              </a>
            </div>
          </li>

          <li><a href="#features">Features</a></li>
          <li><a href="/pricing">Pricing</a></li>
          
          <li><a href="#integrations">Integrations</a></li>
          
          <li><a href="/blog">Blog</a></li>
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
          <div className="mobile-menu-section">Products</div>
          <a href="/products/sales-agent" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>Sales Agent</a>
          <a href="/products/support-agent" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>Support Agent</a>
          <div className="mobile-menu-section">Solutions</div>
          <a href="/solutions/ecommerce" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>E-commerce</a>
          <a href="/solutions/small-business" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>Small Business</a>
          <div className="mobile-menu-section">Resources</div>
          <a href="/pricing" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>Pricing</a>
          <a href="#integrations" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>Integrations</a>
          <a href="/blog" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>Blog</a>
          <a href="/docs" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>Docs</a>
        </div>
        <div className="mobile-menu-actions">
          <a href="/signin" className="btn btn-ghost" onClick={() => setMenuOpen(false)}>Sign in</a>
          <a href="/signup" className="btn btn-teal" onClick={() => setMenuOpen(false)}>Start free →</a>
        </div>
      </div>
    </>
  );
}
