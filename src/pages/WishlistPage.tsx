import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCartContext } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';

export const WishlistPage: React.FC = () => {
  const { wishlistItems, wishlistCount, removeFromWishlist, moveToCart, clearWishlist } = useWishlist();
  const { addToCart } = useCartContext();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 animate-fadeIn" data-testid="wishlist-page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-600 mb-1">
            <Heart className="w-4 h-4 fill-cyan-600" aria-hidden="true" />
            <span>Saved for Later</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-meridian-950">
            My Wishlist
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {wishlistCount === 0
              ? 'No products currently saved.'
              : `${wishlistCount} ${wishlistCount === 1 ? 'essential item' : 'essential items'} saved for your convenience.`}
          </p>
        </div>

        {wishlistCount > 0 && (
          <button
            type="button"
            onClick={clearWishlist}
            aria-label="Clear all items from wishlist"
            className="self-start sm:self-auto text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors py-1 px-3 rounded-lg border border-slate-200 hover:border-red-200"
          >
            Clear All Saved
          </button>
        )}
      </div>

      {/* Empty State */}
      {wishlistCount === 0 ? (
        <div className="rounded-3xl bg-white border border-slate-200/90 p-12 sm:p-20 text-center space-y-6 shadow-warm" data-testid="empty-wishlist-state">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
            <Heart className="w-8 h-8 text-slate-400" aria-hidden="true" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="font-display text-2xl font-bold text-meridian-950">
              Your Wishlist is Empty
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed font-normal">
              You haven&apos;t saved any items to your wishlist yet. Explore our verified marketplace catalogue and click the heart icon to save products.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-meridian-900 hover:bg-meridian-950 text-white text-xs uppercase tracking-wider font-bold transition-all shadow-warm-sm active:scale-95"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" aria-hidden="true" />
            </Link>
          </div>
        </div>
      ) : (
        /* Saved Items Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-testid="wishlist-items-grid">
          {wishlistItems.map((product) => (
            <article
              key={product.id}
              data-testid={`wishlist-item-${product.id}`}
              className="rounded-2xl bg-white border border-slate-200/90 p-6 shadow-warm flex flex-col justify-between hover:border-cyan-500/40 transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {product.category}
                    </span>
                    <h3 className="font-display text-xl font-bold text-meridian-950 mt-2">
                      {product.name}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromWishlist(product.id)}
                    aria-label={`Remove ${product.name} from wishlist`}
                    data-testid={`remove-wishlist-${product.id}`}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">
                  {product.description}
                </p>

                <div className="flex items-center gap-2 text-[11px] text-emerald-700 font-medium mb-6">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                  <span>Synthetic Item • Ready for Demo</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                    Fixed Price
                  </span>
                  <span className="text-2xl font-extrabold text-meridian-950 tabular-nums">
                    {formatCurrency(product.price)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => moveToCart(product, addToCart)}
                    aria-label={`Move ${product.name} to shopping bag`}
                    data-testid={`move-to-cart-${product.id}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-meridian-900 hover:bg-meridian-950 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-warm-sm active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Navigation Return */}
      <div className="pt-6">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-meridian-950 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Continue Shopping</span>
        </Link>
      </div>
    </div>
  );
};
