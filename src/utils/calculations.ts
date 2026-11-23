import { CartItem } from '../types';

/**
 * Calculates line total for a single cart item using integer arithmetic.
 * LineTotal = unitPrice × quantity
 */
export function calculateLineTotal(unitPrice: number, quantity: number): number {
  const safePrice = Math.max(0, Math.round(unitPrice));
  const safeQuantity = Math.max(0, Math.round(quantity));
  return safePrice * safeQuantity;
}

/**
 * Computes exact order total as the pure sum of all line totals.
 * Strictly no taxes, delivery charges, discounts or hidden fees.
 */
export function calculateOrderTotal(items: readonly CartItem[]): number {
  return items.reduce((accumulator, item) => {
    return accumulator + calculateLineTotal(item.product.price, item.quantity);
  }, 0);
}

/**
 * Counts total individual item units in the cart.
 */
export function calculateTotalItemCount(items: readonly CartItem[]): number {
  return items.reduce((count, item) => {
    return count + Math.max(0, Math.round(item.quantity));
  }, 0);
}

/**
 * Deterministic & testable order reference generator.
 * Format: CF-YYYYMMDD-XXXX (e.g. CF-20261123-A8F2)
 *
 * @param customSuffix - Optional fixed suffix for deterministic unit/E2E test assertions
 */
export function generateOrderReference(customSuffix?: string): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const suffix = customSuffix || Math.random().toString(36).substring(2, 6).toUpperCase();
  return `CF-${year}${month}${day}-${suffix}`;
}
