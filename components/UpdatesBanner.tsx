'use client';

import './UpdatesBanner.css';

export default function UpdatesBanner() {
  return (
    <div className="updates-banner">
      <div className="updates-banner-content">
        <div className="updates-banner-text">
          <span className="updates-badge">New</span>
          <span className="updates-message">
            Dark mode & keyboard shortcuts now live — Press Cmd+K to explore
          </span>
          <a href="/changelog" className="updates-link">
            See what's new →
          </a>
        </div>
      </div>
    </div>
  );
}
