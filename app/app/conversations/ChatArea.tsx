import {
  SendIcon, MoreHorizontalIcon, RobotIcon, SparklesIcon,
  ArchiveIcon, StarIcon, BanIcon, EyeOffIcon, CopyIcon,
  ChevronLeftIcon,
} from '@/components/icons';
import { channelIcons, workflowActions } from './data';
import type { Conversation } from './types';

interface ChatAreaProps {
  activeConv: Conversation;
  isMobile: boolean;
  isTablet: boolean;
  mobileView: string;
  showContextPanel: boolean;
  moreOpen: boolean;
  showAiNotice: boolean;
  message: string;
  moreRef: React.RefObject<HTMLDivElement | null>;
  onBack: () => void;
  onToggleContext: () => void;
  onToggleMore: () => void;
  onCloseMore: () => void;
  onLetAiHandle: () => void;
  onTakeOverFromAi: () => void;
  onSend: () => void;
  onConfirmSend: () => void;
  onCancelNotice: () => void;
  onMessageChange: (msg: string) => void;
}

export default function ChatArea({
  activeConv,
  isMobile,
  isTablet,
  mobileView,
  moreOpen,
  showAiNotice,
  message,
  moreRef,
  onBack,
  onToggleContext,
  onToggleMore,
  onCloseMore,
  onLetAiHandle,
  onTakeOverFromAi,
  onSend,
  onConfirmSend,
  onCancelNotice,
  onMessageChange,
}: ChatAreaProps) {
  return (
    <div
      className={`inbox-chat${isMobile && mobileView === 'chat' ? ' mobile-show' : ''}${isMobile && mobileView !== 'chat' ? ' mobile-hide' : ''}`}
    >
      <div className="inbox-chat-header">
        <div className="inbox-chat-customer">
          {isMobile && (
            <button className="inbox-back-btn" onClick={onBack} aria-label="Back to conversations">
              <ChevronLeftIcon />
            </button>
          )}
          <div
            className="inbox-chat-customer-info"
            onClick={onToggleContext}
            role={isTablet ? 'button' : undefined}
            tabIndex={isTablet ? 0 : undefined}
          >
            <div
              className="inbox-item-avatar"
              style={{
                background: activeConv.color,
                width: 36,
                height: 36,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {activeConv.initials}
            </div>
            <div>
              <div className="inbox-chat-name">
                {activeConv.name}
                <span className="inbox-chat-channel-badge" title={activeConv.channel}>
                  {channelIcons[activeConv.channel]}
                </span>
              </div>
              <div className="inbox-chat-channel">{activeConv.channel}</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {!isMobile && !isTablet && (
            activeConv.handledBy === 'human' ? (
              <button className="inbox-ai-toggle-btn" onClick={onLetAiHandle}>
                <SparklesIcon /> Let AI handle
              </button>
            ) : (
              <button className="inbox-ai-toggle-btn" onClick={onTakeOverFromAi}>
                <RobotIcon /> Take over from AI
              </button>
            )
          )}
          <div className="inbox-more-wrap" ref={moreRef}>
            <button className="topbar-btn" title="More" onClick={onToggleMore}>
              <MoreHorizontalIcon />
            </button>
            {moreOpen && (
              <>
                {isMobile && <div className="inbox-more-overlay" onClick={onCloseMore} />}
                <div className="inbox-more-dropdown">
                  {(isMobile || isTablet) && (
                    <>
                      {activeConv.handledBy === 'human' ? (
                        <button className="inbox-more-item ai-action" onClick={onLetAiHandle}>
                          <SparklesIcon /> Let AI handle
                        </button>
                      ) : (
                        <button className="inbox-more-item ai-action" onClick={onTakeOverFromAi}>
                          <RobotIcon /> Take over from AI
                        </button>
                      )}
                      <div className="inbox-more-divider" />
                      {activeConv.handledBy === 'human' && (
                        <>
                          <div className="inbox-more-section-label">Actions</div>
                          {workflowActions.map((a) => (
                            <button key={a.label} className="inbox-more-item" onClick={onCloseMore}>
                              {a.icon} {a.label}
                            </button>
                          ))}
                          <div className="inbox-more-divider" />
                        </>
                      )}
                    </>
                  )}
                  <button className="inbox-more-item" onClick={onCloseMore}>
                    <StarIcon /> Mark as starred
                  </button>
                  <button className="inbox-more-item" onClick={onCloseMore}>
                    <EyeOffIcon /> Mark as unread
                  </button>
                  <button className="inbox-more-item" onClick={onCloseMore}>
                    <CopyIcon /> Copy conversation
                  </button>
                  <button className="inbox-more-item" onClick={onCloseMore}>
                    <ArchiveIcon /> Archive
                  </button>
                  <div className="inbox-more-divider" />
                  <button className="inbox-more-item danger" onClick={onCloseMore}>
                    <BanIcon /> Block contact
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="inbox-messages">
        {activeConv.messages.map((msg) => (
          <div key={msg.id} className={`inbox-msg inbox-msg-${msg.type}`}>
            <div>{msg.text}</div>
            <div className="inbox-msg-meta">{msg.time}</div>
          </div>
        ))}
      </div>

      {showAiNotice && (
        <div className="inbox-ai-notice">
          <div className="inbox-ai-notice-icon"><RobotIcon /></div>
          <div className="inbox-ai-notice-body">
            <div className="inbox-ai-notice-title">AI is currently handling this conversation</div>
            <div className="inbox-ai-notice-desc">
              Sending a message will stop AI auto-replies. You&apos;ll be in charge of this conversation until you let AI take over again.
            </div>
          </div>
          <div className="inbox-ai-notice-actions">
            <button className="btn btn-ghost" onClick={onCancelNotice}>Cancel</button>
            <button className="btn btn-teal" onClick={onConfirmSend}>Send anyway</button>
          </div>
        </div>
      )}

      <div className="inbox-input-area">
        <textarea
          className="inbox-input-box"
          placeholder={activeConv.handledBy === 'ai' ? 'Type to take over from AI…' : 'Type a message…'}
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          rows={1}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
        />
        <button className="inbox-send-btn" onClick={onSend}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
}
