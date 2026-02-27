'use client';

import { useState } from 'react';

interface Message {
  id: string;
  type: 'customer' | 'ai' | 'agent' | 'system';
  text: string;
  time: string;
}

interface Conversation {
  id: string;
  name: string;
  initials: string;
  color: string;
  channel: string;
  channelIcon: string;
  lastMsg: string;
  time: string;
  status: 'ai' | 'human';
  tags: string[];
  messages: Message[];
  customer: {
    email: string;
    phone: string;
    orders: number;
    ltv: string;
    location: string;
    recentOrders: { id: string; amount: string; date: string; status: string }[];
  };
}

const mockConversations: Conversation[] = [
  {
    id: '1', name: 'Adebayo Ogunlesi', initials: 'AO', color: '#2e8b6e',
    channel: 'WhatsApp', channelIcon: '💬', lastMsg: 'When will my order #ORD-2847 arrive?',
    time: '2m', status: 'ai', tags: ['VIP', 'Order Query'],
    messages: [
      { id: 'm1', type: 'customer', text: 'Hi, I placed an order yesterday. Order #ORD-2847', time: '10:23 AM' },
      { id: 'm2', type: 'ai', text: 'Hello Adebayo! 👋 I can see your order #ORD-2847. It was shipped this morning and is currently en route. Expected delivery is tomorrow between 10 AM - 2 PM.', time: '10:23 AM' },
      { id: 'm3', type: 'customer', text: 'Can I change the delivery address?', time: '10:25 AM' },
      { id: 'm4', type: 'ai', text: 'Since your order is already in transit, I\'ll need to connect you with our delivery team. Let me check the options available for address changes.', time: '10:25 AM' },
      { id: 'm5', type: 'system', text: 'AI is analyzing delivery modification options...', time: '10:26 AM' },
      { id: 'm6', type: 'customer', text: 'When will my order #ORD-2847 arrive?', time: '10:28 AM' },
    ],
    customer: {
      email: 'adebayo@email.com', phone: '+234 801 234 5678',
      orders: 12, ltv: '₦285,000', location: 'Lagos, Nigeria',
      recentOrders: [
        { id: 'ORD-2847', amount: '₦45,000', date: 'Today', status: 'Shipped' },
        { id: 'ORD-2801', amount: '₦32,000', date: '3 days ago', status: 'Delivered' },
      ],
    },
  },
  {
    id: '2', name: 'Funke Adeyemi', initials: 'FA', color: '#5a7fd4',
    channel: 'Instagram', channelIcon: '📸', lastMsg: 'I want to return this item please',
    time: '8m', status: 'human', tags: ['Return', 'Urgent'],
    messages: [
      { id: 'm1', type: 'customer', text: 'Hi, I received a damaged item in my order', time: '10:15 AM' },
      { id: 'm2', type: 'ai', text: 'I\'m sorry to hear that, Funke. Could you share a photo of the damaged item so we can process your return faster?', time: '10:15 AM' },
      { id: 'm3', type: 'customer', text: 'I want to return this item please', time: '10:20 AM' },
      { id: 'm4', type: 'system', text: 'Escalated to human agent — return request requires manual approval', time: '10:20 AM' },
    ],
    customer: {
      email: 'funke@email.com', phone: '+234 802 345 6789',
      orders: 5, ltv: '₦98,000', location: 'Abuja, Nigeria',
      recentOrders: [
        { id: 'ORD-2832', amount: '₦18,500', date: '2 days ago', status: 'Delivered' },
      ],
    },
  },
  {
    id: '3', name: 'Chidi Eze', initials: 'CE', color: '#d4845a',
    channel: 'Web Chat', channelIcon: '🌐', lastMsg: 'Do you have size 42 in the Nike Air?',
    time: '12m', status: 'ai', tags: ['Pre-sale'],
    messages: [
      { id: 'm1', type: 'customer', text: 'Hello, do you have the Nike Air Max in size 42?', time: '10:10 AM' },
      { id: 'm2', type: 'ai', text: 'Hi Chidi! Let me check our inventory for you. 🔍\n\nYes! We have the Nike Air Max 90 in size 42 available in Black/White and Red/Black colorways. Would you like to order?', time: '10:10 AM' },
      { id: 'm3', type: 'customer', text: 'Do you have size 42 in the Nike Air?', time: '10:12 AM' },
    ],
    customer: {
      email: 'chidi@email.com', phone: '+234 803 456 7890',
      orders: 0, ltv: '₦0', location: 'Port Harcourt, Nigeria',
      recentOrders: [],
    },
  },
  {
    id: '4', name: 'Ngozi Igwe', initials: 'NI', color: '#a25ad4',
    channel: 'WhatsApp', channelIcon: '💬', lastMsg: 'My payment was debited but order not confirmed',
    time: '15m', status: 'human', tags: ['Payment', 'Critical'],
    messages: [
      { id: 'm1', type: 'customer', text: 'My payment of ₦65,000 was debited but I didn\'t get a confirmation', time: '10:05 AM' },
      { id: 'm2', type: 'ai', text: 'I understand your concern, Ngozi. Let me look into this right away. I can see a pending transaction for ₦65,000. It seems the payment gateway confirmation is delayed.', time: '10:05 AM' },
      { id: 'm3', type: 'system', text: 'Escalated to human agent — payment issue requires manual verification', time: '10:06 AM' },
      { id: 'm4', type: 'customer', text: 'My payment was debited but order not confirmed', time: '10:08 AM' },
    ],
    customer: {
      email: 'ngozi@email.com', phone: '+234 804 567 8901',
      orders: 8, ltv: '₦192,000', location: 'Enugu, Nigeria',
      recentOrders: [
        { id: 'ORD-2845', amount: '₦65,000', date: 'Today', status: 'Pending' },
      ],
    },
  },
  {
    id: '5', name: 'Emeka Nwosu', initials: 'EN', color: '#c49400',
    channel: 'Email', channelIcon: '✉️', lastMsg: 'Can I get a bulk discount for 50 units?',
    time: '22m', status: 'ai', tags: ['Wholesale'],
    messages: [
      { id: 'm1', type: 'customer', text: 'I\'d like to inquire about bulk pricing for your product line. We need about 50 units.', time: '10:00 AM' },
      { id: 'm2', type: 'ai', text: 'Thank you for your interest in bulk ordering, Emeka! For orders of 50+ units, we offer tiered discounts. Let me prepare a custom quote for you.', time: '10:01 AM' },
    ],
    customer: {
      email: 'emeka@business.com', phone: '+234 805 678 9012',
      orders: 3, ltv: '₦450,000', location: 'Lagos, Nigeria',
      recentOrders: [
        { id: 'ORD-2780', amount: '₦150,000', date: '1 week ago', status: 'Delivered' },
      ],
    },
  },
];

const filters = ['All', 'Unread', 'AI Handling', 'Human Agent', 'Urgent'];

export default function ConversationsPage() {
  const [activeConv, setActiveConv] = useState(mockConversations[0]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = mockConversations.filter((c) => {
    if (activeFilter === 'AI Handling') return c.status === 'ai';
    if (activeFilter === 'Human Agent') return c.status === 'human';
    if (activeFilter === 'Urgent') return c.tags.includes('Urgent') || c.tags.includes('Critical');
    return true;
  });

  return (
    <div className="page-content full-width">
      <div className="inbox-layout">
        {/* Conversation List */}
        <div className="inbox-list">
          <div className="inbox-list-header">
            <div className="inbox-list-title">Inbox</div>
            <input
              className="inbox-search"
              placeholder="Search conversations…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="inbox-filters">
            {filters.map((f) => (
              <button
                key={f}
                className={`inbox-filter${activeFilter === f ? ' active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="inbox-items">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                className={`inbox-item${activeConv.id === conv.id ? ' active' : ''}`}
                onClick={() => setActiveConv(conv)}
              >
                <div className="inbox-item-avatar" style={{ background: conv.color }}>
                  {conv.initials}
                </div>
                <div className="inbox-item-body">
                  <div className="inbox-item-top">
                    <span className="inbox-item-name">{conv.name}</span>
                    <span className="inbox-item-time">{conv.time}</span>
                  </div>
                  <div className="inbox-item-msg">{conv.lastMsg}</div>
                  <div className="inbox-item-tags">
                    <span className={`chip chip-${conv.status}`} style={{ padding: '1px 6px', fontSize: 10 }}>
                      {conv.status === 'ai' ? '🤖 AI' : '👤 Agent'}
                    </span>
                    {conv.tags.map((t) => (
                      <span key={t} className="chip chip-draft" style={{ padding: '1px 6px', fontSize: 10 }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="inbox-chat">
          <div className="inbox-chat-header">
            <div className="inbox-chat-customer">
              <div className="inbox-item-avatar" style={{ background: activeConv.color, width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700 }}>
                {activeConv.initials}
              </div>
              <div>
                <div className="inbox-chat-name">{activeConv.name}</div>
                <div className="inbox-chat-channel">{activeConv.channelIcon} {activeConv.channel}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="topbar-btn" title="Assign">👤</button>
              <button className="topbar-btn" title="More">⋯</button>
            </div>
          </div>

          {activeConv.status === 'ai' && (
            <div className="inbox-ai-banner">
              <span>🤖 AI is handling this conversation</span>
              <button className="btn btn-ghost" style={{ height: 28, fontSize: 11, padding: '0 12px' }}>
                Take over
              </button>
            </div>
          )}

          <div className="inbox-messages">
            {activeConv.messages.map((msg) => (
              <div key={msg.id} className={`inbox-msg inbox-msg-${msg.type}`}>
                <div>{msg.text}</div>
                <div className="inbox-msg-meta">{msg.time}</div>
              </div>
            ))}
          </div>

          <div className="inbox-input-area">
            <textarea
              className="inbox-input-box"
              placeholder="Type a message…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={1}
            />
            <button className="inbox-send-btn">➤</button>
          </div>
        </div>

        {/* Context Panel */}
        <div className="inbox-context">
          <div className="inbox-ctx-section">
            <div className="inbox-ctx-title">Customer</div>
            <div className="inbox-ctx-customer">
              <div className="inbox-ctx-avatar" style={{ background: activeConv.color }}>
                {activeConv.initials}
              </div>
              <div>
                <div className="inbox-ctx-name">{activeConv.name}</div>
                <div className="inbox-ctx-id">{activeConv.customer.email}</div>
              </div>
            </div>
            <div className="inbox-ctx-tags">
              {activeConv.tags.map((t) => (
                <span key={t} className="chip chip-draft">{t}</span>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
              <div style={{ background: 'var(--paper)', borderRadius: 8, padding: 10 }}>
                <div style={{ fontSize: 10, color: 'var(--ink-f)' }}>Orders</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', fontFamily: "'Syne', sans-serif" }}>{activeConv.customer.orders}</div>
              </div>
              <div style={{ background: 'var(--paper)', borderRadius: 8, padding: 10 }}>
                <div style={{ fontSize: 10, color: 'var(--ink-f)' }}>LTV</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', fontFamily: "'Syne', sans-serif" }}>{activeConv.customer.ltv}</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-f)', marginBottom: 4 }}>📍 {activeConv.customer.location}</div>
            <div style={{ fontSize: 12, color: 'var(--ink-f)', marginBottom: 4 }}>📞 {activeConv.customer.phone}</div>
          </div>

          <div className="inbox-ctx-section">
            <div className="inbox-ctx-title">Recent Orders</div>
            {activeConv.customer.recentOrders.length === 0 ? (
              <div style={{ fontSize: 12, color: 'var(--ink-f)', fontStyle: 'italic' }}>No orders yet</div>
            ) : (
              activeConv.customer.recentOrders.map((o) => (
                <div key={o.id} className="inbox-ctx-order">
                  <div className="inbox-ctx-order-id">{o.id}</div>
                  <div className="inbox-ctx-order-detail">{o.amount} · {o.date} · {o.status}</div>
                </div>
              ))
            )}
          </div>

          <div className="inbox-ctx-section">
            <div className="inbox-ctx-title">Quick Actions</div>
            <div className="inbox-ctx-actions">
              <button className="inbox-ctx-btn">📦 Track Order</button>
              <button className="inbox-ctx-btn">🔄 Process Return</button>
              <button className="inbox-ctx-btn">🏷 Apply Discount</button>
              <button className="inbox-ctx-btn">📋 View Full Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
