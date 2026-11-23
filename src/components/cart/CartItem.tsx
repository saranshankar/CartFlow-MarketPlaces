import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { formatCurrency } from '../../utils/currency';
import { calculateLineTotal } from '../../utils/calculations';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemove: (productId: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const lineTotal = calculateLineTotal(item.product.price, item.quantity);
  const isDecrementDisabled = item.quantity <= 1;

  return (
    <div
      data-testid={`cart-item-${item.product.id}`}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-warmgrey/80 shadow-warm hover:border-forest-700/30 transition-all"
    >
      {/* Product Information */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-14 h-14 rounded-xl bg-sand/70 border border-warmgrey/60 flex items-center justify-center shrink-0 p-1.5">
          <span className="font-serif font-bold text-forest-800 text-sm">
            {item.product.name.charAt(0)}
          </span>
        </div>
        <div className="min-w-0">
          <h4 className="font-serif text-base font-bold text-charcoal truncate">
            {item.product.name}
          </h4>
          <div className="flex items-center gap-2 text-xs text-olive mt-0.5">
            <span data-testid={`unit-price-${item.product.id}`} className="font-medium">
              {formatCurrency(item.product.price)} each
            </span>
            <span>•</span>
            <span>{item.product.category}</span>
          </div>
        </div>
      </div>

      {/* Stepper & Line Total Row */}
      <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-warmgrey/60">
        {/* Accessible Quantity Stepper */}
        <div
          className="flex items-center rounded-full bg-sand/80 border border-warmgrey p-1"
          role="group"
          aria-label={`Quantity controls for ${item.product.name}`}
        >
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.product.id, -1)}
            disabled={isDecrementDisabled}
            aria-label={`Decrease quantity of ${item.product.name}`}
            data-testid={`quantity-decrement-${item.product.id}`}
            className={`w-7 h-7 flex items-center justify-center rounded-full text-charcoal transition-all ${
              isDecrementDisabled
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:bg-white active:bg-ivory shadow-warm-sm'
            }`}
          >
            <Minus className="w-3.5 h-3.5" aria-hidden="true" />
          </button>

          <span
            data-testid={`quantity-value-${item.product.id}`}
            className="w-8 text-center text-xs font-bold text-charcoal tabular-nums select-none"
            aria-live="polite"
          >
            {item.quantity}
          </span>

          <button
            type="button"
            onClick={() => onUpdateQuantity(item.product.id, 1)}
            aria-label={`Increase quantity of ${item.product.name}`}
            data-testid={`quantity-increment-${item.product.id}`}
            className="w-7 h-7 flex items-center justify-center rounded-full text-charcoal hover:bg-white active:bg-ivory transition-all shadow-warm-sm"
          >
            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>

        {/* Line Total */}
        <div className="w-24 text-right">
          <span className="text-[10px] uppercase font-semibold text-olive block sm:hidden">
            Line Total
          </span>
          <span
            data-testid={`line-total-${item.product.id}`}
            className="text-base font-bold text-forest-900 tabular-nums font-sans block"
          >
            {formatCurrency(lineTotal)}
          </span>
        </div>

        {/* Remove Button */}
        <button
          type="button"
          onClick={() => onRemove(item.product.id)}
          aria-label={`Remove ${item.product.name} from cart`}
          data-testid={`remove-item-${item.product.id}`}
          className="p-2 rounded-full text-olive hover:text-terracottared hover:bg-terracottared-100/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracottared"
        >
          <Trash2 className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
