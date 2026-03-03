'use client';

import { useState } from 'react';
import { products, categoryFilters, type Product } from './_components/products-data';
import ProductCard from './_components/ProductCard';
import ProductModal from './_components/ProductModal';
import './_components/styles.css';

export default function ProductsPage() {
  const [filter, setFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Product | null>(null);
  const [showNew, setShowNew] = useState(false);

  const filtered = products.filter((p) => {
    if (filter !== 'All' && p.category !== filter) return false;
    if (statusFilter === 'Active' && p.status !== 'active') return false;
    if (statusFilter === 'Draft' && p.status !== 'draft') return false;
    if (statusFilter === 'Out of Stock' && p.status !== 'out-of-stock') return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const activeCount = products.filter((p) => p.status === 'active').length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Products</h1>
            <p className="page-desc">{activeCount} active products · {totalStock} total units in stock</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-teal" onClick={() => setShowNew(true)}>
              + Add Product
            </button>
          </div>
        </div>
      </div>

      <div className="filter-bar">
        <input
          className="filter-input"
          placeholder="Search products..."
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

      <div className="product-grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onEdit={setEditing} />
        ))}
        {filtered.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 60, color: 'var(--ink-f)' }}>
            No products found
          </div>
        )}
      </div>

      {editing && (
        <ProductModal product={editing} onClose={() => setEditing(null)} />
      )}
      {showNew && (
        <ProductModal product={null} onClose={() => setShowNew(false)} />
      )}
    </div>
  );
}
