import React from 'react';
import { ShoppingBag, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  itemCount: number;
  onOpenCart?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ itemCount, onOpenCart }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-midnight-900/95 backdrop-blur-md border-b border-midnight-600/60 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Section */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <ShoppingBag className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white">Cart<span className="text-indigo-400">Flow</span></span>
              <span className="text-xs uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                Checkout
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Mini Checkout & Browser Test Suite</p>
          </div>
        </div>

        {/* Status / Cart Counter Trigger */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 bg-midnight-800/80 px-3 py-1.5 rounded-full border border-midnight-600/50">
            <ShieldCheck className="w-4 h-4 text-mint-400" aria-hidden="true" />
            <span>Secure Synthetic Checkout</span>
          </div>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`View cart with ${itemCount} items`}
            data-testid="header-cart-button"
            className="relative flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-midnight-800 hover:bg-midnight-700 text-slate-200 border border-midnight-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <ShoppingBag className="w-4 h-4 text-indigo-400" aria-hidden="true" />
            <span className="text-sm font-medium hidden xs:inline">Cart</span>
            <span
              data-testid="cart-badge"
              className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold rounded-full bg-indigo-600 text-white"
            >
              {itemCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
