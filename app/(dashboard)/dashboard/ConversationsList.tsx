import Link from 'next/link';
import { RobotIcon, UserIcon, ClockIcon } from '@/components/icons';
import type { ConversationPreview } from './types';

interface Props {
  conversations: ConversationPreview[];
}

export default function ConversationsList({ conversations }: Props) {
  return (
    <div className="dash-section">
      <div className="dash-section-header">
        <span className="dash-section-title">Open Conversations</span>
        <Link href="/conversations" className="d-card-action">Inbox →</Link>
      </div>
      <div className="dash-convos-list">
        {conversations.map((c) => (
          <Link key={c.name} href="/conversations" className={`dash-convo-item${c.waiting ? ' waiting' : ''}`}>
            <div className={`dash-convo-avatar ${c.type}`}>{c.initials}</div>
            <div className="dash-convo-body">
              <div className="dash-convo-top-row">
                <span className="dash-convo-name">{c.name}</span>
                <div className="dash-convo-right">
                  <span className="dash-convo-channel-icon">{c.channelIcon}</span>
                  <span className="dash-convo-time">{c.time}</span>
                </div>
              </div>
              <div className="dash-convo-msg">{c.msg}</div>
              <div className="dash-convo-badges">
                <span className={`chip chip-${c.type}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  {c.type === 'ai' ? <><RobotIcon className="chip-icon" /> AI</> : <><UserIcon className="chip-icon" /> Human</>}
                </span>
                {c.waiting && (
                  <span className="dash-convo-waiting-badge">
                    <ClockIcon className="dash-convo-waiting-icon" />
                    Waiting
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
