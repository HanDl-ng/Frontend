'use client';

import { useState, useRef, useEffect } from 'react';
import { mockConversations } from './data';
import { useIsMobile, useIsTablet } from './hooks';
import ConversationList from './ConversationList';
import ChatArea from './ChatArea';
import ContextPanel from './ContextPanel';
import './styles.css';

export default function ConversationsPage() {
  const [activeConv, setActiveConv] = useState(mockConversations[0]);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Unread'>('All');
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [moreOpen, setMoreOpen] = useState(false);
  const [showAiNotice, setShowAiNotice] = useState(false);
  const [mobileView, setMobileView] = useState<'list' | 'chat' | 'context'>('list');
  const moreRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [showContextPanel, setShowContextPanel] = useState(false);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const filteredConversations = mockConversations.filter((c) => {
    const matchesSearch =
      !searchQuery ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMsg.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeFilter === 'Unread') return matchesSearch && c.unread;
    return matchesSearch;
  });

  const handleSend = () => {
    if (!message.trim()) return;
    if (activeConv.handledBy === 'ai') {
      setShowAiNotice(true);
      return;
    }
    setMessage('');
  };

  const confirmSend = () => {
    setActiveConv({ ...activeConv, handledBy: 'human' });
    setShowAiNotice(false);
    setMessage('');
  };

  return (
    <div className="page-content full-width">
      <div className="inbox-layout">
        <ConversationList
          conversations={filteredConversations}
          activeConvId={activeConv.id}
          activeFilter={activeFilter}
          searchQuery={searchQuery}
          isMobile={isMobile}
          mobileView={mobileView}
          onSelectConv={(conv) => {
            setActiveConv(conv);
            setShowAiNotice(false);
            if (isMobile) setMobileView('chat');
          }}
          onFilterChange={setActiveFilter}
          onSearchChange={setSearchQuery}
        />

        <ChatArea
          activeConv={activeConv}
          isMobile={isMobile}
          isTablet={isTablet}
          mobileView={mobileView}
          showContextPanel={showContextPanel}
          moreOpen={moreOpen}
          showAiNotice={showAiNotice}
          message={message}
          moreRef={moreRef}
          onBack={() => setMobileView('list')}
          onToggleContext={() => {
            if (isMobile) setMobileView('context');
            else if (isTablet) setShowContextPanel(!showContextPanel);
          }}
          onToggleMore={() => setMoreOpen(!moreOpen)}
          onCloseMore={() => setMoreOpen(false)}
          onLetAiHandle={() => {
            setActiveConv({ ...activeConv, handledBy: 'ai' });
            setMoreOpen(false);
          }}
          onTakeOverFromAi={() => {
            setActiveConv({ ...activeConv, handledBy: 'human' });
            setMoreOpen(false);
          }}
          onSend={handleSend}
          onConfirmSend={confirmSend}
          onCancelNotice={() => setShowAiNotice(false)}
          onMessageChange={setMessage}
        />

        <ContextPanel
          activeConv={activeConv}
          isMobile={isMobile}
          isTablet={isTablet}
          mobileView={mobileView}
          showContextPanel={showContextPanel}
          onBack={() => {
            if (isMobile) setMobileView('chat');
            else setShowContextPanel(false);
          }}
        />
      </div>
    </div>
  );
}
