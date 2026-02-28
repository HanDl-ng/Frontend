'use client';

import { useState } from 'react';
import {
  BookOpenIcon, TicketIcon, LifeBuoyIcon, ChevronDownIcon,
  CheckCircleIcon, ExternalLinkIcon, SearchIcon,
} from '@/components/icons';

const faqs = [
  {
    q: 'How do I connect my WhatsApp Business account?',
    a: 'Go to Channels → WhatsApp Business → Connect. You\'ll need your WhatsApp Business API credentials from Meta. Follow the step-by-step wizard to link your number. Messages will start flowing into Conversations within minutes.',
  },
  {
    q: 'What is an automation and how do I create one?',
    a: 'Automations are workflows that handle messages automatically — things like order confirmations, abandoned cart recovery, or routing support tickets. Go to Automations → New Automation to use the visual builder. Drag nodes onto the canvas and connect them to define your flow.',
  },
  {
    q: 'How does AI-powered conversation handling work?',
    a: 'HanDl uses AI to read incoming messages, understand intent, and respond automatically based on your automation rules. When the AI can\'t handle a question confidently, it escalates to a human agent. You can configure confidence thresholds in Settings → General.',
  },
  {
    q: 'Can I integrate with my existing Shopify or Paystack?',
    a: 'Yes! Go to Settings → Developer → Integrations. We support Shopify for product syncing and order management, and Paystack for payment processing. Connect your API keys and data syncs automatically.',
  },
  {
    q: 'How do I track delivery status?',
    a: 'Navigate to Storefront → Deliveries to see a Kanban board of all deliveries. Cards move through Pending, Picked Up, In Transit, and Delivered stages. You can also set up automation notifications to update customers at each stage.',
  },
  {
    q: 'What do the analytics metrics mean?',
    a: 'Revenue (MTD) is your month-to-date revenue from orders processed through HanDl. Active Automations counts currently running workflows. Open Conversations shows unresolved chats. Avg Response Time measures how quickly messages get replies (including AI responses).',
  },
  {
    q: 'How does billing work?',
    a: 'We bill based on message volume and active automations. Visit Billing to see your current plan, usage, and invoices. You can upgrade or downgrade at any time — changes take effect at the next billing cycle.',
  },
  {
    q: 'Can I export my data?',
    a: 'Yes. Go to Settings → Developer → API to access your data programmatically, or use Settings → Logs to export conversation and automation logs as CSV. Order data can be exported from Storefront → Orders.',
  },
];

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [ticketForm, setTicketForm] = useState({ subject: '', category: 'general', priority: 'medium', description: '' });
  const [submitted, setSubmitted] = useState(false);

  const filteredFaqs = faqs.filter((faq) =>
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setTicketForm({ subject: '', category: 'general', priority: 'medium', description: '' });
    }, 4000);
  };

  return (
    <div className="page-content">
      <div className="help-layout">
        {/* Hero */}
        <div className="help-hero">
          <h1 className="help-hero-title">How can we help?</h1>
          <p className="help-hero-desc">Find answers to common questions or create a support ticket for personalized help.</p>
        </div>

        {/* Quick action cards */}
        <div className="help-cards">
          <a href="#faq" className="help-card">
            <div className="help-card-icon teal">
              <BookOpenIcon />
            </div>
            <div className="help-card-title">FAQ</div>
            <div className="help-card-desc">Browse frequently asked questions and find instant answers.</div>
          </a>
          <a href="#ticket" className="help-card">
            <div className="help-card-icon blue">
              <TicketIcon />
            </div>
            <div className="help-card-title">Support Ticket</div>
            <div className="help-card-desc">Create a ticket and our team will respond within 24 hours.</div>
          </a>
          <a href="https://docs.handl.com" target="_blank" rel="noopener noreferrer" className="help-card">
            <div className="help-card-icon orange">
              <LifeBuoyIcon />
            </div>
            <div className="help-card-title">Documentation</div>
            <div className="help-card-desc">
              Read detailed guides and API reference.
              <ExternalLinkIcon className="help-external-icon" />
            </div>
          </a>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="faq-section">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 16, flexWrap: 'wrap' }}>
            <h2 className="faq-section-title" style={{ margin: 0 }}>Frequently Asked Questions</h2>
            <div style={{ position: 'relative', minWidth: 220 }}>
              <SearchIcon className="faq-search-icon" />
              <input
                className="filter-input"
                style={{ paddingLeft: 32, width: '100%' }}
                placeholder="Search FAQs…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {filteredFaqs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '32px 16px', color: 'var(--ink-f)', fontSize: 13 }}>
              No matching FAQs found. Try a different search or create a support ticket below.
            </div>
          )}

          {filteredFaqs.map((faq, i) => {
            const realIndex = faqs.indexOf(faq);
            return (
              <div key={realIndex} className={`faq-item${openFaq === realIndex ? ' open' : ''}`}>
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === realIndex ? null : realIndex)}>
                  <span>{faq.q}</span>
                  <ChevronDownIcon className="faq-chevron" />
                </button>
                <div className="faq-answer">{faq.a}</div>
              </div>
            );
          })}
        </div>

        {/* Support Ticket Section */}
        <div id="ticket" className="ticket-section">
          {submitted ? (
            <div className="ticket-success">
              <div className="ticket-success-icon">
                <CheckCircleIcon />
              </div>
              <div className="ticket-success-title">Ticket submitted!</div>
              <div className="ticket-success-desc">We&apos;ve received your request and will respond within 24 hours via email.</div>
            </div>
          ) : (
            <>
              <h2 className="ticket-section-title">Create a Support Ticket</h2>
              <p className="ticket-section-desc">Describe your issue in detail and our support team will get back to you.</p>
              <form className="ticket-form" onSubmit={handleSubmit}>
                <div className="ticket-row">
                  <div className="d-form-group" style={{ margin: 0 }}>
                    <label className="d-form-label">Subject</label>
                    <input
                      className="d-form-input"
                      placeholder="Brief summary of your issue"
                      value={ticketForm.subject}
                      onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                      required
                    />
                  </div>
                  <div className="d-form-group" style={{ margin: 0 }}>
                    <label className="d-form-label">Category</label>
                    <select
                      className="d-form-input d-form-select"
                      value={ticketForm.category}
                      onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="bug">Bug Report</option>
                      <option value="billing">Billing Issue</option>
                      <option value="feature">Feature Request</option>
                      <option value="integration">Integration Help</option>
                      <option value="automation">Automation Issue</option>
                    </select>
                  </div>
                </div>

                <div className="d-form-group" style={{ margin: 0 }}>
                  <label className="d-form-label">Priority</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {(['low', 'medium', 'high', 'urgent'] as const).map((p) => (
                      <button
                        key={p}
                        type="button"
                        className={`chip ${ticketForm.priority === p ? `chip-${p === 'low' ? 'connected' : p === 'medium' ? 'ai' : p === 'high' ? 'paused' : 'error'}` : ''}`}
                        style={{
                          cursor: 'pointer',
                          padding: '6px 14px',
                          fontSize: 12,
                          border: ticketForm.priority === p ? 'none' : '1px solid var(--border)',
                          background: ticketForm.priority !== p ? '#fff' : undefined,
                          color: ticketForm.priority !== p ? 'var(--ink-m)' : undefined,
                          transition: 'all .2s',
                          textTransform: 'capitalize',
                        }}
                        onClick={() => setTicketForm({ ...ticketForm, priority: p })}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="d-form-group" style={{ margin: 0 }}>
                  <label className="d-form-label">Description</label>
                  <textarea
                    className="d-form-input d-form-textarea"
                    placeholder="Describe your issue in detail. Include steps to reproduce if reporting a bug."
                    rows={5}
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                  <button type="button" className="btn btn-ghost" onClick={() => setTicketForm({ subject: '', category: 'general', priority: 'medium', description: '' })}>
                    Clear
                  </button>
                  <button type="submit" className="btn btn-teal">
                    Submit Ticket
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
