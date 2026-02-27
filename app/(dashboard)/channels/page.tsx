'use client';

import { useState } from 'react';

interface Channel {
  id: string;
  name: string;
  icon: string;
  status: 'connected' | 'disconnected' | 'pending';
  desc: string;
  messages: string;
  category: string;
  color: string;
}

const channels: Channel[] = [
  {
    id: '1', name: 'WhatsApp Business', icon: '💬', status: 'connected',
    desc: 'Send and receive messages via WhatsApp Business API. Handle orders, support, and notifications.',
    messages: '3,240', category: 'Messaging', color: '#25D366',
  },
  {
    id: '2', name: 'Instagram DM', icon: '📸', status: 'connected',
    desc: 'Manage Instagram Direct Messages. Auto-reply to story mentions and comments.',
    messages: '892', category: 'Social', color: '#E1306C',
  },
  {
    id: '3', name: 'Web Chat Widget', icon: '🌐', status: 'connected',
    desc: 'Embed a live chat widget on your website for real-time customer support.',
    messages: '1,105', category: 'Website', color: '#2e8b6e',
  },
  {
    id: '4', name: 'Email', icon: '✉️', status: 'disconnected',
    desc: 'Connect your email inbox for support tickets and order notifications.',
    messages: '—', category: 'Email', color: '#5a7fd4',
  },
  {
    id: '5', name: 'Facebook Messenger', icon: '📘', status: 'disconnected',
    desc: 'Connect Facebook page to handle Messenger conversations automatically.',
    messages: '—', category: 'Social', color: '#0084FF',
  },
  {
    id: '6', name: 'Telegram', icon: '✈️', status: 'disconnected',
    desc: 'Create a Telegram bot for automated customer interactions.',
    messages: '—', category: 'Messaging', color: '#0088CC',
  },
  {
    id: '7', name: 'SMS (Twilio)', icon: '📱', status: 'pending',
    desc: 'Send SMS notifications and receive replies via Twilio.',
    messages: '—', category: 'Messaging', color: '#F22F46',
  },
  {
    id: '8', name: 'Shopify', icon: '🛍', status: 'disconnected',
    desc: 'Sync your Shopify store for orders, products, and inventory management.',
    messages: '—', category: 'Integration', color: '#96BF48',
  },
  {
    id: '9', name: 'Paystack', icon: '💳', status: 'connected',
    desc: 'Accept payments via Paystack. Track transactions and refunds.',
    messages: '₦4.2M', category: 'Payments', color: '#00C3F7',
  },
  {
    id: '10', name: 'Google Sheets', icon: '📊', status: 'disconnected',
    desc: 'Sync data to Google Sheets for reports and custom dashboards.',
    messages: '—', category: 'Integration', color: '#0F9D58',
  },
];

const categoryFilters = ['All', 'Messaging', 'Social', 'Website', 'Payments', 'Integration'];

export default function ChannelsPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = channels.filter((ch) => {
    if (filter !== 'All' && ch.category !== filter) return false;
    if (search && !ch.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const connected = channels.filter((c) => c.status === 'connected').length;

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Channels & Integrations</h1>
            <p className="page-desc">{connected} of {channels.length} channels connected.</p>
          </div>
        </div>
      </div>

      <div className="filter-bar">
        <input
          className="filter-input"
          placeholder="Search channels…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {categoryFilters.map((f) => (
          <button
            key={f}
            className={`inbox-filter${filter === f ? ' active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="channels-list">
        {filtered.map((ch) => (
          <div key={ch.id} className="channel-card">
            <div className="channel-card-header">
              <div className="channel-card-logo" style={{ background: `${ch.color}15` }}>
                <span style={{ fontSize: 24 }}>{ch.icon}</span>
              </div>
              <div>
                <div className="channel-card-name">{ch.name}</div>
                <div className="channel-card-status">
                  <span className={`chip chip-${ch.status}`}>
                    <span className="chip-dot" />{ch.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="channel-card-desc">{ch.desc}</div>
            {ch.status === 'connected' && (
              <div style={{ fontSize: 11, color: 'var(--ink-f)', marginBottom: 14 }}>
                {ch.category === 'Payments' ? '💰' : '💬'} {ch.messages} {ch.category === 'Payments' ? 'processed' : 'this month'}
              </div>
            )}
            <button
              className="channel-card-action"
              style={{
                background: ch.status === 'connected' ? 'var(--paper)' : ch.status === 'pending' ? 'rgba(254,188,46,.1)' : 'var(--teal)',
                color: ch.status === 'connected' ? 'var(--ink-m)' : ch.status === 'pending' ? '#c49400' : '#fff',
              }}
            >
              {ch.status === 'connected' ? '⚙ Configure' : ch.status === 'pending' ? '⏳ Setup Pending' : '🔗 Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
