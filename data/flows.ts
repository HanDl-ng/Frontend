import { FlowItem } from '@/types';

export const flows: Record<string, FlowItem[]> = {
  'Sales Flow v3': [
    {
      id: 'n1', type: 'trigger', icon: '💬', label: 'Incoming WhatsApp Message',
      desc: 'Customer sends first message → start flow', status: 'ok',
      config: {
        fields: [
          { label: 'Channel', type: 'select', options: ['WhatsApp', 'Instagram', 'SMS', 'Email'], value: 'WhatsApp' },
          { label: 'Keyword filter', type: 'text', value: 'order, buy, want' },
        ]
      }
    },
    {
      id: 'n2', type: 'ai', icon: '🧠', label: 'Qualify & Take Order',
      desc: 'AI converses, collects order details, confirms', status: 'ok',
      config: {
        fields: [
          { label: 'AI Instructions', type: 'textarea', value: 'You are a helpful food ordering assistant. Greet the customer, ask what they want, confirm the order details and total before proceeding.' },
          { label: 'Release condition', type: 'text', value: 'Customer confirms order' },
        ],
        vars: ['{{customer.name}}', '{{channel}}', '{{message}}']
      }
    },
    {
      id: 'n3', type: 'action', icon: '📦', label: 'Create Order',
      desc: 'Maps conversation variables → new order record', status: 'ok',
      config: {
        fields: [
          { label: 'Customer', type: 'text', value: '{{customer.name}}' },
          { label: 'Items', type: 'text', value: '{{ai.order_items}}' },
          { label: 'Total', type: 'text', value: '{{ai.order_total}}' },
        ],
        vars: ['{{ai.order_items}}', '{{ai.order_total}}', '{{customer.phone}}']
      }
    },
    { connector: 'branch', label: 'Payment flow' },
    {
      id: 'n4', type: 'action', icon: '💳', label: 'Send Payment Link',
      desc: 'Paystack link → await webhook confirmation', status: 'ok',
      config: {
        fields: [
          { label: 'Provider', type: 'select', options: ['Paystack', 'Flutterwave', 'Manual'], value: 'Paystack' },
          { label: 'Amount', type: 'text', value: '{{order.total}}' },
          { label: 'Currency', type: 'select', options: ['NGN', 'GHS', 'KES'], value: 'NGN' },
        ]
      }
    },
    {
      id: 'n5', type: 'action', icon: '🛵', label: 'Dispatch Rider',
      desc: 'Call delivery API, send ETA to customer', status: 'pending',
      config: {
        fields: [
          { label: 'Provider', type: 'select', options: ['Gokada', 'Kwik', 'Own rider'], value: 'Gokada' },
          { label: 'Pickup address', type: 'text', value: '{{business.address}}' },
          { label: 'Drop-off', type: 'text', value: '{{customer.address}}' },
        ]
      }
    },
  ],
  'Support Handoff': [
    {
      id: 's1', type: 'trigger', icon: '💬', label: 'Incoming Message',
      desc: 'Any channel → check AI confidence', status: 'ok',
      config: { fields: [{ label: 'Channel', type: 'select', options: ['All channels', 'WhatsApp', 'Instagram'], value: 'All channels' }] }
    },
    {
      id: 's2', type: 'condition', icon: '🔀', label: 'AI Confidence Check',
      desc: 'Branch based on AI confidence score', status: 'ok',
      config: { fields: [{ label: 'Threshold', type: 'text', value: '< 0.7 confidence' }] }
    },
    {
      id: 's3', type: 'ai', icon: '🧠', label: 'AI Handles',
      desc: 'High confidence: AI responds directly', status: 'ok',
      config: { fields: [{ label: 'Max turns', type: 'text', value: '10' }] }
    },
    {
      id: 's4', type: 'action', icon: '👤', label: 'Route to Human',
      desc: 'Low confidence: assign to available agent', status: 'pending',
      config: { fields: [{ label: 'Team', type: 'select', options: ['Support', 'Sales', 'Any'], value: 'Support' }] }
    },
  ],
  'Daily Report': [
    {
      id: 'r1', type: 'trigger', icon: '⏰', label: 'Daily Schedule',
      desc: 'Runs every day at 11:00 PM', status: 'ok',
      config: {
        fields: [
          { label: 'Time', type: 'text', value: '23:00' },
          { label: 'Timezone', type: 'select', options: ['WAT (UTC+1)', 'GMT', 'EAT (UTC+3)'], value: 'WAT (UTC+1)' },
        ]
      }
    },
    {
      id: 'r2', type: 'action', icon: '📊', label: 'Generate Sales Report',
      desc: 'Pulls orders, revenue, and conversion data', status: 'ok',
      config: { fields: [{ label: 'Period', type: 'select', options: ['Today', 'This week', 'This month'], value: 'Today' }] }
    },
    {
      id: 'r3', type: 'action', icon: '📨', label: 'Send to Team',
      desc: 'Sends summary to WhatsApp group + email', status: 'ok',
      config: {
        fields: [
          { label: 'Recipients', type: 'text', value: 'management@mybiz.com' },
          { label: 'WhatsApp group', type: 'text', value: '+234 group ID' },
        ]
      }
    },
  ]
};
