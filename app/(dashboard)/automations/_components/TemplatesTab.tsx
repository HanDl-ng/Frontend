'use client';

import { useState } from 'react';
import { type Template, prebuiltTemplates, tplCategories } from './templates-data';

interface TemplatesTabProps {
  onOpenConfig: (tpl: Template) => void;
}

export default function TemplatesTab({ onOpenConfig }: TemplatesTabProps) {
  const [search, setSearch] = useState('');
  const [tplFilter, setTplFilter] = useState('All');

  const filtered = prebuiltTemplates.filter(t => {
    if (tplFilter !== 'All' && t.category !== tplFilter.toLowerCase()) return false;
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <div className="filter-bar" style={{ marginTop: 16 }}>
        <input className="filter-input" placeholder="Search templates…" value={search} onChange={e => setSearch(e.target.value)} />
        {tplCategories.map(c => (
          <button key={c} className={`filter-btn${tplFilter === c ? ' active' : ''}`} onClick={() => setTplFilter(c)}>{c}</button>
        ))}
      </div>

      <div className="tpl-grid-light">
        {filtered.map(tpl => (
          <div key={tpl.id} className="tpl-card-light" onClick={() => onOpenConfig(tpl)}>
            <div className="tpl-card-light-body">
              <div className="tpl-card-light-name">{tpl.name}</div>
              <div className="tpl-card-light-desc">{tpl.desc}</div>
              <div className="tpl-card-light-meta">
                <div className="tpl-card-light-steps">
                  {tpl.steps.map((s, i) => (
                    <span key={i}>
                      {i > 0 && <span className="tpl-step-arrow">&rarr;</span>}
                      <span className="tpl-step-name">{s}</span>
                    </span>
                  ))}
                </div>
                <div className="tpl-card-light-users">
                  {tpl.users.toLocaleString()} users
                </div>
              </div>
            </div>
            <div className="tpl-card-light-action">
              <button className="btn btn-teal btn-sm">Use Template</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
