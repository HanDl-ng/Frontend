import { liveActivity, attentionItems, metrics, recentOrders, conversations, statusConfig } from './data';
import LiveActivityFeed from './_components/LiveActivityFeed';
import NeedsAttention from './_components/NeedsAttention';
import MetricsStrip from './_components/MetricsStrip';
import RecentOrdersList from './_components/RecentOrdersList';
import ConversationsList from './_components/ConversationsList';
import './styles.css';

export default function DashboardPage() {
  return (
    <div className="page-content">
      <div className="dash-header">
        <div className="dash-header-left">
          <h1 className="dash-greeting">Good morning, John</h1>
          <p className="dash-subtext">Here&apos;s what&apos;s happening with your business right now.</p>
        </div>
      </div>

      <div className="dash-primary-grid">
        <LiveActivityFeed activity={liveActivity} statusConfig={statusConfig} />
        <NeedsAttention items={attentionItems} />
      </div>

      <MetricsStrip metrics={metrics} />
      <RecentOrdersList orders={recentOrders} />
      <ConversationsList conversations={conversations} />
    </div>
  );
}
