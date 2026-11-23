import React, { createContext, useContext, useState, useCallback, useRef, useEffect, ReactNode, useMemo } from 'react';
import { Product, CartItem, Order, CheckoutStatus } from '../types';
import { calculateOrderTotal, calculateTotalItemCount, generateOrderReference } from '../utils/calculations';
import { validateCheckout } from '../utils/validation';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  isEmpty: boolean;
  getItemQuantity: (productId: string) => number;

  customerName: string;
  setCustomerName: (name: string) => void;
  validationErrors: { customerName?: string; cart?: string };
  setValidationErrors: React.Dispatch<React.SetStateAction<{ customerName?: string; cart?: string }>>;
  isSubmitting: boolean;
  confirmedOrder: Order | null;
  checkoutStatus: CheckoutStatus;

  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;

  submitOrder: (navigateOnSuccess?: () => void) => boolean;
  resetOrder: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Persistent state across multi-page route navigations and browser refreshes
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('cartflow_items');
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (item) =>
            item &&
            item.product &&
            typeof item.product.id === 'string' &&
            typeof item.quantity === 'number' &&
            item.quantity > 0
        );
      }
      return [];
    } catch {
      return [];
    }
  });

  const [customerName, setCustomerName] = useState<string>(() => {
    try {
      return localStorage.getItem('cartflow_customer_name') || '';
    } catch {
      return '';
    }
  });

  const [validationErrors, setValidationErrors] = useState<{ customerName?: string; cart?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(() => {
    try {
      const stored = localStorage.getItem('cartflow_confirmed_order');
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed.reference === 'string' && typeof parsed.total === 'number') {
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  });
  const [checkoutStatus, setCheckoutStatus] = useState<CheckoutStatus>('EMPTY_CART');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // Synchronous submission lock to prevent rapid duplicate clicks before re-renders
  const isSubmittingRef = useRef<boolean>(false);

  // Save to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem('cartflow_items', JSON.stringify(items));
    } catch {
      // Ignore quota errors in restricted contexts
    }
  }, [items]);

  // Save to localStorage whenever customer name changes
  useEffect(() => {
    try {
      localStorage.setItem('cartflow_customer_name', customerName);
    } catch {
      // Ignore
    }
  }, [customerName]);

  // Save confirmed order
  useEffect(() => {
    try {
      if (confirmedOrder) {
        localStorage.setItem('cartflow_confirmed_order', JSON.stringify(confirmedOrder));
      } else {
        localStorage.removeItem('cartflow_confirmed_order');
      }
    } catch {
      // Ignore
    }
  }, [confirmedOrder]);

  // Cart operations
  const addToCart = useCallback((product: Product, quantityToAdd: number = 1) => {
    const qty = Math.max(1, quantityToAdd);
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        return prevItems.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prevItems, { product, quantity: qty }];
    });
    // Open drawer on add for immediate tactile customer feedback
    setIsDrawerOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, delta: number) => {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.product.id !== productId) return item;
        const targetQuantity = item.quantity + delta;
        // Strictly prevent quantities from falling below 1 via steppers
        if (targetQuantity < 1) return item;
        return { ...item, quantity: targetQuantity };
      });
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    try {
      localStorage.removeItem('cartflow_items');
    } catch {
      // Ignore
    }
  }, []);

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

  // Synchronize high-level checkout state
  useEffect(() => {
    if (confirmedOrder) return;
    if (items.length === 0) {
      setCheckoutStatus((prev) => (prev === 'ORDER_CONFIRMED' ? prev : 'EMPTY_CART'));
    } else {
      setCheckoutStatus((prev) => (prev === 'ORDER_CONFIRMED' || prev === 'PROCESSING' ? prev : 'CART_POPULATED'));
    }
  }, [items.length, confirmedOrder]);

  // Order submission with synchronous double-click lock
  const submitOrder = useCallback(
    (navigateOnSuccess?: () => void) => {
      // 1. SYNCHRONOUS LOCK GUARD: Drops concurrent/repeated clicks immediately
      if (isSubmittingRef.current) {
        return false;
      }

      // 2. TERMINATION GUARD: Prevent re-submitting an already confirmed order
      if (checkoutStatus === 'ORDER_CONFIRMED') {
        return false;
      }

      // 3. DEFENSIVE VALIDATION
      const validation = validateCheckout(customerName, items);
      if (!validation.isValid) {
        setCheckoutStatus('VALIDATION_FAILED');
        setValidationErrors(validation.errors);
        return false;
      }

      // 4. ENGAGE SYNCHRONOUS LOCK
      isSubmittingRef.current = true;
      setCheckoutStatus('PROCESSING');
      setIsSubmitting(true);
      setValidationErrors({});

      // 5. DETERMINISTIC PROCESSING TICK (120ms)
      setTimeout(() => {
        const order: Order = {
          reference: generateOrderReference(),
          customerName: customerName.trim(),
          items: [...items],
          subtotal: total,
          total: total,
          createdAt: new Date().toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        };

        setConfirmedOrder(order);
        setCheckoutStatus('ORDER_CONFIRMED');
        clearCart();
        setIsSubmitting(false);

        if (navigateOnSuccess) {
          navigateOnSuccess();
        }
      }, 120);

      return true;
    },
    [customerName, items, total, checkoutStatus, clearCart]
  );

  const resetOrder = useCallback(() => {
    isSubmittingRef.current = false;
    setConfirmedOrder(null);
    setCustomerName('');
    setValidationErrors({});
    clearCart();
    setCheckoutStatus('EMPTY_CART');
    try {
      localStorage.clear();
    } catch {
      // Ignore
    }
  }, [clearCart]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount,
        isEmpty,
        getItemQuantity,
        customerName,
        setCustomerName,
        validationErrors,
        setValidationErrors,
        isSubmitting,
        confirmedOrder,
        checkoutStatus,
        isDrawerOpen,
        setIsDrawerOpen,
        submitOrder,
        resetOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useCartContext(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
}
