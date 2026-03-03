'use client';

import { useState } from 'react';

export function CodeBlock({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="docs-code-wrap">
      <div className="docs-code-header">
        <span className="docs-code-lang">{lang}</span>
        <button className="docs-code-copy" onClick={handleCopy}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre className="docs-code-block"><code>{code}</code></pre>
    </div>
  );
}

export function Endpoint({ method, path }: { method: string; path: string }) {
  return (
    <div className="docs-endpoint">
      <span className={`docs-method ${method.toLowerCase()}`}>{method}</span>
      <span style={{ color: 'var(--ink-m)' }}>{path}</span>
    </div>
  );
}

export function Callout({ type, children }: { type: 'info' | 'warn' | 'danger' | 'tip'; children: React.ReactNode }) {
  const icons = { info: 'ℹ️', warn: '⚠️', danger: '🚨', tip: '💡' };
  return (
    <div className={`docs-callout ${type}`}>
      <span className="docs-callout-icon">{icons[type]}</span>
      <div>{children}</div>
    </div>
  );
}

export function ParamTable({ params }: { params: { name: string; type: string; required?: boolean; desc: string }[] }) {
  return (
    <table className="docs-param-table">
      <thead>
        <tr>
          <th>Parameter</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {params.map((p) => (
          <tr key={p.name}>
            <td>
              <span className="docs-param-name">{p.name}</span>
              <br />
              {p.required ? <span className="docs-param-req">Required</span> : <span className="docs-param-opt">Optional</span>}
            </td>
            <td><span className="docs-param-type">{p.type}</span></td>
            <td><span className="docs-param-desc">{p.desc}</span></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function NavFooter({ prev, next }: { prev?: { href: string; label: string }; next?: { href: string; label: string } }) {
  return (
    <div className="docs-nav-footer">
      {prev ? (
        <a href={prev.href} className="docs-nav-btn">
          <span className="docs-nav-btn-label">← Previous</span>
          <span className="docs-nav-btn-title">{prev.label}</span>
        </a>
      ) : <div />}
      {next ? (
        <a href={next.href} className="docs-nav-btn" style={{ textAlign: 'right', marginLeft: 'auto' }}>
          <span className="docs-nav-btn-label">Next →</span>
          <span className="docs-nav-btn-title">{next.label}</span>
        </a>
      ) : <div />}
    </div>
  );
}
