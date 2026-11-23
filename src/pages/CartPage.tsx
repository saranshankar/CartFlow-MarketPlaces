import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { CartItem } from '../components/cart/CartItem';
import { EmptyCart } from '../components/cart/EmptyCart';
import { useCartContext } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';

export const CartPage: React.FC = () => {
  const {
    items,
    total,
    itemCount,
    updateQuantity,
    removeFromCart,
  } = useCartContext();

  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 animate-fadeIn">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-warmgrey gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-terracotta-500">
            Review Bag
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal">
            My Shopping Bag
          </h1>
        </div>
        <span
          data-testid="cart-item-count"
          className="self-start sm:self-auto text-xs font-semibold px-4 py-1.5 rounded-full bg-sand text-forest-900 border border-warmgrey"
        >
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </span>
      </div>

      {items.length === 0 ? (
        <EmptyCart onContinueShopping={() => navigate('/shop')} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Cart Line Items (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
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

            <div className="pt-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest-800 hover:text-forest-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Continue Browsing Collection</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Sticky Order Summary (5 Cols, Reference 3 Style) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="rounded-3xl bg-white border border-warmgrey p-6 sm:p-8 shadow-warm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-warmgrey">
                <h3 className="font-serif text-2xl font-bold text-charcoal">
                  Order Summary
                </h3>
                <span className="text-xs text-olive font-medium">Pure Calculations</span>
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-olive">
                  <span>Subtotal ({itemCount} {itemCount === 1 ? 'unit' : 'units'})</span>
                  <span className="font-semibold text-charcoal tabular-nums">
                    {formatCurrency(total)}
                  </span>
                </div>
                <div className="flex justify-between text-olive">
                  <span>Delivery & Surcharges</span>
                  <span className="font-semibold text-charcoal">₹0 (Demo Simulation)</span>
                </div>
                <div className="flex justify-between text-olive">
                  <span>Taxes</span>
                  <span className="font-semibold text-charcoal">₹0</span>
                </div>
              </div>

              {/* Total Row */}
              <div className="pt-4 border-t border-warmgrey flex justify-between items-baseline">
                <div>
                  <span className="font-serif text-xl font-bold text-charcoal block">
                    Order Total
                  </span>
                  <span className="text-[11px] text-olive">Exact sum of all line totals</span>
                </div>
                <span
                  data-testid="order-total"
                  className="text-3xl font-extrabold text-forest-900 tabular-nums font-sans"
                  aria-live="polite"
                >
                  {formatCurrency(total)}
                </span>
              </div>

              {/* Proceed to Checkout CTA */}
              <div className="pt-2">
                <Link
                  to="/checkout"
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-forest-800 hover:bg-forest-900 text-ivory text-xs uppercase tracking-widest font-semibold transition-all shadow-warm hover:shadow-warm-lg active:scale-95"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>

              {/* Help & Guarantee Note */}
              <div className="pt-2 flex items-center gap-2 text-xs text-olive justify-center">
                <ShieldCheck className="w-4 h-4 text-naturalgreen" aria-hidden="true" />
                <span>Deterministic Client-Side State • No Payment Gateway</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
