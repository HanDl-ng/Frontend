// Delete this entire file when you want to remove the dark version
// Visit /alternate to see the dark version

'use client';

import { useEffect, useRef, useState } from 'react';

export default function AlternatePage() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [integrationsOpen, setIntegrationsOpen] = useState(false);
  const meshRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      navRef.current?.classList.toggle('scrolled', window.scrollY > 20);
      const factors = [0.08, 0.05, 0.1];
      meshRefs.current.forEach((m, i) => {
        if (m) m.style.transform = `translateY(${window.scrollY * factors[i]}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <style jsx global>{`
        .dark-page {
          background: #0a0a0a;
          color: #e5e5e5;
          min-height: 100vh;
        }

        /* All your dark theme CSS here - same as before but compressed */
        .dark-page nav{position:fixed;top:44px;left:0;right:0;z-index:500;display:flex;align-items:center;justify-content:space-between;padding:0 40px;height:68px;background:rgba(10,10,10,0.9);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,0.1);transition:box-shadow .4s}
        .dark-page nav.scrolled{box-shadow:0 2px 8px rgba(0,0,0,0.3)}
        .dark-page .nav-logo{font-family:'Syne',sans-serif;font-weight:800;font-size:22px;letter-spacing:-0.5px;color:#fff;display:flex;align-items:center;gap:8px;text-decoration:none}
        .dark-page .logo-mark{width:32px;height:32px;background:#fff;border-radius:8px;display:flex;align-items:center;justify-content:center}
        .dark-page .hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:120px 40px 80px;position:relative;overflow:hidden}
        .dark-page .hero-headline{font-family:'Syne',sans-serif;font-size:clamp(48px,7vw,86px);font-weight:800;line-height:1.0;letter-spacing:-3px;color:#fff;margin-bottom:24px}
        .dark-page .hero-headline .accent{color:#2e8b6e}
        .dark-page .hero-sub{font-size:18px;color:rgba(255,255,255,0.6);max-width:580px;margin:0 auto 40px;line-height:1.7}
        .dark-page .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:0 20px;height:40px;border-radius:10px;font-size:14px;font-weight:500;cursor:pointer;transition:all .25s;text-decoration:none;border:none}
        .dark-page .btn-primary{background:#fff;color:#0a0a0a}
        .dark-page .btn-ghost{background:transparent;color:rgba(255,255,255,0.7);border:1px solid rgba(255,255,255,0.2)}
        .dark-page .btn-xl{height:60px;padding:0 36px;font-size:16px;border-radius:14px}
      `}</style>

      <div className="dark-page">
        <div style={{position:'fixed',top:0,left:0,right:0,zIndex:600,background:'#141414',borderBottom:'1px solid rgba(255,255,255,0.1)',padding:'10px 40px',textAlign:'center'}}>
          <span style={{background:'#2e8b6e',color:'#fff',fontSize:'10px',fontWeight:600,textTransform:'uppercase',padding:'4px 8px',borderRadius:'4px',marginRight:'12px'}}>New</span>
          <span style={{color:'rgba(255,255,255,0.9)',fontSize:'13px'}}>Dark mode & keyboard shortcuts now live</span>
        </div>

        <nav ref={navRef}>
          <a href="#" className="nav-logo">
            <div className="logo-mark">HanDl Logo</div>
            HanDl
          </a>
          <div style={{display:'flex',gap:'32px',color:'rgba(255,255,255,0.7)',fontSize:'14px'}}>
            <a href="/products/sales-agent" style={{color:'inherit',textDecoration:'none'}}>Products</a>
            <a href="/pricing" style={{color:'inherit',textDecoration:'none'}}>Pricing</a>
            <a href="/blog" style={{color:'inherit',textDecoration:'none'}}>Blog</a>
          </div>
          <div style={{display:'flex',gap:'12px'}}>
            <a href="/signin" className="btn btn-ghost">Sign in</a>
            <a href="/signup" className="btn btn-primary">Start free →</a>
          </div>
        </nav>

        <section className="hero">
          <h1 className="hero-headline">
            An AI agent
            <br />
            that runs your
            <br />
            <span className="accent">business ops.</span>
          </h1>
          <p className="hero-sub">
            One AI agent that handles customer conversations, takes orders, manages products, and
            connects your channels — so you can focus on growing.
          </p>
          <div style={{display:'flex',gap:'12px',marginTop:'40px'}}>
            <a href="/signup" className="btn btn-primary btn-xl">Get started free</a>
            <a href="#" className="btn btn-ghost btn-xl">▶ Watch demo</a>
          </div>
        </section>
      </div>
    </>
  );
}
