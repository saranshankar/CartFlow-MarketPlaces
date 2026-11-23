import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckoutForm } from '../components/checkout/CheckoutForm';
import { OrderReceipt } from '../components/checkout/OrderReceipt';
import { useCartContext } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';
import { calculateLineTotal } from '../utils/calculations';
import { ShieldCheck } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    items,
    total,
    itemCount,
    customerName,
    setCustomerName,
    validationErrors,
    setValidationErrors,
    isSubmitting,
    confirmedOrder,
    submitOrder,
    resetOrder,
  } = useCartContext();

  const navigate = useNavigate();

  const handleNameChange = (val: string) => {
    setCustomerName(val);
    if (validationErrors.customerName) {
      setValidationErrors((prev) => ({ ...prev, customerName: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitOrder(() => {
      // Optional navigation or in-place confirmation display
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 animate-fadeIn">
      {/* If Order is Confirmed, render the receipt view */}
      {confirmedOrder ? (
        <div className="py-6">
          <OrderReceipt
            order={confirmedOrder}
            onResetOrder={() => {
              resetOrder();
              navigate('/shop');
            }}
          />
        </div>
      ) : (
        <>
          {/* Editorial Step Header (Reference 4 Style) */}
          <div className="pb-6 border-b border-warmgrey flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-terracotta-500 font-semibold mb-1">
                <span>Step 1 of 2</span>
                <span>•</span>
                <span>Customer Verification</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal">
                Checkout
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs text-olive bg-sand px-3.5 py-1.5 rounded-full border border-warmgrey">
              <ShieldCheck className="w-4 h-4 text-naturalgreen" aria-hidden="true" />
              <span>Pure Client-Side State</span>
            </div>
          </div>

          {/* 2-Column Checkout Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Customer Form (7 Cols) */}
            <div className="lg:col-span-7">
              <CheckoutForm
                customerName={customerName}
                onCustomerNameChange={handleNameChange}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                total={total}
                itemCount={itemCount}
                errorMessage={validationErrors.customerName}
                cartErrorMessage={validationErrors.cart}
              />
            </div>

            {/* Right Column: Sticky Order Summary (5 Cols) */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="rounded-3xl bg-white border border-warmgrey p-6 sm:p-8 shadow-warm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-warmgrey">
                  <h3 className="font-serif text-2xl font-bold text-charcoal">
                    Order Summary
                  </h3>
                  <span className="text-xs text-olive font-medium">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                  </span>
                </div>

                {/* Items Mini List */}
                {items.length === 0 ? (
                  <p data-testid="empty-cart-state" className="text-xs text-olive italic py-2">
                    Your shopping bag is empty. Please add items before placing an order.
                  </p>
                ) : (
                  <div className="space-y-3 divide-y divide-warmgrey/60" data-testid="checkout-summary-items">
                    {items.map((item) => (
                      <div key={item.product.id} className="pt-3 first:pt-0 flex items-center justify-between text-xs">
                        <div className="min-w-0 pr-2">
                          <span className="font-serif font-bold text-charcoal block truncate">
                            {item.product.name}
                          </span>
                          <span className="text-olive">
                            Qty: {item.quantity} × {formatCurrency(item.product.price)}
                          </span>
                        </div>
                        <span
                          data-testid={`line-total-${item.product.id}`}
                          className="font-bold text-forest-900 tabular-nums shrink-0 font-sans"
                        >
                          {formatCurrency(calculateLineTotal(item.product.price, item.quantity))}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Price Aggregation */}
                <div className="pt-4 border-t border-warmgrey space-y-2 text-xs text-olive">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-charcoal tabular-nums">
                      {formatCurrency(total)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-naturalgreen">Complimentary</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Taxes</span>
                    <span className="font-semibold text-charcoal">₹0</span>
                  </div>
                </div>

                {/* Grand Order Total */}
                <div className="pt-4 border-t border-warmgrey flex justify-between items-baseline">
                  <div>
                    <span className="font-serif text-lg font-bold text-charcoal block">
                      Order Total
                    </span>
                    <span className="text-[10px] text-olive">Strict sum of line totals</span>
                  </div>
                  <span
                    data-testid="order-total"
                    className="text-2xl font-extrabold text-forest-900 tabular-nums font-sans"
                    aria-live="polite"
                  >
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
