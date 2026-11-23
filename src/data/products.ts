import { Product } from '../types';

export const PRODUCTS: readonly Product[] = [
  {
    id: 'prod-aero-headphones',
    name: 'Aero Wireless Headphones',
    price: 1499,
    category: 'Electronics',
    description: 'High-fidelity audio with active noise cancellation, 40-hour battery life, and ultra-comfortable memory foam ear cushions.',
    features: ['Active Noise Cancellation', '40h Battery Life', 'Bluetooth 5.3', 'Fast USB-C Charging'],
    badge: 'Best Seller',
    inStock: true,
  },
  {
    id: 'prod-urban-backpack',
    name: 'Urban Everyday Backpack',
    price: 999,
    category: 'Accessories',
    description: 'Weatherproof 22L minimalist backpack featuring padded 16-inch laptop compartment and ergonomic ventilated shoulder straps.',
    features: ['Water-Resistant Fabric', '16" Laptop Sleeve', 'Ergonomic Straps', 'Hidden Anti-theft Pocket'],
    badge: 'Popular',
    inStock: true,
  },
] as const;
