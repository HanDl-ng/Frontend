export interface FlowField {
  label: string;
  type: 'text' | 'select' | 'textarea';
  options?: string[];
  value: string;
}

export interface FlowNodeConfig {
  fields: FlowField[];
  vars?: string[];
}

export interface FlowNode {
  id: string;
  type: 'trigger' | 'ai' | 'action' | 'condition';
  icon: string;
  label: string;
  desc: string;
  status: 'ok' | 'pending' | 'running';
  config: FlowNodeConfig;
}

export interface FlowConnector {
  connector: string;
  label: string;
}

export type FlowItem = FlowNode | FlowConnector;

export function isFlowNode(item: FlowItem): item is FlowNode {
  return 'id' in item;
}

export interface Template {
  icon: string;
  name: string;
  desc: string;
  tags: string[];
  steps: number;
  filter: string;
}
