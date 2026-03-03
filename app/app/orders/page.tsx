'use client';

import { useState } from 'react';
import { orders, orderFilters, type Order } from './_components/orders-data';
import OrderRow from './_components/OrderRow';
import OrderDetailModal from './_components/OrderDetailModal';
import './_components/styles.css';

const summaryData = [
  { value: '₦2.1M', label: 'Revenue Today', sub: '+18% vs yesterday' },
  { value: '34', label: 'Orders Today', sub: '28 confirmed' },
  { value: '89%', label: 'Fulfillment Rate', sub: 'last 7 days' },
  { value: '₦24,800', label: 'Avg Order Value', sub: 'this month' },
];

export default function OrdersPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [viewing, setViewing] = useState<Order | null>(null);

  const filtered = orders.filter((o) => {
    if (filter !== 'All' && o.status !== filter.toLowerCase()) return false;
    if (search && !o.id.toLowerCase().includes(search.toLowerCase()) &&
        !o.customer.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Orders</h1>
            <p className="page-desc">Manage orders created by AI agent, API, or manually.</p>
          </div>
        </div>
      </div>

      <div className="orders-summary">
        {summaryData.map((s) => (
          <div key={s.label} className="order-summary-card">
            <div className="order-summary-value">{s.value}</div>
            <div className="order-summary-label">{s.label}</div>
            <div className="order-summary-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="filter-bar">
        <input
          className="filter-input"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="filter-pills">
          {orderFilters.map((f) => (
            <button
              key={f}
              className={`inbox-filter${filter === f ? ' active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="d-card">
        <div className="table-wrap" style={{ border: 'none' }}>
          <table className="d-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Channel</th>
                <th>Total</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <OrderRow key={order.id} order={order} onView={setViewing} />
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: 40, color: 'var(--ink-f)' }}>
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {viewing && (
        <OrderDetailModal order={viewing} onClose={() => setViewing(null)} />
      )}
    </div>
  );
}
