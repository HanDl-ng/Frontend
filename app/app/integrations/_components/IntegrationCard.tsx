import type { Integration } from './integrations-data';
import {
  GearIcon,
  LinkIcon,
  HourglassIcon,
  ChatIcon,
} from '@/components/icons';

interface IntegrationCardProps {
  integration: Integration;
  onConfigure: (integration: Integration) => void;
}

export default function IntegrationCard({ integration: ch, onConfigure }: IntegrationCardProps) {
  return (
    <div className="channel-card">
      <div className="channel-card-logo">
        <ch.Icon className="channel-card-icon" />
      </div>
      <div className="channel-card-body">
        <div className="channel-card-header">
          <div className="channel-card-name">{ch.name}</div>
          {ch.type === 'generic' && (
            <span className="chip chip-draft" style={{ fontSize: 10 }}>Generic</span>
          )}
        </div>
        <div className="channel-card-desc">{ch.desc}</div>
        {ch.status === 'connected' && (
          <div className="channel-card-stat">
            <ChatIcon className="channel-stat-icon" />
            {ch.messages} messages this month
          </div>
        )}
      </div>
      <button
        className="channel-card-action"
        style={{
          background: ch.status === 'connected' ? 'var(--paper)' : ch.status === 'pending' ? 'rgba(254,188,46,.1)' : 'var(--teal)',
          color: ch.status === 'connected' ? 'var(--ink-m)' : ch.status === 'pending' ? '#c49400' : '#fff',
        }}
        onClick={() => ch.status === 'connected' ? onConfigure(ch) : undefined}
      >
        {ch.status === 'connected' && (
          <><GearIcon className="channel-btn-icon" /> Configure</>
        )}
        {ch.status === 'pending' && (
          <><HourglassIcon className="channel-btn-icon" /> Setup Pending</>
        )}
        {ch.status === 'disconnected' && (
          <><LinkIcon className="channel-btn-icon" /> Connect</>
        )}
      </button>
    </div>
  );
}
