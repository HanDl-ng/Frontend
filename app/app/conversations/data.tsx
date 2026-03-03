import {
  WhatsAppIcon,
  InstagramIcon,
  GlobeIcon,
  MailIcon,
  CartIcon,
  CreditCardProcessIcon,
  TruckIcon,
  PackageIcon,
  TagIcon,
  BoltIcon,
} from '@/components/icons';
import type { Conversation } from './types';

/* ─── Channel icon mapping ───────────────────────── */

export const channelIcons: Record<string, React.ReactNode> = {
  WhatsApp: <WhatsAppIcon />,
  Instagram: <InstagramIcon />,
  'Web Chat': <GlobeIcon />,
  Email: <MailIcon />,
};

/* ─── Quick actions ── */

export const workflowActions = [
  {
    label: 'Create Order',
    icon: <CartIcon />,
    desc: 'Manually create an order for this customer',
  },
  {
    label: 'Send Payment Link',
    icon: <CreditCardProcessIcon />,
    desc: 'Generate and send a payment link',
  },
  {
    label: 'Track Delivery',
    icon: <TruckIcon />,
    desc: 'Look up delivery status for an order',
  },
  {
    label: 'Process Return',
    icon: <PackageIcon />,
    desc: 'Initiate a return or exchange',
  },
  {
    label: 'Apply Discount',
    icon: <TagIcon />,
    desc: 'Apply a discount to next order',
  },
  {
    label: 'Send Cart Recovery',
    icon: <BoltIcon />,
    desc: 'Trigger abandoned cart follow-up',
  },
];

/* ─── Mock data ──────────────────────────────────── */

export const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'Adebayo Ogunlesi',
    initials: 'AO',
    color: '#2e8b6e',
    channel: 'WhatsApp',
    lastMsg: 'When will my order #ORD-2847 arrive?',
    time: '2m',
    unread: true,
    handledBy: 'ai',
    messages: [
      {
        id: 'm1',
        type: 'customer',
        text: 'Hi, I placed an order yesterday. Order #ORD-2847',
        time: '10:23 AM',
      },
      {
        id: 'm2',
        type: 'ai',
        text: 'Hello Adebayo! I can see your order #ORD-2847. It was shipped this morning and is currently en route. Expected delivery is tomorrow between 10 AM - 2 PM.',
        time: '10:23 AM',
      },
      {
        id: 'm3',
        type: 'customer',
        text: 'Can I change the delivery address?',
        time: '10:25 AM',
      },
      {
        id: 'm4',
        type: 'ai',
        text: 'Since your order is already in transit, I\'ll need to connect you with our delivery team. Let me check the options available for address changes.',
        time: '10:25 AM',
      },
      {
        id: 'm5',
        type: 'system',
        text: 'AI is analyzing delivery modification options...',
        time: '10:26 AM',
      },
      {
        id: 'm6',
        type: 'customer',
        text: 'When will my order #ORD-2847 arrive?',
        time: '10:28 AM',
      },
    ],
    customer: {
      email: 'adebayo@email.com',
      phone: '+234 801 234 5678',
      orders: 12,
      ltv: '₦285,000',
      location: 'Lagos, Nigeria',
      recentOrders: [
        {
          id: 'ORD-2847',
          amount: '₦45,000',
          date: 'Today',
          status: 'Shipped',
        },
        {
          id: 'ORD-2801',
          amount: '₦32,000',
          date: '3 days ago',
          status: 'Delivered',
        },
      ],
    },
  },
  {
    id: '2',
    name: 'Funke Adeyemi',
    initials: 'FA',
    color: '#5a7fd4',
    channel: 'Instagram',
    lastMsg: 'I want to return this item please',
    time: '8m',
    unread: true,
    handledBy: 'human',
    messages: [
      {
        id: 'm1',
        type: 'customer',
        text: 'Hi, I received a damaged item in my order',
        time: '10:15 AM',
      },
      {
        id: 'm2',
        type: 'ai',
        text: 'I\'m sorry to hear that, Funke. Could you share a photo of the damaged item so we can process your return faster?',
        time: '10:15 AM',
      },
      {
        id: 'm3',
        type: 'customer',
        text: 'I want to return this item please',
        time: '10:20 AM',
      },
      {
        id: 'm4',
        type: 'system',
        text: 'Escalated to human agent — return request requires manual approval',
        time: '10:20 AM',
      },
    ],
    customer: {
      email: 'funke@email.com',
      phone: '+234 802 345 6789',
      orders: 5,
      ltv: '₦98,000',
      location: 'Abuja, Nigeria',
      recentOrders: [
        {
          id: 'ORD-2832',
          amount: '₦18,500',
          date: '2 days ago',
          status: 'Delivered',
        },
      ],
    },
  },
  {
    id: '3',
    name: 'Chidi Eze',
    initials: 'CE',
    color: '#d4845a',
    channel: 'Web Chat',
    lastMsg: 'Do you have size 42 in the Nike Air?',
    time: '12m',
    unread: false,
    handledBy: 'ai',
    messages: [
      {
        id: 'm1',
        type: 'customer',
        text: 'Hello, do you have the Nike Air Max in size 42?',
        time: '10:10 AM',
      },
      {
        id: 'm2',
        type: 'ai',
        text: 'Hi Chidi! Let me check our inventory for you.\n\nYes! We have the Nike Air Max 90 in size 42 available in Black/White and Red/Black colorways. Would you like to order?',
        time: '10:10 AM',
      },
      {
        id: 'm3',
        type: 'customer',
        text: 'Do you have size 42 in the Nike Air?',
        time: '10:12 AM',
      },
    ],
    customer: {
      email: 'chidi@email.com',
      phone: '+234 803 456 7890',
      orders: 0,
      ltv: '₦0',
      location: 'Port Harcourt, Nigeria',
      recentOrders: [],
    },
  },
  {
    id: '4',
    name: 'Ngozi Igwe',
    initials: 'NI',
    color: '#a25ad4',
    channel: 'WhatsApp',
    lastMsg: 'My payment was debited but order not confirmed',
    time: '15m',
    unread: true,
    handledBy: 'human',
    messages: [
      {
        id: 'm1',
        type: 'customer',
        text: 'My payment of ₦65,000 was debited but I didn\'t get a confirmation',
        time: '10:05 AM',
      },
      {
        id: 'm2',
        type: 'ai',
        text: 'I understand your concern, Ngozi. Let me look into this right away. I can see a pending transaction for ₦65,000. It seems the payment gateway confirmation is delayed.',
        time: '10:05 AM',
      },
      {
        id: 'm3',
        type: 'system',
        text: 'Escalated to human agent — payment issue requires manual verification',
        time: '10:06 AM',
      },
      {
        id: 'm4',
        type: 'customer',
        text: 'My payment was debited but order not confirmed',
        time: '10:08 AM',
      },
    ],
    customer: {
      email: 'ngozi@email.com',
      phone: '+234 804 567 8901',
      orders: 8,
      ltv: '₦192,000',
      location: 'Enugu, Nigeria',
      recentOrders: [
        {
          id: 'ORD-2845',
          amount: '₦65,000',
          date: 'Today',
          status: 'Pending',
        },
      ],
    },
  },
  {
    id: '5',
    name: 'Emeka Nwosu',
    initials: 'EN',
    color: '#c49400',
    channel: 'Email',
    lastMsg: 'Can I get a bulk discount for 50 units?',
    time: '22m',
    unread: false,
    handledBy: 'ai',
    messages: [
      {
        id: 'm1',
        type: 'customer',
        text: 'I\'d like to inquire about bulk pricing for your product line. We need about 50 units.',
        time: '10:00 AM',
      },
      {
        id: 'm2',
        type: 'ai',
        text: 'Thank you for your interest in bulk ordering, Emeka! For orders of 50+ units, we offer tiered discounts. Let me prepare a custom quote for you.',
        time: '10:01 AM',
      },
    ],
    customer: {
      email: 'emeka@business.com',
      phone: '+234 805 678 9012',
      orders: 3,
      ltv: '₦450,000',
      location: 'Lagos, Nigeria',
      recentOrders: [
        {
          id: 'ORD-2780',
          amount: '₦150,000',
          date: '1 week ago',
          status: 'Delivered',
        },
      ],
    },
  },
];
