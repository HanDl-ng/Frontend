import { channelIcons } from './data';
import type { Conversation } from './types';

interface ConversationListProps {
  conversations: Conversation[];
  activeConvId: string;
  activeFilter: 'All' | 'Unread';
  searchQuery: string;
  isMobile: boolean;
  mobileView: string;
  onSelectConv: (conv: Conversation) => void;
  onFilterChange: (filter: 'All' | 'Unread') => void;
  onSearchChange: (query: string) => void;
}

export default function ConversationList({
  conversations,
  activeConvId,
  activeFilter,
  searchQuery,
  isMobile,
  mobileView,
  onSelectConv,
  onFilterChange,
  onSearchChange,
}: ConversationListProps) {
  return (
    <div
      className={`inbox-list${isMobile && mobileView === 'list' ? ' mobile-show' : ''}${isMobile && mobileView !== 'list' ? ' mobile-hide' : ''}`}
    >
      <div className="inbox-list-header">
        <div className="inbox-list-title">Inbox</div>
        <input
          className="inbox-search"
          placeholder="Search conversations…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="inbox-filters">
        {(['All', 'Unread'] as const).map((f) => (
          <button
            key={f}
            className={`inbox-filter${activeFilter === f ? ' active' : ''}`}
            onClick={() => onFilterChange(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="inbox-items">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={`inbox-item${activeConvId === conv.id ? ' active' : ''}${conv.unread ? ' unread' : ''}`}
            onClick={() => onSelectConv(conv)}
          >
            <div className="inbox-item-avatar" style={{ background: conv.color }}>
              {conv.initials}
            </div>
            <div className="inbox-item-body">
              <div className="inbox-item-top">
                <span className="inbox-item-name">
                  {conv.name}
                  <span className="inbox-item-channel-badge" title={conv.channel}>
                    {channelIcons[conv.channel]}
                  </span>
                </span>
                <span className="inbox-item-time">{conv.time}</span>
              </div>
              <div className="inbox-item-msg">{conv.lastMsg}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
