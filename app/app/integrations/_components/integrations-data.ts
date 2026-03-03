import { type ComponentType } from 'react';
import {
  WhatsAppIcon,
  GlobeIcon,
  MailIcon,
  GearIcon,
} from '@/components/icons';

export interface IconProps {
  className?: string;
  fill?: string;
  size?: number;
}

export interface Integration {
  id: string;
  name: string;
  Icon: ComponentType<IconProps>;
  status: 'connected' | 'disconnected' | 'pending';
  type: 'native' | 'generic';
  desc: string;
  messages: string;
  category: string;
}

export const integrations: Integration[] = [
  {
    id: '1',
    name: 'WhatsApp Business',
    Icon: WhatsAppIcon,
    status: 'connected',
    type: 'native',
    desc: 'Connect WhatsApp Business API so the AI agent can handle customer conversations, create orders, and send receipts automatically.',
    messages: '3,240',
    category: 'Messaging',
  },
  {
    id: '2',
    name: 'Web Chat Widget',
    Icon: GlobeIcon,
    status: 'connected',
    type: 'native',
    desc: 'Embed a live chat widget on your website. The AI agent responds in real-time and can process orders directly.',
    messages: '1,105',
    category: 'Messaging',
  },
  {
    id: '3',
    name: 'Email',
    Icon: MailIcon,
    status: 'disconnected',
    type: 'native',
    desc: 'Connect your email inbox. The AI agent handles support inquiries and sends order confirmations automatically.',
    messages: '—',
    category: 'Messaging',
  },
  {
    id: '4',
    name: 'Generic API Integration',
    Icon: GearIcon,
    status: 'connected',
    type: 'generic',
    desc: 'For unsupported platforms (Slack, Discord, custom apps). Send messages to HanDl via API, get AI responses back via webhook.',
    messages: '428',
    category: 'API',
  },
];

export const categoryFilters = ['All', 'Messaging', 'API'];
