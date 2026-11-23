import React from 'react';
import { Plus, Check, Star } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency } from '../utils/currency';

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
  // SVG Graphic tailored to the product for crisp, zero-network rendering
  const renderProductGraphic = () => {
    if (product.id === 'prod-aero-headphones') {
      return (
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full object-contain p-4 text-indigo-400 transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Headband */}
          <path
            d="M50 110 C50 55 150 55 150 110"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M60 90 C60 65 140 65 140 90"
            stroke="#4338ca"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.6"
          />
          {/* Left Ear Cup */}
          <rect x="36" y="95" width="28" height="52" rx="14" fill="#1e293b" stroke="#6366f1" strokeWidth="4" />
          <rect x="42" y="105" width="16" height="32" rx="8" fill="#334155" />
          {/* Right Ear Cup */}
          <rect x="136" y="95" width="28" height="52" rx="14" fill="#1e293b" stroke="#6366f1" strokeWidth="4" />
          <rect x="142" y="105" width="16" height="32" rx="8" fill="#334155" />
          {/* Glowing Accents */}
          <circle cx="50" cy="121" r="4" fill="#10b981" />
          <circle cx="150" cy="121" r="4" fill="#10b981" />
        </svg>
      );
    }

    // Urban Everyday Backpack
    return (
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full object-contain p-4 text-indigo-400 transition-transform duration-300 group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Top Handle */}
        <path d="M85 50 C85 36 115 36 115 50" stroke="#6366f1" strokeWidth="6" strokeLinecap="round" />
        {/* Main Body */}
        <path
          d="M60 70 C60 55 140 55 140 70 L145 160 C145 168 138 174 130 174 L70 174 C62 174 55 168 55 160 Z"
          fill="#1e293b"
          stroke="#475569"
          strokeWidth="4"
        />
        {/* Front Pocket */}
        <rect x="68" y="105" width="64" height="50" rx="8" fill="#111827" stroke="#6366f1" strokeWidth="3" />
        {/* Zipper Lines */}
        <line x1="74" y1="120" x2="126" y2="120" stroke="#64748b" strokeWidth="2" strokeDasharray="3 2" />
        {/* Buckles/Straps */}
        <rect x="76" y="80" width="8" height="18" rx="2" fill="#334155" />
        <rect x="116" y="80" width="8" height="18" rx="2" fill="#334155" />
        {/* Mint Accent Tag */}
        <rect x="122" y="140" width="8" height="12" rx="2" fill="#10b981" />
      </svg>
    );
  };

  return (
    <article
      data-testid={`product-card-${product.id}`}
      className="group relative flex flex-col rounded-2xl bg-midnight-800 border border-midnight-600/70 p-5 shadow-lg shadow-midnight-950/40 hover:border-indigo-500/50 transition-all duration-300"
    >
      {/* Visual Container */}
      <div className="relative w-full h-48 rounded-xl bg-gradient-to-b from-midnight-700/60 to-midnight-850 flex items-center justify-center border border-midnight-600/40 overflow-hidden mb-4">
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            {product.badge}
          </span>
        )}
        <span className="absolute top-3 right-3 text-xs font-medium text-slate-400 bg-midnight-900/80 px-2 py-0.5 rounded-md border border-midnight-600/40">
          {product.category}
        </span>
        {renderProductGraphic()}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-1 text-xs text-amber-400 mb-1">
          <Star className="w-3.5 h-3.5 fill-amber-400" aria-hidden="true" />
          <span className="font-semibold text-slate-200">4.9</span>
          <span className="text-slate-400">(Fixed Spec)</span>
        </div>

        <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
          {product.name}
        </h3>

        <p className="text-sm text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
          {product.description}
        </p>

        {/* Features Checklist */}
        <ul className="mt-3 space-y-1 text-xs text-slate-300">
          {product.features.slice(0, 2).map((feat, idx) => (
            <li key={idx} className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-mint-400 shrink-0" aria-hidden="true" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>

        {/* Footer / CTA */}
        <div className="mt-5 pt-4 border-t border-midnight-600/50 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Fixed Price</span>
            <span
              data-testid={`product-price-${product.id}`}
              className="text-xl font-bold text-white tabular-nums"
            >
              {formatCurrency(product.price)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onAddToCart(product)}
            aria-label={`Add ${product.name} to cart for ${formatCurrency(product.price)}`}
            data-testid={`add-to-cart-${product.id}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold text-sm transition-all shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 active:scale-95"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>Add to Cart</span>
            {quantityInCart > 0 && (
              <span
                data-testid={`product-qty-badge-${product.id}`}
                className="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-white text-indigo-700"
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
