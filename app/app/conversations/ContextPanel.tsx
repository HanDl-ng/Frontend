import {
  MailIcon, PhoneIcon, MapPinIcon, ChevronLeftIcon,
  ShoppingBagIcon, ClockIcon, BoltIcon,
} from '@/components/icons';
import { workflowActions } from './data';
import type { Conversation } from './types';

interface ContextPanelProps {
  activeConv: Conversation;
  isMobile: boolean;
  isTablet: boolean;
  mobileView: string;
  showContextPanel: boolean;
  onBack: () => void;
}

export default function ContextPanel({
  activeConv,
  isMobile,
  isTablet,
  mobileView,
  showContextPanel,
  onBack,
}: ContextPanelProps) {
  return (
    <div
      className={`inbox-context${isTablet && !isMobile && showContextPanel ? ' tablet-show' : ''}${isMobile && mobileView === 'context' ? ' mobile-show' : ''}`}
    >
      {isTablet && (
        <button className="inbox-context-back" onClick={onBack}>
          <ChevronLeftIcon /> Back to chat
        </button>
      )}

      <div className="inbox-ctx-section">
        <div className="inbox-ctx-title">Customer</div>
        <div className="inbox-ctx-customer">
          <div className="inbox-ctx-avatar" style={{ background: activeConv.color }}>
            {activeConv.initials}
          </div>
          <div>
            <div className="inbox-ctx-name">{activeConv.name}</div>
            <div className="inbox-ctx-id">{activeConv.channel}</div>
          </div>
        </div>
        <div className="inbox-ctx-detail"><MailIcon /> {activeConv.customer.email}</div>
        <div className="inbox-ctx-detail"><PhoneIcon /> {activeConv.customer.phone}</div>
        <div className="inbox-ctx-detail"><MapPinIcon /> {activeConv.customer.location}</div>
      </div>

      <div className="inbox-ctx-section">
        <div className="inbox-ctx-title"><ShoppingBagIcon /> Orders</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
          <div style={{ background: 'var(--paper)', borderRadius: 8, padding: 10 }}>
            <div style={{ fontSize: 10, color: 'var(--ink-f)' }}>Total Orders</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', fontFamily: "'Syne', sans-serif" }}>
              {activeConv.customer.orders}
            </div>
          </div>
          <div style={{ background: 'var(--paper)', borderRadius: 8, padding: 10 }}>
            <div style={{ fontSize: 10, color: 'var(--ink-f)' }}>Lifetime Value</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', fontFamily: "'Syne', sans-serif" }}>
              {activeConv.customer.ltv}
            </div>
          </div>
        </div>
      </div>

      <div className="inbox-ctx-section">
        <div className="inbox-ctx-title"><ClockIcon /> Recent Orders</div>
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

      {activeConv.handledBy === 'human' && (
        <div className="inbox-ctx-section">
          <div className="inbox-ctx-title"><BoltIcon /> Actions</div>
          <div className="inbox-ctx-actions">
            {workflowActions.map((a) => (
              <button key={a.label} className="inbox-ctx-btn">
                <div className="inbox-ctx-btn-icon">{a.icon}</div>
                <div className="inbox-ctx-btn-text">
                  <span className="inbox-ctx-btn-label">{a.label}</span>
                  <span className="inbox-ctx-btn-desc">{a.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
