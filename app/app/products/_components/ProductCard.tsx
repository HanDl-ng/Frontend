import type { Product } from './products-data';
import { PackageIcon, WarningIcon } from '@/components/icons';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
}

export default function ProductCard({ product, onEdit }: ProductCardProps) {
  const statusMap = {
    active: { label: 'Active', className: 'chip-live' },
    draft: { label: 'Draft', className: 'chip-draft' },
    'out-of-stock': { label: 'Out of Stock', className: 'chip-error' },
  };

  const sc = statusMap[product.status];
  const lowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div className="product-card" onClick={() => onEdit(product)}>
      <div className="product-card-img">
        <PackageIcon />
      </div>
      <div className="product-card-body">
        <div className="product-card-top">
          <span className={`chip ${sc.className}`}>
            <span className="chip-dot" />{sc.label}
          </span>
        </div>
        <div className="product-card-name">{product.name}</div>
        <div className="product-card-desc">{product.description}</div>
        <div className="product-card-footer">
          <span className="product-card-price">{product.price}</span>
          <span className={`product-card-stock${lowStock ? ' low' : product.stock === 0 ? ' out' : ''}`}>
            {lowStock && <WarningIcon className="product-stock-icon" />}
            {product.stock} in stock
          </span>
        </div>
      </div>
    </div>
  );
}
