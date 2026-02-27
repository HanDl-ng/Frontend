'use client';

import { flows } from '@/data/flows';
import { isFlowNode } from '@/types';

export default function WorkflowCanvas() {
  const currentFlow = 'Sales Flow v3';
  const nodesData = flows[currentFlow] || [];

  return (
    <div className="workflow-canvas reveal d2">
      <div className="wf-toolbar">
        <span className="wf-toolbar-title">{currentFlow}</span>
      </div>

      <div className="wf-nodes">
        {nodesData.map((n, i) => {
          if (!isFlowNode(n)) {
            return (
              <div className="wf-connector" key={`conn-${i}`}>
                <div className="wf-conn-line" />
              </div>
            );
          }

          const prevIsConnector = i > 0 && !isFlowNode(nodesData[i - 1]);
          const needsConnector = i > 0 && !prevIsConnector;

          return (
            <div key={n.id}>
              {needsConnector && (
                <div className="wf-connector">
                  <div className="wf-conn-line" />
                </div>
              )}
              <div className="wf-node">
                <div className={`node-icon ${n.type}`}>{n.icon}</div>
                <div className="node-info">
                  <div className={`node-type ${n.type}`}>{n.type}</div>
                  <div className="node-name">{n.label}</div>
                  <div className="node-desc">{n.desc}</div>
                </div>
                <div className={`node-status ${n.status}`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
