import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface WishlistContextType {
  wishlistIds: string[];
  wishlistItems: Product[];
  wishlistCount: number;
  isInWishlist: (productId: string) => boolean;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  clearWishlist: () => void;
  moveToCart: (product: Product, addToCart: (p: Product) => void) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('cartflow_wishlist');
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        // Ensure only valid unique strings exist
        return Array.from(new Set(parsed.filter((id) => typeof id === 'string')));
      }
      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cartflow_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // Ignore quota errors in restricted contexts
    }
  }, [wishlistIds]);

  const isInWishlist = useCallback((productId: string) => {
    return wishlistIds.includes(productId);
  }, [wishlistIds]);

  const addToWishlist = useCallback((product: Product) => {
    setWishlistIds((prev) => (prev.includes(product.id) ? prev : [...prev, product.id]));
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  }, []);

  const toggleWishlist = useCallback((product: Product) => {
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      }
      return [...prev, product.id];
    });
  }, []);

  const clearWishlist = useCallback(() => {
    setWishlistIds([]);
    try {
      localStorage.removeItem('cartflow_wishlist');
    } catch {
      // Ignore
    }
  }, []);

  const moveToCart = useCallback((product: Product, addToCart: (p: Product) => void) => {
    addToCart(product);
    setWishlistIds((prev) => prev.filter((id) => id !== product.id));
  }, []);

  // Map wishlistIds to full Product objects using immutable synthetic catalog
  const wishlistItems = useMemo(() => {
    return PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  }, [wishlistIds]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistItems,
        wishlistCount: wishlistIds.length,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
        moveToCart,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
