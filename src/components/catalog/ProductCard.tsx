import React, { useState } from 'react';
import { Plus, Check, Star, Heart, ShieldCheck } from 'lucide-react';
import { Product } from '../../types';
import { formatCurrency } from '../../utils/currency';
import { useWishlist } from '../../context/WishlistContext';

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
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  const handleAdd = () => {
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  // Bespoke Meridian Marketplace Vector Illustrations (zero network dependency)
  const renderProductVisual = () => {
    if (product.id === 'prod-aero-headphones') {
      return (
        <svg
          viewBox="0 0 240 240"
          className="w-full h-full object-contain p-6 text-meridian-900 transition-transform duration-500 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="120" cy="120" r="85" fill="#F1F5F9" />
          {/* Headband Arc */}
          <path
            d="M60 135 C60 65 180 65 180 135"
            stroke="#0F1E36"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M75 110 C75 80 165 80 165 110"
            stroke="#00A3C4"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.9"
          />
          {/* Left Cushion */}
          <rect x="42" y="115" width="34" height="65" rx="17" fill="#172B4D" stroke="#0F1E36" strokeWidth="3" />
          <rect x="48" y="125" width="22" height="45" rx="11" fill="#E2E8F0" />
          {/* Right Cushion */}
          <rect x="164" y="115" width="34" height="65" rx="17" fill="#172B4D" stroke="#0F1E36" strokeWidth="3" />
          <rect x="170" y="125" width="22" height="45" rx="11" fill="#E2E8F0" />
          {/* Cyan Pivot Accents */}
          <circle cx="59" cy="116" r="4" fill="#00A3C4" />
          <circle cx="181" cy="116" r="4" fill="#00A3C4" />
        </svg>
      );
    }

    // Urban Everyday Backpack
    return (
      <svg
        viewBox="0 0 240 240"
        className="w-full h-full object-contain p-6 text-meridian-900 transition-transform duration-500 group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="120" cy="120" r="85" fill="#F1F5F9" />
        {/* Top Handle */}
        <path d="M100 62 C100 45 140 45 140 62" stroke="#00A3C4" strokeWidth="6" strokeLinecap="round" />
        {/* Main Canvas Body */}
        <path
          d="M70 85 C70 68 170 68 170 85 L176 190 C176 198 168 205 160 205 L80 205 C72 205 64 198 64 190 Z"
          fill="#0F1E36"
          stroke="#0A1424"
          strokeWidth="3"
        />
        {/* Front Flap Pocket */}
        <rect x="80" y="125" width="80" height="60" rx="10" fill="#172B4D" stroke="#00A3C4" strokeWidth="2" />
        {/* Cyan Stitching Detail */}
        <line x1="88" y1="145" x2="152" y2="145" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 3" />
        {/* Fasteners */}
        <circle cx="92" cy="100" r="3" fill="#00A3C4" />
        <circle cx="148" cy="100" r="3" fill="#00A3C4" />
      </svg>
    );
  };

  return (
    <article
      data-testid={`product-card-${product.id}`}
      className="group relative flex flex-col rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-warm hover:shadow-warm-lg transition-all duration-300 hover:border-cyan-500/40"
    >
      {/* Product Image Frame */}
      <div className="relative w-full h-56 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden mb-5">
        {product.badge && (
          <span className="absolute top-3.5 left-3.5 z-10 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-meridian-900 text-white shadow-warm-sm">
            {product.badge}
          </span>
        )}

        {/* Wishlist Toggle Button */}
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className="absolute top-3.5 right-3.5 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 hover:border-cyan-500 text-slate-500 hover:text-cyan-600 transition-all shadow-warm-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 active:scale-95"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              wishlisted ? 'fill-cyan-600 text-cyan-600' : 'text-slate-400'
            }`}
            aria-hidden="true"
          />
        </button>

        {renderProductVisual()}
      </div>

      {/* Product Meta */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            <div className="flex items-center gap-1.5 text-slate-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
              <span className="font-bold">4.9</span>
              <span className="text-slate-400 text-[11px]">(1,420 reviews)</span>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              {product.category}
            </span>
          </div>

          <h3 className="font-display text-xl font-bold text-meridian-950 group-hover:text-cyan-700 transition-colors leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
            {product.description}
          </p>

          <div className="flex items-center gap-2 mt-3 text-[11px] text-emerald-700 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
            <span>In Stock • Ships in 24 Hours</span>
          </div>
        </div>

        {/* Pricing and Action */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-400 block">
              Marketplace Price
            </span>
            <span
              data-testid={`product-price-${product.id}`}
              className="text-2xl font-extrabold text-meridian-950 tabular-nums font-sans"
            >
              {formatCurrency(product.price)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart for ${formatCurrency(product.price)}`}
            data-testid={`add-to-cart-${product.id}`}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-xs uppercase tracking-wider transition-all shadow-warm-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 active:scale-95 ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-meridian-900 hover:bg-meridian-950 text-white hover:shadow-warm'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" aria-hidden="true" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                <span>Add to Bag</span>
              </>
            )}
            {quantityInCart > 0 && !justAdded && (
              <span
                data-testid={`product-qty-badge-${product.id}`}
                className="ml-1 inline-flex items-center justify-center w-5 h-5 text-[11px] font-bold rounded-full bg-cyan-600 text-white"
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
