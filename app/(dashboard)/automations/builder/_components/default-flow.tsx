import { type Node, type Edge } from 'reactflow';
import {
  ChatIcon, SparklesIcon, CartIcon, CreditCardIcon,
  SendIcon, BellIcon, WarningIcon,
} from '@/components/icons';
import { type FlowNodeData } from './types';

export const initialNodes: Node<FlowNodeData>[] = [
  {
    id: '1', type: 'custom', position: { x: 350, y: 40 },
    data: { label: 'Message Received', icon: <ChatIcon />, nodeType: 'trigger', nodeKey: 'message_trigger', description: 'Customer sends a message on any channel', status: 'ok' },
  },
  {
    id: '2', type: 'custom', position: { x: 350, y: 200 },
    data: { label: 'AI Sales Assistant', icon: <SparklesIcon />, nodeType: 'ai', nodeKey: 'ai_response', description: 'Greets customer, takes order, confirms details', status: 'ok' },
  },
  {
    id: '3', type: 'custom', position: { x: 350, y: 380 },
    data: { label: 'Create Order', icon: <CartIcon />, nodeType: 'action', nodeKey: 'create_order', description: 'Creates order from confirmed items', status: 'ok' },
  },
  {
    id: '4', type: 'custom', position: { x: 350, y: 540 },
    data: { label: 'Start Payment', icon: <CreditCardIcon />, nodeType: 'payment', nodeKey: 'start_payment', description: 'Generates Stripe payment link', status: 'ok' },
  },
  {
    id: '5', type: 'custom', position: { x: 350, y: 700 },
    data: { label: 'Send Payment Link', icon: <SendIcon />, nodeType: 'comms', nodeKey: 'send_message', description: 'Sends payment link to customer', status: 'ok' },
  },
  {
    id: '6', type: 'custom', position: { x: 350, y: 860 },
    data: { label: 'Wait for Payment', icon: <BellIcon />, nodeType: 'logic', nodeKey: 'wait_event', description: 'Waits up to 24h for payment event', status: 'ok' },
  },
  {
    id: '7', type: 'custom', position: { x: 150, y: 1040 },
    data: { label: 'Send Receipt', icon: <SendIcon />, nodeType: 'comms', nodeKey: 'send_message', description: 'Sends order receipt & delivery ETA' },
  },
  {
    id: '8', type: 'custom', position: { x: 550, y: 1040 },
    data: { label: 'Send Reminder', icon: <SendIcon />, nodeType: 'comms', nodeKey: 'send_message', description: 'Reminds customer to complete payment' },
  },
  {
    id: '9', type: 'custom', position: { x: 350, y: 1220 },
    data: { label: 'Handle Errors', icon: <WarningIcon />, nodeType: 'error', nodeKey: 'catch_error', description: 'Catches failures from payment or messaging' },
  },
];

export const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: 'var(--teal)', strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', style: { stroke: 'var(--teal)', strokeWidth: 2 } },
  { id: 'e3-4', source: '3', target: '4', style: { stroke: 'var(--teal)', strokeWidth: 2 } },
  { id: 'e4-5', source: '4', target: '5', style: { stroke: 'var(--teal)', strokeWidth: 2 } },
  { id: 'e5-6', source: '5', target: '6', style: { stroke: 'var(--teal)', strokeWidth: 2 } },
  { id: 'e6-7', source: '6', sourceHandle: 'success', target: '7', label: 'Paid', style: { stroke: 'var(--teal)', strokeWidth: 2 } },
  { id: 'e6-8', source: '6', sourceHandle: 'timeout', target: '8', label: 'Timeout', style: { stroke: '#e05252', strokeWidth: 2 } },
  { id: 'e4-9', source: '4', sourceHandle: 'error', target: '9', label: 'Error', style: { stroke: '#e05252', strokeWidth: 2, strokeDasharray: '6 3' } },
];
