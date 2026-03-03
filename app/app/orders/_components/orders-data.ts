export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  name: string;
  qty: number;
  price: string;
}

export interface Order {
  id: string;
  customer: string;
  initials: string;
  channel: 'WhatsApp' | 'Instagram' | 'Web Chat' | 'Email' | 'API';
  items: OrderItem[];
  total: string;
  status: OrderStatus;
  paymentStatus: 'paid' | 'pending' | 'failed';
  date: string;
  conversationId?: string;
}

export const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: 'Pending', className: 'chip-draft' },
  confirmed: { label: 'Confirmed', className: 'chip-live' },
  processing: { label: 'Processing', className: 'chip-info' },
  shipped: { label: 'Shipped', className: 'chip-info' },
  delivered: { label: 'Delivered', className: 'chip-live' },
  cancelled: { label: 'Cancelled', className: 'chip-error' },
};

export const paymentConfig: Record<string, { label: string; className: string }> = {
  paid: { label: 'Paid', className: 'chip-live' },
  pending: { label: 'Pending', className: 'chip-draft' },
  failed: { label: 'Failed', className: 'chip-error' },
};

export const orders: Order[] = [
  {
    id: 'ORD-2851',
    customer: 'Adebayo O.',
    initials: 'AO',
    channel: 'WhatsApp',
    items: [
      { name: 'Ankara Print Dress', qty: 2, price: '₦8,500' },
      { name: 'Beaded Necklace', qty: 1, price: '₦3,500' },
    ],
    total: '₦20,500',
    status: 'confirmed',
    paymentStatus: 'paid',
    date: 'Mar 2, 2026',
    conversationId: 'conv-001',
  },
  {
    id: 'ORD-2850',
    customer: 'Funke A.',
    initials: 'FA',
    channel: 'Instagram',
    items: [
      { name: 'Silk Headwrap', qty: 3, price: '₦4,200' },
    ],
    total: '₦12,600',
    status: 'processing',
    paymentStatus: 'paid',
    date: 'Mar 2, 2026',
    conversationId: 'conv-002',
  },
  {
    id: 'ORD-2849',
    customer: 'Chidi E.',
    initials: 'CE',
    channel: 'Web Chat',
    items: [
      { name: 'Leather Sandals', qty: 1, price: '₦15,000' },
      { name: 'Canvas Tote Bag', qty: 1, price: '₦6,800' },
    ],
    total: '₦21,800',
    status: 'shipped',
    paymentStatus: 'paid',
    date: 'Mar 1, 2026',
  },
  {
    id: 'ORD-2848',
    customer: 'Ngozi I.',
    initials: 'NI',
    channel: 'WhatsApp',
    items: [
      { name: 'Ankara Print Dress', qty: 1, price: '₦8,500' },
    ],
    total: '₦8,500',
    status: 'pending',
    paymentStatus: 'pending',
    date: 'Mar 1, 2026',
    conversationId: 'conv-004',
  },
  {
    id: 'ORD-2847',
    customer: 'Tolu M.',
    initials: 'TM',
    channel: 'Instagram',
    items: [
      { name: 'Beaded Necklace', qty: 5, price: '₦3,500' },
      { name: 'Silk Headwrap', qty: 5, price: '₦4,200' },
    ],
    total: '₦38,500',
    status: 'delivered',
    paymentStatus: 'paid',
    date: 'Feb 28, 2026',
  },
  {
    id: 'ORD-2846',
    customer: 'Kemi D.',
    initials: 'KD',
    channel: 'Email',
    items: [
      { name: 'Canvas Tote Bag', qty: 2, price: '₦6,800' },
    ],
    total: '₦13,600',
    status: 'cancelled',
    paymentStatus: 'failed',
    date: 'Feb 28, 2026',
  },
  {
    id: 'ORD-2845',
    customer: 'Bola S.',
    initials: 'BS',
    channel: 'API',
    items: [
      { name: 'Leather Sandals', qty: 1, price: '₦15,000' },
    ],
    total: '₦15,000',
    status: 'confirmed',
    paymentStatus: 'paid',
    date: 'Feb 27, 2026',
  },
];

export const orderFilters = ['All', 'Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
