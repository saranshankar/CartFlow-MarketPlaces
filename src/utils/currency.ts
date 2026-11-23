/**
 * Currency formatting utility using Intl.NumberFormat for Indian Rupee (INR).
 * Ensures uniform representation across all product, line item, and order totals.
 */
const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

/**
 * Formats integer amounts into the standard INR currency string.
 * e.g., 1499 -> "₹1,499", 0 -> "₹0"
 */
export function formatCurrency(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return inrFormatter.format(0);
  }
  // Guarantee strict integer currency unit
  return inrFormatter.format(Math.round(amount));
}
