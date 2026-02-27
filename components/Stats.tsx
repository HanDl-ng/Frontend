'use client';

import { useEffect, useRef } from 'react';

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.querySelectorAll<HTMLElement>('[data-target]').forEach((el) => {
            const target = parseFloat(el.dataset.target || '0');
            const suffix = el.dataset.suffix || '';
            const dec = parseInt(el.dataset.dec || '0') || 0;
            const start = performance.now();
            const duration = 1500;

            function step(now: number) {
              const progress = Math.min((now - start) / duration, 1);
              const ease = 1 - Math.pow(1 - progress, 3);
              el.textContent = (target * ease).toFixed(dec) + suffix;
              if (progress < 1) requestAnimationFrame(step);
            }

            requestAnimationFrame(step);
          });

          observer.disconnect();
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { target: '2.4', suffix: 'k', dec: '1', label: 'Businesses using HanDl', delay: '' },
    { target: '84', suffix: '%', dec: '0', label: 'Conversations handled by AI', delay: 'd1' },
    { target: '12', suffix: 'M', dec: '0', label: 'Messages processed monthly', delay: 'd2' },
    { target: '4.2', suffix: 'h', dec: '1', label: 'Saved per day per business', delay: 'd3' },
  ];

  return (
    <div className="stats-section" ref={sectionRef}>
      <div style={{ position: 'absolute', top: -80, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,.04)' }} />
      <div style={{ position: 'absolute', bottom: -100, right: -50, width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,255,255,.03)' }} />
      <div className="stats-inner">
        {stats.map((s, i) => (
          <div className={`stat-item reveal ${s.delay}`} key={i}>
            <div
              className="stat-number"
              data-target={s.target}
              data-suffix={s.suffix}
              data-dec={s.dec}
            >
              {s.target}{s.suffix}
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
