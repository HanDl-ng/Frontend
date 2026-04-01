'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import ConversationList from '@/app/app/conversations/ConversationList';
import ChatArea from '@/app/app/conversations/ChatArea';
import ContextPanel from '@/app/app/conversations/ContextPanel';
import { mockConversations } from '@/app/app/conversations/data';
import type { Conversation, Message } from '@/app/app/conversations/types';

const simulationTimeline: Array<{
  lastMsg: string;
  time: string;
  messages: Message[];
}> = [
  {
    lastMsg: 'Hi, I would like 2 pepperoni pizzas and 1 coke tonight.',
    time: 'Now',
    messages: [
      {
        id: 's0-customer',
        type: 'customer',
        text: 'Hi, I would like 2 pepperoni pizzas and 1 coke delivered tonight.',
        time: '10:22 AM',
      },
    ],
  },
  {
    lastMsg: 'AI asked to confirm delivery address and ETA.',
    time: 'Now',
    messages: [
      {
        id: 's0-customer',
        type: 'customer',
        text: 'Hi, I would like 2 pepperoni pizzas and 1 coke delivered tonight.',
        time: '10:22 AM',
      },
      {
        id: 's1-ai',
        type: 'ai',
        text: 'Sure, I can help with that. Should I use your usual address at 12B Admiralty Way, Lekki? Delivery will be about 35 to 45 minutes.',
        time: '10:22 AM',
      },
    ],
  },
  {
    lastMsg: 'Yes, same address. Please proceed.',
    time: 'Now',
    messages: [
      {
        id: 's0-customer',
        type: 'customer',
        text: 'Hi, I would like 2 pepperoni pizzas and 1 coke delivered tonight.',
        time: '10:22 AM',
      },
      {
        id: 's1-ai',
        type: 'ai',
        text: 'Sure, I can help with that. Should I use your usual address at 12B Admiralty Way, Lekki? Delivery will be about 35 to 45 minutes.',
        time: '10:22 AM',
      },
      {
        id: 's2-customer',
        type: 'customer',
        text: 'Yes, same address. Please proceed.',
        time: '10:23 AM',
      },
    ],
  },
  {
    lastMsg: 'AI drafted order: 2x Pepperoni Pizza, 1x Coke.',
    time: 'Now',
    messages: [
      {
        id: 's0-customer',
        type: 'customer',
        text: 'Hi, I would like 2 pepperoni pizzas and 1 coke delivered tonight.',
        time: '10:22 AM',
      },
      {
        id: 's1-ai',
        type: 'ai',
        text: 'Sure, I can help with that. Should I use your usual address at 12B Admiralty Way, Lekki? Delivery will be about 35 to 45 minutes.',
        time: '10:22 AM',
      },
      {
        id: 's2-customer',
        type: 'customer',
        text: 'Yes, same address. Please proceed.',
        time: '10:23 AM',
      },
      {
        id: 's3-system',
        type: 'system',
        text: 'AI generated order draft — 2x Pepperoni Pizza, 1x Coke (Total: ₦17,500)',
        time: '10:23 AM',
      },
    ],
  },
  {
    lastMsg: 'Order #ORD-2408 created successfully.',
    time: 'Now',
    messages: [
      {
        id: 's0-customer',
        type: 'customer',
        text: 'Hi, I would like 2 pepperoni pizzas and 1 coke delivered tonight.',
        time: '10:22 AM',
      },
      {
        id: 's1-ai',
        type: 'ai',
        text: 'Sure, I can help with that. Should I use your usual address at 12B Admiralty Way, Lekki? Delivery will be about 35 to 45 minutes.',
        time: '10:22 AM',
      },
      {
        id: 's2-customer',
        type: 'customer',
        text: 'Yes, same address. Please proceed.',
        time: '10:23 AM',
      },
      {
        id: 's3-system',
        type: 'system',
        text: 'AI generated order draft — 2x Pepperoni Pizza, 1x Coke (Total: ₦17,500)',
        time: '10:23 AM',
      },
      {
        id: 's4-system',
        type: 'system',
        text: 'Order #ORD-2408 created and payment initialized.',
        time: '10:24 AM',
      },
    ],
  },
  {
    lastMsg: 'AI sent secure payment link for Order #ORD-2408.',
    time: 'Now',
    messages: [
      {
        id: 's0-customer',
        type: 'customer',
        text: 'Hi, I would like 2 pepperoni pizzas and 1 coke delivered tonight.',
        time: '10:22 AM',
      },
      {
        id: 's1-ai',
        type: 'ai',
        text: 'Sure, I can help with that. Should I use your usual address at 12B Admiralty Way, Lekki? Delivery will be about 35 to 45 minutes.',
        time: '10:22 AM',
      },
      {
        id: 's2-customer',
        type: 'customer',
        text: 'Yes, same address. Please proceed.',
        time: '10:23 AM',
      },
      {
        id: 's3-system',
        type: 'system',
        text: 'AI generated order draft — 2x Pepperoni Pizza, 1x Coke (Total: ₦17,500)',
        time: '10:23 AM',
      },
      {
        id: 's4-system',
        type: 'system',
        text: 'Order #ORD-2408 created and payment initialized.',
        time: '10:24 AM',
      },
      {
        id: 's5-ai',
        type: 'ai',
        text: 'Great, your order is ready. Please use this secure link to complete payment: pay.handl.io/ord-2408',
        time: '10:24 AM',
      },
    ],
  },
  {
    lastMsg: 'Payment confirmed. Kitchen and dispatch notified.',
    time: 'Now',
    messages: [
      {
        id: 's0-customer',
        type: 'customer',
        text: 'Hi, I would like 2 pepperoni pizzas and 1 coke delivered tonight.',
        time: '10:22 AM',
      },
      {
        id: 's1-ai',
        type: 'ai',
        text: 'Sure, I can help with that. Should I use your usual address at 12B Admiralty Way, Lekki? Delivery will be about 35 to 45 minutes.',
        time: '10:22 AM',
      },
      {
        id: 's2-customer',
        type: 'customer',
        text: 'Yes, same address. Please proceed.',
        time: '10:23 AM',
      },
      {
        id: 's3-system',
        type: 'system',
        text: 'AI generated order draft — 2x Pepperoni Pizza, 1x Coke (Total: ₦17,500)',
        time: '10:23 AM',
      },
      {
        id: 's4-system',
        type: 'system',
        text: 'Order #ORD-2408 created and payment initialized.',
        time: '10:24 AM',
      },
      {
        id: 's5-ai',
        type: 'ai',
        text: 'Great, your order is ready. Please use this secure link to complete payment: pay.handl.io/ord-2408',
        time: '10:24 AM',
      },
      {
        id: 's6-customer',
        type: 'customer',
        text: 'Paid now. Thank you.',
        time: '10:25 AM',
      },
      {
        id: 's6-system',
        type: 'system',
        text: 'Payment confirmed for Order #ORD-2408. Kitchen and dispatch have been notified.',
        time: '10:25 AM',
      },
    ],
  },
];

export default function DashboardPreview() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const moreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const wrap = card.parentElement;

    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const ry = ((e.clientX - r.left - r.width / 2) / r.width) * 5;
      card.style.transform = `rotateX(2deg) rotateY(${ry}deg)`;
    };
    const onLeave = () => {
      card.style.transform = 'rotateX(5deg) rotateY(0deg)';
    };

    wrap?.addEventListener('mousemove', onMove);
    wrap?.addEventListener('mouseleave', onLeave);
    return () => {
      wrap?.removeEventListener('mousemove', onMove);
      wrap?.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setStep((prev) => (prev + 1) % simulationTimeline.length);
    }, 3600);

    return () => window.clearInterval(id);
  }, []);

  const activeScenario = simulationTimeline[step];

  const activeConversation = useMemo<Conversation>(() => {
    const includeCurrentOrder = step >= 4;
    const currentOrderStatus = step >= 6 ? 'Paid' : step >= 5 ? 'Payment Pending' : 'Created';

    return {
      id: 'sim-1',
      name: 'Mariam Bello',
      initials: 'MB',
      color: '#d4845a',
      channel: 'WhatsApp',
      lastMsg: activeScenario.lastMsg,
      time: activeScenario.time,
      unread: step < simulationTimeline.length - 1,
      handledBy: 'ai',
      messages: activeScenario.messages,
      customer: {
        email: 'mariam@email.com',
        phone: '+234 803 000 0011',
        orders: includeCurrentOrder ? 13 : 12,
        ltv: '₦302,500',
        location: 'Lagos, Nigeria',
        recentOrders: [
          ...(includeCurrentOrder
            ? [
                {
                  id: 'ORD-2408',
                  amount: '₦17,500',
                  date: 'Today',
                  status: currentOrderStatus,
                },
              ]
            : []),
          {
            id: 'ORD-2399',
            amount: '₦24,000',
            date: '2 days ago',
            status: 'Delivered',
          },
        ],
      },
    };
  }, [activeScenario, step]);

  const conversations = useMemo<Conversation[]>(() => {
    return [activeConversation, ...mockConversations.slice(1, 4)];
  }, [activeConversation]);

  return (
    <div className="hero-preview">
      <div className="preview-wrap">
        <div className="preview-card" ref={cardRef}>
          <div className="preview-bar">
            <span className="pb-dot pb-r" />
            <span className="pb-dot pb-y" />
            <span className="pb-dot pb-g" />
            <span className="pb-url">app.handl.io/app/conversations</span>
            <div style={{ width: 40, height: 24, background: 'var(--border)', borderRadius: 4 }} />
          </div>
          <div className="preview-body preview-inbox-sim">
            <div className="inbox-layout">
              <ConversationList
                conversations={conversations}
                activeConvId={activeConversation.id}
                activeFilter="All"
                searchQuery=""
                isMobile={false}
                mobileView="list"
                onSelectConv={() => {}}
                onFilterChange={() => {}}
                onSearchChange={() => {}}
              />

              <ChatArea
                activeConv={activeConversation}
                isMobile={false}
                isTablet={false}
                mobileView="chat"
                showContextPanel
                moreOpen={false}
                showAiNotice={false}
                message=""
                moreRef={moreRef}
                onBack={() => {}}
                onToggleContext={() => {}}
                onToggleMore={() => {}}
                onCloseMore={() => {}}
                onLetAiHandle={() => {}}
                onTakeOverFromAi={() => {}}
                onSend={() => {}}
                onConfirmSend={() => {}}
                onCancelNotice={() => {}}
                onMessageChange={() => {}}
              />

              <ContextPanel
                activeConv={activeConversation}
                isMobile={false}
                isTablet={false}
                mobileView="context"
                showContextPanel
                onBack={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
