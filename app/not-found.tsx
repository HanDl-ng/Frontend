import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="error-page">
      <div className="error-card">
        <div className="error-icon-wrap">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
        </div>
        <span className="error-code">404</span>
        <h1 className="error-title">Page not found</h1>
        <p className="error-desc">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="error-actions">
          <Link href="/" className="btn btn-teal btn-lg">Go Home</Link>
          <Link href="/app/dashboard" className="btn btn-ghost btn-lg">Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
