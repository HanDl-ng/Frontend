interface BuilderHeaderProps {
  autoName: string;
  setAutoName: (n: string) => void;
  onSaveDraft: () => void;
  onSaveActivate: () => void;
  onPublish: () => void;
}

export default function BuilderHeader({ autoName, setAutoName, onSaveDraft, onSaveActivate, onPublish }: BuilderHeaderProps) {
  return (
    <div className="builder-header">
      <div className="builder-header-left">
        <a href="/automations" className="builder-back-link">&larr;</a>
        <input
          className="builder-header-name"
          value={autoName}
          onChange={e => setAutoName(e.target.value)}
          placeholder="Untitled Automation"
        />
        <span className="chip chip-draft"><span className="chip-dot" />Draft</span>
      </div>
      <div className="builder-header-actions">
        <button className="btn btn-ghost btn-sm" onClick={onSaveDraft}>Save Draft</button>
        <button className="btn btn-teal btn-sm" onClick={onSaveActivate}>Save &amp; Activate</button>
        <button className="btn btn-outline-teal btn-sm" onClick={onPublish}>Publish to Marketplace</button>
      </div>
    </div>
  );
}
