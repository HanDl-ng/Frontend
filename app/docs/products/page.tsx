'use client';

import { CodeBlock, Endpoint, ParamTable, Callout, NavFooter } from '../_components/shared';

export default function ProductsDocsPage() {
  return (
    <>
      <div className="docs-breadcrumb">
        <a href="/docs">Docs</a>
        <span className="sep">/</span>
        <span>Products</span>
      </div>

      <h1 className="docs-title">Products</h1>
      <p className="docs-subtitle">
        Manage your product catalog. Products are what the AI agent shows to customers and what appears on your storefront.
      </p>

      <h2 className="docs-h2">Create a Product</h2>
      <Endpoint method="POST" path="/v1/products" />

      <ParamTable params={[
        { name: 'name', type: 'string', required: true, desc: 'Product name. Max 120 characters.' },
        { name: 'price', type: 'integer', required: true, desc: 'Price in the smallest currency unit (e.g., kobo for NGN). 350000 = ₦3,500.' },
        { name: 'currency', type: 'string', desc: "ISO 4217 code. Defaults to your account currency (e.g., 'NGN')." },
        { name: 'description', type: 'string', desc: 'Product description. The AI uses this to answer questions about the product.' },
        { name: 'category', type: 'string', desc: 'Category name for grouping.' },
        { name: 'image_url', type: 'string', desc: 'URL to the product image.' },
        { name: 'in_stock', type: 'boolean', desc: 'Whether the product is available. Default true.' },
        { name: 'metadata', type: 'object', desc: 'Arbitrary key-value pairs.' },
      ]} />

      <CodeBlock
        lang="curl"
        code={`curl -X POST https://api.handl-ng.com/v1/products \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Jollof Rice (Large)",
    "price": 350000,
    "description": "Party-style jollof with grilled chicken and plantain",
    "category": "Mains",
    "in_stock": true
  }'`}
      />

      <CodeBlock
        lang="javascript"
        code={`const product = await fetch('https://api.handl-ng.com/v1/products', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk_live_...',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Jollof Rice (Large)',
    price: 350000,
    description: 'Party-style jollof with grilled chicken and plantain',
    category: 'Mains',
    in_stock: true,
  }),
}).then(r => r.json());`}
      />

      <h3 className="docs-h3">Response</h3>
      <CodeBlock
        lang="json"
        code={`{
  "id": "prod_jollof",
  "object": "product",
  "name": "Jollof Rice (Large)",
  "price": 350000,
  "formatted_price": "₦3,500",
  "currency": "NGN",
  "description": "Party-style jollof with grilled chicken and plantain",
  "category": "Mains",
  "image_url": null,
  "in_stock": true,
  "created_at": "2025-06-15T14:30:00Z",
  "updated_at": "2025-06-15T14:30:00Z"
}`}
      />

      <h2 className="docs-h2">List Products</h2>
      <Endpoint method="GET" path="/v1/products" />

      <ParamTable params={[
        { name: 'category', type: 'string', desc: 'Filter by category name.' },
        { name: 'in_stock', type: 'boolean', desc: 'Filter by availability.' },
        { name: 'search', type: 'string', desc: 'Full-text search across name and description.' },
        { name: 'limit', type: 'integer', desc: 'Number of results (1–100). Default 25.' },
        { name: 'starting_after', type: 'string', desc: 'Cursor for pagination.' },
      ]} />

      <CodeBlock
        lang="curl"
        code={`curl "https://api.handl-ng.com/v1/products?category=Mains&in_stock=true" \\
  -H "Authorization: Bearer sk_live_..."`}
      />

      <h2 className="docs-h2">Update a Product</h2>
      <Endpoint method="PATCH" path="/v1/products/:id" />

      <p className="docs-p">
        Update any product field. Only the fields you include in the request body will be changed.
      </p>

      <CodeBlock
        lang="curl"
        code={`curl -X PATCH https://api.handl-ng.com/v1/products/prod_jollof \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{ "price": 400000, "in_stock": false }'`}
      />

      <h2 className="docs-h2">Delete a Product</h2>
      <Endpoint method="DELETE" path="/v1/products/:id" />

      <Callout type="warn">
        Deleting a product removes it from your catalog and storefront. Existing orders that reference this product are not affected — the product snapshot is preserved on the order.
      </Callout>

      <CodeBlock
        lang="curl"
        code={`curl -X DELETE https://api.handl-ng.com/v1/products/prod_jollof \\
  -H "Authorization: Bearer sk_live_..."`}
      />

      <h3 className="docs-h3">Response</h3>
      <CodeBlock
        lang="json"
        code={`{
  "id": "prod_jollof",
  "object": "product",
  "deleted": true
}`}
      />

      <Callout type="tip">
        The AI agent automatically learns about new and updated products. After creating or modifying a product via the API, the agent can immediately reference it in conversations.
      </Callout>

      <NavFooter
        prev={{ href: '/docs/orders', label: 'Orders' }}
        next={{ href: '/docs/payments', label: 'Payments' }}
      />
    </>
  );
}
