'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function TopLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [state, setState] = useState<'idle' | 'loading' | 'completing'>('idle');
  const barRef = useRef<HTMLDivElement>(null);
  const trickleTimer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const progressRef = useRef(0);

  const setProgress = useCallback((value: number) => {
    progressRef.current = value;
    if (barRef.current) {
      barRef.current.style.transform = `scaleX(${value / 100})`;
    }
  }, []);

  const start = useCallback(() => {
    setState('loading');
    setProgress(0);

    // Quick initial jump
    requestAnimationFrame(() => setProgress(15));

    // Trickle: slow down as it approaches 90%
    if (trickleTimer.current) clearInterval(trickleTimer.current);
    trickleTimer.current = setInterval(() => {
      const p = progressRef.current;
      if (p >= 90) {
        clearInterval(trickleTimer.current);
        return;
      }
      // Smaller increments as we go further
      const inc = p < 30 ? 8 : p < 60 ? 4 : p < 80 ? 2 : 0.5;
      setProgress(Math.min(p + inc, 90));
    }, 300);
  }, [setProgress]);

  const complete = useCallback(() => {
    if (trickleTimer.current) clearInterval(trickleTimer.current);
    setProgress(100);
    setState('completing');

    setTimeout(() => {
      setState('idle');
      setProgress(0);
    }, 400);
  }, [setProgress]);

  // Complete on route change
  useEffect(() => {
    if (state === 'loading') {
      complete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  // Intercept link clicks to start the bar
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Skip external links, hash links, new-tab links
      if (
        href.startsWith('http') ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        anchor.target === '_blank' ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey
      ) {
        return;
      }

      // Skip if navigating to current page
      const url = new URL(href, window.location.origin);
      if (url.pathname === pathname && url.search === window.location.search) {
        return;
      }

      start();
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname, start]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (trickleTimer.current) clearInterval(trickleTimer.current);
    };
  }, []);

  return (
    <div className={`top-loader ${state !== 'idle' ? 'top-loader-active' : ''} ${state === 'completing' ? 'top-loader-done' : ''}`}>
      <div ref={barRef} className="top-loader-bar" />
    </div>
  );
}
