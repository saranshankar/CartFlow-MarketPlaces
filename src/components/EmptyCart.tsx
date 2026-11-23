import React from 'react';
import { ShoppingCart, ArrowRight } from 'lucide-react';

interface EmptyCartProps {
  onContinueShopping?: () => void;
}

export const EmptyCart: React.FC<EmptyCartProps> = ({ onContinueShopping }) => {
  return (
    <div
      data-testid="empty-cart-state"
      className="flex flex-col items-center justify-center p-8 rounded-2xl bg-midnight-800/60 border border-midnight-600/50 text-center"
    >
      <div className="w-14 h-14 rounded-2xl bg-midnight-700/60 border border-midnight-600/60 flex items-center justify-center text-slate-400 mb-4 shadow-inner">
        <ShoppingCart className="w-7 h-7 text-indigo-400/80" aria-hidden="true" />
      </div>
      <h3 className="text-base font-semibold text-slate-200">Your Cart is Empty</h3>
      <p className="text-xs text-slate-400 max-w-xs mt-1.5 leading-relaxed">
        Select products from the synthetic catalog to calculate totals and initiate checkout.
      </p>
      {onContinueShopping && (
        <button
          type="button"
          onClick={onContinueShopping}
          data-testid="continue-shopping-button"
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors focus-visible:outline-none focus-visible:underline"
        >
          <span>Browse catalog</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};
