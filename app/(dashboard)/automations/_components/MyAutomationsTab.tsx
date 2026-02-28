'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BoltIcon } from '@/components/icons';
import { myAutomations, statusOptions } from './automations-data';

export default function MyAutomationsTab() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = myAutomations.filter(a => {
    if (statusFilter !== 'All' && a.status !== statusFilter.toLowerCase()) return false;
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <div className="filter-bar" style={{ marginTop: 16 }}>
        <input className="filter-input" placeholder="Search automations…" value={search} onChange={e => setSearch(e.target.value)} />
        {statusOptions.map(s => (
          <button key={s} className={`filter-btn${statusFilter === s ? ' active' : ''}`} onClick={() => setStatusFilter(s)}>{s}</button>
        ))}
        <Link href="/automations/builder" className="btn btn-teal auto-new-btn" style={{ textDecoration: 'none' }}>
          + New Automation
        </Link>
      </div>

      <div className="auto-list-grid">
        {filtered.map(a => (
          <Link key={a.id} href={`/automations/builder?id=${a.id}`} style={{ textDecoration: 'none' }}>
            <div className="auto-list-card">
              <div className="auto-list-card-header">
                <span className={`chip chip-${a.status}`}>
                  <span className="chip-dot" />
                  {a.status}
                </span>
              </div>
              <div className="auto-list-card-name">{a.name}</div>
              <div className="auto-list-card-desc">{a.desc}</div>
              <div className="auto-list-card-trigger"><BoltIcon /> {a.trigger}</div>
              <div className="auto-list-card-footer">
                <div className="auto-list-card-stats">
                  <span className="auto-list-card-stat"><strong>{a.runs}</strong> runs</span>
                  <span className="auto-list-card-stat"><strong>{a.success}</strong> success</span>
                </div>
                <span style={{ fontSize: 10, color: 'var(--ink-f)' }}>{a.lastRun}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
