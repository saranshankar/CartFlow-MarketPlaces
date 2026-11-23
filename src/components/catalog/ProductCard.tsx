import React, { useState } from 'react';
import { Plus, Check, Star } from 'lucide-react';
import { Product } from '../../types';
import { formatCurrency } from '../../utils/currency';

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantityInCart,
  onAddToCart,
}) => {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  // Bespoke Warm Editorial Vector Illustrations (zero network dependency)
  const renderProductVisual = () => {
    if (product.id === 'prod-aero-headphones') {
      return (
        <svg
          viewBox="0 0 240 240"
          className="w-full h-full object-contain p-6 text-forest-800 transition-transform duration-500 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Subtle Ambient Glow */}
          <circle cx="120" cy="120" r="85" fill="#FAF8F5" />
          {/* Headband Arc */}
          <path
            d="M60 135 C60 65 180 65 180 135"
            stroke="#183D32"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M75 110 C75 80 165 80 165 110"
            stroke="#C87552"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.8"
          />
          {/* Left Cushion */}
          <rect x="42" y="115" width="34" height="65" rx="17" fill="#245343" stroke="#183D32" strokeWidth="3" />
          <rect x="48" y="125" width="22" height="45" rx="11" fill="#EDE7DC" />
          {/* Right Cushion */}
          <rect x="164" y="115" width="34" height="65" rx="17" fill="#245343" stroke="#183D32" strokeWidth="3" />
          <rect x="170" y="125" width="22" height="45" rx="11" fill="#EDE7DC" />
          {/* Brass Pivot Accents */}
          <circle cx="59" cy="116" r="4" fill="#D8C8A8" />
          <circle cx="181" cy="116" r="4" fill="#D8C8A8" />
        </svg>
      );
    }

    // Urban Everyday Backpack
    return (
      <svg
        viewBox="0 0 240 240"
        className="w-full h-full object-contain p-6 text-forest-800 transition-transform duration-500 group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="120" cy="120" r="85" fill="#FAF8F5" />
        {/* Leather Top Handle */}
        <path d="M100 62 C100 45 140 45 140 62" stroke="#C87552" strokeWidth="6" strokeLinecap="round" />
        {/* Main Canvas Body */}
        <path
          d="M70 85 C70 68 170 68 170 85 L176 190 C176 198 168 205 160 205 L80 205 C72 205 64 198 64 190 Z"
          fill="#183D32"
          stroke="#112A22"
          strokeWidth="3"
        />
        {/* Front Flap Pocket */}
        <rect x="80" y="125" width="80" height="60" rx="10" fill="#245343" stroke="#C87552" strokeWidth="2" />
        {/* Saddle Stitching Detail */}
        <line x1="88" y1="145" x2="152" y2="145" stroke="#D8C8A8" strokeWidth="2" strokeDasharray="4 3" />
        {/* Brass Fasteners */}
        <circle cx="92" cy="100" r="3" fill="#D8C8A8" />
        <circle cx="148" cy="100" r="3" fill="#D8C8A8" />
      </svg>
    );
  };

  return (
    <article
      data-testid={`product-card-${product.id}`}
      className="group relative flex flex-col rounded-2xl bg-white border border-warmgrey/90 p-5 sm:p-6 shadow-warm hover:shadow-warm-lg transition-all duration-300 hover:border-forest-700/40"
    >
      {/* Product Image Frame */}
      <div className="relative w-full h-56 rounded-xl bg-sand/60 border border-warmgrey/60 flex items-center justify-center overflow-hidden mb-5">
        {product.badge && (
          <span className="absolute top-3.5 left-3.5 z-10 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-forest-800 text-ivory shadow-warm-sm">
            {product.badge}
          </span>
        )}
        <span className="absolute top-3.5 right-3.5 text-[11px] font-medium tracking-wide text-olive bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-warmgrey/70">
          {product.category}
        </span>
        {renderProductVisual()}
      </div>

      {/* Product Meta */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-terracotta-500 mb-1.5 font-medium">
            <Star className="w-3.5 h-3.5 fill-terracotta-500" aria-hidden="true" />
            <span className="font-semibold text-charcoal">4.9 / 5.0</span>
            <span className="text-olive text-[11px]">(Curated Standard)</span>
          </div>

          <h3 className="font-serif text-xl font-bold text-charcoal group-hover:text-forest-800 transition-colors leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-olive mt-2 leading-relaxed line-clamp-3">
            {product.description}
          </p>
        </div>

        {/* Pricing and Action */}
        <div className="mt-6 pt-5 border-t border-warmgrey/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-olive block">
              Pure Fixed Price
            </span>
            <span
              data-testid={`product-price-${product.id}`}
              className="text-2xl font-bold text-forest-900 tabular-nums font-sans"
            >
              {formatCurrency(product.price)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart for ${formatCurrency(product.price)}`}
            data-testid={`add-to-cart-${product.id}`}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-xs uppercase tracking-wider transition-all shadow-warm-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 active:scale-95 ${
              justAdded
                ? 'bg-naturalgreen text-white'
                : 'bg-forest-800 hover:bg-forest-900 text-ivory hover:shadow-warm'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" aria-hidden="true" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span>Add to Bag</span>
              </>
            )}
            {quantityInCart > 0 && !justAdded && (
              <span
                data-testid={`product-qty-badge-${product.id}`}
                className="ml-1 inline-flex items-center justify-center w-5 h-5 text-[11px] font-bold rounded-full bg-sand text-forest-900"
              >
                {quantityInCart}
              </span>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
