import Link from 'next/link';
import { EditIcon, PauseIcon, PlayIcon, ClockIcon } from '@/components/icons';
import type { AutomationCard } from './types';

interface Props {
  automations: AutomationCard[];
}

export default function AutomationsGrid({ automations }: Props) {
  return (
    <div className="dash-section">
      <div className="dash-section-header">
        <span className="dash-section-title">Automations</span>
        <Link href="/automations" className="d-card-action">View all →</Link>
      </div>
      <div className="dash-auto-grid">
        {automations.slice(0, 3).map((auto) => (
          <div key={auto.name} className={`dash-auto-card dash-auto-${auto.status}`}>
            <div className="dash-auto-card-top">
              {/* <div className={`dash-auto-card-icon ${auto.status}`}>{auto.icon}</div> */}
              <span className={`chip chip-${auto.status}`}>
                <span className="chip-dot" />
                {auto.status}
              </span>
            </div>
            <div className="dash-auto-card-name">{auto.name}</div>
            <div className="dash-auto-card-category">{auto.category}</div>
            <div className="dash-auto-card-stats">
              <div className="dash-auto-stat">
                <span className="dash-auto-stat-val">{auto.runsToday}</span>
                <span className="dash-auto-stat-label">runs today</span>
              </div>
              <div className="dash-auto-stat">
                <span className="dash-auto-stat-val">{auto.successRate}</span>
                <span className="dash-auto-stat-label">success</span>
              </div>
            </div>
            <div className="dash-auto-card-footer">
              <span className="dash-auto-card-last">
                <ClockIcon className="dash-auto-clock" /> {auto.lastRun}
              </span>
              <div className="dash-auto-actions">
                <button className="dash-auto-action-btn" title="Edit">
                  <EditIcon />
                </button>
                <button className="dash-auto-action-btn" title={auto.status === 'paused' ? 'Resume' : 'Pause'}>
                  {auto.status === 'paused' ? <PlayIcon /> : <PauseIcon />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
