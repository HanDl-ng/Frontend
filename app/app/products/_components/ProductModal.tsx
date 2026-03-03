import type { Product } from './products-data';
import { XIcon } from '@/components/icons';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const isNew = !product;

  return (
    <div className="ch-modal-overlay" onClick={onClose}>
      <div className="ch-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ch-modal-header">
          <div className="ch-modal-header-left">
            <div>
              <div className="ch-modal-title">{isNew ? 'Add Product' : 'Edit Product'}</div>
              <div className="ch-modal-cat">{isNew ? 'Create a new product' : product.id}</div>
            </div>
          </div>
          <button className="ch-modal-close" onClick={onClose}>
            <XIcon />
          </button>
        </div>

        <div className="ch-modal-body">
          <div className="ch-modal-section">
            <div className="ch-modal-section-title">Details</div>
            <label className="ch-modal-field">
              <span className="ch-modal-label">Product Name</span>
              <input className="ch-modal-input" defaultValue={product?.name ?? ''} placeholder="e.g., Ankara Print Dress" />
            </label>
            <label className="ch-modal-field">
              <span className="ch-modal-label">Description</span>
              <textarea
                className="ch-modal-input"
                defaultValue={product?.description ?? ''}
                placeholder="Brief product description..."
                rows={3}
                style={{ resize: 'vertical', minHeight: 72 }}
              />
            </label>
          </div>

          <div className="ch-modal-section">
            <div className="ch-modal-section-title">Pricing & Inventory</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <label className="ch-modal-field">
                <span className="ch-modal-label">Price (₦)</span>
                <input className="ch-modal-input" type="number" defaultValue={product?.priceNum ?? ''} placeholder="0" />
              </label>
              <label className="ch-modal-field">
                <span className="ch-modal-label">Stock Quantity</span>
                <input className="ch-modal-input" type="number" defaultValue={product?.stock ?? ''} placeholder="0" />
              </label>
            </div>
            <label className="ch-modal-field">
              <span className="ch-modal-label">Category</span>
              <select className="ch-modal-input" defaultValue={product?.category ?? ''}>
                <option value="">Select category</option>
                <option value="Clothing">Clothing</option>
                <option value="Accessories">Accessories</option>
                <option value="Footwear">Footwear</option>
                <option value="Bags">Bags</option>
                <option value="Beauty">Beauty</option>
              </select>
            </label>
          </div>
        </div>

        <div className="ch-modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-teal">{isNew ? 'Add Product' : 'Save Changes'}</button>
        </div>
      </div>
    </div>
  );
}
