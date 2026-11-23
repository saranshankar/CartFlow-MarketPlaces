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
  subtitle = "Two timeless pieces crafted for daily performance and elegance."
}) => {
  return (
    <section aria-labelledby="catalog-heading" className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-warmgrey gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-terracotta-500 text-xs uppercase tracking-widest font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Essential Rituals</span>
          </div>
          <h2 id="catalog-heading" className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            {title}
          </h2>
          <p className="text-sm text-olive mt-1.5 max-w-xl">
            {subtitle}
          </p>
        </div>
        <span className="self-start sm:self-auto text-xs font-semibold px-3 py-1 rounded-full bg-sand text-forest-900 border border-warmgrey">
          {products.length} Products
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
