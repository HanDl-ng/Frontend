'use client';

import { useCallback, useState, useMemo, useRef } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Connection,
  type Node,
  type Edge,
  type NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { GearIcon } from '@/components/icons';
import { type FlowNodeData, type NodeCategoryItem } from './_components/types';
import { nodeCategories } from './_components/node-categories';
import CustomNode from './_components/CustomNode';
import { initialNodes, initialEdges } from './_components/default-flow';
import NodeLibrary from './_components/NodeLibrary';
import ConfigPanel from './_components/ConfigPanel';
import SaveModal from './_components/SaveModal';
import BuilderHeader from './_components/BuilderHeader';

export default function AutomationBuilderPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node<FlowNodeData> | null>(null);
  const [nodeSearch, setNodeSearch] = useState('');
  const [testRunning, setTestRunning] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [autoName, setAutoName] = useState('');
  const [autoDesc, setAutoDesc] = useState('');
  const [saveAs, setSaveAs] = useState<'draft' | 'save' | 'publish'>('draft');

  type Snapshot = { nodes: Node<FlowNodeData>[]; edges: Edge[] };
  const historyRef = useRef<Snapshot[]>([{ nodes: initialNodes, edges: initialEdges }]);
  const historyIndexRef = useRef(0);
  const isUndoRedoRef = useRef(false);

  const pushHistory = useCallback(() => {
    if (isUndoRedoRef.current) { isUndoRedoRef.current = false; return; }
    const trimmed = historyRef.current.slice(0, historyIndexRef.current + 1);
    trimmed.push({ nodes: nodes.map(n => ({ ...n, data: { ...n.data } })), edges: edges.map(e => ({ ...e })) });
    if (trimmed.length > 50) trimmed.shift();
    historyRef.current = trimmed;
    historyIndexRef.current = trimmed.length - 1;
  }, [nodes, edges]);

  const wrappedOnNodesChange = useCallback((changes: Parameters<typeof onNodesChange>[0]) => {
    onNodesChange(changes);
    setTimeout(() => pushHistory(), 0);
  }, [onNodesChange, pushHistory]);

  const wrappedOnEdgesChange = useCallback((changes: Parameters<typeof onEdgesChange>[0]) => {
    onEdgesChange(changes);
    setTimeout(() => pushHistory(), 0);
  }, [onEdgesChange, pushHistory]);

  const getIconForKey = useCallback((key: string): React.ReactNode => {
    for (const cat of nodeCategories) { const f = cat.items.find(i => i.key === key); if (f) return f.icon; }
    return <GearIcon />;
  }, []);

  const handleUndo = useCallback(() => {
    if (historyIndexRef.current <= 0) return;
    historyIndexRef.current -= 1;
    const snap = historyRef.current[historyIndexRef.current];
    isUndoRedoRef.current = true;
    setNodes(snap.nodes.map(n => ({ ...n, data: { ...n.data, icon: getIconForKey(n.data.nodeKey) } })));
    setEdges(snap.edges);
    setSelectedNode(null);
  }, [setNodes, setEdges, getIconForKey]);

  const handleRedo = useCallback(() => {
    if (historyIndexRef.current >= historyRef.current.length - 1) return;
    historyIndexRef.current += 1;
    const snap = historyRef.current[historyIndexRef.current];
    isUndoRedoRef.current = true;
    setNodes(snap.nodes.map(n => ({ ...n, data: { ...n.data, icon: getIconForKey(n.data.nodeKey) } })));
    setEdges(snap.edges);
    setSelectedNode(null);
  }, [setNodes, setEdges, getIconForKey]);

  const handleAutoLayout = useCallback(() => {
    const childrenMap: Record<string, string[]> = {};
    const hasParent = new Set<string>();
    edges.forEach(e => { if (!childrenMap[e.source]) childrenMap[e.source] = []; childrenMap[e.source].push(e.target); hasParent.add(e.target); });
    const roots = nodes.filter(n => !hasParent.has(n.id)).map(n => n.id);
    if (roots.length === 0) return;
    const X_GAP = 280, Y_GAP = 160;
    const positions: Record<string, { x: number; y: number }> = {};
    const visited = new Set<string>();
    const queue: { id: string; depth: number }[] = roots.map(id => ({ id, depth: 0 }));
    const layers: Record<number, string[]> = {};
    while (queue.length > 0) {
      const { id, depth } = queue.shift()!;
      if (visited.has(id)) continue;
      visited.add(id);
      if (!layers[depth]) layers[depth] = [];
      layers[depth].push(id);
      (childrenMap[id] || []).forEach(cid => { if (!visited.has(cid)) queue.push({ id: cid, depth: depth + 1 }); });
    }
    const maxDepth = Math.max(...Object.keys(layers).map(Number), 0);
    nodes.forEach(n => { if (!visited.has(n.id)) { if (!layers[maxDepth + 1]) layers[maxDepth + 1] = []; layers[maxDepth + 1].push(n.id); } });
    Object.entries(layers).forEach(([d, ids]) => {
      const depth = Number(d);
      const startX = 400 - ((ids.length - 1) * X_GAP) / 2;
      ids.forEach((id, i) => { positions[id] = { x: startX + i * X_GAP, y: 40 + depth * Y_GAP }; });
    });
    setNodes(nds => nds.map(n => ({ ...n, position: positions[n.id] || n.position })));
    pushHistory();
  }, [nodes, edges, setNodes, pushHistory]);

  const handleTestRun = useCallback(async () => {
    if (testRunning) return;
    setTestRunning(true);
    setSelectedNode(null);
    const childrenMap: Record<string, string[]> = {};
    const hasParent = new Set<string>();
    edges.forEach(e => { if (!childrenMap[e.source]) childrenMap[e.source] = []; childrenMap[e.source].push(e.target); hasParent.add(e.target); });
    const roots = nodes.filter(n => !hasParent.has(n.id)).map(n => n.id);
    const order: string[] = [];
    const visited = new Set<string>();
    const queue = [...roots];
    while (queue.length > 0) { const id = queue.shift()!; if (visited.has(id)) continue; visited.add(id); order.push(id); (childrenMap[id] || []).forEach(cid => { if (!visited.has(cid)) queue.push(cid); }); }
    nodes.forEach(n => { if (!visited.has(n.id)) order.push(n.id); });
    setNodes(nds => nds.map(n => ({ ...n, data: { ...n.data, status: undefined } })));
    await new Promise(r => setTimeout(r, 400));
    for (const nodeId of order) {
      setNodes(nds => nds.map(n => n.id === nodeId ? { ...n, data: { ...n.data, status: 'running' as const } } : n));
      setEdges(eds => eds.map(e => e.target === nodeId ? { ...e, animated: true } : e));
      await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
      setNodes(nds => nds.map(n => n.id === nodeId ? { ...n, data: { ...n.data, status: 'ok' as const } } : n));
      setEdges(eds => eds.map(e => e.target === nodeId ? { ...e, animated: false } : e));
      await new Promise(r => setTimeout(r, 200));
    }
    setTestRunning(false);
  }, [nodes, edges, setNodes, setEdges, testRunning]);

  const nodeTypes: NodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges(eds => addEdge({ ...connection, animated: false, style: { stroke: 'var(--teal)', strokeWidth: 2 } }, eds));
      setTimeout(() => pushHistory(), 0);
    },
    [setEdges, pushHistory]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node<FlowNodeData>) => setSelectedNode(node), []);
  const onPaneClick = useCallback(() => setSelectedNode(null), []);

  const onDragStart = (event: React.DragEvent, item: NodeCategoryItem) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ type: item.type, key: item.key, name: item.name, desc: item.desc }));
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const raw = event.dataTransfer.getData('application/reactflow');
      if (!raw) return;
      const item = JSON.parse(raw);
      const newNode: Node<FlowNodeData> = {
        id: `node-${Date.now()}`,
        type: 'custom',
        position: { x: event.clientX - 400, y: event.clientY - 100 },
        data: { label: item.name, icon: getIconForKey(item.key), nodeType: item.type, nodeKey: item.key, description: item.desc },
      };
      setNodes(nds => nds.concat(newNode));
      setTimeout(() => pushHistory(), 0);
    },
    [setNodes, pushHistory, getIconForKey]
  );

  const onDragOver = useCallback((event: React.DragEvent) => { event.preventDefault(); event.dataTransfer.dropEffect = 'move'; }, []);

  const filteredCategories = nodeCategories
    .map(cat => ({ ...cat, items: cat.items.filter(i => i.name.toLowerCase().includes(nodeSearch.toLowerCase())) }))
    .filter(cat => cat.items.length > 0);

  const updateNodeData = (patch: Partial<FlowNodeData>) => {
    if (!selectedNode) return;
    setNodes(nds => nds.map(n => n.id === selectedNode.id ? { ...n, data: { ...n.data, ...patch } } : n));
  };

  const deleteSelectedNode = () => {
    if (!selectedNode) return;
    setNodes(nds => nds.filter(n => n.id !== selectedNode.id));
    setEdges(eds => eds.filter(e => e.source !== selectedNode.id && e.target !== selectedNode.id));
    setSelectedNode(null);
  };

  const nd = selectedNode?.data as FlowNodeData | undefined;

  return (
    <div className="page-content full-width">
      <BuilderHeader
        autoName={autoName}
        setAutoName={setAutoName}
        onSaveDraft={() => { setSaveAs('draft'); setShowSaveModal(true); }}
        onSaveActivate={() => { setSaveAs('save'); setShowSaveModal(true); }}
        onPublish={() => { setSaveAs('publish'); setShowSaveModal(true); }}
      />

      <div className="builder-layout">
        <NodeLibrary
          nodeSearch={nodeSearch}
          setNodeSearch={setNodeSearch}
          filteredCategories={filteredCategories}
          onDragStart={onDragStart}
        />

        <div className="builder-canvas">
          <div className="builder-toolbar">
            <button className="builder-toolbar-btn ghost" onClick={handleUndo}>Undo</button>
            <button className="builder-toolbar-btn ghost" onClick={handleRedo}>Redo</button>
            <button className="builder-toolbar-btn ghost" onClick={handleAutoLayout}>Auto-layout</button>
            <button className="builder-toolbar-btn ghost" onClick={() => {
              setNodes(initialNodes); setEdges(initialEdges); setSelectedNode(null);
              historyRef.current = [{ nodes: initialNodes, edges: initialEdges }]; historyIndexRef.current = 0;
            }}>Reset</button>
            <div className="toolbar-divider" />
            <button className={`builder-toolbar-btn primary${testRunning ? ' running' : ''}`} onClick={handleTestRun} disabled={testRunning}>
              {testRunning ? 'Running\u2026' : 'Test Run'}
            </button>
          </div>
          <ReactFlow
            nodes={nodes} edges={edges}
            onNodesChange={wrappedOnNodesChange} onEdgesChange={wrappedOnEdgesChange}
            onConnect={onConnect} onNodeClick={onNodeClick} onPaneClick={onPaneClick}
            onDrop={onDrop} onDragOver={onDragOver} nodeTypes={nodeTypes}
            fitView fitViewOptions={{ padding: 0.3 }} defaultEdgeOptions={{ type: 'smoothstep' }}
          >
            <Background color="rgba(26,25,22,.06)" gap={20} />
            <Controls />
            <MiniMap
              nodeColor={() => '#2e8b6e'}
              maskColor="rgba(248,247,244,.8)"
              style={{ borderRadius: 12, border: '1px solid var(--border)' }}
            />
          </ReactFlow>
        </div>

        <ConfigPanel
          selectedNodeData={nd}
          onUpdateNodeData={updateNodeData}
          onDeleteNode={deleteSelectedNode}
          onSaveChanges={() => pushHistory()}
        />
      </div>

      {showSaveModal && (
        <SaveModal
          saveAs={saveAs}
          autoName={autoName}
          setAutoName={setAutoName}
          autoDesc={autoDesc}
          setAutoDesc={setAutoDesc}
          onClose={() => setShowSaveModal(false)}
        />
      )}
    </div>
  );
}
