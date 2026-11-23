import { useState, useCallback, useMemo } from 'react';
import { Product, CartItem } from '../types';
import { calculateOrderTotal, calculateTotalItemCount } from '../utils/calculations';

export function useCart(initialItems: CartItem[] = []) {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  // Add product: if already present, increment quantity by 1; otherwise append with quantity 1
  const addToCart = useCallback((product: Product) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        return prevItems.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
  }, []);

  // Remove product completely from cart via dedicated removal control
  const removeFromCart = useCallback((productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  }, []);

  // Increase or decrease quantity; strictly enforces minimum quantity >= 1
  const updateQuantity = useCallback((productId: string, delta: number) => {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.product.id !== productId) return item;
        const targetQuantity = item.quantity + delta;
        // Strictly prevent quantities from becoming zero or negative
        if (targetQuantity < 1) {
          return item;
        }
        return { ...item, quantity: targetQuantity };
      });
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Aggregate calculations - integer based, no floating point errors
  const total = useMemo(() => calculateOrderTotal(items), [items]);
  const itemCount = useMemo(() => calculateTotalItemCount(items), [items]);
  const isEmpty = items.length === 0;

  const getItemQuantity = useCallback(
    (productId: string) => {
      const match = items.find((item) => item.product.id === productId);
      return match ? match.quantity : 0;
    },
    [items]
  );

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    itemCount,
    isEmpty,
    getItemQuantity,
  };
}
