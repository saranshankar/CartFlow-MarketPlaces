export interface Product {
  id: string;
  name: string;
  price: number; // in integer currency units (e.g. 1499 for ₹1,499)
  category: string;
  description: string;
  features: string[];
  badge?: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  reference: string;
  customerName: string;
  items: CartItem[];
  subtotal: number;
  total: number;
  createdAt: string;
}

export interface ValidationState {
  isValid: boolean;
  errors: {
    customerName?: string;
    cart?: string;
  };
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  tagline: string;
  iconName: string;
  productIds: string[];
}

export type CheckoutStatus =
  | 'EMPTY_CART'
  | 'CART_POPULATED'
  | 'VALIDATION_FAILED'
  | 'PROCESSING'
  | 'ORDER_CONFIRMED';
