import React from 'react';
import { CheckCircle2, RotateCcw, Package, Calendar, User, Hash } from 'lucide-react';
import { Order } from '../types';
import { formatCurrency } from '../utils/currency';
import { calculateLineTotal } from '../utils/calculations';

interface OrderConfirmationProps {
  order: Order;
  onResetOrder: () => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  order,
  onResetOrder,
}) => {
  return (
    <div
      data-testid="order-confirmation-view"
      className="max-w-2xl mx-auto rounded-3xl bg-midnight-800 border border-mint-500/30 p-6 sm:p-8 shadow-2xl shadow-midnight-950/80 animate-fadeIn"
    >
      {/* Success Badge */}
      <div className="flex flex-col items-center text-center pb-6 border-b border-midnight-600/60">
        <div className="w-16 h-16 rounded-full bg-mint-500/10 border-2 border-mint-500/30 flex items-center justify-center text-mint-400 mb-3.5 shadow-lg shadow-mint-500/10">
          <CheckCircle2 className="w-9 h-9" aria-hidden="true" />
        </div>
        <span className="text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-mint-500/15 text-mint-400 border border-mint-500/30 mb-2">
          Order Confirmed
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Thank you for your order!
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Your synthetic checkout was processed successfully.
        </p>
      </div>

      {/* Meta Information Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
        <div className="rounded-xl bg-midnight-900/90 border border-midnight-600/60 p-3.5">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <Hash className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
            <span>Order Reference</span>
          </div>
          <span
            data-testid="order-reference"
            className="text-sm font-mono font-bold text-indigo-300 break-all select-all block"
          >
            {order.reference}
          </span>
        </div>

        <div className="rounded-xl bg-midnight-900/90 border border-midnight-600/60 p-3.5">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <User className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
            <span>Customer</span>
          </div>
          <span
            data-testid="confirmation-customer-name"
            className="text-sm font-semibold text-slate-100 truncate block"
          >
            {order.customerName}
          </span>
        </div>

        <div className="rounded-xl bg-midnight-900/90 border border-midnight-600/60 p-3.5">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
            <span>Date</span>
          </div>
          <span className="text-sm font-semibold text-slate-200 block">
            {order.createdAt}
          </span>
        </div>
      </div>

      {/* Purchased Items Receipt */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
          <Package className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
          <span>Purchased Items</span>
        </div>

        <div
          data-testid="confirmation-items-list"
          className="rounded-xl bg-midnight-900/70 border border-midnight-600/60 divide-y divide-midnight-600/40 overflow-hidden"
        >
          {order.items.map((item) => (
            <div
              key={item.product.id}
              data-testid={`confirmed-item-${item.product.id}`}
              className="p-3.5 flex items-center justify-between text-sm"
            >
              <div>
                <span className="font-semibold text-slate-100 block">
                  {item.product.name}
                </span>
                <span className="text-xs text-slate-400">
                  {formatCurrency(item.product.price)} × {item.quantity} unit{item.quantity > 1 ? 's' : ''}
                </span>
              </div>
              <span className="font-bold text-white tabular-nums">
                {formatCurrency(calculateLineTotal(item.product.price, item.quantity))}
              </span>
            </div>
          ))}
        </div>

        {/* Total Settlement */}
        <div className="rounded-xl bg-midnight-900/90 border border-midnight-600/60 p-4 flex items-center justify-between mt-3">
          <span className="text-sm font-bold text-slate-200">Total Settled</span>
          <span
            data-testid="confirmation-total"
            className="text-2xl font-black text-mint-400 tabular-nums"
          >
            {formatCurrency(order.total)}
          </span>
        </div>
      </div>

      {/* Reset CTA */}
      <div className="mt-8 pt-4 border-t border-midnight-600/60 flex justify-center">
        <button
          type="button"
          onClick={onResetOrder}
          data-testid="start-new-order-button"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-midnight-700 hover:bg-midnight-600 text-slate-100 font-semibold text-sm transition-all border border-midnight-500/50 hover:border-indigo-400/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          <RotateCcw className="w-4 h-4 text-indigo-400" aria-hidden="true" />
          <span>Start New Order</span>
        </button>
      </div>
    </div>
  );
};
