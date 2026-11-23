import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { ProductGrid } from '../components/catalog/ProductGrid';
import { PRODUCTS } from '../data/products';
import { useCartContext } from '../context/CartContext';

export const ShopPage: React.FC = () => {
  const { getItemQuantity, addToCart, itemCount } = useCartContext();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 animate-fadeIn">
      {/* Editorial Header */}
      <div className="max-w-2xl space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-terracotta-500">
          The Full Catalogue
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal">
          Curated Essentials
        </h1>
        <p className="text-sm sm:text-base text-olive leading-relaxed font-normal">
          Every piece in our synthetic collection is crafted to fixed specifications with deterministic pricing and zero external API dependencies.
        </p>
      </div>

      {/* Main Grid */}
      <ProductGrid
        products={PRODUCTS}
        getItemQuantity={getItemQuantity}
        onAddToCart={addToCart}
        title="Active Rituals"
        subtitle="Select products below to add them to your shopping bag."
      />

      {/* Bottom Sticky-style Bar to proceed to Bag */}
      {itemCount > 0 && (
        <div className="rounded-2xl bg-sand/80 border border-warmgrey p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-warm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-forest-800 text-ivory flex items-center justify-center font-bold text-xs">
              {itemCount}
            </div>
            <div>
              <span className="text-sm font-bold text-charcoal block">
                {itemCount} {itemCount === 1 ? 'item' : 'items'} in your shopping bag
              </span>
              <span className="text-xs text-olive">Ready to review and proceed to checkout</span>
            </div>
          </div>

          <Link
            to="/cart"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-forest-800 hover:bg-forest-900 text-ivory text-xs uppercase tracking-wider font-semibold transition-all shadow-warm active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            <span>Review Bag & Checkout</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  );
};
