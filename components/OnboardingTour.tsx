'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface TourStep {
  target: string; // CSS selector
  title: string;
  description: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

interface OnboardingTourProps {
  steps: TourStep[];
  onComplete: () => void;
  storageKey?: string;
}

export default function OnboardingTour({ steps, onComplete, storageKey = 'handl_tour_done' }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const done = localStorage.getItem(storageKey);
    if (!done) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [storageKey]);

  const updatePosition = useCallback(() => {
    if (!visible || currentStep >= steps.length) return;
    const el = document.querySelector(steps[currentStep].target);
    if (el) {
      const r = el.getBoundingClientRect();
      setRect(r);
    }
  }, [visible, currentStep, steps]);

  useEffect(() => {
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [updatePosition]);

  const finish = useCallback(() => {
    localStorage.setItem(storageKey, 'true');
    setVisible(false);
    onComplete();
  }, [storageKey, onComplete]);

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((i) => i + 1);
    } else {
      finish();
    }
  };

  const skip = () => finish();

  if (!visible || !rect || currentStep >= steps.length) return null;

  const step = steps[currentStep];
  const pad = 8;
  const placement = step.placement || 'bottom';

  // Calculate tooltip position
  let tooltipStyle: React.CSSProperties = {};
  if (placement === 'bottom') {
    tooltipStyle = { top: rect.bottom + pad + 12, left: Math.max(16, rect.left + rect.width / 2 - 160) };
  } else if (placement === 'top') {
    tooltipStyle = { bottom: window.innerHeight - rect.top + pad + 12, left: Math.max(16, rect.left + rect.width / 2 - 160) };
  } else if (placement === 'right') {
    tooltipStyle = { top: rect.top + rect.height / 2 - 60, left: rect.right + pad + 12 };
  } else {
    tooltipStyle = { top: rect.top + rect.height / 2 - 60, right: window.innerWidth - rect.left + pad + 12 };
  }

  return (
    <div className="tour-overlay">
      <div
        className="tour-spotlight"
        style={{
          top: rect.top - pad,
          left: rect.left - pad,
          width: rect.width + pad * 2,
          height: rect.height + pad * 2,
        }}
      />
      <div className="tour-tooltip" ref={tooltipRef} style={tooltipStyle}>
        <div className="tour-tooltip-title">{step.title}</div>
        <div className="tour-tooltip-desc">{step.description}</div>
        <div className="tour-tooltip-footer">
          <div className="tour-dots">
            {steps.map((_, i) => (
              <div key={i} className={`tour-dot${i === currentStep ? ' active' : ''}`} />
            ))}
          </div>
          <div className="tour-tooltip-actions">
            <button className="btn btn-ghost" onClick={skip} style={{ height: 32, fontSize: 12, padding: '0 12px' }}>
              Skip
            </button>
            <button className="btn btn-teal" onClick={next} style={{ height: 32, fontSize: 12, padding: '0 16px' }}>
              {currentStep < steps.length - 1 ? 'Next' : 'Done'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
