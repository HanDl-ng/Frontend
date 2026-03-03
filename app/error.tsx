'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled error:', error);
  }, [error]);

  return (
    <div className="error-page">
      <div className="error-card">
        <div className="error-icon-wrap" style={{ color: '#e05252' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <span className="error-code" style={{ color: '#e05252' }}>Error</span>
        <h1 className="error-title">Something went wrong</h1>
        <p className="error-desc">
          An unexpected error occurred. Our team has been notified.
          {error.digest && (
            <span style={{ display: 'block', fontSize: 12, color: 'var(--ink-f)', marginTop: 8 }}>
              Reference: {error.digest}
            </span>
          )}
        </p>
        <div className="error-actions">
          <button onClick={reset} className="btn btn-teal btn-lg">Try Again</button>
          <a href="/" className="btn btn-ghost btn-lg">Go Home</a>
        </div>
      </div>
    </div>
  );
}
