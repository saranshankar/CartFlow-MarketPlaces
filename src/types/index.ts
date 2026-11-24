export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number; // in integer currency units (e.g. 1499 for ₹1,499)
  category: string; // display name of collection / department
  collectionSlug: string; // url slug e.g. 'electronics', 'fashion'
  description: string;
  details?: string;
  features: string[];
  badge?: string;
  inStock: boolean;
  image?: string;
  keywords: string[];
  tags: string[];
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
  aliases?: string[];
  name: string;
  description: string;
  tagline: string;
  iconName: string;
}

export type Collection = Category;

export type CheckoutStatus =
  | 'EMPTY_CART'
  | 'CART_POPULATED'
  | 'VALIDATION_FAILED'
  | 'PROCESSING'
  | 'ORDER_CONFIRMED';
