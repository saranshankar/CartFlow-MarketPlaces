import React from 'react';
import { Lock, ArrowRight, Loader2, User } from 'lucide-react';
import { ValidationMessage } from '../common/ValidationMessage';
import { formatCurrency } from '../../utils/currency';

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
      <div className="rounded-3xl bg-white border border-warmgrey p-6 sm:p-8 shadow-warm">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-warmgrey">
          <div className="w-9 h-9 rounded-full bg-sand flex items-center justify-center text-forest-800">
            <User className="w-4 h-4 text-forest-800" aria-hidden="true" />
          </div>
          <div>
            <h2 id="checkout-form-heading" className="font-serif text-xl font-bold text-charcoal">
              Customer Information
            </h2>
            <p className="text-xs text-olive">Required detail to finalize and register order</p>
          </div>
        </div>

        <form onSubmit={onSubmit} noValidate className="space-y-5">
          {/* Cart-Level Error Alert (e.g. empty cart attempt) */}
          {cartErrorMessage && (
            <div data-testid="cart-error">
              <ValidationMessage message={cartErrorMessage} id="cart-validation-error" />
            </div>
          )}

          {/* Customer Name Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <label
                htmlFor="customerName"
                className="block text-xs font-semibold uppercase tracking-wider text-charcoal"
              >
                Customer Name <span className="text-terracottared" aria-label="required">*</span>
              </label>
              <span className="text-[11px] text-olive font-medium">Single Required Field</span>
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
                className={`w-full px-4 py-3.5 rounded-2xl bg-sand/40 border text-charcoal placeholder-olive/60 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 ${
                  errorMessage
                    ? 'border-terracottared-600 focus-visible:ring-terracottared-600 bg-terracottared-50/50'
                    : 'border-warmgrey focus-visible:ring-forest-700 hover:border-olive/50'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
            </div>

            {/* Field-level Validation Space */}
            {errorMessage && (
              <div data-testid="customer-name-error" className="mt-2">
                <ValidationMessage message={errorMessage} id="customer-name-error" />
              </div>
            )}
          </div>

          {/* Place Order CTA with Synchronous Double-Click Lock */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              data-testid="checkout-submit-button"
              className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full font-semibold text-xs uppercase tracking-widest text-ivory transition-all shadow-warm hover:shadow-warm-lg ${
                isSubmitting
                  ? 'bg-forest-800/70 cursor-not-allowed opacity-75'
                  : 'bg-forest-800 hover:bg-forest-900 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-ivory" aria-hidden="true" />
                  <span data-testid="processing-indicator">Processing Order...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-sand" aria-hidden="true" />
                  <span>
                    Place Order {itemCount > 0 ? `(${itemCount} ${itemCount === 1 ? 'item' : 'items'})` : ''} • {formatCurrency(total)}
                  </span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </>
              )}
            </button>
          </div>

          {/* Demo Integrity Note */}
          <p className="text-center text-[11px] text-olive flex items-center justify-center gap-1.5 pt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-naturalgreen"></span>
            <span>Deterministic client-side processing • Zero telemetry</span>
          </p>
        </form>
      </div>
    </section>
  );
};
