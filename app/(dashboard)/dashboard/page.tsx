import Link from 'next/link';
import { liveActivity, attentionItems, metrics, automations, conversations, statusConfig } from './data';
import LiveActivityFeed from './LiveActivityFeed';
import NeedsAttention from './NeedsAttention';
import MetricsStrip from './MetricsStrip';
import AutomationsGrid from './AutomationsGrid';
import ConversationsList from './ConversationsList';
import './styles.css';

export default function DashboardPage() {
  return (
    <div className="page-content">
      <div className="dash-header">
        <div className="dash-header-left">
          <h1 className="dash-greeting">Good morning, John</h1>
          <p className="dash-subtext">Here&apos;s what is happening with your business right now.</p>
        </div>
        <Link href="/automations/builder" className="btn btn-teal dash-new-auto-btn">
          + New Automation
        </Link>
      </div>

      <div className="dash-primary-grid">
        <LiveActivityFeed activity={liveActivity} statusConfig={statusConfig} />
        <NeedsAttention items={attentionItems} />
      </div>

      <MetricsStrip metrics={metrics} />
      <AutomationsGrid automations={automations} />
      <ConversationsList conversations={conversations} />
    </div>
  );
}
