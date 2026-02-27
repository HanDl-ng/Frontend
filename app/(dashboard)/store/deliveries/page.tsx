'use client';

import { useState } from 'react';

type DeliveryStatus = 'pending' | 'picked-up' | 'in-transit' | 'delivered';

interface Delivery {
  id: string;
  orderId: string;
  customer: string;
  address: string;
  status: DeliveryStatus;
  rider: string;
  eta: string;
  items: number;
}

const deliveries: Delivery[] = [
  { id: 'DEL-1925', orderId: 'ORD-2847', customer: 'Adebayo O.', address: '15 Victoria Island, Lagos', status: 'in-transit', rider: 'Kola A.', eta: '25 min', items: 3 },
  { id: 'DEL-1924', orderId: 'ORD-2846', customer: 'Funke A.', address: '8 Garki Area 1, Abuja', status: 'picked-up', rider: 'Ibrahim M.', eta: '45 min', items: 1 },
  { id: 'DEL-1923', orderId: 'ORD-2844', customer: 'Chidi E.', address: '22 GRA Phase 2, Port Harcourt', status: 'delivered', rider: 'Emeka J.', eta: 'Delivered', items: 1 },
  { id: 'DEL-1922', orderId: 'ORD-2841', customer: 'Tunde B.', address: '5 Allen Avenue, Ikeja', status: 'in-transit', rider: 'Kola A.', eta: '15 min', items: 4 },
  { id: 'DEL-1921', orderId: 'ORD-2840', customer: 'Blessing O.', address: '12 Lekki Phase 1, Lagos', status: 'delivered', rider: 'Samuel O.', eta: 'Delivered', items: 1 },
  { id: 'DEL-1920', orderId: 'ORD-2839', customer: 'Grace N.', address: '3 Wuse Zone 4, Abuja', status: 'pending', rider: 'Unassigned', eta: 'Pending', items: 2 },
  { id: 'DEL-1919', orderId: 'ORD-2838', customer: 'Yusuf K.', address: '18 Old GRA, Benin City', status: 'pending', rider: 'Unassigned', eta: 'Pending', items: 3 },
  { id: 'DEL-1918', orderId: 'ORD-2837', customer: 'Amina T.', address: '7 Independence Layout, Enugu', status: 'picked-up', rider: 'David U.', eta: '1 hr', items: 2 },
];

const columns: { label: string; status: DeliveryStatus; color: string }[] = [
  { label: 'Pending', status: 'pending', color: 'var(--ink-f)' },
  { label: 'Picked Up', status: 'picked-up', color: '#c49400' },
  { label: 'In Transit', status: 'in-transit', color: '#5a7fd4' },
  { label: 'Delivered', status: 'delivered', color: 'var(--teal)' },
];

export default function DeliveriesPage() {
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Deliveries</h1>
            <p className="page-desc">Track and manage delivery logistics.</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-ghost">📍 Live Map</button>
            <button className="btn btn-teal">+ Assign Rider</button>
          </div>
        </div>
      </div>

      {/* KPI row */}
      <div className="kpi-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {columns.map((col) => {
          const count = deliveries.filter((d) => d.status === col.status).length;
          return (
            <div key={col.status} className="kpi-item">
              <div className="kpi-item-label">{col.label}</div>
              <div className="kpi-item-value" style={{ color: col.color }}>{count}</div>
            </div>
          );
        })}
      </div>

      {/* Kanban Board */}
      <div className="kanban">
        {columns.map((col) => {
          const items = deliveries.filter((d) => d.status === col.status);
          return (
            <div key={col.status} className="kanban-col">
              <div className="kanban-col-header">
                <span style={{ color: col.color }}>{col.label}</span>
                <span className="kanban-col-count">{items.length}</span>
              </div>
              {items.map((d) => (
                <div key={d.id} className="kanban-card" onClick={() => setSelectedDelivery(d)}>
                  <div className="kanban-card-name">{d.customer}</div>
                  <div className="kanban-card-address">{d.address}</div>
                  <div className="kanban-card-footer">
                    <span className="kanban-card-order">{d.orderId}</span>
                    <span className="kanban-card-eta">
                      {d.status === 'delivered' ? '✅' : `🕐 ${d.eta}`}
                    </span>
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--ink-f)', marginTop: 6 }}>
                    🏍 {d.rider} · {d.items} items
                  </div>
                </div>
              ))}
              {items.length === 0 && (
                <div style={{ fontSize: 12, color: 'var(--ink-f)', textAlign: 'center', padding: 20, fontStyle: 'italic' }}>
                  No deliveries
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Delivery Detail Slide-over */}
      <div className={`slide-over-overlay${selectedDelivery ? ' open' : ''}`}>
        <div className="slide-over">
          <div className="slide-over-header">
            <span className="slide-over-title">{selectedDelivery?.id}</span>
            <button className="slide-over-close" onClick={() => setSelectedDelivery(null)}>✕</button>
          </div>
          {selectedDelivery && (
            <div className="slide-over-body">
              <div className="inbox-ctx-section">
                <div className="inbox-ctx-title">Delivery Info</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{selectedDelivery.customer}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-f)', marginBottom: 12 }}>📍 {selectedDelivery.address}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div style={{ background: 'var(--paper)', borderRadius: 10, padding: 12 }}>
                    <div style={{ fontSize: 10, color: 'var(--ink-f)' }}>Order</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--teal)' }}>{selectedDelivery.orderId}</div>
                  </div>
                  <div style={{ background: 'var(--paper)', borderRadius: 10, padding: 12 }}>
                    <div style={{ fontSize: 10, color: 'var(--ink-f)' }}>ETA</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{selectedDelivery.eta}</div>
                  </div>
                </div>
              </div>
              <div className="inbox-ctx-section">
                <div className="inbox-ctx-title">Rider</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--teal)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
                    {selectedDelivery.rider.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{selectedDelivery.rider}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-f)' }}>Delivery Partner</div>
                  </div>
                </div>
              </div>
              <div className="inbox-ctx-section">
                <div className="inbox-ctx-title">Actions</div>
                <div className="inbox-ctx-actions">
                  <button className="inbox-ctx-btn">📞 Call Rider</button>
                  <button className="inbox-ctx-btn">📍 Track Live</button>
                  <button className="inbox-ctx-btn">📋 View Order</button>
                  <button className="inbox-ctx-btn">🔄 Reassign Rider</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
