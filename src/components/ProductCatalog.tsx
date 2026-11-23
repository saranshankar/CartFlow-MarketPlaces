import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Package } from 'lucide-react';

interface ProductCatalogProps {
  products: readonly Product[];
  getItemQuantity: (productId: string) => number;
  onAddToCart: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  getItemQuantity,
  onAddToCart,
}) => {
  return (
    <section aria-labelledby="catalog-heading" className="w-full">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Package className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h2 id="catalog-heading" className="text-xl font-bold text-slate-100">
              Synthetic Catalog
            </h2>
            <p className="text-xs text-slate-400">Fixed-price test products for deterministic checkout</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-midnight-800 text-slate-300 border border-midnight-600">
          {products.length} Products
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5" data-testid="product-catalog-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantityInCart={getItemQuantity(product.id)}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
};
