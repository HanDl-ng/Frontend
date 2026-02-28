import Link from 'next/link';
import { CheckCircleIcon, RobotIcon } from '@/components/icons';
import type { AttentionItem } from './types';

interface Props {
  items: AttentionItem[];
}

export default function NeedsAttention({ items }: Props) {
  const allHealthy = items.every((a) => a.count === 0);

  return (
    <div className="dash-attention-card">
      <div className="dash-attention-header">
        <span className="dash-attention-title">Needs Attention</span>
      </div>

      {allHealthy ? (
        <div className="dash-attention-healthy">
          <div className="dash-attention-healthy-icon">
            <CheckCircleIcon />
          </div>
          <div className="dash-attention-healthy-text">All systems operational</div>
          <div className="dash-attention-healthy-sub">No items need your attention right now.</div>
        </div>
      ) : (
        <div className="dash-attention-list">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`dash-attention-item${item.count > 0 ? ' has-issues' : ' clear'}`}
            >
              <div className={`dash-attention-item-icon ${item.color}`}>{item.icon}</div>
              <div className="dash-attention-item-body">
                <div className="dash-attention-item-label">{item.label}</div>
                {item.count > 0 ? (
                  <div className="dash-attention-item-count">{item.count} item{item.count > 1 ? 's' : ''}</div>
                ) : (
                  <div className="dash-attention-item-ok">All clear</div>
                )}
              </div>
              {item.count > 0 && item.urgent && (
                <span className="dash-attention-badge">{item.count}</span>
              )}
            </Link>
          ))}
        </div>
      )}

      <div className="dash-ai-summary">
        <div className="dash-ai-summary-header">
          <RobotIcon className="dash-ai-summary-icon" />
          <span>AI Summary</span>
        </div>
        <p className="dash-ai-summary-text">
          Handled <strong>124 conversations</strong> today with <strong>87% resolution rate</strong>.
          Recovered <strong>₦48,200</strong> from abandoned carts. 3 conversations need human attention.
        </p>
      </div>
    </div>
  );
}
