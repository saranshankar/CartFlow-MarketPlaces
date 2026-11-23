import { Product } from '../types';

export const PRODUCTS: readonly Product[] = [
  {
    id: 'prod-aero-headphones',
    name: 'Aero Wireless Headphones',
    price: 1499,
    category: 'Electronics',
    description: 'Bespoke high-fidelity audio with active hybrid noise cancellation, 40-hour acoustic battery life, and supple memory-foam ear cushions crafted for timeless comfort.',
    features: ['Active Noise Cancellation', '40-Hour Battery Reserve', 'Lossless Bluetooth 5.3', 'Rapid USB-C Fast Charge'],
    badge: 'Artisan Essential',
    inStock: true,
  },
  {
    id: 'prod-urban-backpack',
    name: 'Urban Everyday Backpack',
    price: 999,
    category: 'Accessories',
    description: 'Weatherproof 22L minimalist carryall featuring a dedicated 16-inch padded laptop compartment, organic canvas finish, and ergonomic weight-distributing straps.',
    features: ['Weatherproof Canvas', 'Padded 16" Laptop Sleeve', 'Ventilated Shoulder Harness', 'Hidden Anti-Theft Compartment'],
    badge: 'Curated Everyday',
    inStock: true,
  },
] as const;
