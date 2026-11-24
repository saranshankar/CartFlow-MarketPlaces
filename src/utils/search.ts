import { Product } from '../types';
import { PRODUCTS } from '../data/products';

export interface SearchOptions {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest';
}

/**
 * Searches and filters the product catalog across names, categories, descriptions, features, and tags.
 * Performs case-insensitive matching and handles price filters.
 */
export function searchProducts(options: SearchOptions = {}): Product[] {
  const { query = '', category = '', minPrice, maxPrice, sortBy = 'featured' } = options;
  const cleanQuery = query.trim().toLowerCase();
  const cleanCategory = category.trim().toLowerCase();

  let results = PRODUCTS.filter((product) => {
    // 1. Category / Collection Filter
    if (cleanCategory && cleanCategory !== 'all') {
      const catLower = product.category.toLowerCase();
      const collLower = (product.collectionSlug || '').toLowerCase();

      const matchCategory =
        collLower === cleanCategory ||
        catLower === cleanCategory ||
        catLower.includes(cleanCategory) ||
        (cleanCategory === 'accessories' && (collLower === 'bags-accessories' || catLower.includes('accessories'))) ||
        (cleanCategory === 'bags-accessories' && (collLower === 'accessories' || catLower.includes('accessories'))) ||
        (cleanCategory === 'home' && collLower === 'home-living') ||
        (cleanCategory === 'fitness' && collLower === 'fitness-lifestyle');

      if (!matchCategory) return false;
    }

    // 2. Price Boundary Filters
    if (minPrice !== undefined && minPrice > 0 && product.price < minPrice) {
      return false;
    }
    if (maxPrice !== undefined && maxPrice > 0 && product.price > maxPrice) {
      return false;
    }

    // 3. Search Query Matching (Name, Category, Description, Features, Tags, Keywords)
    if (!cleanQuery) return true;

    const nameMatch = product.name.toLowerCase().includes(cleanQuery);
    const descMatch = product.description.toLowerCase().includes(cleanQuery);
    const catMatch = product.category.toLowerCase().includes(cleanQuery);
    const featureMatch = product.features.some((f) => f.toLowerCase().includes(cleanQuery));
    const tagMatch = (product.tags || []).some((t) => t.toLowerCase().includes(cleanQuery));
    const keywordMatch = (product.keywords || []).some((k) => k.toLowerCase().includes(cleanQuery));

    return nameMatch || descMatch || catMatch || featureMatch || tagMatch || keywordMatch;
  });

  // 4. Sorting
  if (sortBy === 'price-asc') {
    results = [...results].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    results = [...results].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name-asc') {
    results = [...results].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'name-desc') {
    results = [...results].sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortBy === 'newest') {
    results = [...results].sort((a, b) => {
      const aNew = a.badge?.toLowerCase() === 'new' ? 1 : 0;
      const bNew = b.badge?.toLowerCase() === 'new' ? 1 : 0;
      return bNew - aNew;
    });
  }

  return results;
}

/**
 * Returns instant autocomplete suggestions based on query string.
 */
export function getSearchSuggestions(query: string): Product[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return [];
  return PRODUCTS.filter((p) => {
    return (
      p.name.toLowerCase().includes(clean) ||
      p.category.toLowerCase().includes(clean) ||
      p.description.toLowerCase().includes(clean) ||
      (p.tags || []).some((t) => t.toLowerCase().includes(clean)) ||
      (p.keywords || []).some((k) => k.toLowerCase().includes(clean))
    );
  }).slice(0, 6);
}
