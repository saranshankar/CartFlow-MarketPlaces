import React from 'react';
import { Lock, ArrowRight, Loader2, User } from 'lucide-react';
import { ValidationMessage } from './ValidationMessage';
import { formatCurrency } from '../utils/currency';

interface CheckoutFormProps {
  customerName: string;
  onCustomerNameChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  total: number;
  itemCount: number;
  errorMessage?: string;
  cartErrorMessage?: string;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  customerName,
  onCustomerNameChange,
  onSubmit,
  isSubmitting,
  total,
  itemCount,
  errorMessage,
  cartErrorMessage,
}) => {
  return (
    <section aria-labelledby="checkout-form-heading" className="w-full">
      <div className="rounded-2xl bg-midnight-800 border border-midnight-600/70 p-5 shadow-lg shadow-midnight-950/40">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-midnight-600/60">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <User className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h2 id="checkout-form-heading" className="text-base font-bold text-slate-100">
              Customer Details
            </h2>
            <p className="text-xs text-slate-400">Required information to process order</p>
          </div>
        </div>

        <form onSubmit={onSubmit} noValidate className="space-y-4">
          {/* Cart-level Error Alert (e.g. empty cart attempt) */}
          {cartErrorMessage && (
            <div data-testid="cart-error">
              <ValidationMessage message={cartErrorMessage} id="cart-validation-error" />
            </div>
          )}

          {/* Customer Name Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label
                htmlFor="customerName"
                className="block text-xs font-semibold text-slate-200"
              >
                Customer Name <span className="text-rose-400" aria-label="required">*</span>
              </label>
              <span className="text-[11px] text-slate-400">Required field</span>
            </div>

            <div className="relative">
              <input
                id="customerName"
                name="customerName"
                type="text"
                autoComplete="name"
                required
                value={customerName}
                onChange={(e) => onCustomerNameChange(e.target.value)}
                placeholder="e.g. Alex Morgan"
                disabled={isSubmitting}
                aria-invalid={Boolean(errorMessage)}
                aria-describedby={errorMessage ? 'customer-name-error' : undefined}
                data-testid="customer-name-input"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-midnight-900 border text-slate-100 placeholder-slate-500 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 ${
                  errorMessage
                    ? 'border-rose-500/80 focus-visible:ring-rose-500/50 bg-rose-950/10'
                    : 'border-midnight-600 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 hover:border-midnight-500'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
            </div>

            {/* Field-level Validation Space */}
            {errorMessage && (
              <div data-testid="customer-name-error" className="mt-1.5">
                <ValidationMessage message={errorMessage} id="customer-name-error" />
              </div>
            )}
          </div>

          {/* Place Order CTA with Rapid Double-Click Guard */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              data-testid="checkout-submit-button"
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-white transition-all shadow-lg ${
                isSubmitting
                  ? 'bg-indigo-700/60 cursor-not-allowed opacity-75'
                  : 'bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 shadow-indigo-600/30 hover:shadow-indigo-600/40 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-200" aria-hidden="true" />
                  <span data-testid="processing-indicator">Processing Order...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-indigo-200" aria-hidden="true" />
                  <span>
                    Place Order {itemCount > 0 ? `(${itemCount} ${itemCount === 1 ? 'item' : 'items'})` : ''} • {formatCurrency(total)}
                  </span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </>
              )}
            </button>
          </div>

          {/* Trust Badge */}
          <p className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5 pt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-mint-400"></span>
            <span>Deterministic client-side processing • Zero telemetry</span>
          </p>
        </form>
      </div>
    </section>
  );
};
