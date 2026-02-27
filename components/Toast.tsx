'use client';

import { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  visible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type = 'success', visible, onClose, duration = 4000 }: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      requestAnimationFrame(() => setShow(true));
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 350);
      }, duration);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [visible, duration, onClose]);

  if (!visible) return null;

  const icons: Record<ToastType, string> = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
  };

  return (
    <div className={`toast-container ${show ? 'toast-visible' : ''}`}>
      <div className={`toast toast-${type}`}>
        <span className={`toast-icon toast-icon-${type}`}>{icons[type]}</span>
        <span className="toast-msg">{message}</span>
        <button className="toast-close" onClick={() => { setShow(false); setTimeout(onClose, 350); }}>✕</button>
      </div>
    </div>
  );
}
