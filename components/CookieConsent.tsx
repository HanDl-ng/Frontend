'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('handl_cookie_consent');
    if (!consent) {
      // Delay showing for a nicer UX
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('handl_cookie_consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('handl_cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <p className="cookie-text">
        We use cookies to improve your experience and analyze site traffic. 
        By continuing, you agree to our{' '}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
      <div className="cookie-actions">
        <button className="btn btn-ghost" onClick={decline}>Decline</button>
        <button className="btn btn-teal" onClick={accept}>Accept</button>
      </div>
    </div>
  );
}
