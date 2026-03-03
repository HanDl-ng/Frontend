'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingCompletePage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/app/dashboard');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [router]);

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--cream)', padding: 40, textAlign: 'center',
    }}>
      <div style={{ maxWidth: 480 }}>
        {/* Animated checkmark */}
        <div style={{
          width: 80, height: 80, borderRadius: '50%', background: 'rgba(46,139,110,.08)', border: '2px solid var(--teal)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px',
          animation: 'fadeInUp .6s cubic-bezier(.4,0,.2,1) both',
        }}>
          <span style={{ fontSize: 36, color: 'var(--teal)' }}>✓</span>
        </div>

        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 32, letterSpacing: '-1px',
          color: 'var(--ink)', marginBottom: 12,
          animation: 'fadeInUp .7s .1s cubic-bezier(.4,0,.2,1) both',
        }}>
          You&apos;re all set!
        </h1>

        <p style={{
          fontSize: 15, color: 'var(--ink-m)', lineHeight: 1.7, marginBottom: 40,
          animation: 'fadeInUp .7s .2s cubic-bezier(.4,0,.2,1) both',
        }}>
          Your AI agent is ready to handle conversations, take orders, and grow your business. Let&apos;s get started.
        </p>

        <div style={{ animation: 'fadeInUp .7s .3s cubic-bezier(.4,0,.2,1) both' }}>
          <a href="/app/dashboard" className="btn btn-teal btn-xl">
            Open Dashboard →
          </a>
          <p style={{ fontSize: 12, color: 'var(--ink-f)', marginTop: 16 }}>
            Redirecting in {countdown}s…
          </p>
        </div>
      </div>
    </div>
  );
}
