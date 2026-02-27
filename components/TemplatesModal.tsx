'use client';

import { useState, useEffect } from 'react';
import { templates } from '@/data/templates';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TemplatesModal({ isOpen, onClose }: TemplatesModalProps) {
  const [filter, setFilter] = useState('all');

  const filters = [
    { label: 'All templates', value: 'all' },
    { label: 'Sales', value: 'sales' },
    { label: 'Support', value: 'support' },
    { label: 'Delivery', value: 'delivery' },
    { label: 'Reports', value: 'reports' },
  ];

  const filtered = filter === 'all'
    ? templates
    : templates.filter((t) => t.filter.includes(filter));

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <div
      className={`modal-overlay${isOpen ? ' open' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-box">
        <div className="modal-header">
          <div>
            <div className="modal-title">Automation Templates</div>
            <div className="modal-sub">Start fast. Customize everything. Deploy in minutes.</div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-filters">
          {filters.map((f) => (
            <button
              key={f.value}
              className={`mf-tab${filter === f.value ? ' active' : ''}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="modal-grid">
          {filtered.map((t, i) => (
            <div className="tpl-card" key={i}>
              <span className="tpl-icon">{t.icon}</span>
              <div className="tpl-name">{t.name}</div>
              <div className="tpl-desc">{t.desc}</div>
              <div className="tpl-tags">
                {t.tags.map((tg, j) => (
                  <span className="tpl-tag" key={j}>{tg}</span>
                ))}
              </div>
              <div className="tpl-steps">{t.steps} nodes</div>
              <button
                className="tpl-use-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                Use this template →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
