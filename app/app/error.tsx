'use client';

import { useEffect } from 'react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="page-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center', maxWidth: 420 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, marginBottom: 8, color: 'var(--ink)' }}>
          Something went wrong
        </h2>
        <p style={{ fontSize: 14, color: 'var(--ink-f)', marginBottom: 24, lineHeight: 1.6 }}>
          This section encountered an error. You can try again or navigate to another page.
          {error.digest && (
            <span style={{ display: 'block', fontSize: 12, marginTop: 8 }}>
              Ref: {error.digest}
            </span>
          )}
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button onClick={reset} className="btn btn-teal">Try Again</button>
          <a href="/app/dashboard" className="btn btn-ghost">Back to Dashboard</a>
        </div>
      </div>
    </div>
  );
}
