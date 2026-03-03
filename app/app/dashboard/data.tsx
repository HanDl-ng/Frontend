import {
  WhatsAppIcon, InstagramIcon, GlobeIcon, MailIcon,
  UserIcon, CartIcon, WarningIcon,
  ChatIcon, CreditCardProcessIcon, TruckIcon, LinkIcon, PackageIcon,
} from '@/components/icons';
import type { ActivityItem, ActivityStatus, AttentionItem, ConversationPreview, MetricItem, RecentOrder } from './types';

export const liveActivity: ActivityItem[] = [
  {
    id: 1,
    icon: <ChatIcon />,
    channelIcon: <WhatsAppIcon />,
    channel: 'WhatsApp',
    text: 'AI replied to Adebayo O. about order status',
    status: 'success',
    time: '30s ago',
  },
  {
    id: 2,
    icon: <CreditCardProcessIcon />,
    channelIcon: <WhatsAppIcon />,
    channel: 'WhatsApp',
    text: 'Payment of \u20A624,500 processed for order #ORD-2851',
    status: 'success',
    time: '1m ago',
  },
  {
    id: 3,
    icon: <ChatIcon />,
    channelIcon: <InstagramIcon />,
    channel: 'Instagram',
    text: 'New message from Funke A. \u2014 "I want to return this item"',
    status: 'info',
    time: '2m ago',
  },
  {
    id: 4,
    icon: <UserIcon />,
    channelIcon: <WhatsAppIcon />,
    channel: 'WhatsApp',
    text: 'Ngozi I. escalated to human agent \u2014 payment complaint',
    status: 'escalated',
    time: '4m ago',
  },
  {
    id: 5,
    icon: <CartIcon />,
    channelIcon: <GlobeIcon />,
    channel: 'Web Chat',
    text: 'New order #ORD-2852 created \u2014 \u20A618,000 (3 items)',
    status: 'success',
    time: '6m ago',
  },
  {
    id: 6,
    icon: <TruckIcon />,
    channelIcon: <WhatsAppIcon />,
    channel: 'WhatsApp',
    text: 'Delivery #DEL-1923 marked completed \u2014 notified customer',
    status: 'success',
    time: '8m ago',
  },
  {
    id: 7,
    icon: <CartIcon />,
    channelIcon: <WhatsAppIcon />,
    channel: 'WhatsApp',
    text: 'AI agent recovered abandoned order — customer completed ₦12,400 purchase',
    status: 'success',
    time: '12m ago',
  },
  {
    id: 8,
    icon: <PackageIcon />,
    channelIcon: <GlobeIcon />,
    channel: 'Web Chat',
    text: 'AI checked inventory for Bola S. — confirmed 12 units available',
    status: 'info',
    time: '15m ago',
  },
  {
    id: 9,
    icon: <ChatIcon />,
    channelIcon: <MailIcon />,
    channel: 'Email',
    text: 'AI sent follow-up email to Kemi D. about pending invoice',
    status: 'success',
    time: '18m ago',
  },
  {
    id: 10,
    icon: <CreditCardProcessIcon />,
    channelIcon: <InstagramIcon />,
    channel: 'Instagram',
    text: 'Payment link sent to Tolu M. \u2014 \u20A68,500',
    status: 'info',
    time: '22m ago',
  },
];

export const attentionItems: AttentionItem[] = [
  {
    icon: <UserIcon />,
    color: 'orange',
    label: 'Awaiting human reply',
    count: 3,
    href: '/app/conversations',
    urgent: true,
  },
  {
    icon: <WarningIcon />,
    color: 'red',
    label: 'Failed payments',
    count: 1,
    href: '/app/orders',
    urgent: true,
  },
  {
    icon: <LinkIcon />,
    color: 'gray',
    label: 'Disconnected channels',
    count: 1,
    href: '/app/integrations',
    urgent: false,
  },
  {
    icon: <PackageIcon />,
    color: 'orange',
    label: 'Low stock products',
    count: 2,
    href: '/app/products',
    urgent: false,
  },
];

export const metrics: MetricItem[] = [
  {
    label: 'Conversations Today',
    value: '142',
    sub: '38 open',
  },
  {
    label: 'AI Resolution Rate',
    value: '87%',
    sub: 'without human',
  },
  {
    label: 'Orders Created',
    value: '34',
    sub: '28 confirmed',
  },
  {
    label: 'Revenue Processed',
    value: '₦2.1M',
    sub: 'today',
  },
];

export const recentOrders: RecentOrder[] = [
  { id: 'ORD-2851', customer: 'Adebayo O.', total: '₦20,500', status: 'confirmed', time: '30m ago' },
  { id: 'ORD-2850', customer: 'Funke A.', total: '₦12,600', status: 'processing', time: '1h ago' },
  { id: 'ORD-2849', customer: 'Chidi E.', total: '₦21,800', status: 'shipped', time: '2h ago' },
  { id: 'ORD-2848', customer: 'Ngozi I.', total: '₦8,500', status: 'pending', time: '3h ago' },
  { id: 'ORD-2847', customer: 'Tolu M.', total: '₦38,500', status: 'delivered', time: '5h ago' },
];

export const conversations: ConversationPreview[] = [
  {
    name: 'Adebayo O.',
    initials: 'AO',
    msg: 'When will my order arrive? I placed it 3 days ago',
    channelIcon: <WhatsAppIcon />,
    channel: 'WhatsApp',
    time: '2m ago',
    type: 'ai',
    waiting: false,
  },
  {
    name: 'Funke A.',
    initials: 'FA',
    msg: 'I want to return this item, the size is wrong',
    channelIcon: <InstagramIcon />,
    channel: 'Instagram',
    time: '8m ago',
    type: 'human',
    waiting: true,
  },
  {
    name: 'Chidi E.',
    initials: 'CE',
    msg: 'Do you have this in size 42? I need it by Friday',
    channelIcon: <GlobeIcon />,
    channel: 'Web Chat',
    time: '12m ago',
    type: 'ai',
    waiting: false,
  },
  {
    name: 'Ngozi I.',
    initials: 'NI',
    msg: 'My payment failed but money was deducted',
    channelIcon: <WhatsAppIcon />,
    channel: 'WhatsApp',
    time: '15m ago',
    type: 'human',
    waiting: true,
  },
  {
    name: 'Tolu M.',
    initials: 'TM',
    msg: 'Can I get a bulk discount for 50 units?',
    channelIcon: <InstagramIcon />,
    channel: 'Instagram',
    time: '22m ago',
    type: 'human',
    waiting: true,
  },
];

export const statusConfig: Record<ActivityStatus, { dotClass: string; label: string }> = {
  success: {
    dotClass: 'feed-status-success',
    label: 'Success',
  },
  escalated: {
    dotClass: 'feed-status-escalated',
    label: 'Escalated',
  },
  failed: {
    dotClass: 'feed-status-failed',
    label: 'Failed',
  },
  info: {
    dotClass: 'feed-status-info',
    label: '',
  },
};
