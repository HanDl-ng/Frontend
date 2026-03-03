import type { Order } from './orders-data';
import { statusConfig, paymentConfig } from './orders-data';
import { XIcon, ChatIcon } from '@/components/icons';
import Link from 'next/link';

interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
}

export default function OrderDetailModal({ order, onClose }: OrderDetailModalProps) {
  const sc = statusConfig[order.status];
  const pc = paymentConfig[order.paymentStatus];

  return (
    <div className="ch-modal-overlay" onClick={onClose}>
      <div className="ch-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ch-modal-header">
          <div className="ch-modal-header-left">
            <div>
              <div className="ch-modal-title">Order {order.id}</div>
              <div className="ch-modal-cat">{order.date} · {order.channel}</div>
            </div>
          </div>
          <button className="ch-modal-close" onClick={onClose}>
            <XIcon />
          </button>
        </div>

        <div className="ch-modal-body">
          {/* Status */}
          <div className="order-detail-status">
            <span className={`chip ${sc.className}`}><span className="chip-dot" />{sc.label}</span>
            <span className={`chip ${pc.className}`}><span className="chip-dot" />{pc.label}</span>
          </div>

          {/* Customer */}
          <div className="ch-modal-section">
            <div className="ch-modal-section-title">Customer</div>
            <div className="order-detail-customer">
              <div className="order-avatar lg">{order.initials}</div>
              <div>
                <div className="order-detail-customer-name">{order.customer}</div>
                <div className="order-detail-customer-channel">via {order.channel}</div>
              </div>
              {order.conversationId && (
                <Link href="/app/conversations" className="btn btn-ghost" style={{ marginLeft: 'auto', height: 32, fontSize: 12 }}>
                  <ChatIcon /> View Conversation
                </Link>
              )}
            </div>
          </div>

          {/* Items */}
          <div className="ch-modal-section">
            <div className="ch-modal-section-title">Items</div>
            <div className="order-items-list">
              {order.items.map((item, i) => (
                <div key={i} className="order-item-row">
                  <div className="order-item-details">
                    <span className="order-item-name">{item.name}</span>
                    <span className="order-item-qty">× {item.qty}</span>
                  </div>
                  <span className="order-item-price">{item.price}</span>
                </div>
              ))}
              <div className="order-item-row order-total-row">
                <span className="order-item-name" style={{ fontWeight: 700 }}>Total</span>
                <span className="order-item-price" style={{ fontWeight: 700, color: 'var(--ink)' }}>{order.total}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="ch-modal-footer">
          {order.status === 'pending' && (
            <button className="btn btn-teal">Confirm Order</button>
          )}
          {order.status === 'confirmed' && (
            <button className="btn btn-teal">Mark Processing</button>
          )}
          {order.status !== 'cancelled' && order.status !== 'delivered' && (
            <button className="btn btn-ghost" style={{ color: '#e05252', borderColor: 'rgba(224,82,82,.3)' }}>Cancel Order</button>
          )}
        </div>
      </div>
    </div>
  );
}
