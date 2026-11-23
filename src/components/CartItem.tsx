import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../types';
import { formatCurrency } from '../utils/currency';
import { calculateLineTotal } from '../utils/calculations';

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
      className="flex items-center gap-3.5 p-3.5 rounded-xl bg-midnight-800/90 border border-midnight-600/70 hover:border-midnight-500 transition-colors"
    >
      {/* Product Summary */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-slate-100 truncate">
          {item.product.name}
        </h4>
        <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
          <span data-testid={`unit-price-${item.product.id}`}>
            {formatCurrency(item.product.price)} each
          </span>
          <span>•</span>
          <span className="text-slate-400">{item.product.category}</span>
        </div>
      </div>

      {/* Quantity Stepper */}
      <div
        className="flex items-center rounded-lg bg-midnight-900 border border-midnight-600/80 p-0.5"
        role="group"
        aria-label={`Quantity controls for ${item.product.name}`}
      >
        <button
          type="button"
          onClick={() => onUpdateQuantity(item.product.id, -1)}
          disabled={isDecrementDisabled}
          aria-label={`Decrease quantity of ${item.product.name}`}
          data-testid={`quantity-decrement-${item.product.id}`}
          className={`w-7 h-7 flex items-center justify-center rounded-md text-slate-300 transition-all ${
            isDecrementDisabled
              ? 'opacity-30 cursor-not-allowed text-slate-600'
              : 'hover:bg-midnight-700 active:bg-midnight-600 text-slate-200'
          }`}
        >
          <Minus className="w-3.5 h-3.5" aria-hidden="true" />
        </button>

        <span
          data-testid={`quantity-value-${item.product.id}`}
          className="w-8 text-center text-xs font-bold text-slate-100 tabular-nums select-none"
          aria-live="polite"
        >
          {item.quantity}
        </span>

        <button
          type="button"
          onClick={() => onUpdateQuantity(item.product.id, 1)}
          aria-label={`Increase quantity of ${item.product.name}`}
          data-testid={`quantity-increment-${item.product.id}`}
          className="w-7 h-7 flex items-center justify-center rounded-md text-slate-300 hover:bg-midnight-700 active:bg-midnight-600 transition-all"
        >
          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>

      {/* Line Total */}
      <div className="w-20 text-right">
        <span
          data-testid={`line-total-${item.product.id}`}
          className="text-sm font-bold text-white tabular-nums block"
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
        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
      >
        <Trash2 className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
};
