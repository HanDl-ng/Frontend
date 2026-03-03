'use client';

import { useState, useEffect } from 'react';

interface ShortcutsModalProps {
  open: boolean;
  onClose: () => void;
}

const shortcuts = [
  {
    section: 'Navigation',
    items: [
      { label: 'Search / Command palette', keys: ['⌘', 'K'] },
      { label: 'Go to Dashboard', keys: ['G', 'D'] },
      { label: 'Go to Conversations', keys: ['G', 'C'] },
      { label: 'Go to Orders', keys: ['G', 'O'] },
      { label: 'Go to Products', keys: ['G', 'P'] },
      { label: 'Go to Settings', keys: ['G', 'S'] },
    ],
  },
  {
    section: 'Actions',
    items: [
      { label: 'Keyboard shortcuts', keys: ['?'] },
      { label: 'Toggle dark mode', keys: ['⌘', 'D'] },
      { label: 'Close modal / panel', keys: ['Esc'] },
    ],
  },
];

export default function ShortcutsModal({ open, onClose }: ShortcutsModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="shortcuts-modal-overlay" onClick={onClose}>
      <div className="shortcuts-modal" onClick={(e) => e.stopPropagation()}>
        <div className="shortcuts-modal-header">
          <span className="shortcuts-modal-title">Keyboard Shortcuts</span>
          <button className="btn btn-ghost" onClick={onClose} style={{ height: 32, padding: '0 10px', fontSize: 12 }}>
            ✕
          </button>
        </div>
        {shortcuts.map((section) => (
          <div key={section.section} className="shortcuts-section">
            <div className="shortcuts-section-title">{section.section}</div>
            {section.items.map((item) => (
              <div key={item.label} className="shortcut-row">
                <span className="shortcut-label">{item.label}</span>
                <div className="shortcut-keys">
                  {item.keys.map((key, i) => (
                    <span key={i}>
                      <kbd className="shortcut-key">{key}</kbd>
                      {i < item.keys.length - 1 && <span style={{ margin: '0 2px', color: 'var(--ink-f)', fontSize: 11 }}>+</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
