export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  priceNum: number;
  stock: number;
  category: string;
  status: 'active' | 'draft' | 'out-of-stock';
  image?: string;
}

export const products: Product[] = [
  {
    id: 'PRD-001',
    name: 'Ankara Print Dress',
    description: 'Traditional ankara fabric dress with modern cut. Available in multiple sizes.',
    price: '₦8,500',
    priceNum: 8500,
    stock: 24,
    category: 'Clothing',
    status: 'active',
  },
  {
    id: 'PRD-002',
    name: 'Beaded Necklace',
    description: 'Handcrafted beaded necklace with traditional Yoruba patterns.',
    price: '₦3,500',
    priceNum: 3500,
    stock: 45,
    category: 'Accessories',
    status: 'active',
  },
  {
    id: 'PRD-003',
    name: 'Silk Headwrap',
    description: 'Premium silk headwrap in various colors. One size fits all.',
    price: '₦4,200',
    priceNum: 4200,
    stock: 3,
    category: 'Accessories',
    status: 'active',
  },
  {
    id: 'PRD-004',
    name: 'Leather Sandals',
    description: 'Genuine leather sandals handmade by local artisans. Sizes 36-45.',
    price: '₦15,000',
    priceNum: 15000,
    stock: 12,
    category: 'Footwear',
    status: 'active',
  },
  {
    id: 'PRD-005',
    name: 'Canvas Tote Bag',
    description: 'Durable canvas tote bag with African print details. Water-resistant.',
    price: '₦6,800',
    priceNum: 6800,
    stock: 0,
    category: 'Bags',
    status: 'out-of-stock',
  },
  {
    id: 'PRD-006',
    name: 'Embroidered Agbada',
    description: 'Luxury embroidered agbada for special occasions. Made to order.',
    price: '₦45,000',
    priceNum: 45000,
    stock: 8,
    category: 'Clothing',
    status: 'draft',
  },
  {
    id: 'PRD-007',
    name: 'Shea Butter Soap Set',
    description: 'Natural shea butter soap set (3 bars). Handmade with essential oils.',
    price: '₦2,800',
    priceNum: 2800,
    stock: 56,
    category: 'Beauty',
    status: 'active',
  },
  {
    id: 'PRD-008',
    name: 'Adire Print Shirt',
    description: 'Contemporary shirt with hand-dyed adire fabric. Unisex design.',
    price: '₦12,000',
    priceNum: 12000,
    stock: 18,
    category: 'Clothing',
    status: 'active',
  },
];

export const categoryFilters = ['All', 'Clothing', 'Accessories', 'Footwear', 'Bags', 'Beauty'];
export const statusFilters = ['All', 'Active', 'Draft', 'Out of Stock'];
