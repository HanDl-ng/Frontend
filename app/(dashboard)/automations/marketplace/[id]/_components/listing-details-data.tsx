import {
  SparklesIcon, GlobeIcon, RobotIcon, PackageIcon,
  ChatIcon, BoltIcon, ClockIcon, SendIcon,
  WebhookIcon, SearchIcon, CartIcon, CreditCardIcon,
  GitBranchIcon, LinkIcon, BarChartIcon, ShoppingBagIcon,
} from '@/components/icons';
import { type Node, type Edge } from 'reactflow';

export interface ListingDetail {
  id: string;
  name: string;
  desc: string;
  longDesc: string;
  author: string;
  authorVerified: boolean;
  icon: React.ReactNode;
  category: string;
  rating: number;
  reviews: number;
  installs: number;
  channels: string[];
  tags: string[];
  published: string;
  updated: string;
  nodes: Node[];
  edges: Edge[];
}

export const allListings: Record<string, ListingDetail> = {
  'mp-1': {
    id: 'mp-1',
    name: 'Smart Customer Onboarding',
    desc: 'Welcomes new customers with a personalized AI conversation, collects preferences, and sets up their account automatically.',
    longDesc: 'This workflow triggers when a new customer sends their first message. An AI agent greets them, collects their name and preferences through a natural conversation, then automatically creates their account and sends a personalised welcome package. If the customer asks a question the AI can\'t handle, it routes to a human agent with full context.',
    author: 'HanDl Team',
    authorVerified: true,
    icon: <SparklesIcon />,
    category: 'sales',
    rating: 4.9,
    reviews: 128,
    installs: 3420,
    channels: ['WhatsApp', 'Web Chat', 'Telegram'],
    tags: ['onboarding', 'ai', 'welcome', 'personalization'],
    published: 'Oct 12, 2024',
    updated: 'Jan 5, 2025',
    nodes: [
      { id: 'n1', type: 'mpNode', position: { x: 0, y: 120 }, data: { label: 'Message Trigger', icon: 'chat', nodeType: 'trigger' } },
      { id: 'n2', type: 'mpNode', position: { x: 260, y: 120 }, data: { label: 'AI Conversation', icon: 'sparkles', nodeType: 'ai' } },
      { id: 'n3', type: 'mpNode', position: { x: 520, y: 40 }, data: { label: 'Create Account', icon: 'bolt', nodeType: 'action' } },
      { id: 'n4', type: 'mpNode', position: { x: 520, y: 200 }, data: { label: 'Route to Human', icon: 'git', nodeType: 'condition' } },
      { id: 'n5', type: 'mpNode', position: { x: 780, y: 40 }, data: { label: 'Send Welcome', icon: 'send', nodeType: 'action' } },
      { id: 'n6', type: 'mpNode', position: { x: 780, y: 200 }, data: { label: 'Assign Agent', icon: 'robot', nodeType: 'action' } },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2', animated: true },
      { id: 'e2', source: 'n2', target: 'n3', label: 'collected' },
      { id: 'e3', source: 'n2', target: 'n4', label: 'needs help' },
      { id: 'e4', source: 'n3', target: 'n5' },
      { id: 'e5', source: 'n4', target: 'n6' },
    ],
  },
  'mp-2': {
    id: 'mp-2',
    name: 'Multi-Channel Order Tracker',
    desc: 'Tracks orders across carriers and sends real-time status updates to customers on their preferred messaging channel.',
    longDesc: 'Listens for order status webhooks from your ecommerce platform. When an order status changes (confirmed, shipped, out for delivery, delivered), it automatically sends a formatted update to the customer via their preferred channel. Supports multiple carriers and includes a "Where\'s my order?" AI responder.',
    author: 'ShipFlow',
    authorVerified: true,
    icon: <PackageIcon />,
    category: 'commerce',
    rating: 4.8,
    reviews: 94,
    installs: 2870,
    channels: ['WhatsApp', 'Email', 'SMS'],
    tags: ['tracking', 'orders', 'notifications', 'shipping'],
    published: 'Nov 3, 2024',
    updated: 'Dec 28, 2024',
    nodes: [
      { id: 'n1', type: 'mpNode', position: { x: 0, y: 100 }, data: { label: 'Order Webhook', icon: 'webhook', nodeType: 'trigger' } },
      { id: 'n2', type: 'mpNode', position: { x: 260, y: 100 }, data: { label: 'Check Status', icon: 'git', nodeType: 'condition' } },
      { id: 'n3', type: 'mpNode', position: { x: 520, y: 40 }, data: { label: 'Format Update', icon: 'sparkles', nodeType: 'ai' } },
      { id: 'n4', type: 'mpNode', position: { x: 520, y: 180 }, data: { label: 'Mark Delivered', icon: 'bolt', nodeType: 'action' } },
      { id: 'n5', type: 'mpNode', position: { x: 780, y: 40 }, data: { label: 'Send Notification', icon: 'send', nodeType: 'action' } },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2', animated: true },
      { id: 'e2', source: 'n2', target: 'n3', label: 'in transit' },
      { id: 'e3', source: 'n2', target: 'n4', label: 'delivered' },
      { id: 'e4', source: 'n3', target: 'n5' },
    ],
  },
  'mp-5': {
    id: 'mp-5',
    name: 'Instagram DM Sales Bot',
    desc: 'Responds to Instagram DMs with product recommendations, handles checkout, and routes complex queries to sales reps.',
    longDesc: 'Automatically responds to Instagram DMs within seconds. The AI understands product queries, shows relevant products with images, handles add-to-cart and checkout via payment links, and can escalate to a human sales rep when needed. Tracks conversion metrics and customer engagement.',
    author: 'HanDl Team',
    authorVerified: true,
    icon: <ChatIcon />,
    category: 'sales',
    rating: 4.8,
    reviews: 83,
    installs: 2210,
    channels: ['Instagram'],
    tags: ['instagram', 'sales', 'ai', 'dms'],
    published: 'Sep 28, 2024',
    updated: 'Jan 2, 2025',
    nodes: [
      { id: 'n1', type: 'mpNode', position: { x: 0, y: 120 }, data: { label: 'Instagram DM', icon: 'chat', nodeType: 'trigger' } },
      { id: 'n2', type: 'mpNode', position: { x: 260, y: 120 }, data: { label: 'AI Conversation', icon: 'sparkles', nodeType: 'ai' } },
      { id: 'n3', type: 'mpNode', position: { x: 520, y: 40 }, data: { label: 'Fetch Products', icon: 'search', nodeType: 'action' } },
      { id: 'n4', type: 'mpNode', position: { x: 520, y: 200 }, data: { label: 'Create Order', icon: 'cart', nodeType: 'action' } },
      { id: 'n5', type: 'mpNode', position: { x: 780, y: 40 }, data: { label: 'Send Products', icon: 'send', nodeType: 'action' } },
      { id: 'n6', type: 'mpNode', position: { x: 780, y: 200 }, data: { label: 'Payment Link', icon: 'credit', nodeType: 'action' } },
      { id: 'n7', type: 'mpNode', position: { x: 1040, y: 120 }, data: { label: 'Confirmation', icon: 'send', nodeType: 'action' } },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2', animated: true },
      { id: 'e2', source: 'n2', target: 'n3', label: 'browse' },
      { id: 'e3', source: 'n2', target: 'n4', label: 'checkout' },
      { id: 'e4', source: 'n3', target: 'n5' },
      { id: 'e5', source: 'n4', target: 'n6' },
      { id: 'e6', source: 'n5', target: 'n2' },
      { id: 'e7', source: 'n6', target: 'n7' },
    ],
  },
  'mp-10': {
    id: 'mp-10',
    name: 'Lead Nurture Drip Campaign',
    desc: 'Runs timed drip sequences over days/weeks. AI personalises messages based on lead score and engagement.',
    longDesc: 'A sophisticated drip campaign that sends timed follow-ups to leads over days or weeks. Each message is personalised by AI based on the lead\'s engagement history and score. Includes smart scheduling to avoid sending at bad times, A/B testing of message variants, and automatic escalation of hot leads to your sales team.',
    author: 'HanDl Team',
    authorVerified: true,
    icon: <ClockIcon />,
    category: 'sales',
    rating: 4.7,
    reviews: 61,
    installs: 1680,
    channels: ['WhatsApp', 'Email', 'SMS'],
    tags: ['drip', 'nurture', 'leads', 'campaign'],
    published: 'Aug 15, 2024',
    updated: 'Dec 20, 2024',
    nodes: [
      { id: 'n1', type: 'mpNode', position: { x: 0, y: 100 }, data: { label: 'New Lead', icon: 'bolt', nodeType: 'trigger' } },
      { id: 'n2', type: 'mpNode', position: { x: 250, y: 100 }, data: { label: 'Score Lead', icon: 'sparkles', nodeType: 'ai' } },
      { id: 'n3', type: 'mpNode', position: { x: 500, y: 40 }, data: { label: 'Hot → Sales', icon: 'send', nodeType: 'action' } },
      { id: 'n4', type: 'mpNode', position: { x: 500, y: 180 }, data: { label: 'Warm → Drip', icon: 'clock', nodeType: 'action' } },
      { id: 'n5', type: 'mpNode', position: { x: 750, y: 180 }, data: { label: 'AI Message', icon: 'sparkles', nodeType: 'ai' } },
      { id: 'n6', type: 'mpNode', position: { x: 1000, y: 180 }, data: { label: 'Send', icon: 'send', nodeType: 'action' } },
      { id: 'n7', type: 'mpNode', position: { x: 1000, y: 40 }, data: { label: 'Wait 3 days', icon: 'clock', nodeType: 'action' } },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2', animated: true },
      { id: 'e2', source: 'n2', target: 'n3', label: 'hot' },
      { id: 'e3', source: 'n2', target: 'n4', label: 'warm/cold' },
      { id: 'e4', source: 'n4', target: 'n5' },
      { id: 'e5', source: 'n5', target: 'n6' },
      { id: 'e6', source: 'n6', target: 'n7' },
      { id: 'e7', source: 'n7', target: 'n5' },
    ],
  },
  'mp-12': {
    id: 'mp-12',
    name: 'Multi-Language Support Bot',
    desc: 'Detects customer language automatically, translates messages, and provides AI support in 20+ languages.',
    longDesc: 'An intelligent support bot that detects the customer\'s language from their first message. All subsequent AI responses are generated in that language. Supports 20+ languages including Arabic (RTL). When escalating to a human agent, the bot provides a translated summary so agents can serve customers in any language.',
    author: 'GlobalBot',
    authorVerified: true,
    icon: <GlobeIcon />,
    category: 'support',
    rating: 4.8,
    reviews: 76,
    installs: 2040,
    channels: ['WhatsApp', 'Instagram', 'Web Chat', 'Telegram'],
    tags: ['multilingual', 'translation', 'support', 'global'],
    published: 'Jul 22, 2024',
    updated: 'Jan 8, 2025',
    nodes: [
      { id: 'n1', type: 'mpNode', position: { x: 0, y: 100 }, data: { label: 'Message', icon: 'chat', nodeType: 'trigger' } },
      { id: 'n2', type: 'mpNode', position: { x: 250, y: 100 }, data: { label: 'Detect Language', icon: 'globe', nodeType: 'ai' } },
      { id: 'n3', type: 'mpNode', position: { x: 500, y: 100 }, data: { label: 'AI Support', icon: 'sparkles', nodeType: 'ai' } },
      { id: 'n4', type: 'mpNode', position: { x: 750, y: 40 }, data: { label: 'Resolved', icon: 'send', nodeType: 'action' } },
      { id: 'n5', type: 'mpNode', position: { x: 750, y: 180 }, data: { label: 'Translate & Route', icon: 'robot', nodeType: 'action' } },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2', animated: true },
      { id: 'e2', source: 'n2', target: 'n3' },
      { id: 'e3', source: 'n3', target: 'n4', label: 'resolved' },
      { id: 'e4', source: 'n3', target: 'n5', label: 'escalate' },
    ],
  },
};

export function getFallbackListing(id: string): ListingDetail {
  return {
    id,
    name: 'Community Workflow',
    desc: 'A workflow shared by the HanDl community.',
    longDesc: 'This workflow was published by a community member. Clone it to your workspace to inspect and customise it.',
    author: 'Community',
    authorVerified: false,
    icon: <BoltIcon />,
    category: 'integration',
    rating: 4.0,
    reviews: 10,
    installs: 200,
    channels: ['WhatsApp'],
    tags: ['community'],
    published: 'Jan 1, 2025',
    updated: 'Jan 1, 2025',
    nodes: [
      { id: 'n1', type: 'mpNode', position: { x: 0, y: 100 }, data: { label: 'Trigger', icon: 'bolt', nodeType: 'trigger' } },
      { id: 'n2', type: 'mpNode', position: { x: 260, y: 100 }, data: { label: 'Process', icon: 'sparkles', nodeType: 'ai' } },
      { id: 'n3', type: 'mpNode', position: { x: 520, y: 100 }, data: { label: 'Action', icon: 'send', nodeType: 'action' } },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2', animated: true },
      { id: 'e2', source: 'n2', target: 'n3' },
    ],
  };
}
