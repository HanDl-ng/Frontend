interface SaveModalProps {
  saveAs: 'draft' | 'save' | 'publish';
  autoName: string;
  setAutoName: (s: string) => void;
  autoDesc: string;
  setAutoDesc: (s: string) => void;
  onClose: () => void;
}

export default function SaveModal({ saveAs, autoName, setAutoName, autoDesc, setAutoDesc, onClose }: SaveModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: 440 }}>
        <div className="modal-header">
          <h3 className="modal-title">
            {saveAs === 'draft' && 'Save as Draft'}
            {saveAs === 'save' && 'Save & Activate'}
            {saveAs === 'publish' && 'Publish to Marketplace'}
          </h3>
        </div>
        <div className="modal-body">
          <div className="d-form-group">
            <label className="d-form-label">Automation Name</label>
            <input className="d-form-input" placeholder="e.g. Order Confirmation Flow" value={autoName} onChange={e => setAutoName(e.target.value)} />
          </div>
          <div className="d-form-group">
            <label className="d-form-label">Description</label>
            <textarea className="d-form-input d-form-textarea" rows={3} placeholder="What does this automation do?" value={autoDesc} onChange={e => setAutoDesc(e.target.value)} />
          </div>
          {saveAs === 'save' && (
            <div className="cfg-publish-warning">
              This will activate the automation immediately. Messages matching the trigger will start flowing through it.
            </div>
          )}
          {saveAs === 'publish' && (
            <div className="cfg-marketplace-info">
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Publish to Workflows Marketplace</div>
              <div>Your automation will be listed in the HanDl marketplace where other users can discover and use it in their own workspace. You can unpublish at any time.</div>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-teal" onClick={onClose}>
            {saveAs === 'draft' && 'Save Draft'}
            {saveAs === 'save' && 'Activate'}
            {saveAs === 'publish' && 'Publish'}
          </button>
        </div>
      </div>
    </div>
  );
}
