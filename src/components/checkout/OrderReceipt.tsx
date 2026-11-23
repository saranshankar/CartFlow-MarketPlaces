import React from 'react';
import { CheckCircle2, RotateCcw, Package, Calendar, User, Hash } from 'lucide-react';
import { Order } from '../../types';
import { formatCurrency } from '../../utils/currency';
import { calculateLineTotal } from '../../utils/calculations';

interface OrderReceiptProps {
  order: Order;
  onResetOrder: () => void;
}

export const OrderReceipt: React.FC<OrderReceiptProps> = ({
  order,
  onResetOrder,
}) => {
  return (
    <div
      data-testid="order-confirmation-view"
      className="max-w-2xl mx-auto rounded-3xl bg-white border border-warmgrey p-6 sm:p-10 shadow-warm-lg animate-fadeIn text-charcoal"
    >
      {/* Success Badge */}
      <div className="flex flex-col items-center text-center pb-8 border-b border-warmgrey/80">
        <div className="w-16 h-16 rounded-full bg-naturalgreen/10 border-2 border-naturalgreen/30 flex items-center justify-center text-naturalgreen mb-4 shadow-warm-sm">
          <CheckCircle2 className="w-9 h-9" aria-hidden="true" />
        </div>
        <span className="text-[11px] uppercase tracking-widest font-bold px-3.5 py-1 rounded-full bg-naturalgreen-100 text-naturalgreen border border-naturalgreen/20 mb-3">
          Order Confirmed
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal tracking-tight">
          Your order is confirmed
        </h2>
        <p className="text-xs sm:text-sm text-olive mt-2 max-w-md leading-relaxed">
          Thank you for choosing CartFlow. Your order has been registered in our deterministic demo engine.
        </p>
      </div>

      {/* Meta Information Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-8">
        <div className="rounded-2xl bg-sand/60 border border-warmgrey/70 p-4">
          <div className="flex items-center gap-1.5 text-olive text-xs mb-1.5 font-medium">
            <Hash className="w-3.5 h-3.5 text-forest-800" aria-hidden="true" />
            <span>Order Reference</span>
          </div>
          <span
            data-testid="order-reference"
            className="text-sm font-mono font-bold text-forest-900 break-all select-all block"
          >
            {order.reference}
          </span>
        </div>

        <div className="rounded-2xl bg-sand/60 border border-warmgrey/70 p-4">
          <div className="flex items-center gap-1.5 text-olive text-xs mb-1.5 font-medium">
            <User className="w-3.5 h-3.5 text-forest-800" aria-hidden="true" />
            <span>Customer</span>
          </div>
          <span
            data-testid="confirmation-customer-name"
            className="text-sm font-semibold text-charcoal truncate block font-serif"
          >
            {order.customerName}
          </span>
        </div>

        <div className="rounded-2xl bg-sand/60 border border-warmgrey/70 p-4">
          <div className="flex items-center gap-1.5 text-olive text-xs mb-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 text-forest-800" aria-hidden="true" />
            <span>Date & Time</span>
          </div>
          <span className="text-sm font-medium text-charcoal block">
            {order.createdAt}
          </span>
        </div>
      </div>

      {/* Itemized Receipt Table */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-olive uppercase tracking-widest">
          <Package className="w-3.5 h-3.5 text-forest-800" aria-hidden="true" />
          <span>Purchased Essentials</span>
        </div>

        <div
          data-testid="confirmation-items-list"
          className="rounded-2xl bg-sand/40 border border-warmgrey divide-y divide-warmgrey/80 overflow-hidden"
        >
          {order.items.map((item) => (
            <div
              key={item.product.id}
              data-testid={`confirmed-item-${item.product.id}`}
              className="p-4 flex items-center justify-between text-sm"
            >
              <div>
                <span className="font-serif font-bold text-charcoal block text-base">
                  {item.product.name}
                </span>
                <span className="text-xs text-olive">
                  {formatCurrency(item.product.price)} × {item.quantity} unit{item.quantity > 1 ? 's' : ''}
                </span>
              </div>
              <span className="font-bold text-forest-900 tabular-nums text-base">
                {formatCurrency(calculateLineTotal(item.product.price, item.quantity))}
              </span>
            </div>
          ))}
        </div>

        {/* Final Settlement Summary */}
        <div className="rounded-2xl bg-sand/80 border border-warmgrey p-5 flex items-center justify-between mt-4">
          <div>
            <span className="text-sm font-bold text-charcoal block">Total Settled</span>
            <span className="text-xs text-olive">Strict sum of line totals • Zero fees</span>
          </div>
          <span
            data-testid="confirmation-total"
            className="text-3xl font-extrabold text-forest-900 tabular-nums font-sans"
          >
            {formatCurrency(order.total)}
          </span>
        </div>
      </div>

      {/* Return Action */}
      <div className="mt-10 pt-6 border-t border-warmgrey/80 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          type="button"
          onClick={onResetOrder}
          data-testid="start-new-order-button"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-forest-800 hover:bg-forest-900 text-ivory text-xs uppercase tracking-wider font-semibold transition-all shadow-warm-sm hover:shadow-warm active:scale-95"
        >
          <RotateCcw className="w-4 h-4 text-sand" aria-hidden="true" />
          <span>Start New Order</span>
        </button>
      </div>
    </div>
  );
};
