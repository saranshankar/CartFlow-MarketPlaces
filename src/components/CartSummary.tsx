import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { CartItem as CartItemType } from '../types';
import { CartItem } from './CartItem';
import { EmptyCart } from './EmptyCart';
import { formatCurrency } from '../utils/currency';

interface CartSummaryProps {
  items: readonly CartItemType[];
  total: number;
  itemCount: number;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemove: (productId: string) => void;
  onContinueShopping?: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  items,
  total,
  itemCount,
  onUpdateQuantity,
  onRemove,
  onContinueShopping,
}) => {
  return (
    <section aria-labelledby="cart-summary-heading" className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-indigo-400" aria-hidden="true" />
          <h2 id="cart-summary-heading" className="text-lg font-bold text-slate-100">
            Shopping Cart
          </h2>
        </div>
        <span
          data-testid="cart-item-count"
          className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-midnight-800 text-slate-300 border border-midnight-600"
        >
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </span>
      </div>

      {items.length === 0 ? (
        <EmptyCart onContinueShopping={onContinueShopping} />
      ) : (
        <div className="space-y-3">
          <div className="space-y-2.5" data-testid="cart-items-list">
            {items.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemove}
              />
            ))}
          </div>

          {/* Pricing Calculation Summary: Order total = sum of all line totals (strictly zero fees/taxes) */}
          <div className="rounded-xl bg-midnight-800/90 border border-midnight-600/70 p-4 space-y-2.5 mt-4">
            <div className="flex justify-between items-baseline">
              <div>
                <span className="text-sm font-semibold text-slate-100 block">Order Total</span>
                <span className="text-xs text-slate-400">Exact sum of all line totals</span>
              </div>
              <span
                data-testid="order-total"
                className="text-2xl font-extrabold text-white tabular-nums tracking-tight"
                aria-live="polite"
              >
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
