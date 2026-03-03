'use client';

import { useState } from 'react';
import SettingsNavigation from '../_components/SettingsNavigation';

const toneOptions = [
  { value: 'professional', label: 'Professional', desc: 'Formal, precise, and business-appropriate responses' },
  { value: 'friendly', label: 'Friendly', desc: 'Warm, approachable, and casual conversational tone' },
  { value: 'concise', label: 'Concise', desc: 'Short, direct answers with minimal filler' },
];

const knowledgeFiles = [
  { name: 'Product Catalog.pdf', size: '2.4 MB', uploaded: 'Jun 12, 2024' },
  { name: 'Return Policy.docx', size: '340 KB', uploaded: 'Jun 15, 2024' },
  { name: 'FAQ Sheet.txt', size: '18 KB', uploaded: 'Jun 18, 2024' },
];

export default function AgentSettingsPage() {
  const [tone, setTone] = useState('professional');
  const [autoEscalate, setAutoEscalate] = useState(true);
  const [escalateThreshold, setEscalateThreshold] = useState('3');
  const [greeting, setGreeting] = useState('Hi! Welcome to our store. How can I help you today?');
  const [instructions, setInstructions] = useState(
    'You are a helpful customer service agent for our business. Always be polite and helpful. If a customer asks about a product, check the catalog and provide accurate pricing. Never make up information about delivery times — if unsure, escalate to a human.'
  );
  const [canTakeOrders, setCanTakeOrders] = useState(true);
  const [canRecommend, setCanRecommend] = useState(true);
  const [canCheckStatus, setCanCheckStatus] = useState(true);
  const [offHoursReply, setOffHoursReply] = useState(true);
  const [businessHoursStart, setBusinessHoursStart] = useState('09:00');
  const [businessHoursEnd, setBusinessHoursEnd] = useState('18:00');

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">AI Agent</h1>
            <p className="page-desc">Configure how your AI agent behaves and interacts with customers.</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-teal">Save Changes</button>
          </div>
        </div>
      </div>

      <div className="settings-layout">
        <SettingsNavigation />

        <div style={{ display: 'grid', gap: 24 }}>
          {/* Agent Status */}
          <div className="settings-section" style={{ background: 'rgba(46,139,110,.04)', borderColor: 'rgba(46,139,110,.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, background: 'rgba(46,139,110,.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                }}>
                  🤖
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>AI Agent is Active</div>
                  <div style={{ fontSize: 12, color: 'var(--teal)' }}>Handling conversations on 3 channels</div>
                </div>
              </div>
              <span className="chip chip-live"><span className="chip-dot" />Live</span>
            </div>
          </div>

          {/* Tone & Personality */}
          <div className="settings-section">
            <div className="settings-section-title">Tone & Personality</div>
            <div className="d-form-group">
              <label className="d-form-label">Response Style</label>
              <div style={{ display: 'grid', gap: 8 }}>
                {toneOptions.map((opt) => (
                  <label
                    key={opt.value}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: 12, padding: 12,
                      border: `1.5px solid ${tone === opt.value ? 'var(--teal)' : 'var(--border)'}`,
                      borderRadius: 10, cursor: 'pointer', transition: 'border-color .15s',
                      background: tone === opt.value ? 'rgba(46,139,110,.03)' : 'transparent',
                    }}
                  >
                    <input
                      type="radio" name="tone" value={opt.value}
                      checked={tone === opt.value}
                      onChange={(e) => setTone(e.target.value)}
                      style={{ marginTop: 2 }}
                    />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{opt.label}</div>
                      <div style={{ fontSize: 12, color: 'var(--ink-f)' }}>{opt.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className="d-form-group">
              <label className="d-form-label">Greeting Message</label>
              <textarea
                className="d-form-input"
                rows={2}
                value={greeting}
                onChange={(e) => setGreeting(e.target.value)}
                style={{ resize: 'vertical' }}
              />
              <div className="d-form-hint">First message customers see when starting a new conversation</div>
            </div>
          </div>

          {/* Additional Instructions */}
          <div className="settings-section">
            <div className="settings-section-title">Additional Instructions</div>
            <div style={{ fontSize: 13, color: 'var(--ink-m)', lineHeight: 1.6, marginBottom: 16 }}>
              Provide extra context or rules for your AI agent. These instructions supplement the agent&apos;s
              core capabilities — you cannot override system-level behavior or remove built-in functions.
            </div>
            <div className="d-form-group">
              <textarea
                className="d-form-input"
                rows={5}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                style={{ resize: 'vertical', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}
                placeholder="e.g., Always greet in the customer's language. Offer 10% discount on first orders over ₦5,000..."
              />
              <div className="d-form-hint">
                {instructions.length}/2000 characters
              </div>
            </div>
          </div>

          {/* Capabilities */}
          <div className="settings-section">
            <div className="settings-section-title">Capabilities</div>
            <div style={{ fontSize: 13, color: 'var(--ink-m)', lineHeight: 1.6, marginBottom: 16 }}>
              Enable or disable what your AI agent can do autonomously.
            </div>
            {[
              { label: 'Take orders', hint: 'Allow the agent to create orders from conversations', state: canTakeOrders, setter: setCanTakeOrders },
              { label: 'Recommend products', hint: 'Agent can suggest products based on customer queries', state: canRecommend, setter: setCanRecommend },
              { label: 'Check order status', hint: 'Agent can look up and share order status with customers', state: canCheckStatus, setter: setCanCheckStatus },
            ].map((cap) => (
              <div className="d-form-group" key={cap.label}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <label className="d-form-label" style={{ marginBottom: 0 }}>{cap.label}</label>
                    <div className="d-form-hint">{cap.hint}</div>
                  </div>
                  <button className={`d-form-toggle${cap.state ? ' on' : ''}`} onClick={() => cap.setter(!cap.state)} />
                </div>
              </div>
            ))}
          </div>

          {/* Escalation */}
          <div className="settings-section">
            <div className="settings-section-title">Escalation Rules</div>
            <div className="d-form-group">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <label className="d-form-label" style={{ marginBottom: 0 }}>Auto-escalate to human</label>
                  <div className="d-form-hint">Automatically route complex queries to a human agent</div>
                </div>
                <button className={`d-form-toggle${autoEscalate ? ' on' : ''}`} onClick={() => setAutoEscalate(!autoEscalate)} />
              </div>
            </div>
            {autoEscalate && (
              <div className="d-form-group">
                <label className="d-form-label">Escalate after failed attempts</label>
                <input
                  className="d-form-input"
                  type="number" min="1" max="10"
                  value={escalateThreshold}
                  onChange={(e) => setEscalateThreshold(e.target.value)}
                  style={{ maxWidth: 120 }}
                />
                <div className="d-form-hint">Number of unresolved attempts before handing off to a human</div>
              </div>
            )}
          </div>

          {/* Business Hours */}
          <div className="settings-section">
            <div className="settings-section-title">Business Hours</div>
            <div className="d-form-group">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <label className="d-form-label" style={{ marginBottom: 0 }}>Off-hours auto-reply</label>
                  <div className="d-form-hint">AI agent sends an automated reply outside business hours</div>
                </div>
                <button className={`d-form-toggle${offHoursReply ? ' on' : ''}`} onClick={() => setOffHoursReply(!offHoursReply)} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="d-form-group">
                <label className="d-form-label">Opening Time</label>
                <input className="d-form-input" type="time" value={businessHoursStart} onChange={(e) => setBusinessHoursStart(e.target.value)} />
              </div>
              <div className="d-form-group">
                <label className="d-form-label">Closing Time</label>
                <input className="d-form-input" type="time" value={businessHoursEnd} onChange={(e) => setBusinessHoursEnd(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Knowledge Base */}
          <div className="settings-section">
            <div className="settings-section-title">Knowledge Base</div>
            <div style={{ fontSize: 13, color: 'var(--ink-m)', lineHeight: 1.6, marginBottom: 16 }}>
              Upload documents so your AI agent can reference accurate business information when responding to customers.
            </div>
            {knowledgeFiles.length > 0 && (
              <div style={{ display: 'grid', gap: 8, marginBottom: 16 }}>
                {knowledgeFiles.map((f) => (
                  <div key={f.name} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 10,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 18 }}>📄</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{f.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--ink-f)' }}>{f.size} · Uploaded {f.uploaded}</div>
                      </div>
                    </div>
                    <button className="d-card-action" style={{ color: '#e05252', fontSize: 12 }}>Remove</button>
                  </div>
                ))}
              </div>
            )}
            <div style={{
              border: '2px dashed var(--border)', borderRadius: 12, padding: 24,
              textAlign: 'center', color: 'var(--ink-f)', fontSize: 13, cursor: 'pointer',
            }}>
              📎 Drop files here or click to upload<br />
              <span style={{ fontSize: 11, marginTop: 4, display: 'inline-block' }}>PDF, DOCX, TXT — Max 10 MB per file</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
