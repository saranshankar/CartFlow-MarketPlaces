import { Product } from '../types';
import { PRODUCTS } from '../data/products';

export interface SearchOptions {
  query?: string;
  category?: string;
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';
}

/**
 * Searches and filters the synthetic product catalog using case-insensitive matching.
 * Trims leading and trailing whitespace.
 */
export function searchProducts(options: SearchOptions = {}): Product[] {
  const { query = '', category = '', sortBy = 'featured' } = options;
  const cleanQuery = query.trim().toLowerCase();
  const cleanCategory = category.trim().toLowerCase();

  let results = PRODUCTS.filter((product) => {
    // 1. Category Filter
    if (cleanCategory && cleanCategory !== 'all') {
      const matchCategory =
        product.category.toLowerCase().includes(cleanCategory) ||
        (cleanCategory === 'electronics' && product.category.toLowerCase() === 'electronics') ||
        (cleanCategory === 'accessories' && product.category.toLowerCase() === 'accessories');

      if (!matchCategory) return false;
    }

    // 2. Query matching (Name, Description, Category, Features)
    if (!cleanQuery) return true;

    const nameMatch = product.name.toLowerCase().includes(cleanQuery);
    const descMatch = product.description.toLowerCase().includes(cleanQuery);
    const catMatch = product.category.toLowerCase().includes(cleanQuery);
    const featureMatch = product.features.some((f) => f.toLowerCase().includes(cleanQuery));

    return nameMatch || descMatch || catMatch || featureMatch;
  });

  // 3. Sorting
  if (sortBy === 'price-asc') {
    results = [...results].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    results = [...results].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name-asc') {
    results = [...results].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'name-desc') {
    results = [...results].sort((a, b) => b.name.localeCompare(a.name));
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
      p.description.toLowerCase().includes(clean)
    );
  });
}
