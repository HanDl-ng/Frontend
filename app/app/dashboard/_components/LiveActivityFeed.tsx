'use client';

import { useState } from 'react';
import type { ActivityItem, ActivityStatus } from '../types';

interface Props {
  activity: ActivityItem[];
  statusConfig: Record<ActivityStatus, { dotClass: string; label: string }>;
}

export default function LiveActivityFeed({ activity, statusConfig }: Props) {
  const [feedFilter, setFeedFilter] = useState<'all' | 'messages' | 'payments' | 'orders'>('all');

  const filteredActivity = activity.filter((a) => {
    if (feedFilter === 'all') return true;
    if (feedFilter === 'messages') return a.text.toLowerCase().includes('message') || a.text.toLowerCase().includes('replied') || a.text.toLowerCase().includes('email') || a.text.toLowerCase().includes('escalated');
    if (feedFilter === 'payments') return a.text.toLowerCase().includes('payment') || a.text.toLowerCase().includes('₦');
    if (feedFilter === 'orders') return a.text.toLowerCase().includes('order') || a.text.toLowerCase().includes('purchase');
    return true;
  });

  return (
    <div className="dash-feed-card">
      <div className="dash-feed-header">
        <div className="dash-feed-title-row">
          <span className="dash-feed-title">
            <span className="dash-live-dot" />
            Live Activity
          </span>
          <span className="dash-feed-count">{activity.length} events</span>
        </div>
        <div className="dash-feed-filters">
          {(['all', 'messages', 'payments', 'orders'] as const).map((f) => (
            <button
              key={f}
              className={`dash-feed-filter${feedFilter === f ? ' active' : ''}`}
              onClick={() => setFeedFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="dash-feed-list">
        {filteredActivity.map((a) => {
          const cfg = statusConfig[a.status];
          return (
            <div key={a.id} className="dash-feed-item">
              <div className="dash-feed-item-icon">{a.icon}</div>
              <div className="dash-feed-item-body">
                <div className="dash-feed-item-text">{a.text}</div>
                <div className="dash-feed-item-meta">
                  <span className="dash-feed-channel">
                    <span className="dash-feed-channel-icon">{a.channelIcon}</span>
                    {a.channel}
                  </span>
                  <span className="dash-feed-item-time">{a.time}</span>
                </div>
              </div>
              {a.status !== 'info' && (
                <span className={`dash-feed-status ${cfg.dotClass}`}>
                  <span className="dash-feed-status-dot" />
                  {cfg.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
