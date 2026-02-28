import {
  CartIcon, ShoppingBagIcon, RobotIcon, PackageIcon,
  BoltIcon, BarChartIcon, RefreshIcon,
} from '@/components/icons';

export interface Automation {
  id: string;
  name: string;
  desc: string;
  status: 'live' | 'paused' | 'draft';
  icon: React.ReactNode;
  iconType: string;
  runs: string;
  success: string;
  lastRun: string;
  trigger: string;
}

export const myAutomations: Automation[] = [
  {
    id: '1', name: 'Order Confirmation Flow', desc: 'Sends order confirmation with tracking details via WhatsApp and email',
    status: 'live', icon: <CartIcon />, iconType: 'commerce', runs: '2,340', success: '99.1%',
    lastRun: '2 min ago', trigger: 'New Order Created',
  },
  {
    id: '2', name: 'Abandoned Cart Recovery', desc: 'Re-engages customers who left items in cart after 1 hour',
    status: 'live', icon: <ShoppingBagIcon />, iconType: 'commerce', runs: '890', success: '97.8%',
    lastRun: '15 min ago', trigger: 'Cart Abandoned (1h)',
  },
  {
    id: '3', name: 'AI Support Router', desc: 'Routes incoming support queries to AI or human agents based on complexity',
    status: 'live', icon: <RobotIcon />, iconType: 'ai', runs: '1,456', success: '95.2%',
    lastRun: '5 min ago', trigger: 'New Message Received',
  },
  {
    id: '4', name: 'Delivery Notification', desc: 'Sends real-time delivery updates to customers via their preferred channel',
    status: 'live', icon: <PackageIcon />, iconType: 'commerce', runs: '1,120', success: '99.6%',
    lastRun: '8 min ago', trigger: 'Delivery Status Changed',
  },
  {
    id: '5', name: 'Lead Qualifier', desc: 'Qualifies incoming leads with AI conversation and scores them',
    status: 'paused', icon: <BoltIcon />, iconType: 'trigger', runs: '234', success: '92.3%',
    lastRun: '1 hour ago', trigger: 'New Contact Created',
  },
  {
    id: '6', name: 'Weekly Report Generator', desc: 'Generates and sends weekly performance reports to the team',
    status: 'live', icon: <BarChartIcon />, iconType: 'ai', runs: '48', success: '100%',
    lastRun: '3 days ago', trigger: 'Scheduled (Every Monday)',
  },
  {
    id: '7', name: 'Return & Refund Handler', desc: 'Processes return requests with AI, creates tickets for approval',
    status: 'draft', icon: <RefreshIcon />, iconType: 'commerce', runs: '0', success: '—',
    lastRun: 'Never', trigger: 'Return Request',
  },
];

export const statusOptions = ['All', 'Live', 'Paused', 'Draft'];
