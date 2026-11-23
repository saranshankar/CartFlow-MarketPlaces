import { CartItem, ValidationState } from '../types';

export const VALIDATION_MESSAGES = {
  EMPTY_CART: 'Your cart is empty. Add at least one product before placing an order.',
  MISSING_NAME: 'Please enter your name.',
  WHITESPACE_NAME: 'Customer name cannot consist only of whitespace.',
} as const;

/**
 * Validates checkout parameters.
 * - Customer name must be non-empty and not only whitespace.
 * - Cart must contain at least one item.
 */
export function validateCheckout(customerName: string, items: readonly CartItem[]): ValidationState {
  const errors: ValidationState['errors'] = {};

  if (!customerName || customerName.length === 0) {
    errors.customerName = VALIDATION_MESSAGES.MISSING_NAME;
  } else if (customerName.trim().length === 0) {
    errors.customerName = VALIDATION_MESSAGES.WHITESPACE_NAME;
  }

  if (!items || items.length === 0) {
    errors.cart = VALIDATION_MESSAGES.EMPTY_CART;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
