'use client';

import { useState } from 'react';
import { type Template } from './templates-data';

interface TemplateConfigModalProps {
  template: Template;
  onClose: () => void;
}

export default function TemplateConfigModal({ template, onClose }: TemplateConfigModalProps) {
  const [selectedChannels, setSelectedChannels] = useState<string[]>([...template.defaultChannels]);
  const [starting, setStarting] = useState(false);

  const toggleChannel = (ch: string) => {
    setSelectedChannels(prev =>
      prev.includes(ch) ? prev.filter(c => c !== ch) : [...prev, ch]
    );
  };

  const handleStart = () => {
    setStarting(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="d-modal-overlay" onClick={onClose}>
      <div className="d-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 520 }}>
        <div className="d-modal-header">
          <div>
            <h3 className="d-modal-title">{template.name}</h3>
            <p className="d-modal-subtitle">{template.desc}</p>
          </div>
        </div>

        <div className="d-modal-body">
          <div className="d-modal-section-label">Workflow Steps</div>
          <div className="d-modal-steps">
            {template.steps.map((step, i) => (
              <div key={i} className="d-modal-step">
                <span className="d-modal-step-num">{i + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>

          {template.channels.length > 1 && (
            <>
              <div className="d-modal-section-label" style={{ marginTop: 20 }}>
                Run on Channels
                <span className="d-modal-section-hint">Select one or more</span>
              </div>
              <div className="d-modal-channels">
                {template.channels.map(ch => (
                  <label key={ch} className={`d-modal-channel${selectedChannels.includes(ch) ? ' selected' : ''}`}>
                    <input
                      type="checkbox"
                      checked={selectedChannels.includes(ch)}
                      onChange={() => toggleChannel(ch)}
                    />
                    <span>{ch}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          {template.channels.length === 1 && (
            <>
              <div className="d-modal-section-label" style={{ marginTop: 20 }}>Channel</div>
              <div className="d-modal-single-channel">
                <span className="chip chip-live"><span className="chip-dot" />{template.channels[0]}</span>
              </div>
            </>
          )}
        </div>

        <div className="d-modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button
            className="btn btn-teal"
            onClick={handleStart}
            disabled={selectedChannels.length === 0 || starting}
          >
            {starting ? 'Starting…' : 'Start Automation'}
          </button>
        </div>
      </div>
    </div>
  );
}
