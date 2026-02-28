import { Position, Handle, type NodeProps } from 'reactflow';
import { type FlowNodeData } from './types';

export default function CustomNode({ data, selected }: NodeProps<FlowNodeData>) {
  return (
    <div className={`rf-custom-node${selected ? ' selected' : ''}`}>
      <Handle type="target" position={Position.Top} style={{ background: '#8a8785', width: 8, height: 8, border: '2px solid #fff' }} />
      <div className="rf-node-header">
        <div className="rf-node-icon">{data.icon}</div>
        <div>
          <div className="rf-node-type">{data.nodeKey.replace(/_/g, ' ')}</div>
          <div className="rf-node-name">{data.label}</div>
        </div>
      </div>
      {data.description && <div className="rf-node-desc">{data.description}</div>}
      {data.status && <div className={`rf-node-status ${data.status}`} />}
      {data.nodeKey !== 'end' && (
        <Handle type="source" position={Position.Bottom} style={{ background: 'var(--teal)', width: 8, height: 8, border: '2px solid #fff' }} />
      )}
      {data.nodeKey === 'condition' && (
        <>
          <Handle type="source" position={Position.Left} id="no" style={{ background: '#e05252', width: 7, height: 7, border: '2px solid #fff', top: '70%' }} />
          <Handle type="source" position={Position.Right} id="yes" style={{ background: 'var(--teal)', width: 7, height: 7, border: '2px solid #fff', top: '70%' }} />
        </>
      )}
      {data.nodeKey === 'wait_event' && (
        <>
          <Handle type="source" position={Position.Left} id="timeout" style={{ background: '#e05252', width: 7, height: 7, border: '2px solid #fff', top: '70%' }} />
          <Handle type="source" position={Position.Right} id="success" style={{ background: 'var(--teal)', width: 7, height: 7, border: '2px solid #fff', top: '70%' }} />
        </>
      )}
      {['ai_response', 'http_request', 'start_payment', 'create_order', 'send_message', 'fetch_data'].includes(data.nodeKey) && (
        <Handle type="source" position={Position.Left} id="error" className="rf-error-handle" style={{ background: '#e05252', width: 7, height: 7, border: '2px solid #fff', top: '80%' }} />
      )}
    </div>
  );
}
