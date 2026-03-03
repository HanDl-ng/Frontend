import type { Integration } from './integrations-data';
import {
  XIcon,
  CheckCircleIcon,
  BellIcon,
  RobotIcon,
} from '@/components/icons';

interface ConfigureModalProps {
  integration: Integration;
  onClose: () => void;
}

export default function ConfigureModal({ integration, onClose }: ConfigureModalProps) {
  return (
    <div className="ch-modal-overlay" onClick={onClose}>
      <div className="ch-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ch-modal-header">
          <div className="ch-modal-header-left">
            <div className="ch-modal-logo">
              <integration.Icon className="channel-card-icon" />
            </div>
            <div>
              <div className="ch-modal-title">{integration.name}</div>
              <div className="ch-modal-cat">{integration.category}</div>
            </div>
          </div>
          <button className="ch-modal-close" onClick={onClose}>
            <XIcon />
          </button>
        </div>

        <div className="ch-modal-body">
          <div className="ch-modal-status-bar">
            <CheckCircleIcon className="ch-modal-status-icon" />
            <span>Connected — AI agent is active on this channel</span>
          </div>

          <div className="ch-modal-section">
            <div className="ch-modal-section-title">General</div>
            <label className="ch-modal-field">
              <span className="ch-modal-label">Display Name</span>
              <input className="ch-modal-input" defaultValue={integration.name} />
            </label>
            {integration.type === 'generic' && (
              <label className="ch-modal-field">
                <span className="ch-modal-label">Webhook URL (for replies)</span>
                <input className="ch-modal-input" defaultValue="https://your-app.com/handl-webhook" placeholder="https://..." />
              </label>
            )}
            <label className="ch-modal-field">
              <span className="ch-modal-label">Inbound Endpoint</span>
              <input className="ch-modal-input" defaultValue="https://api.handl.ng/v1/messages/inbound" readOnly />
            </label>
          </div>

          <div className="ch-modal-section">
            <div className="ch-modal-section-title">AI Agent</div>
            <div className="ch-modal-toggle-row">
              <RobotIcon className="ch-modal-row-icon" />
              <span className="ch-modal-row-label">AI agent handles conversations</span>
              <div className="ch-modal-toggle on"><div className="ch-modal-toggle-knob" /></div>
            </div>
            <div className="ch-modal-toggle-row">
              <BellIcon className="ch-modal-row-icon" />
              <span className="ch-modal-row-label">Notify on escalation</span>
              <div className="ch-modal-toggle on"><div className="ch-modal-toggle-knob" /></div>
            </div>
          </div>

          <div className="ch-modal-section">
            <div className="ch-modal-section-title">Usage</div>
            <div className="ch-modal-usage-row">
              <span className="ch-modal-usage-label">Messages this month</span>
              <span className="ch-modal-usage-value">{integration.messages}</span>
            </div>
            <div className="ch-modal-usage-row">
              <span className="ch-modal-usage-label">AI resolution rate</span>
              <span className="ch-modal-usage-value ch-modal-usage-active">87%</span>
            </div>
          </div>
        </div>

        <div className="ch-modal-footer">
          <button className="ch-modal-btn-disconnect">Disconnect</button>
          <button className="ch-modal-btn-save">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
