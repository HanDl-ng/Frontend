export type ActivityStatus = 'success' | 'escalated' | 'failed' | 'info';

export interface ActivityItem {
  id: number;
  icon: React.ReactNode;
  channelIcon: React.ReactNode;
  channel: string;
  text: string;
  status: ActivityStatus;
  time: string;
}

export interface AttentionItem {
  icon: React.ReactNode;
  color: string;
  label: string;
  count: number;
  href: string;
  urgent: boolean;
}

export interface AutomationCard {
  name: string;
  status: 'live' | 'paused' | 'error';
  icon: React.ReactNode;
  category: string;
  runsToday: string;
  successRate: string;
  lastRun: string;
}

export interface ConversationPreview {
  name: string;
  initials: string;
  msg: string;
  channelIcon: React.ReactNode;
  channel: string;
  time: string;
  type: 'ai' | 'human';
  waiting: boolean;
}

export interface MetricItem {
  label: string;
  value: string;
  sub: string;
}
