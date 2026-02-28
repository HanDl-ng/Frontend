import { GearIcon } from '@/components/icons';
import { type FlowNodeData } from './types';

interface ConfigPanelProps {
  selectedNodeData: FlowNodeData | undefined;
  onUpdateNodeData: (patch: Partial<FlowNodeData>) => void;
  onDeleteNode: () => void;
  onSaveChanges: () => void;
}

export default function ConfigPanel({ selectedNodeData: nd, onUpdateNodeData, onDeleteNode, onSaveChanges }: ConfigPanelProps) {
  return (
    <div className="builder-config">
      {nd ? (
        <>
          <div className="builder-config-header">
            <div className="builder-config-title">
              <span className="builder-config-icon">{nd.icon}</span>
              {nd.label}
            </div>
            <div className="builder-config-subtitle">{nd.nodeKey.replace(/_/g, ' ')}</div>
          </div>
          <div className="builder-config-body">
            <div className="d-form-group">
              <label className="d-form-label">Name</label>
              <input className="d-form-input" value={nd.label} onChange={e => onUpdateNodeData({ label: e.target.value })} />
            </div>
            <div className="d-form-group">
              <label className="d-form-label">Description</label>
              <input className="d-form-input" value={nd.description || ''} onChange={e => onUpdateNodeData({ description: e.target.value })} />
            </div>

            {nd.nodeKey === 'message_trigger' && (
              <>
                <div className="builder-config-section">Channels</div>
                <div className="d-form-group">
                  <div className="cfg-chip-grid">
                    {['WhatsApp', 'Instagram', 'Telegram', 'Web Chat', 'SMS', 'Email'].map(ch => (
                      <label key={ch} className="cfg-chip-option">
                        <input type="checkbox" defaultChecked={ch === 'WhatsApp'} />
                        <span>{ch}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="builder-config-section">Matching</div>
                <div className="d-form-group">
                  <label className="d-form-label">When to trigger</label>
                  <select className="d-form-input d-form-select">
                    <option>All messages (catch-all)</option>
                    <option>Contains keywords</option>
                    <option>Intent classification</option>
                  </select>
                </div>
                <div className="d-form-group">
                  <label className="d-form-label">Keywords</label>
                  <input className="d-form-input" placeholder="order, buy, price, menu" />
                  <div className="d-form-hint">Comma-separated. Ignored if catch-all.</div>
                </div>
                <div className="builder-config-section">Behavior</div>
                <div className="d-form-group">
                  <label className="d-form-check">
                    <input type="radio" name="conv-behavior" defaultChecked /> Attach to ongoing conversation
                  </label>
                  <label className="d-form-check">
                    <input type="radio" name="conv-behavior" /> Always start new
                  </label>
                </div>
              </>
            )}

            {nd.nodeKey === 'api_trigger' && (
              <>
                <div className="builder-config-section">Endpoint</div>
                <div className="d-form-group">
                  <label className="d-form-label">Your endpoint</label>
                  <div className="cfg-code-block">POST /api/v1/workflows/trigger/{'{{workflow_id}}'}</div>
                </div>
                <div className="d-form-group">
                  <label className="d-form-label">Authentication</label>
                  <select className="d-form-input d-form-select">
                    <option>API Key (from settings)</option>
                    <option>None (public)</option>
                  </select>
                </div>
                <div className="d-form-group">
                  <a href="/settings/developer" className="cfg-docs-link">View API documentation &rarr;</a>
                </div>
              </>
            )}

            {nd.nodeKey === 'order_trigger' && (
              <>
                <div className="builder-config-section">Event</div>
                <div className="d-form-group">
                  <label className="d-form-label">When</label>
                  <select className="d-form-input d-form-select">
                    <option>Order created</option>
                    <option>Order status changed</option>
                    <option>Order updated</option>
                  </select>
                </div>
                <div className="d-form-group">
                  <label className="d-form-label">Source</label>
                  <select className="d-form-input d-form-select">
                    <option>All sources</option>
                    <option>Storefront only</option>
                    <option>AI conversation only</option>
                    <option>API only</option>
                  </select>
                </div>
              </>
            )}

            {nd.nodeKey === 'schedule_trigger' && (
              <>
                <div className="builder-config-section">Schedule</div>
                <div className="d-form-group">
                  <label className="d-form-label">Run every</label>
                  <select className="d-form-input d-form-select">
                    <option>Every day</option>
                    <option>Every week</option>
                    <option>Every month</option>
                    <option>Custom cron</option>
                  </select>
                </div>
                <div className="d-form-group">
                  <label className="d-form-label">At time</label>
                  <input className="d-form-input" type="time" defaultValue="09:00" />
                </div>
                <div className="d-form-group">
                  <label className="d-form-label">Timezone</label>
                  <select className="d-form-input d-form-select">
                    <option>Africa/Lagos (WAT)</option>
                    <option>Africa/Accra (GMT)</option>
                    <option>Africa/Nairobi (EAT)</option>
                    <option>Europe/London (GMT/BST)</option>
                    <option>America/New_York (EST)</option>
                  </select>
                </div>
              </>
            )}

            {nd.nodeKey === 'ai_response' && (
              <>
                <div className="builder-config-section">Instructions</div>
                <div className="d-form-group">
                  <label className="d-form-label">System Prompt</label>
                  <textarea
                    className="d-form-input d-form-textarea"
                    rows={6}
                    defaultValue="You are a friendly sales assistant for this store. Your job is to greet the customer, help them browse available products, take their order, negotiate if needed, confirm order details and total, then proceed to checkout. Be concise and helpful."
                  />
                  <div className="d-form-hint">Tell the AI how to behave in this conversation step</div>
                </div>
                <div className="builder-config-section">Limits</div>
                <div className="d-form-group">
                  <label className="d-form-label">Max conversation turns</label>
                  <input className="d-form-input cfg-no-spin" type="number" defaultValue={20} />
                  <div className="d-form-hint">Maximum back-and-forth messages before handing off</div>
                </div>
                <div className="d-form-group">
                  <label className="d-form-label">Hand back to flow when</label>
                  <input className="d-form-input" defaultValue="Customer confirms order" />
                  <div className="d-form-hint">AI releases control when this condition is met</div>
                </div>
              </>
            )}

            {nd.nodeKey === 'send_message' && (
              <>
                <div className="builder-config-section">Message</div>
                <div className="d-form-group">
                  <label className="d-form-label">Channel</label>
                  <select className="d-form-input d-form-select">
                    <option>Same as trigger</option>
                    <option>WhatsApp</option>
                    <option>Instagram</option>
                    <option>Telegram</option>
                    <option>Email</option>
                    <option>SMS</option>
                  </select>
                </div>
                <div className="d-form-group">
                  <label className="d-form-label">Template</label>
                  <select className="d-form-input d-form-select">
                    <option>Custom Message</option>
                    <option>Order Confirmation</option>
                    <option>Payment Link</option>
                    <option>Receipt</option>
                    <option>Shipping Update</option>
                  </select>
                </div>
                <div className="d-form-group">
                  <label className="d-form-label">Message</label>
                  <textarea className="d-form-input d-form-textarea" rows={4}
                    placeholder={'Hi {{customer.name}}, your order #{{order.id}} is confirmed!\n\nTotal: {{order.total}}\nPayment: {{payment_link}}'}
                  />
                  <div className="d-form-hint">Use {'{{variable}}'} for dynamic content</div>
                </div>
              </>
            )}

            {nd.nodeKey === 'wait_for_reply' && (
              <>
                <div className="builder-config-section">Wait Settings</div>
                <div className="d-form-group">
                  <label className="d-form-label">Expect</label>
                  <select className="d-form-input d-form-select">
                    <option>Any reply</option>
                    <option>Specific keyword</option>
                  </select>
                </div>
                <div className="d-form-group">
                  <label className="d-form-label">Timeout</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input className="d-form-input cfg-no-spin" type="number" defaultValue={24} style={{ flex: 1 }} />
                    <select className="d-form-input d-form-select" style={{ flex: 1 }}>
                      <option>Hours</option>
                      <option>Minutes</option>
                      <option>Days</option>
                    </select>
                  </div>
                </div>
                <div className="d-form-group">
                  <label className="d-form-label">On timeout</label>
                  <select className="d-form-input d-form-select">
                    <option>Send reminder</option>
                    <option>Close conversation</option>
                    <option>Route to human</option>
                  </select>
                </div>
              </>
            )}

            {nd.nodeKey === 'create_order' && (
              <>
                <div className="builder-config-section">Order</div>
                <div className="d-form-group">
                  <label className="d-form-label">Operation</label>
                  <select className="d-form-input d-form-select">
                    <option>Create new order</option>
                    <option>Update existing order</option>
                  </select>
                </div>
                <div className="d-form-group">
                  <label className="d-form-label">Source</label>
                  <select className="d-form-input d-form-select">
                    <option>Conversation</option>
                    <option>Storefront</option>
                    <option>API</option>
                  </select>
                </div>
                <div className="d-form-hint" style={{ marginTop: 4 }}>Order data (items, customer, total) is automatically mapped from the workflow context.</div>
              </>
            )}

            {nd.nodeKey === 'start_payment' && (
              <>
                <div className="builder-config-section">Payment</div>
                <div className="d-form-group">
                  <label className="d-form-label">Currency</label>
                  <select className="d-form-input d-form-select">
                    <option>Auto-detect from store</option>
                    <option>NGN — Nigerian Naira</option>
                    <option>GHS — Ghanaian Cedi</option>
                    <option>KES — Kenyan Shilling</option>
                    <option>USD — US Dollar</option>
                    <option>GBP — British Pound</option>
                    <option>EUR — Euro</option>
                  </select>
                </div>
                <div className="d-form-hint" style={{ marginTop: 4 }}>Amount is automatically taken from the order total. Payment is processed via Stripe.</div>
              </>
            )}

            {nd.nodeKey === 'wait_event' && (
              <>
                <div className="builder-config-section">Event</div>
                <div className="d-form-group">
                  <label className="d-form-label">Wait for</label>
                  <select className="d-form-input d-form-select">
                    <option>Payment completed</option>
                    <option>Order status changed</option>
                    <option>Delivery confirmed</option>
                    <option>Delivery picked up</option>
                    <option>Customer reply received</option>
                    <option>Webhook received</option>
                    <option>Custom event</option>
                  </select>
                </div>
                <div className="d-form-group">
                  <label className="d-form-label">Match condition</label>
                  <input className="d-form-input" placeholder="e.g. status == shipped" />
                  <div className="d-form-hint">Optional: only proceed if the event data matches this condition</div>
                </div>
                <div className="builder-config-section">Timeout</div>
                <div className="d-form-group">
                  <label className="d-form-label">Wait up to</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input className="d-form-input cfg-no-spin" type="number" defaultValue={24} style={{ flex: 1 }} />
                    <select className="d-form-input d-form-select" style={{ flex: 1 }}>
                      <option>Hours</option>
                      <option>Minutes</option>
                      <option>Days</option>
                    </select>
                  </div>
                </div>
                <div className="builder-config-section">Branches</div>
                <div className="d-form-group">
                  <div className="d-form-hint">Success &rarr; right handle &nbsp;&bull;&nbsp; Timeout &rarr; left handle &nbsp;&bull;&nbsp; Default &rarr; bottom handle</div>
                </div>
              </>
            )}

            {nd.nodeKey === 'delay' && (
              <>
                <div className="builder-config-section">Timing</div>
                <div className="d-form-group">
                  <label className="d-form-label">Type</label>
                  <select className="d-form-input d-form-select">
                    <option>Wait for duration</option>
                    <option>Wait until specific time</option>
                  </select>
                </div>
                <div className="d-form-group">
                  <label className="d-form-label">Duration</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input className="d-form-input cfg-no-spin" type="number" defaultValue={30} style={{ flex: 1 }} />
                    <select className="d-form-input d-form-select" style={{ flex: 1 }}>
                      <option>Minutes</option>
                      <option>Hours</option>
                      <option>Days</option>
                    </select>
                  </div>
                </div>
                <div className="d-form-group">
                  <label className="d-form-label">Or at specific time</label>
                  <input className="d-form-input" type="time" defaultValue="09:00" />
                  <div className="d-form-hint">Used when &ldquo;Wait until specific time&rdquo; is selected</div>
                </div>
              </>
            )}

            {nd.nodeKey === 'http_request' && (
              <>
                <div className="builder-config-section">Request</div>
                <div className="d-form-group">
                  <label className="d-form-label">Method</label>
                  <select className="d-form-input d-form-select">
                    <option>POST</option>
                    <option>GET</option>
                    <option>PUT</option>
                    <option>PATCH</option>
                    <option>DELETE</option>
                  </select>
                </div>
                <div className="d-form-group">
                  <label className="d-form-label">URL</label>
                  <input className="d-form-input" placeholder="https://api.example.com/webhook" />
                </div>
                <div className="d-form-group">
                  <label className="d-form-label">Headers</label>
                  <textarea className="d-form-input d-form-textarea" rows={2}
                    placeholder={'Authorization: Bearer {{api_key}}\nContent-Type: application/json'}
                  />
                </div>
                <div className="d-form-group">
                  <label className="d-form-label">Body</label>
                  <textarea className="d-form-input d-form-textarea" rows={3}
                    placeholder={'{\n  "event": "order.paid",\n  "order_id": "{{order.id}}"\n}'}
                  />
                </div>
              </>
            )}

            {nd.nodeKey === 'set_variable' && (
              <>
                <div className="builder-config-section">Variable</div>
                <div className="d-form-group">
                  <label className="d-form-label">Name</label>
                  <input className="d-form-input" placeholder="e.g. discount_amount" />
                </div>
                <div className="d-form-group">
                  <label className="d-form-label">Value</label>
                  <input className="d-form-input" placeholder="e.g. {{order.total}} * 0.1" />
                </div>
              </>
            )}

            {nd.nodeKey === 'fetch_data' && (
              <>
                <div className="builder-config-section">Lookup</div>
                <div className="d-form-group">
                  <label className="d-form-label">Source</label>
                  <select className="d-form-input d-form-select">
                    <option>Customers</option>
                    <option>Orders</option>
                    <option>Products</option>
                  </select>
                </div>
                <div className="d-form-group">
                  <label className="d-form-label">Lookup key</label>
                  <input className="d-form-input" placeholder="{{customer.phone}}" />
                </div>
              </>
            )}

            {nd.nodeKey === 'condition' && (
              <>
                <div className="builder-config-section">If / Else</div>
                <div className="d-form-group">
                  <label className="d-form-label">If</label>
                  <div className="cfg-condition-row">
                    <input className="d-form-input" placeholder="{{payment_status}}" style={{ flex: 2 }} />
                    <select className="d-form-input d-form-select" style={{ flex: 1 }}>
                      <option>==</option>
                      <option>!=</option>
                      <option>&gt;</option>
                      <option>&lt;</option>
                      <option>contains</option>
                      <option>exists</option>
                    </select>
                    <input className="d-form-input" placeholder="paid" style={{ flex: 2 }} />
                  </div>
                </div>
                <div className="d-form-group">
                  <div className="d-form-hint">YES &rarr; right handle &nbsp;&bull;&nbsp; NO &rarr; left handle</div>
                </div>
              </>
            )}

            {nd.nodeKey === 'split' && (
              <>
                <div className="builder-config-section">Parallel</div>
                <div className="d-form-group">
                  <label className="d-form-label">After branches complete</label>
                  <select className="d-form-input d-form-select">
                    <option>Wait for all</option>
                    <option>Continue on first</option>
                    <option>Fire and forget</option>
                  </select>
                </div>
                <div className="d-form-hint">Connect multiple outgoing edges to create parallel paths</div>
              </>
            )}

            {nd.nodeKey === 'end' && (
              <>
                <div className="builder-config-section">On Complete</div>
                <div className="d-form-group">
                  <select className="d-form-input d-form-select">
                    <option>Close conversation</option>
                    <option>Keep open for next workflow</option>
                    <option>Mark as resolved</option>
                  </select>
                </div>
              </>
            )}

            {nd.nodeKey === 'webhook_trigger' && (
              <>
                <div className="builder-config-section">Endpoint</div>
                <div className="d-form-group">
                  <label className="d-form-label">Webhook URL</label>
                  <div className="cfg-code-block">POST /api/v1/webhooks/{'{{workflow_id}}'}</div>
                  <div className="d-form-hint">External systems call this URL to trigger the workflow</div>
                </div>
                <div className="builder-config-section">Security</div>
                <div className="d-form-group">
                  <label className="d-form-label">Signature verification</label>
                  <select className="d-form-input d-form-select">
                    <option>HMAC-SHA256 (recommended)</option>
                    <option>API Key header</option>
                    <option>None (public)</option>
                  </select>
                </div>
                <div className="d-form-group">
                  <label className="d-form-label">Secret</label>
                  <input className="d-form-input" type="password" placeholder="Auto-generated on save" disabled />
                  <div className="d-form-hint">Used by the sender to sign requests. Generated when you save.</div>
                </div>
                <div className="builder-config-section">Payload</div>
                <div className="d-form-group">
                  <label className="d-form-label">Expected fields</label>
                  <textarea className="d-form-input d-form-textarea" rows={3}
                    placeholder={'order_id: string\nstatus: string\nmetadata: object (optional)'}
                  />
                  <div className="d-form-hint">Document expected payload for callers. Available as {'{{webhook.*}}'} in the flow.</div>
                </div>
              </>
            )}

            {nd.nodeKey === 'return_response' && (
              <>
                <div className="builder-config-section">Response</div>
                <div className="d-form-group">
                  <label className="d-form-label">Status code</label>
                  <select className="d-form-input d-form-select">
                    <option>200 OK</option>
                    <option>201 Created</option>
                    <option>202 Accepted</option>
                    <option>400 Bad Request</option>
                    <option>404 Not Found</option>
                  </select>
                </div>
                <div className="d-form-group">
                  <label className="d-form-label">Response body</label>
                  <textarea className="d-form-input d-form-textarea" rows={5}
                    placeholder={'{\n  "success": true,\n  "order_id": "{{order.id}}",\n  "payment_link": "{{payment_link}}"\n}'}
                  />
                  <div className="d-form-hint">JSON template returned to the API caller. Use {'{{variables}}'} for dynamic data.</div>
                </div>
                <div className="builder-config-section">Behavior</div>
                <div className="d-form-group">
                  <label className="d-form-label">After returning</label>
                  <select className="d-form-input d-form-select">
                    <option>Continue workflow async</option>
                    <option>Stop workflow here</option>
                  </select>
                  <div className="d-form-hint">Choose whether to continue processing after responding to the caller</div>
                </div>
              </>
            )}

            {nd.nodeKey === 'catch_error' && (
              <>
                <div className="builder-config-section">Error Source</div>
                <div className="d-form-group">
                  <label className="d-form-label">Catch errors from</label>
                  <select className="d-form-input d-form-select">
                    <option>Any upstream node (automatic)</option>
                    <option>Specific nodes only</option>
                  </select>
                  <div className="d-form-hint">Connect the red error handle from action nodes to this node</div>
                </div>
                <div className="builder-config-section">On Error</div>
                <div className="d-form-group">
                  <label className="d-form-label">Action</label>
                  <select className="d-form-input d-form-select">
                    <option>Retry (up to 3 times)</option>
                    <option>Notify staff</option>
                    <option>Send error message to customer</option>
                    <option>Log and continue</option>
                    <option>Stop workflow</option>
                  </select>
                </div>
                <div className="d-form-group">
                  <label className="d-form-label">Retry delay</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input className="d-form-input cfg-no-spin" type="number" defaultValue={30} style={{ flex: 1 }} />
                    <select className="d-form-input d-form-select" style={{ flex: 1 }}>
                      <option>Seconds</option>
                      <option>Minutes</option>
                    </select>
                  </div>
                  <div className="d-form-hint">Wait time between retry attempts</div>
                </div>
                <div className="d-form-group">
                  <label className="d-form-label">Fallback message</label>
                  <textarea className="d-form-input d-form-textarea" rows={2}
                    placeholder="Sorry, something went wrong. Our team has been notified and will assist you shortly."
                  />
                  <div className="d-form-hint">Sent to customer if selected action involves messaging</div>
                </div>
                <div className="d-form-group">
                  <div className="cfg-error-info">
                    Error details are available as {'{{error.message}}'}, {'{{error.node}}'}, and {'{{error.code}}'} in downstream nodes.
                  </div>
                </div>
              </>
            )}

            <div className="builder-config-actions">
              <button className="btn btn-teal btn-sm" style={{ flex: 1 }} onClick={onSaveChanges}>Save Changes</button>
              <button className="btn btn-ghost btn-sm" style={{ color: '#e05252' }} onClick={onDeleteNode}>Delete</button>
            </div>
          </div>
        </>
      ) : (
        <div className="builder-config-empty">
          <div className="builder-config-empty-icon"><GearIcon /></div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>Select a Node</div>
          <div style={{ fontSize: 12, color: 'var(--ink-f)', lineHeight: 1.5 }}>
            Click on a node in the canvas to configure it, or drag a new one from the library.
          </div>
        </div>
      )}
    </div>
  );
}
