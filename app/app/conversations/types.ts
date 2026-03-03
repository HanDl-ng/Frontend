export interface Message {
  id: string;
  type: 'customer' | 'ai' | 'agent' | 'system';
  text: string;
  time: string;
}

export interface Conversation {
  id: string;
  name: string;
  initials: string;
  color: string;
  channel: 'WhatsApp' | 'Instagram' | 'Web Chat' | 'Email';
  lastMsg: string;
  time: string;
  unread: boolean;
  handledBy: 'ai' | 'human';
  messages: Message[];
  customer: {
    email: string;
    phone: string;
    orders: number;
    ltv: string;
    location: string;
    recentOrders: {
      id: string;
      amount: string;
      date: string;
      status: string;
    }[];
  };
}
