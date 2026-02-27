'use client';

import { useCallback, useState, useMemo } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Position,
  type Connection,
  type Node,
  type Edge,
  type NodeTypes,
  Handle,
  type NodeProps,
} from 'reactflow';
import 'reactflow/dist/style.css';

/* ─── Node Type Definitions ─────────────────────── */
interface FlowNodeData {
  label: string;
  description?: string;
  nodeType: 'trigger' | 'ai' | 'action' | 'condition' | 'comms';
  icon: string;
  status?: 'ok' | 'error' | 'running';
  config?: Record<string, string>;
}

const nodeCategories = [
  {
    label: 'Triggers',
    items: [
      { type: 'trigger', icon: '🛒', name: 'New Order', desc: 'When a new order is created' },
      { type: 'trigger', icon: '💬', name: 'New Message', desc: 'When a message is received' },
      { type: 'trigger', icon: '👤', name: 'New Contact', desc: 'When a new contact is added' },
      { type: 'trigger', icon: '⏰', name: 'Schedule', desc: 'Run on a cron schedule' },
      { type: 'trigger', icon: '🔗', name: 'Webhook', desc: 'HTTP webhook trigger' },
    ],
  },
  {
    label: 'AI',
    items: [
      { type: 'ai', icon: '🤖', name: 'AI Respond', desc: 'Generate AI response' },
      { type: 'ai', icon: '🧠', name: 'Classify Intent', desc: 'Classify message intent' },
      { type: 'ai', icon: '📝', name: 'Summarize', desc: 'Summarize conversation' },
      { type: 'ai', icon: '🎯', name: 'Score Lead', desc: 'AI lead scoring' },
    ],
  },
  {
    label: 'Actions',
    items: [
      { type: 'action', icon: '📦', name: 'Update Order', desc: 'Modify order status' },
      { type: 'action', icon: '🏷', name: 'Add Tag', desc: 'Tag a contact or order' },
      { type: 'action', icon: '📋', name: 'Create Ticket', desc: 'Create support ticket' },
      { type: 'action', icon: '💾', name: 'Save Data', desc: 'Store data in database' },
    ],
  },
  {
    label: 'Conditions',
    items: [
      { type: 'condition', icon: '🔀', name: 'If / Else', desc: 'Branch on condition' },
      { type: 'condition', icon: '🔄', name: 'Switch', desc: 'Multi-way branch' },
      { type: 'condition', icon: '⏱', name: 'Wait', desc: 'Delay execution' },
    ],
  },
  {
    label: 'Communications',
    items: [
      { type: 'comms', icon: '💬', name: 'Send WhatsApp', desc: 'Send WhatsApp message' },
      { type: 'comms', icon: '✉️', name: 'Send Email', desc: 'Send email notification' },
      { type: 'comms', icon: '📱', name: 'Send SMS', desc: 'Send SMS message' },
    ],
  },
];

/* ─── Custom Node Component ─────────────────────── */
function CustomNode({ data, selected }: NodeProps<FlowNodeData>) {
  const typeColors: Record<string, string> = {
    trigger: '#d4845a',
    ai: '#2e8b6e',
    action: '#5a7fd4',
    condition: '#a25ad4',
    comms: '#c49400',
  };

  const bgColors: Record<string, string> = {
    trigger: 'rgba(212,132,90,.12)',
    ai: 'rgba(46,139,110,.1)',
    action: 'rgba(90,127,212,.1)',
    condition: 'rgba(200,150,255,.1)',
    comms: 'rgba(254,188,46,.1)',
  };

  return (
    <div className={`rf-custom-node${selected ? ' selected' : ''}`}>
      <Handle type="target" position={Position.Top} style={{ background: '#8a8785', width: 8, height: 8, border: '2px solid #fff' }} />
      <div className="rf-node-header">
        <div className="rf-node-icon" style={{ background: bgColors[data.nodeType] }}>
          {data.icon}
        </div>
        <div>
          <div className={`rf-node-type ${data.nodeType}`}>{data.nodeType}</div>
          <div className="rf-node-name">{data.label}</div>
        </div>
      </div>
      {data.description && <div className="rf-node-desc">{data.description}</div>}
      {data.status && (
        <div className={`rf-node-status ${data.status}`} />
      )}
      <Handle type="source" position={Position.Bottom} style={{ background: typeColors[data.nodeType], width: 8, height: 8, border: '2px solid #fff' }} />
    </div>
  );
}

/* ─── Initial Flow Data ─────────────────────────── */
const initialNodes: Node<FlowNodeData>[] = [
  {
    id: '1', type: 'custom', position: { x: 350, y: 50 },
    data: { label: 'New Order', icon: '🛒', nodeType: 'trigger', description: 'When a new order is created', status: 'ok' },
  },
  {
    id: '2', type: 'custom', position: { x: 350, y: 220 },
    data: { label: 'AI Respond', icon: '🤖', nodeType: 'ai', description: 'Generate order confirmation message', status: 'ok' },
  },
  {
    id: '3', type: 'custom', position: { x: 150, y: 400 },
    data: { label: 'Send WhatsApp', icon: '💬', nodeType: 'comms', description: 'Send confirmation via WhatsApp', status: 'ok' },
  },
  {
    id: '4', type: 'custom', position: { x: 550, y: 400 },
    data: { label: 'Send Email', icon: '✉️', nodeType: 'comms', description: 'Send confirmation email', status: 'ok' },
  },
  {
    id: '5', type: 'custom', position: { x: 350, y: 580 },
    data: { label: 'Update Order', icon: '📦', nodeType: 'action', description: 'Mark as notification sent', status: 'ok' },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#2e8b6e', strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', style: { stroke: '#c49400', strokeWidth: 2 } },
  { id: 'e2-4', source: '2', target: '4', style: { stroke: '#c49400', strokeWidth: 2 } },
  { id: 'e3-5', source: '3', target: '5', style: { stroke: '#5a7fd4', strokeWidth: 2 } },
  { id: 'e4-5', source: '4', target: '5', style: { stroke: '#5a7fd4', strokeWidth: 2 } },
];

/* ─── Builder Page ──────────────────────────────── */
export default function AutomationBuilderPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node<FlowNodeData> | null>(null);
  const [nodeSearch, setNodeSearch] = useState('');

  const nodeTypes: NodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) =>
        addEdge(
          { ...connection, animated: false, style: { stroke: '#8a8785', strokeWidth: 2 } },
          eds
        )
      ),
    [setEdges]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node<FlowNodeData>) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const onDragStart = (event: React.DragEvent, item: { type: string; icon: string; name: string; desc: string }) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(item));
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const data = event.dataTransfer.getData('application/reactflow');
      if (!data) return;
      const item = JSON.parse(data);
      const position = {
        x: event.clientX - 400,
        y: event.clientY - 100,
      };
      const newNode: Node<FlowNodeData> = {
        id: `node-${Date.now()}`,
        type: 'custom',
        position,
        data: {
          label: item.name,
          icon: item.icon,
          nodeType: item.type,
          description: item.desc,
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const filteredCategories = nodeCategories
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((item) =>
        item.name.toLowerCase().includes(nodeSearch.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div className="page-content full-width">
      <div className="builder-layout">
        {/* Node Library */}
        <div className="builder-nodes-panel">
          <div className="builder-nodes-header">
            <div className="builder-nodes-title">Node Library</div>
            <input
              className="builder-nodes-search"
              placeholder="Search nodes…"
              value={nodeSearch}
              onChange={(e) => setNodeSearch(e.target.value)}
            />
          </div>
          {filteredCategories.map((cat) => (
            <div key={cat.label} className="builder-category">
              <div className="builder-category-label">{cat.label}</div>
              {cat.items.map((item) => (
                <div
                  key={item.name}
                  className="builder-node-item"
                  draggable
                  onDragStart={(e) => onDragStart(e, item)}
                >
                  <div className={`builder-node-icon ${item.type}`}>{item.icon}</div>
                  <span className="builder-node-name">{item.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Canvas */}
        <div className="builder-canvas">
          <div className="builder-toolbar">
            <button className="builder-toolbar-btn ghost">↩ Undo</button>
            <button className="builder-toolbar-btn ghost">↪ Redo</button>
            <button className="builder-toolbar-btn ghost">⊞ Auto-layout</button>
            <button className="builder-toolbar-btn ghost" onClick={() => {
              setNodes(initialNodes);
              setEdges(initialEdges);
              setSelectedNode(null);
            }}>⟲ Reset</button>
            <button className="builder-toolbar-btn primary">▶ Test Run</button>
          </div>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.3 }}
            defaultEdgeOptions={{ type: 'smoothstep' }}
          >
            <Background color="rgba(26,25,22,.06)" gap={20} />
            <Controls />
            <MiniMap
              nodeColor={(node: Node) => {
                const data = node.data as FlowNodeData;
                const colors: Record<string, string> = {
                  trigger: '#d4845a',
                  ai: '#2e8b6e',
                  action: '#5a7fd4',
                  condition: '#a25ad4',
                  comms: '#c49400',
                };
                return colors[data.nodeType] || '#8a8785';
              }}
              maskColor="rgba(248,247,244,.8)"
              style={{ borderRadius: 12, border: '1px solid var(--border)' }}
            />
          </ReactFlow>
        </div>

        {/* Config Panel */}
        <div className="builder-config">
          {selectedNode ? (
            <>
              <div className="builder-config-header">
                <div className="builder-config-title">
                  {(selectedNode.data as FlowNodeData).icon} {(selectedNode.data as FlowNodeData).label}
                </div>
                <div className="builder-config-subtitle">
                  {(selectedNode.data as FlowNodeData).nodeType} node
                </div>
              </div>
              <div className="builder-config-body">
                <div className="d-form-group">
                  <label className="d-form-label">Node Name</label>
                  <input
                    className="d-form-input"
                    value={(selectedNode.data as FlowNodeData).label}
                    onChange={(e) => {
                      setNodes((nds) =>
                        nds.map((n) =>
                          n.id === selectedNode.id
                            ? { ...n, data: { ...n.data, label: e.target.value } }
                            : n
                        )
                      );
                    }}
                  />
                </div>
                <div className="d-form-group">
                  <label className="d-form-label">Description</label>
                  <textarea
                    className="d-form-input d-form-textarea"
                    value={(selectedNode.data as FlowNodeData).description || ''}
                    onChange={(e) => {
                      setNodes((nds) =>
                        nds.map((n) =>
                          n.id === selectedNode.id
                            ? { ...n, data: { ...n.data, description: e.target.value } }
                            : n
                        )
                      );
                    }}
                  />
                </div>

                {(selectedNode.data as FlowNodeData).nodeType === 'ai' && (
                  <>
                    <div className="d-form-group">
                      <label className="d-form-label">AI Model</label>
                      <select className="d-form-input d-form-select">
                        <option>GPT-4o</option>
                        <option>GPT-4o mini</option>
                        <option>Claude 3.5 Sonnet</option>
                      </select>
                    </div>
                    <div className="d-form-group">
                      <label className="d-form-label">System Prompt</label>
                      <textarea
                        className="d-form-input d-form-textarea"
                        rows={4}
                        placeholder="You are a helpful customer service assistant…"
                      />
                    </div>
                    <div className="d-form-group">
                      <label className="d-form-label">Temperature</label>
                      <input className="d-form-input" type="number" step="0.1" min="0" max="2" defaultValue="0.7" />
                    </div>
                  </>
                )}

                {(selectedNode.data as FlowNodeData).nodeType === 'comms' && (
                  <>
                    <div className="d-form-group">
                      <label className="d-form-label">Template</label>
                      <select className="d-form-input d-form-select">
                        <option>Order Confirmation</option>
                        <option>Shipping Update</option>
                        <option>Custom Message</option>
                      </select>
                    </div>
                    <div className="d-form-group">
                      <label className="d-form-label">Message Body</label>
                      <textarea
                        className="d-form-input d-form-textarea"
                        rows={4}
                        placeholder="Hi {{customer_name}}, your order #{{order_id}} has been confirmed!"
                      />
                      <div className="d-form-hint">Use {'{{variable}}'} for dynamic content</div>
                    </div>
                  </>
                )}

                {(selectedNode.data as FlowNodeData).nodeType === 'condition' && (
                  <>
                    <div className="d-form-group">
                      <label className="d-form-label">Condition</label>
                      <select className="d-form-input d-form-select">
                        <option>order.total &gt; 50000</option>
                        <option>customer.is_vip == true</option>
                        <option>message.intent == &quot;complaint&quot;</option>
                      </select>
                    </div>
                  </>
                )}

                {(selectedNode.data as FlowNodeData).nodeType === 'trigger' && (
                  <>
                    <div className="d-form-group">
                      <label className="d-form-label">Event Source</label>
                      <select className="d-form-input d-form-select">
                        <option>All Channels</option>
                        <option>WhatsApp</option>
                        <option>Instagram</option>
                        <option>Web Chat</option>
                        <option>Email</option>
                      </select>
                    </div>
                    <div className="d-form-group">
                      <label className="d-form-label">Filters</label>
                      <input className="d-form-input" placeholder="e.g., order.value > 10000" />
                      <div className="d-form-hint">Optional filter expression</div>
                    </div>
                  </>
                )}

                <div style={{ marginTop: 20, padding: '12px 0', borderTop: '1px solid var(--border)' }}>
                  <button
                    className="btn btn-ghost"
                    style={{ width: '100%', color: '#e05252' }}
                    onClick={() => {
                      setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
                      setEdges((eds) =>
                        eds.filter(
                          (e) => e.source !== selectedNode.id && e.target !== selectedNode.id
                        )
                      );
                      setSelectedNode(null);
                    }}
                  >
                    🗑 Delete Node
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="builder-config-empty">
              <div className="builder-config-empty-icon">🖱</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>
                Select a Node
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-f)', lineHeight: 1.5 }}>
                Click on a node in the canvas to configure it, or drag a new node from the library.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
