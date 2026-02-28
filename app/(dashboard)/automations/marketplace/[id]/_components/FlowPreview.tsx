'use client';

import { useMemo, useCallback } from 'react';
import ReactFlow, { Background, Controls, type Node, type Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import { mpNodeTypes } from './MpNode';

interface FlowPreviewProps {
  nodes: Node[];
  edges: Edge[];
}

export default function FlowPreview({ nodes, edges }: FlowPreviewProps) {
  const defaultEdgeOptions = useMemo(() => ({
    style: { stroke: '#b0ada8', strokeWidth: 1.5 },
    type: 'smoothstep' as const,
  }), []);

  const onInit = useCallback((instance: any) => {
    setTimeout(() => instance.fitView({ padding: 0.3 }), 100);
  }, []);

  return (
    <div className="mp-detail-section">
      <h3 className="mp-detail-section-title">Workflow Preview</h3>
      <div className="mp-flow-preview">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={mpNodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          onInit={onInit}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnDrag={true}
          zoomOnScroll={true}
          fitView
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#e8e6e1" gap={20} size={1} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    </div>
  );
}
