import { Category, Product } from '../types';
import { PRODUCTS } from './products';

export const CATEGORIES: readonly Category[] = [
  {
    slug: 'electronics',
    name: 'Electronics & Audio',
    description: 'High-fidelity wireless sound, hybrid active noise cancellation, and timeless acoustic engineering.',
    tagline: 'Immersive Acoustic Clarity',
    iconName: 'Headphones',
    productIds: ['prod-aero-headphones'],
  },
  {
    slug: 'accessories',
    name: 'Bags & Accessories',
    description: 'Weatherproof commuter carryalls, ergonomic weight distribution, and durable minimalist utility.',
    tagline: 'Engineered Daily Carry',
    iconName: 'Briefcase',
    productIds: ['prod-urban-backpack'],
  },
] as const;

export function getAllCategories(): readonly Category[] {
  return CATEGORIES;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  const normalized = slug.trim().toLowerCase();
  return CATEGORIES.find(
    (c) => c.slug.toLowerCase() === normalized || c.name.toLowerCase().includes(normalized)
  );
}

export function getProductsByCategorySlug(slug: string): Product[] {
  const category = getCategoryBySlug(slug);
  if (!category) return [];
  return PRODUCTS.filter((p) => category.productIds.includes(p.id));
}

export function getCategoryProductCount(slug: string): number {
  const category = getCategoryBySlug(slug);
  if (!category) return 0;
  return category.productIds.length;
}
