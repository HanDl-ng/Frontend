'use client';

import { useState } from 'react';

const orders = [
  { id: 'ORD-2847', customer: 'Adebayo Ogunlesi', email: 'adebayo@email.com', items: 3, total: '₦45,000', status: 'shipped' as const, channel: '💬 WhatsApp', date: 'Today, 10:23 AM', payment: 'Paid' },
  { id: 'ORD-2846', customer: 'Funke Adeyemi', email: 'funke@email.com', items: 1, total: '₦18,500', status: 'processing' as const, channel: '📸 Instagram', date: 'Today, 09:45 AM', payment: 'Paid' },
  { id: 'ORD-2845', customer: 'Ngozi Igwe', email: 'ngozi@email.com', items: 2, total: '₦65,000', status: 'pending' as const, channel: '💬 WhatsApp', date: 'Today, 09:12 AM', payment: 'Pending' },
  { id: 'ORD-2844', customer: 'Chidi Eze', email: 'chidi@email.com', items: 1, total: '₦52,000', status: 'delivered' as const, channel: '🌐 Web Chat', date: 'Yesterday', payment: 'Paid' },
  { id: 'ORD-2843', customer: 'Emeka Nwosu', email: 'emeka@business.com', items: 50, total: '₦2,250,000', status: 'delivered' as const, channel: '✉️ Email', date: 'Yesterday', payment: 'Paid' },
  { id: 'ORD-2842', customer: 'Aisha Mohammed', email: 'aisha@email.com', items: 2, total: '₦36,500', status: 'cancelled' as const, channel: '💬 WhatsApp', date: '2 days ago', payment: 'Refunded' },
  { id: 'ORD-2841', customer: 'Tunde Bakare', email: 'tunde@email.com', items: 4, total: '₦78,000', status: 'shipped' as const, channel: '📸 Instagram', date: '2 days ago', payment: 'Paid' },
  { id: 'ORD-2840', customer: 'Blessing Obi', email: 'blessing@email.com', items: 1, total: '₦85,000', status: 'delivered' as const, channel: '🌐 Web Chat', date: '3 days ago', payment: 'Paid' },
];

const statusClass: Record<string, string> = {
  shipped: 'chip-ai',
  processing: 'chip-paused',
  pending: 'chip-pending',
  delivered: 'chip-live',
  cancelled: 'chip-error',
};

const statusFilters = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function OrdersPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);

  const filtered = orders.filter((o) => {
    if (filter !== 'All' && o.status !== filter.toLowerCase()) return false;
    if (search && !o.id.toLowerCase().includes(search.toLowerCase()) && !o.customer.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Orders</h1>
            <p className="page-desc">Track and manage customer orders.</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-ghost">📥 Export</button>
          </div>
        </div>
      </div>

      <div className="filter-bar">
        <input
          className="filter-input"
          placeholder="Search orders…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {statusFilters.map((s) => (
          <button
            key={s}
            className={`inbox-filter${filter === s ? ' active' : ''}`}
            onClick={() => setFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="table-wrap">
        <table className="d-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Channel</th>
              <th>Payment</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedOrder(o)}>
                <td style={{ fontWeight: 600, color: 'var(--teal)' }}>{o.id}</td>
                <td>
                  <div style={{ fontWeight: 600 }}>{o.customer}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-f)' }}>{o.email}</div>
                </td>
                <td>{o.items}</td>
                <td style={{ fontWeight: 600 }}>{o.total}</td>
                <td><span className={`chip ${statusClass[o.status]}`}>{o.status}</span></td>
                <td style={{ fontSize: 12 }}>{o.channel}</td>
                <td>
                  <span className={`chip ${o.payment === 'Paid' ? 'chip-live' : o.payment === 'Pending' ? 'chip-pending' : 'chip-error'}`}>
                    {o.payment}
                  </span>
                </td>
                <td style={{ fontSize: 12, color: 'var(--ink-f)' }}>{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Detail Slide-over */}
      <div className={`slide-over-overlay${selectedOrder ? ' open' : ''}`}>
        <div className="slide-over">
          <div className="slide-over-header">
            <span className="slide-over-title">{selectedOrder?.id}</span>
            <button className="slide-over-close" onClick={() => setSelectedOrder(null)}>✕</button>
          </div>
          {selectedOrder && (
            <div className="slide-over-body">
              <div className="inbox-ctx-section">
                <div className="inbox-ctx-title">Customer</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{selectedOrder.customer}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-f)' }}>{selectedOrder.email}</div>
              </div>
              <div className="inbox-ctx-section">
                <div className="inbox-ctx-title">Order Details</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div style={{ background: 'var(--paper)', borderRadius: 10, padding: 12 }}>
                    <div style={{ fontSize: 10, color: 'var(--ink-f)' }}>Total</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', fontFamily: "'Syne', sans-serif" }}>{selectedOrder.total}</div>
                  </div>
                  <div style={{ background: 'var(--paper)', borderRadius: 10, padding: 12 }}>
                    <div style={{ fontSize: 10, color: 'var(--ink-f)' }}>Items</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', fontFamily: "'Syne', sans-serif" }}>{selectedOrder.items}</div>
                  </div>
                </div>
              </div>
              <div className="inbox-ctx-section">
                <div className="inbox-ctx-title">Status</div>
                <span className={`chip ${statusClass[selectedOrder.status]}`} style={{ fontSize: 12, padding: '4px 12px' }}>
                  {selectedOrder.status}
                </span>
              </div>
              <div className="inbox-ctx-section">
                <div className="inbox-ctx-title">Timeline</div>
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-dot teal">🛒</div>
                    <div className="timeline-body">
                      <div className="timeline-text">Order placed via {selectedOrder.channel}</div>
                      <div className="timeline-time">{selectedOrder.date}</div>
                    </div>
                  </div>
                  {selectedOrder.status !== 'pending' && selectedOrder.status !== 'cancelled' && (
                    <div className="timeline-item">
                      <div className="timeline-dot blue">📋</div>
                      <div className="timeline-body">
                        <div className="timeline-text">Order confirmed & processing</div>
                        <div className="timeline-time">Shortly after order</div>
                      </div>
                    </div>
                  )}
                  {(selectedOrder.status === 'shipped' || selectedOrder.status === 'delivered') && (
                    <div className="timeline-item">
                      <div className="timeline-dot orange">📦</div>
                      <div className="timeline-body">
                        <div className="timeline-text">Package shipped</div>
                        <div className="timeline-time">Tracking available</div>
                      </div>
                    </div>
                  )}
                  {selectedOrder.status === 'delivered' && (
                    <div className="timeline-item">
                      <div className="timeline-dot teal">✅</div>
                      <div className="timeline-body">
                        <div className="timeline-text">Delivered successfully</div>
                        <div className="timeline-time">Completed</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
