import { Category, Collection, Product } from '../types';
import { getProductsByCollection } from './products';

/**
 * Six Marketplace Collections:
 * 1. Electronics (6 products)
 * 2. Fashion (5 products)
 * 3. Home & Living (5 products)
 * 4. Bags & Accessories (5 products, aliases: ['accessories'])
 * 5. Fitness & Lifestyle (5 products)
 * 6. Stationery (4 products)
 * Total: Exactly 30 products
 */
export const COLLECTIONS: readonly Collection[] = [
  {
    slug: 'electronics',
    name: 'Electronics & Audio',
    description: 'Studio-grade acoustics, immersive noise cancellation, smart wearables, and streamlined workspace essentials.',
    tagline: 'Precision Acoustic & Workspace Tech',
    iconName: 'Headphones',
    aliases: ['electronics', 'audio', 'tech']
  },
  {
    slug: 'fashion',
    name: 'Fashion & Apparel',
    description: 'Breathable organic flax linen, superfine merino knitwear, tailored stretch chinos, and minimalist leather accents.',
    tagline: 'Timeless Natural Fabrics & Tailoring',
    iconName: 'Shirt',
    aliases: ['fashion', 'apparel', 'clothing']
  },
  {
    slug: 'home-living',
    name: 'Home & Living',
    description: 'Artisan stoneware pour-over brewers, washed Belgian linen textiles, ultrasonic aroma diffusers, and soy wax candles.',
    tagline: 'Thoughtful Living & Sanctuary Goods',
    iconName: 'Home',
    aliases: ['home-living', 'home', 'living']
  },
  {
    slug: 'bags-accessories',
    name: 'Bags & Accessories',
    description: 'Weatherproof commuter backpacks, structured 16oz waxed canvas totes, RFID-blocking bifolds, and acetate sunglasses.',
    tagline: 'Engineered Utility & Everyday Carry',
    iconName: 'Briefcase',
    aliases: ['bags-accessories', 'accessories', 'bags']
  },
  {
    slug: 'fitness-lifestyle',
    name: 'Fitness & Lifestyle',
    description: 'Natural antimicrobial cork yoga mats, vacuum-insulated sports flasks, woven resistance loops, and speed jump ropes.',
    tagline: 'Mindful Movement & Daily Vitality',
    iconName: 'Activity',
    aliases: ['fitness-lifestyle', 'fitness', 'lifestyle', 'wellness']
  },
  {
    slug: 'stationery',
    name: 'Stationery & Writing',
    description: 'Bleed-proof 160 GSM dot-grid notebooks, solid CNC-machined brass pens, dual-sided desk pads, and acrylic reading stands.',
    tagline: 'Analog Craft & Creative Focus',
    iconName: 'PenTool',
    aliases: ['stationery', 'writing', 'office', 'books']
  }
] as const;

// Backwards compatibility alias
export const CATEGORIES: readonly Category[] = COLLECTIONS;

export function getAllCategories(): readonly Category[] {
  return COLLECTIONS;
}

export function getAllCollections(): readonly Collection[] {
  return COLLECTIONS;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase();
  return COLLECTIONS.find(
    (c) =>
      c.slug.toLowerCase() === normalized ||
      c.aliases?.includes(normalized) ||
      c.name.toLowerCase().includes(normalized)
  );
}

export const getCollectionBySlug = getCategoryBySlug;

export function getProductsByCategorySlug(slug: string): Product[] {
  const category = getCategoryBySlug(slug);
  if (!category) return [];
  return getProductsByCollection(category.slug);
}

export const getProductsByCollectionSlug = getProductsByCategorySlug;

export function getCategoryProductCount(slug: string): number {
  return getProductsByCategorySlug(slug).length;
}

export const getCollectionProductCount = getCategoryProductCount;
