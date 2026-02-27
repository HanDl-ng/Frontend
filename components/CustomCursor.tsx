'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const ringEl = ringRef.current;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      }
    };

    const animRing = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringEl) {
        ringEl.style.left = ring.current.x + 'px';
        ringEl.style.top = ring.current.y + 'px';
      }
      requestAnimationFrame(animRing);
    };

    document.addEventListener('mousemove', onMouseMove);
    const rafId = requestAnimationFrame(animRing);

    // Add hover effects
    const addHover = (sel: string) => {
      document.querySelectorAll(sel).forEach((el) => {
        el.addEventListener('mouseenter', () => {
          cursor?.classList.add('hovered');
          ringEl?.classList.add('hovered');
        });
        el.addEventListener('mouseleave', () => {
          cursor?.classList.remove('hovered');
          ringEl?.classList.remove('hovered');
        });
      });
    };

    // Delay to ensure DOM is ready
    const timer = setTimeout(() => {
      addHover('a,.btn,.feat-card,.ch-card,.price-card,.testi-card,.wf-node,.ctx-act,.chat-send,.ps-item,.cli,.tpl-card,.mf-tab,.wf-btn,.modal-close,.ndo-var');
    }, 500);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}
