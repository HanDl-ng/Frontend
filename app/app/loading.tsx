export default function DashboardLoading() {
  return (
    <div className="page-content">
      {/* Header skeleton */}
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <div className="skeleton skeleton-title" />
            <div className="skeleton skeleton-text" style={{ width: '60%', marginTop: 8 }} />
          </div>
        </div>
      </div>

      {/* Metrics strip skeleton */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton skeleton-text" style={{ width: '40%' }} />
            <div className="skeleton skeleton-title" style={{ marginTop: 12 }} />
            <div className="skeleton skeleton-text" style={{ width: '60%', marginTop: 8 }} />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="skeleton-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <div className="skeleton skeleton-title" style={{ width: 120 }} />
          <div className="skeleton" style={{ width: 200, height: 36, borderRadius: 8 }} />
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '14px 0', borderTop: '1px solid var(--border)' }}>
            <div className="skeleton" style={{ width: 36, height: 36, borderRadius: 8, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div className="skeleton skeleton-text" style={{ width: `${60 + i * 5}%` }} />
              <div className="skeleton skeleton-text-sm" style={{ width: '40%', marginTop: 6 }} />
            </div>
            <div className="skeleton" style={{ width: 70, height: 24, borderRadius: 12 }} />
          </div>
        ))}
      </div>
    </div>
  );
}
