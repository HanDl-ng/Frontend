'use client';

import { useState } from 'react';

const products = [
  { id: '1', name: 'Nike Air Max 90', price: '₦45,000', stock: 24, category: 'Footwear', image: '👟', status: 'active' },
  { id: '2', name: 'Adidas Ultraboost', price: '₦52,000', stock: 18, category: 'Footwear', image: '👟', status: 'active' },
  { id: '3', name: 'Classic Polo Shirt', price: '₦12,500', stock: 56, category: 'Clothing', image: '👔', status: 'active' },
  { id: '4', name: 'Leather Crossbody Bag', price: '₦28,000', stock: 12, category: 'Accessories', image: '👜', status: 'active' },
  { id: '5', name: 'Smart Watch Pro', price: '₦85,000', stock: 8, category: 'Electronics', image: '⌚', status: 'active' },
  { id: '6', name: 'Denim Jacket', price: '₦22,000', stock: 0, category: 'Clothing', image: '🧥', status: 'out-of-stock' },
  { id: '7', name: 'Wireless Earbuds', price: '₦15,000', stock: 42, category: 'Electronics', image: '🎧', status: 'active' },
  { id: '8', name: 'Canvas Sneakers', price: '₦18,500', stock: 30, category: 'Footwear', image: '👟', status: 'active' },
];

const categories = ['All', 'Footwear', 'Clothing', 'Accessories', 'Electronics'];

export default function CatalogPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = products.filter((p) => {
    if (category !== 'All' && p.category !== category) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Catalog</h1>
            <p className="page-desc">Manage your products and inventory.</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-ghost" onClick={() => setView(view === 'grid' ? 'table' : 'grid')}>
              {view === 'grid' ? '☰ List' : '⊞ Grid'}
            </button>
            <button className="btn btn-teal" onClick={() => setShowAddModal(true)}>
              + Add Product
            </button>
          </div>
        </div>
      </div>

      <div className="filter-bar">
        <input
          className="filter-input"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="filter-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {view === 'grid' ? (
        <div className="product-grid">
          {filtered.map((p) => (
            <div key={p.id} className="product-card">
              <div className="product-img">{p.image}</div>
              <div className="product-info">
                <div className="product-name">{p.name}</div>
                <div className="product-price">{p.price}</div>
                <div className="product-stock">
                  {p.stock > 0 ? (
                    <span className="chip chip-live">{p.stock} in stock</span>
                  ) : (
                    <span className="chip chip-error">Out of stock</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="table-wrap">
          <table className="d-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 20 }}>{p.image}</span>
                      <span style={{ fontWeight: 600 }}>{p.name}</span>
                    </div>
                  </td>
                  <td>{p.category}</td>
                  <td>{p.price}</td>
                  <td>{p.stock}</td>
                  <td>
                    <span className={`chip ${p.stock > 0 ? 'chip-live' : 'chip-error'}`}>
                      {p.stock > 0 ? 'Active' : 'Out of stock'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Product Slide-over */}
      <div className={`slide-over-overlay${showAddModal ? ' open' : ''}`}>
        <div className="slide-over">
          <div className="slide-over-header">
            <span className="slide-over-title">Add Product</span>
            <button className="slide-over-close" onClick={() => setShowAddModal(false)}>✕</button>
          </div>
          <div className="slide-over-body">
            <div className="d-form-group">
              <label className="d-form-label">Product Name</label>
              <input className="d-form-input" placeholder="e.g., Nike Air Max 90" />
            </div>
            <div className="d-form-group">
              <label className="d-form-label">Description</label>
              <textarea className="d-form-input d-form-textarea" placeholder="Product description…" rows={3} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="d-form-group">
                <label className="d-form-label">Price (₦)</label>
                <input className="d-form-input" type="number" placeholder="0" />
              </div>
              <div className="d-form-group">
                <label className="d-form-label">Stock</label>
                <input className="d-form-input" type="number" placeholder="0" />
              </div>
            </div>
            <div className="d-form-group">
              <label className="d-form-label">Category</label>
              <select className="d-form-input d-form-select">
                <option>Footwear</option>
                <option>Clothing</option>
                <option>Accessories</option>
                <option>Electronics</option>
              </select>
            </div>
            <div className="d-form-group">
              <label className="d-form-label">Product Image</label>
              <div style={{
                border: '2px dashed var(--border)', borderRadius: 12, padding: 32,
                textAlign: 'center', color: 'var(--ink-f)', fontSize: 13, cursor: 'pointer',
              }}>
                📷 Click or drag to upload image
              </div>
            </div>
          </div>
          <div className="slide-over-footer">
            <button className="btn btn-ghost" onClick={() => setShowAddModal(false)}>Cancel</button>
            <button className="btn btn-teal" onClick={() => setShowAddModal(false)}>Add Product</button>
          </div>
        </div>
      </div>
    </div>
  );
}
