import React from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { Sparkles } from 'lucide-react';

interface ProductGridProps {
  products: readonly Product[];
  getItemQuantity: (productId: string) => number;
  onAddToCart: (product: Product) => void;
  title?: string;
  subtitle?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  getItemQuantity,
  onAddToCart,
  title = "Curated Synthetic Collection",
  subtitle = "Two verified essentials crafted for daily performance, durability, and elegance."
}) => {
  return (
    <section aria-labelledby="catalog-heading" className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-cyan-600 text-xs uppercase tracking-wider font-extrabold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" aria-hidden="true" />
            <span>Marketplace Catalog</span>
          </div>
          <h2 id="catalog-heading" className="font-display text-3xl sm:text-4xl font-extrabold text-meridian-950">
            {title}
          </h2>
          <p className="text-sm text-slate-500 mt-1.5 max-w-xl font-normal">
            {subtitle}
          </p>
        </div>
        <span className="self-start sm:self-auto text-xs font-bold px-3.5 py-1 rounded-full bg-slate-100 text-meridian-950 border border-slate-200">
          {products.length} Verified Products
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-testid="product-catalog-grid">
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
