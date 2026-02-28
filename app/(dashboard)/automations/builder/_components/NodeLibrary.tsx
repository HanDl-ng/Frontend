import { type NodeCategoryItem } from './types';

interface NodeLibraryProps {
  nodeSearch: string;
  setNodeSearch: (s: string) => void;
  filteredCategories: { label: string; items: NodeCategoryItem[] }[];
  onDragStart: (event: React.DragEvent, item: NodeCategoryItem) => void;
}

export default function NodeLibrary({ nodeSearch, setNodeSearch, filteredCategories, onDragStart }: NodeLibraryProps) {
  return (
    <div className="builder-nodes-panel">
      <div className="builder-nodes-header">
        <div className="builder-nodes-title">Nodes</div>
        <input className="builder-nodes-search" placeholder="Search…" value={nodeSearch} onChange={e => setNodeSearch(e.target.value)} />
      </div>
      {filteredCategories.map(cat => (
        <div key={cat.label} className="builder-category">
          <div className="builder-category-label">{cat.label}</div>
          {cat.items.map(item => (
            <div key={item.key} className="builder-node-item" draggable onDragStart={e => onDragStart(e, item)}>
              <div className="builder-node-icon">{item.icon}</div>
              <div className="builder-node-info">
                <span className="builder-node-name">{item.name}</span>
                <span className="builder-node-desc-text">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
