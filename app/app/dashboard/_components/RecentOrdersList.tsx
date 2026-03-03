import Link from 'next/link';
import type { RecentOrder } from '../types';

const statusStyles: Record<string, { className: string, label: string }> = {
  pending: { className: 'chip-draft', label: 'Pending' },
  confirmed: { className: 'chip-live', label: 'Confirmed' },
  processing: { className: 'chip-info', label: 'Processing' },
  shipped: { className: 'chip-info', label: 'Shipped' },
  delivered: { className: 'chip-live', label: 'Delivered' },
  cancelled: { className: 'chip-error', label: 'Cancelled' },
};

interface Props {
  orders: RecentOrder[];
}

export default function RecentOrdersList({ orders }: Props) {
  return (
    <div className="dash-section">
      <div className="dash-section-header">
        <span className="dash-section-title">Recent Orders</span>
        <Link href="/app/orders" className="d-card-action">View all →</Link>
      </div>
      <div className="dash-convos-list">
        <table className="d-table" style={{ margin: 0 }}>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => {
              const sc = statusStyles[o.status] ?? statusStyles.pending;
              return (
                <tr key={o.id} style={{ cursor: 'pointer' }}>
                  <td style={{ fontWeight: 600, color: 'var(--teal)', fontSize: 13 }}>{o.id}</td>
                  <td style={{ fontSize: 13 }}>{o.customer}</td>
                  <td style={{ fontWeight: 700, fontSize: 13 }}>{o.total}</td>
                  <td>
                    <span className={`chip ${sc.className}`}>
                      <span className="chip-dot" />{sc.label}
                    </span>
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--ink-f)' }}>{o.time}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
