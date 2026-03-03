'use client';

import { useState } from 'react';
import { integrations, categoryFilters, type Integration } from './_components/integrations-data';
import IntegrationCard from './_components/IntegrationCard';
import ConfigureModal from './_components/ConfigureModal';

export default function IntegrationsPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [configuring, setConfiguring] = useState<Integration | null>(null);

  const filtered = integrations.filter((ch) => {
    if (filter !== 'All' && ch.category !== filter) return false;
    if (search && !ch.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const connected = integrations.filter((c) => c.status === 'connected').length;

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Integrations</h1>
            <p className="page-desc">{connected} of {integrations.length} channels connected. AI agent is active.</p>
          </div>
        </div>
      </div>

      {/* AI Agent Info Banner */}
      <div className="integration-ai-banner">
        <div className="integration-ai-banner-text">
          <strong>AI Agent Active</strong> — Your AI agent automatically handles conversations on all connected channels.
          It can create orders, check product availability, initiate payments, and escalate to human when needed.
        </div>
      </div>

      <div className="filter-bar">
        <input
          className="filter-input"
          placeholder="Search integrations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="filter-pills">
          {categoryFilters.map((f) => (
            <button
              key={f}
              className={`inbox-filter${filter === f ? ' active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="channels-list">
        {filtered.map((ch) => (
          <IntegrationCard key={ch.id} integration={ch} onConfigure={setConfiguring} />
        ))}
      </div>

      {configuring && (
        <ConfigureModal integration={configuring} onClose={() => setConfiguring(null)} />
      )}
    </div>
  );
}
