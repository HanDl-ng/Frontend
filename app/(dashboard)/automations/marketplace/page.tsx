'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SearchIcon } from '@/components/icons';
import StarIcon from './_components/StarIcon';
import { listings, categories, sortOptions } from './_components/listings-data';

export default function MarketplacePage() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('Popular');

  const filtered = listings
    .filter(l => {
      if (category !== 'All' && l.category !== category.toLowerCase()) return false;
      if (search && !l.name.toLowerCase().includes(search.toLowerCase()) && !l.tags.some(t => t.includes(search.toLowerCase()))) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === 'Popular') return b.installs - a.installs;
      if (sort === 'Highest Rated') return b.rating - a.rating;
      if (sort === 'Most Reviews') return b.reviews - a.reviews;
      return 0;
    });

  const featured = filtered.filter(l => l.featured);
  const rest = filtered.filter(l => !l.featured);

  return (
    <div className="page-content">
      <div className="mp-breadcrumb">
        <Link href="/automations">Automations</Link>
        <span>&rsaquo;</span>
        <span className="mp-breadcrumb-current">Marketplace</span>
      </div>

      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Workflow Marketplace</h1>
            <p className="page-desc">Discover workflows built by the community. Clone any workflow to your workspace and customise it.</p>
          </div>
        </div>
      </div>

      <div className="filter-bar">
        <div className="mp-search-wrap">
          <SearchIcon />
          <input className="filter-input" placeholder="Search workflows, tags…" value={search} onChange={e => setSearch(e.target.value)} style={{ minWidth: 240 }} />
        </div>
        {categories.map(c => (
          <button key={c} className={`filter-btn${category === c ? ' active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
        ))}
        <select className="mp-sort" value={sort} onChange={e => setSort(e.target.value)}>
          {sortOptions.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {featured.length > 0 && (
        <>
          <div className="mp-section-label">Featured</div>
          <div className="mp-grid">
            {featured.map(item => (
              <Link key={item.id} href={`/automations/marketplace/${item.id}`} style={{ textDecoration: 'none' }}>
                <div className="mp-card featured">
                  <div className="mp-card-top">
                    <div className="mp-card-meta-right">
                      <span className="mp-card-rating"><StarIcon /> {item.rating}</span>
                      <span className="mp-card-installs">{item.installs.toLocaleString()} users</span>
                    </div>
                  </div>
                  <div className="mp-card-name">{item.name}</div>
                  <div className="mp-card-desc">{item.desc}</div>
                  <div className="mp-card-bottom">
                    <div className="mp-card-author">
                      by <strong>{item.author}</strong>
                      {item.authorVerified && <span className="mp-card-verified" title="Verified">✓</span>}
                    </div>
                    <div className="mp-card-tags">
                      {item.channels.slice(0, 3).map(ch => (
                        <span key={ch} className="mp-card-tag">{ch}</span>
                      ))}
                      {item.channels.length > 3 && <span className="mp-card-tag">+{item.channels.length - 3}</span>}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {rest.length > 0 && (
        <>
          <div className="mp-section-label" style={{ marginTop: 28 }}>All Workflows</div>
          <div className="mp-grid">
            {rest.map(item => (
              <Link key={item.id} href={`/automations/marketplace/${item.id}`} style={{ textDecoration: 'none' }}>
                <div className="mp-card">
                  <div className="mp-card-top">
                    <div className="mp-card-meta-right">
                      <span className="mp-card-rating"><StarIcon /> {item.rating}</span>
                      <span className="mp-card-installs">{item.installs.toLocaleString()} users</span>
                    </div>
                  </div>
                  <div className="mp-card-name">{item.name}</div>
                  <div className="mp-card-desc">{item.desc}</div>
                  <div className="mp-card-bottom">
                    <div className="mp-card-author">
                      by <strong>{item.author}</strong>
                      {item.authorVerified && <span className="mp-card-verified" title="Verified">✓</span>}
                    </div>
                    <div className="mp-card-tags">
                      {item.channels.slice(0, 3).map(ch => (
                        <span key={ch} className="mp-card-tag">{ch}</span>
                      ))}
                      {item.channels.length > 3 && <span className="mp-card-tag">+{item.channels.length - 3}</span>}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {filtered.length === 0 && (
        <div className="mp-empty">
          <SearchIcon />
          <p>No workflows found matching your search.</p>
        </div>
      )}
    </div>
  );
}
