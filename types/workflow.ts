/**
 * Workflow JSON Schema
 *
 * This is the structure sent to the server when a workflow is
 * created or updated.  The server persists it, validates the
 * graph, and uses it to execute the automation at runtime.
 *
 * ─── Example payload ─────────────────────────────────────────
 *
 * {
 *   "id": "wf_abc123",
 *   "name": "Order Confirmation Flow",
 *   "description": "Sends order confirmation with tracking via WhatsApp",
 *   "status": "live",
 *   "version": 2,
 *   "trigger": {
 *     "type": "new_order",
 *     "channel": "whatsapp",
 *     "filters": { "field": "order.total", "operator": "gte", "value": "500" }
 *   },
 *   "nodes": [
 *     {
 *       "id": "node_1",
 *       "type": "ai",
 *       "name": "Classify Intent",
 *       "config": {
 *         "model": "gpt-4o-mini",
 *         "instructions": "Classify the customer message…",
 *         "temperature": 0.3,
 *         "outputVariable": "intent"
 *       },
 *       "position": { "x": 300, "y": 200 }
 *     },
 *     {
 *       "id": "node_2",
 *       "type": "condition",
 *       "name": "Check Intent",
 *       "config": {
 *         "rules": [
 *           { "field": "{{intent}}", "operator": "eq", "value": "order", "targetNodeId": "node_3" },
 *           { "field": "{{intent}}", "operator": "eq", "value": "support", "targetNodeId": "node_5" }
 *         ],
 *         "fallbackNodeId": "node_6"
 *       },
 *       "position": { "x": 300, "y": 400 }
 *     },
 *     {
 *       "id": "node_3",
 *       "type": "action",
 *       "name": "Create Order",
 *       "config": {
 *         "actionType": "create_order",
 *         "mapping": {
 *           "customer": "{{customer.name}}",
 *           "items": "{{ai.order_items}}",
 *           "total": "{{ai.order_total}}"
 *         }
 *       },
 *       "position": { "x": 100, "y": 600 }
 *     },
 *     {
 *       "id": "node_4",
 *       "type": "comms",
 *       "name": "Send Confirmation",
 *       "config": {
 *         "channel": "whatsapp",
 *         "template": "order_confirmed",
 *         "to": "{{customer.phone}}",
 *         "variables": {
 *           "name": "{{customer.name}}",
 *           "orderId": "{{order.id}}"
 *         }
 *       },
 *       "position": { "x": 100, "y": 800 }
 *     }
 *   ],
 *   "edges": [
 *     { "id": "e1", "source": "trigger", "target": "node_1" },
 *     { "id": "e2", "source": "node_1", "target": "node_2" },
 *     { "id": "e3", "source": "node_2", "target": "node_3", "label": "order" },
 *     { "id": "e4", "source": "node_3", "target": "node_4" }
 *   ],
 *   "settings": {
 *     "timezone": "Africa/Lagos",
 *     "retryOnFailure": true,
 *     "maxRetries": 3,
 *     "retryDelayMs": 5000,
 *     "timeoutMs": 30000,
 *     "errorNotification": { "channel": "email", "to": "admin@mybiz.com" }
 *   },
 *   "metadata": {
 *     "createdAt": "2026-02-28T10:00:00Z",
 *     "updatedAt": "2026-02-28T12:30:00Z",
 *     "createdBy": "user_xyz",
 *     "tags": ["commerce", "whatsapp"]
 *   }
 * }
 */

/* ─── Trigger ────────────────────────────────────── */

export type TriggerType =
  | 'new_order'
  | 'new_message'
  | 'new_contact'
  | 'schedule'
  | 'webhook'
  | 'order_status_changed'
  | 'cart_abandoned'
  | 'payment_received'
  | 'delivery_status_changed';

export type FilterOperator =
  | 'eq'
  | 'neq'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'contains'
  | 'not_contains'
  | 'starts_with'
  | 'ends_with'
  | 'in'
  | 'not_in'
  | 'exists'
  | 'not_exists';

export interface TriggerFilter {
  field: string;
  operator: FilterOperator;
  value: string | number | boolean | string[];
}

export interface ScheduleConfig {
  /** Cron expression, e.g. "0 23 * * *" */
  cron: string;
  timezone: string;
}

export interface WebhookConfig {
  /** Server-generated webhook URL (read-only on client) */
  url?: string;
  /** Expected HTTP method */
  method: 'GET' | 'POST' | 'PUT';
  /** Optional secret for signature verification */
  secret?: string;
}

export interface WorkflowTrigger {
  type: TriggerType;
  /** Filter incoming channel: whatsapp | instagram | email | sms | all */
  channel?: string;
  /** Optional conditions to narrow which events fire this trigger */
  filters?: TriggerFilter[];
  /** Keyword filters for message-based triggers */
  keywords?: string[];
  /** Schedule config (only when type = "schedule") */
  schedule?: ScheduleConfig;
  /** Webhook config (only when type = "webhook") */
  webhook?: WebhookConfig;
}

/* ─── Nodes ──────────────────────────────────────── */

export type NodeType = 'ai' | 'action' | 'condition' | 'comms' | 'wait' | 'loop';

/** AI node — runs an LLM task */
export interface AiNodeConfig {
  /** Model to use */
  model?: string;
  /** System prompt / instructions */
  instructions: string;
  /** Temperature 0-1 */
  temperature?: number;
  /** Max tokens for response */
  maxTokens?: number;
  /** Variable name to store the AI output */
  outputVariable?: string;
  /** Max conversation turns (for chat-style AI nodes) */
  maxTurns?: number;
  /** When to release back to flow (for conversational AI) */
  releaseCondition?: string;
}

/** Action node — performs a side-effect */
export type ActionType =
  | 'create_order'
  | 'update_order'
  | 'send_payment_link'
  | 'dispatch_rider'
  | 'create_ticket'
  | 'add_tag'
  | 'remove_tag'
  | 'save_data'
  | 'http_request'
  | 'assign_agent'
  | 'generate_report';

export interface ActionNodeConfig {
  actionType: ActionType;
  /** Key-value mapping; values can use {{template}} variables */
  mapping?: Record<string, string>;
  /** For http_request actions */
  http?: {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    headers?: Record<string, string>;
    body?: string;
  };
  /** Provider for payment / delivery actions */
  provider?: string;
  /** Currency for payment actions */
  currency?: string;
}

/** Condition node — branches the flow */
export interface ConditionRule {
  field: string;
  operator: FilterOperator;
  value: string | number | boolean;
  /** The node to jump to when this rule matches */
  targetNodeId: string;
}

export interface ConditionNodeConfig {
  rules: ConditionRule[];
  /** Node to jump to when no rule matches */
  fallbackNodeId?: string;
}

/** Comms node — sends a message */
export interface CommsNodeConfig {
  channel: 'whatsapp' | 'email' | 'sms' | 'instagram' | 'telegram';
  /** Message template ID or inline text */
  template?: string;
  /** Inline message body (if no template) */
  body?: string;
  /** Recipient — typically a {{variable}} */
  to: string;
  /** Template variables */
  variables?: Record<string, string>;
  /** Subject line (email only) */
  subject?: string;
}

/** Wait node — pauses execution */
export interface WaitNodeConfig {
  /** Delay in milliseconds */
  delayMs?: number;
  /** Or wait until a specific event occurs */
  waitForEvent?: string;
  /** Max time to wait before timing out (ms) */
  timeoutMs?: number;
}

export type WorkflowNodeConfig =
  | AiNodeConfig
  | ActionNodeConfig
  | ConditionNodeConfig
  | CommsNodeConfig
  | WaitNodeConfig
  | Record<string, unknown>;

export interface WorkflowNodePosition {
  x: number;
  y: number;
}

export interface WorkflowNode {
  /** Unique node ID within the workflow */
  id: string;
  type: NodeType;
  /** Human-readable name shown in the builder */
  name: string;
  /** Optional description */
  description?: string;
  /** Type-specific configuration */
  config: WorkflowNodeConfig;
  /** Canvas position for the visual builder */
  position: WorkflowNodePosition;
}

/* ─── Edges ──────────────────────────────────────── */

export interface WorkflowEdge {
  id: string;
  /** Source node ID ("trigger" for the trigger node) */
  source: string;
  /** Source handle (e.g. "yes", "no" for condition nodes) */
  sourceHandle?: string;
  /** Target node ID */
  target: string;
  /** Target handle */
  targetHandle?: string;
  /** Optional label shown on the edge */
  label?: string;
}

/* ─── Settings ───────────────────────────────────── */

export interface ErrorNotification {
  channel: 'email' | 'whatsapp' | 'sms';
  to: string;
}

export interface WorkflowSettings {
  timezone: string;
  /** Retry the failed node automatically */
  retryOnFailure: boolean;
  maxRetries: number;
  /** Delay between retries in ms */
  retryDelayMs: number;
  /** Max time a single node can run before timing out */
  timeoutMs: number;
  /** Where to send error alerts */
  errorNotification?: ErrorNotification;
  /** Enable verbose execution logging */
  debugMode?: boolean;
}

/* ─── Metadata ───────────────────────────────────── */

export interface WorkflowMetadata {
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  /** Searchable tags */
  tags?: string[];
  /** Folder / category for organization */
  folder?: string;
}

/* ─── Top-level Workflow ─────────────────────────── */

export type WorkflowStatus = 'draft' | 'live' | 'paused' | 'error';

export interface Workflow {
  /** Server-generated unique ID, e.g. "wf_abc123" */
  id: string;
  /** User-facing workflow name */
  name: string;
  /** Optional description */
  description?: string;
  /** Current status */
  status: WorkflowStatus;
  /** Incremented on each save */
  version: number;
  /** The single entry-point trigger */
  trigger: WorkflowTrigger;
  /** All nodes in the workflow graph */
  nodes: WorkflowNode[];
  /** Connections between nodes */
  edges: WorkflowEdge[];
  /** Execution settings */
  settings: WorkflowSettings;
  /** Audit / organization metadata */
  metadata: WorkflowMetadata;
}

/* ─── API payloads ───────────────────────────────── */

/** POST /api/workflows — create */
export type CreateWorkflowPayload = Omit<Workflow, 'id' | 'version' | 'metadata'> & {
  metadata?: Pick<WorkflowMetadata, 'tags' | 'folder'>;
};

/** PUT /api/workflows/:id — update */
export type UpdateWorkflowPayload = Partial<Omit<Workflow, 'id' | 'metadata'>> & {
  metadata?: Partial<Pick<WorkflowMetadata, 'tags' | 'folder'>>;
};

/** Server response after create / update */
export interface WorkflowResponse {
  success: boolean;
  workflow: Workflow;
}

/** Execution run record (returned from GET /api/workflows/:id/runs) */
export interface WorkflowRun {
  id: string;
  workflowId: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  startedAt: string;
  completedAt?: string;
  /** ID of the trigger event that started this run */
  triggerEventId?: string;
  /** Per-node execution results */
  nodeResults: WorkflowNodeResult[];
  error?: string;
}

export interface WorkflowNodeResult {
  nodeId: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
  startedAt?: string;
  completedAt?: string;
  /** Output data produced by this node */
  output?: Record<string, unknown>;
  error?: string;
  /** Retry attempt number (0 = first try) */
  attempt: number;
}
