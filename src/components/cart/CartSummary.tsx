import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { CartItem } from './CartItem';
import { EmptyCart } from './EmptyCart';
import { formatCurrency } from '../../utils/currency';

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
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-sand flex items-center justify-center text-forest-800">
            <ShoppingBag className="w-4 h-4 text-forest-800" aria-hidden="true" />
          </div>
          <h2 id="cart-summary-heading" className="font-serif text-2xl font-bold text-charcoal">
            Shopping Cart
          </h2>
        </div>
        <span
          data-testid="cart-item-count"
          className="text-xs font-semibold px-3 py-1 rounded-full bg-sand text-forest-900 border border-warmgrey"
        >
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </span>
      </div>

      {items.length === 0 ? (
        <EmptyCart onContinueShopping={onContinueShopping} />
      ) : (
        <div className="space-y-4">
          <div className="space-y-3" data-testid="cart-items-list">
            {items.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemove}
              />
            ))}
          </div>

          {/* Pricing Calculation Summary: Order total = sum of all line totals */}
          <div className="rounded-3xl bg-white border border-warmgrey p-6 shadow-warm mt-5 space-y-3">
            <div className="flex justify-between items-baseline">
              <div>
                <span className="font-serif text-lg font-bold text-charcoal block">
                  Order Total
                </span>
                <span className="text-xs text-olive">
                  Exact sum of {itemCount} line {itemCount === 1 ? 'item' : 'items'} • Pure integer math
                </span>
              </div>
              <span
                data-testid="order-total"
                className="text-3xl font-extrabold text-forest-900 tabular-nums tracking-tight font-sans"
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
