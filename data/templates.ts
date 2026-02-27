import { Template } from '@/types';

export const templates: Template[] = [
  {
    icon: '🍔', name: 'Food Order to Delivery',
    desc: 'Full WhatsApp order flow from first message to rider dispatch. Handles menu inquiry, order creation, payment, and live tracking.',
    tags: ['Sales', 'Delivery', 'WhatsApp'], steps: 6, filter: 'sales delivery'
  },
  {
    icon: '💬', name: 'AI Support Handoff',
    desc: 'AI handles common queries automatically. Routes to a human agent when confidence is low or customer escalates.',
    tags: ['Support', 'AI'], steps: 4, filter: 'support'
  },
  {
    icon: '📊', name: 'Daily Sales Report',
    desc: 'Auto-generates a revenue and order summary at end of day. Sends to your team on WhatsApp and email.',
    tags: ['Reports'], steps: 3, filter: 'reports'
  },
  {
    icon: '🛒', name: 'Abandoned Cart Recovery',
    desc: 'Detects when a customer stopped mid-order. Sends a follow-up message after 30 mins to re-engage.',
    tags: ['Sales', 'AI'], steps: 5, filter: 'sales'
  },
  {
    icon: '💳', name: 'Payment Link & Confirm',
    desc: 'Send a Paystack/Flutterwave link, wait for webhook, then auto-confirm order and notify customer.',
    tags: ['Sales', 'Payments'], steps: 4, filter: 'sales'
  },
  {
    icon: '📦', name: 'Order Status Bot',
    desc: 'Customers text "status" to get a live update on their delivery ETA, rider info, and order details.',
    tags: ['Support', 'Delivery'], steps: 3, filter: 'support delivery'
  },
  {
    icon: '🎁', name: 'Promo Broadcast',
    desc: 'Schedule a promotional message to a customer segment on WhatsApp, Instagram, and SMS simultaneously.',
    tags: ['Marketing'], steps: 2, filter: 'sales'
  },
  {
    icon: '⭐', name: 'Post-Delivery Review',
    desc: 'After delivery confirmed, auto-send a review request with a rating link. Log responses to your reports.',
    tags: ['Support', 'Reports'], steps: 4, filter: 'support reports'
  },
  {
    icon: '👥', name: 'New Customer Welcome',
    desc: 'Detect first-time customers, send a personalised welcome, offer a discount code, and enroll in your loyalty program.',
    tags: ['Sales'], steps: 4, filter: 'sales'
  },
];
