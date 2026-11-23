import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface EmptyCartProps {
  onContinueShopping?: () => void;
}

export const EmptyCart: React.FC<EmptyCartProps> = ({ onContinueShopping }) => {
  return (
    <div
      data-testid="empty-cart-state"
      className="flex flex-col items-center justify-center p-10 sm:p-14 rounded-3xl bg-white border border-warmgrey text-center shadow-warm"
    >
      <div className="w-16 h-16 rounded-full bg-sand flex items-center justify-center text-forest-800 mb-5 shadow-warm-sm border border-warmgrey/60">
        <ShoppingBag className="w-7 h-7 text-forest-800" aria-hidden="true" />
      </div>
      <h3 className="font-serif text-2xl font-bold text-charcoal">
        Your Shopping Bag is Empty
      </h3>
      <p className="text-sm text-olive max-w-sm mt-2 leading-relaxed">
        Discover our thoughtfully chosen everyday pieces designed to bring quiet beauty and utility to your routine.
      </p>

      {onContinueShopping ? (
        <button
          type="button"
          onClick={onContinueShopping}
          data-testid="continue-shopping-button"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest-800 hover:bg-forest-900 text-ivory text-xs uppercase tracking-wider font-semibold transition-all shadow-warm-sm hover:shadow-warm active:scale-95"
        >
          <span>Explore Collection</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      ) : (
        <Link
          to="/shop"
          data-testid="continue-shopping-button"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest-800 hover:bg-forest-900 text-ivory text-xs uppercase tracking-wider font-semibold transition-all shadow-warm-sm hover:shadow-warm active:scale-95"
        >
          <span>Explore Collection</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
};
