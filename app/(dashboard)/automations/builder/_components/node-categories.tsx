import {
  ChatIcon, GlobeIcon, ShoppingBagIcon, ClockIcon,
  SendIcon, CartIcon, CreditCardIcon, SearchIcon, GearIcon,
  SparklesIcon, GitBranchIcon, ShuffleIcon, TimerIcon,
  HourglassIcon, CheckCircleIcon, LinkIcon, BellIcon,
  BoltIcon, WebhookIcon, WarningIcon,
} from '@/components/icons';
import { type NodeCategoryItem } from './types';

export const nodeCategories: { label: string; items: NodeCategoryItem[] }[] = [
  {
    label: 'Triggers',
    items: [
      { type: 'trigger', key: 'message_trigger', icon: <ChatIcon />, name: 'Message Trigger', desc: 'Start from incoming messages' },
      { type: 'trigger', key: 'api_trigger', icon: <LinkIcon />, name: 'API Trigger', desc: 'Start from API / SDK calls' },
      { type: 'trigger', key: 'webhook_trigger', icon: <WebhookIcon />, name: 'Webhook Trigger', desc: 'Start when external system calls HanDl' },
      { type: 'trigger', key: 'order_trigger', icon: <ShoppingBagIcon />, name: 'Order Trigger', desc: 'Start when order is created' },
      { type: 'trigger', key: 'schedule_trigger', icon: <ClockIcon />, name: 'Schedule Trigger', desc: 'Run on a cron schedule' },
    ],
  },
  {
    label: 'Conversation & AI',
    items: [
      { type: 'ai', key: 'ai_response', icon: <SparklesIcon />, name: 'AI Response', desc: 'AI handles conversation step' },
      { type: 'comms', key: 'send_message', icon: <SendIcon />, name: 'Send Message', desc: 'Send message to customer' },
      { type: 'ai', key: 'wait_for_reply', icon: <HourglassIcon />, name: 'Wait for Reply', desc: 'Pause until customer replies' },
    ],
  },
  {
    label: 'Order & Payment',
    items: [
      { type: 'action', key: 'create_order', icon: <CartIcon />, name: 'Create Order', desc: 'Create or modify an order' },
      { type: 'payment', key: 'start_payment', icon: <CreditCardIcon />, name: 'Start Payment', desc: 'Generate payment link' },
    ],
  },
  {
    label: 'Wait & Events',
    items: [
      { type: 'logic', key: 'wait_event', icon: <BellIcon />, name: 'Wait for Event', desc: 'Pause until an event occurs' },
      { type: 'logic', key: 'delay', icon: <TimerIcon />, name: 'Delay / Wait', desc: 'Wait a fixed duration' },
    ],
  },
  {
    label: 'Integration & Data',
    items: [
      { type: 'data', key: 'http_request', icon: <GlobeIcon />, name: 'HTTP Request', desc: 'Call external API / webhook' },
      { type: 'data', key: 'return_response', icon: <BoltIcon />, name: 'Return Response', desc: 'Return data to API caller' },
      { type: 'data', key: 'set_variable', icon: <GearIcon />, name: 'Set Variable', desc: 'Create or update variables' },
      { type: 'data', key: 'fetch_data', icon: <SearchIcon />, name: 'Fetch Data', desc: 'Look up customers, orders, etc.' },
    ],
  },
  {
    label: 'Logic & Control',
    items: [
      { type: 'condition', key: 'condition', icon: <GitBranchIcon />, name: 'Condition', desc: 'If/else branching' },
      { type: 'logic', key: 'split', icon: <ShuffleIcon />, name: 'Split', desc: 'Run branches in parallel' },
      { type: 'error', key: 'catch_error', icon: <WarningIcon />, name: 'Catch Error', desc: 'Handle failures from upstream nodes' },
      { type: 'logic', key: 'end', icon: <CheckCircleIcon />, name: 'End', desc: 'Mark workflow complete' },
    ],
  },
];
