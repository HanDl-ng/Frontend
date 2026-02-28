import type { ReactNode } from 'react';

export interface FlowNodeData {
  label: string;
  description?: string;
  nodeType: 'trigger' | 'ai' | 'action' | 'condition' | 'comms' | 'payment' | 'data' | 'logic' | 'error';
  nodeKey: string;
  icon: ReactNode;
  status?: 'ok' | 'error' | 'running';
  config?: Record<string, unknown>;
}

export interface NodeCategoryItem {
  type: FlowNodeData['nodeType'];
  key: string;
  icon: ReactNode;
  name: string;
  desc: string;
}
