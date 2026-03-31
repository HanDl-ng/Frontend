'use client';

import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const root = document.documentElement;
    const body = document.body;
    let activeTarget: HTMLElement | null = null;

    body.classList.add('landing-torch');

    const onMouseMove = (e: MouseEvent) => {
      root.style.setProperty('--cursor-x', `${e.clientX}px`);
      root.style.setProperty('--cursor-y', `${e.clientY}px`);

      const target = (e.target as HTMLElement | null)?.closest(
        'a,button,.btn,.feat-card,.integration-card,.price-card,.testi-comment,.journal-card,.faq-question,.footer-social,.footer-link'
      ) as HTMLElement | null;

      if (activeTarget && activeTarget !== target) {
        activeTarget.classList.remove('torch-lit');
      }

      if (target) {
        const rect = target.getBoundingClientRect();
        target.style.setProperty('--torch-x', `${e.clientX - rect.left}px`);
        target.style.setProperty('--torch-y', `${e.clientY - rect.top}px`);
        target.classList.add('torch-lit');
      }

      activeTarget = target;
    };

    document.addEventListener('mousemove', onMouseMove);

    const onMouseLeaveWindow = () => {
      if (activeTarget) {
        activeTarget.classList.remove('torch-lit');
      }
      activeTarget = null;
    };

    document.addEventListener('mouseleave', onMouseLeaveWindow);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);

      if (activeTarget) {
        activeTarget.classList.remove('torch-lit');
      }

      body.classList.remove('landing-torch');
    };
  }, []);

  return null;
}
