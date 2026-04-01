'use client';

import { useEffect, useState } from 'react';
import './UpdatesBanner.css';

export default function UpdatesBanner() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldHide = window.scrollY > 12;
      setIsHidden(shouldHide);
      document.body.classList.toggle('updates-hidden', shouldHide);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.classList.remove('updates-hidden');
    };
  }, []);

  return (
    <div className={`updates-banner${isHidden ? ' hidden' : ''}`}>
      <div className="updates-banner-content">
        <div className="updates-banner-text">
          <span className="updates-badge">New</span>
          <span className="updates-message">
            Dark mode & keyboard shortcuts now live — Press Cmd+K to explore
          </span>
          <a href="/changelog" className="updates-link">
            See what's new →
          </a>
        </div>
      </div>
    </div>
  );
}
