import {
  SparklesIcon, GlobeIcon, PackageIcon, ShoppingBagIcon,
  RobotIcon, WebhookIcon, CreditCardIcon, SearchIcon,
} from '@/components/icons';

export interface Template {
  id: string;
  name: string;
  desc: string;
  icon: React.ReactNode;
  category: string;
  channels: string[];
  defaultChannels: string[];
  steps: string[];
  users: number;
}

export const prebuiltTemplates: Template[] = [
  {
    id: 'tpl-ai-sales',
    name: 'AI Sales Assistant',
    desc: 'AI greets customers, helps them browse products, takes orders, and processes checkout — all via chat.',
    icon: <SparklesIcon />,
    category: 'sales',
    channels: ['WhatsApp', 'Instagram', 'Telegram', 'Web Chat', 'Discord', 'SMS'],
    defaultChannels: ['WhatsApp'],
    steps: ['Receive Message', 'AI Conversation', 'Create Order', 'Payment', 'Confirmation'],
    users: 4820,
  },
  {
    id: 'tpl-ecom-web',
    name: 'E-Commerce Web Assistant',
    desc: 'Embed on your website via our API. Handles browsing, cart management, checkout, and post-purchase support.',
    icon: <GlobeIcon />,
    category: 'sales',
    channels: ['Website (API)', 'Web Chat'],
    defaultChannels: ['Website (API)'],
    steps: ['API Trigger', 'AI Conversation', 'Fetch Products', 'Create Order', 'Payment Link', 'Return Response'],
    users: 2130,
  },
  {
    id: 'tpl-order-confirm',
    name: 'Order Confirmation & Tracking',
    desc: 'Automatically sends order confirmations and real-time delivery updates across all channels.',
    icon: <PackageIcon />,
    category: 'commerce',
    channels: ['WhatsApp', 'Email', 'SMS', 'Telegram'],
    defaultChannels: ['WhatsApp', 'Email'],
    steps: ['Order Created', 'Send Confirmation', 'Wait for Status', 'Send Update', 'Delivery Complete'],
    users: 3610,
  },
  {
    id: 'tpl-abandoned-cart',
    name: 'Abandoned Cart Recovery',
    desc: 'Re-engages customers who left items in their cart. Sends reminders with a direct checkout link.',
    icon: <ShoppingBagIcon />,
    category: 'commerce',
    channels: ['WhatsApp', 'Email', 'SMS'],
    defaultChannels: ['WhatsApp'],
    steps: ['Cart Abandoned (1h)', 'Send Reminder', 'Wait for Reply', 'AI Conversation', 'Checkout Link'],
    users: 1940,
  },
  {
    id: 'tpl-support-router',
    name: 'AI Support Router',
    desc: 'AI handles common questions. Complex issues are routed to human agents with full context.',
    icon: <RobotIcon />,
    category: 'support',
    channels: ['WhatsApp', 'Instagram', 'Telegram', 'Web Chat', 'Email'],
    defaultChannels: ['WhatsApp', 'Web Chat'],
    steps: ['Receive Message', 'AI Classification', 'AI Response / Route to Human', 'Resolve'],
    users: 2870,
  },
  {
    id: 'tpl-webhook-relay',
    name: 'Webhook Event Processor',
    desc: 'Receives external webhooks (from Shopify, Stripe, ERPs) and triggers actions like notifications or order updates.',
    icon: <WebhookIcon />,
    category: 'integration',
    channels: ['Webhook'],
    defaultChannels: ['Webhook'],
    steps: ['Webhook Received', 'Validate Payload', 'Condition Check', 'Action (Notify / Update)', 'Log'],
    users: 1240,
  },
  {
    id: 'tpl-payment-collector',
    name: 'Payment Collection Flow',
    desc: 'Sends payment links to customers, tracks payment status, and sends receipts or follow-up reminders.',
    icon: <CreditCardIcon />,
    category: 'commerce',
    channels: ['WhatsApp', 'SMS', 'Email'],
    defaultChannels: ['WhatsApp'],
    steps: ['Send Payment Link', 'Wait for Payment', 'Send Receipt / Reminder'],
    users: 2450,
  },
  {
    id: 'tpl-lead-qualifier',
    name: 'Lead Qualification Bot',
    desc: 'AI engages new contacts, asks qualifying questions, scores them, and routes hot leads to your sales team.',
    icon: <SearchIcon />,
    category: 'sales',
    channels: ['WhatsApp', 'Instagram', 'Web Chat', 'Telegram'],
    defaultChannels: ['WhatsApp', 'Instagram'],
    steps: ['New Contact', 'AI Qualification', 'Score Lead', 'Route to Sales / Nurture'],
    users: 1680,
  },
];

export const tplCategories = ['All', 'Sales', 'Commerce', 'Support', 'Integration'];
