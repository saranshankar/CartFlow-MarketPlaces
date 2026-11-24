import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Check, Heart, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Product } from '../../types';
import { formatCurrency } from '../../utils/currency';
import { useWishlist } from '../../context/WishlistContext';
import { ProductArtwork } from './ProductArtwork';

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

        <Link
          to={`/product/${product.id}`}
          data-testid={`product-link-${product.id}`}
          className="w-full h-full flex items-center justify-center"
          aria-label={`View product details for ${product.name}`}
        >
          <ProductArtwork
            product={product}
            className="w-full h-full object-contain p-6 text-meridian-900 transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Product Meta */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-100">
              Verified Specification
            </span>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              {product.category}
            </span>
          </div>

          <Link
            to={`/product/${product.id}`}
            className="group/title block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded"
          >
            <h3 className="font-display text-xl font-bold text-meridian-950 group-hover/title:text-cyan-700 transition-colors leading-snug flex items-center justify-between">
              <span>{product.name}</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover/title:opacity-100 transition-opacity text-cyan-600" aria-hidden="true" />
            </h3>
          </Link>

          <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
            {product.description}
          </p>

          <div className="flex items-center gap-2 mt-3 text-[11px] text-emerald-700 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
            <span>Synthetic Catalog Item • Available for Demo</span>
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

