import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartContext } from '../../context/CartContext';
import { CartItem } from './CartItem';
import { EmptyCart } from './EmptyCart';
import { formatCurrency } from '../../utils/currency';

export const CartDrawer: React.FC = () => {
  const location = useLocation();
  const {
    items,
    total,
    itemCount,
    updateQuantity,
    removeFromCart,
    isDrawerOpen,
    setIsDrawerOpen,
  } = useCartContext();

  // Close drawer automatically when route changes
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location.pathname, setIsDrawerOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDrawerOpen(false);
      }
    };
    if (isDrawerOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, setIsDrawerOpen]);

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn" role="dialog" aria-modal="true" aria-label="Quick Shopping Bag">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-ivory border-l border-warmgrey shadow-warm-xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-5 sm:p-6 border-b border-warmgrey flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-sand flex items-center justify-center text-forest-800">
                <ShoppingBag className="w-4 h-4 text-forest-800" aria-hidden="true" />
              </div>
              <h2 className="font-serif text-xl font-bold text-charcoal">
                Shopping Bag
              </h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sand text-forest-900 border border-warmgrey">
                {itemCount}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              aria-label="Close Shopping Bag Drawer"
              className="p-2 rounded-full text-olive hover:text-charcoal hover:bg-sand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <EmptyCart onContinueShopping={() => setIsDrawerOpen(false)} />
            ) : (
              <div className="space-y-3" data-testid="cart-items-list">
                {items.map((item) => (
                  <CartItem
                    key={item.product.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="p-5 sm:p-6 bg-white border-t border-warmgrey space-y-4">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="font-serif text-lg font-bold text-charcoal block">
                    Order Total
                  </span>
                  <span className="text-[11px] text-olive">Pure integer sum • Zero fees</span>
                </div>
                <span
                  data-testid="order-total"
                  className="text-2xl font-extrabold text-forest-900 tabular-nums font-sans"
                  aria-live="polite"
                >
                  {formatCurrency(total)}
                </span>
              </div>

              <div className="space-y-2 pt-1">
                <Link
                  to="/checkout"
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-forest-800 hover:bg-forest-900 text-ivory text-xs uppercase tracking-widest font-semibold transition-all shadow-warm hover:shadow-warm-lg active:scale-95"
                >
                  <span>Checkout Now</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>

                <Link
                  to="/cart"
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full flex items-center justify-center py-2.5 px-4 text-xs font-semibold text-olive hover:text-charcoal transition-colors uppercase tracking-wider"
                >
                  View Full Shopping Bag
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
