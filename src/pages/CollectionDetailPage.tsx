import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronRight,
  AlertCircle,
  ArrowUpDown,
  Search,
  Filter,
  X,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { getCollectionBySlug } from '../data/categories';
import { getProductsByCollection } from '../data/products';
import { ProductCard } from '../components/catalog/ProductCard';
import { useCartContext } from '../context/CartContext';
import { Product } from '../types';

export const CollectionDetailPage: React.FC = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const { getItemQuantity, addToCart } = useCartContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [sortBy, setSortBy] = useState<
    'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest'
  >('featured');

  const collection = getCollectionBySlug(slug);
  const rawProducts = useMemo(() => {
    return collection ? getProductsByCollection(collection.slug) : [];
  }, [collection]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...rawProducts];

    // Search within collection
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.features.some((f) => f.toLowerCase().includes(q)) ||
          p.tags?.some((t) => t.toLowerCase().includes(q)) ||
          p.keywords?.some((k) => k.toLowerCase().includes(q))
      );
    }

    // Min price filter
    if (typeof minPrice === 'number' && minPrice > 0) {
      result = result.filter((p) => p.price >= minPrice);
    }

    // Max price filter
    if (typeof maxPrice === 'number' && maxPrice > 0) {
      result = result.filter((p) => p.price <= maxPrice);
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
        result.reverse();
        break;
      case 'featured':
      default:
        // Keep natural curated order
        break;
    }

    return result;
  }, [rawProducts, searchQuery, minPrice, maxPrice, sortBy]);

  const hasActiveFilters = Boolean(
    searchQuery.trim() ||
      (typeof minPrice === 'number' && minPrice > 0) ||
      (typeof maxPrice === 'number' && maxPrice > 0) ||
      sortBy !== 'featured'
  );

  const clearFilters = () => {
    setSearchQuery('');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('featured');
  };

  if (!collection) {
    return (
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6 animate-fadeIn"
        data-testid="invalid-category-state"
      >
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" aria-hidden="true" />
        </div>
        <div className="space-y-2 max-w-md mx-auto">
          <h1 className="font-display text-2xl font-bold text-meridian-950">
            Collection Not Found
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed font-normal">
            The collection &quot;{slug}&quot; does not exist in our marketplace catalogue. Please browse our collection directory.
          </p>
        </div>
        <div>
          <Link
            to="/collections"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-meridian-900 text-white text-xs font-bold uppercase tracking-wider shadow-warm-sm hover:bg-meridian-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Collections</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 animate-fadeIn"
      data-testid="collection-detail-page"
    >
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb Navigation"
        data-testid="breadcrumb-navigation"
        className="flex items-center gap-2 text-xs text-slate-500"
      >
        <Link to="/" className="hover:text-meridian-950 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/collections" className="hover:text-meridian-950 transition-colors">
          Categories
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-bold text-meridian-950 truncate">{collection.name}</span>
      </nav>

      {/* Collection Header Banner */}
      <div className="relative rounded-3xl bg-meridian-900 text-white p-8 sm:p-12 overflow-hidden shadow-warm-lg">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              {collection.tagline}
            </span>
            <span className="text-xs text-slate-300 font-semibold">
              {rawProducts.length} Verified Products
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            {collection.name}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
            {collection.description}
          </p>

          <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Pure Integer INR Pricing • Deterministic State Management</span>
          </div>
        </div>
      </div>

      {/* Filtering and Search Controls Bar */}
      <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-warm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search within collection */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search in ${collection.name}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="collection-search-input"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Clear collection search input"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Min Price */}
          <div className="md:col-span-2">
            <input
              type="number"
              placeholder="Min Price (₹)"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : '')}
              data-testid="collection-price-min"
              min="0"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
            />
          </div>

          {/* Max Price */}
          <div className="md:col-span-2">
            <input
              type="number"
              placeholder="Max Price (₹)"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : '')}
              data-testid="collection-price-max"
              min="0"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
            />
          </div>

          {/* Sort By */}
          <div className="md:col-span-3 flex items-center gap-2">
            <label htmlFor="collection-sort" className="shrink-0 text-xs font-bold text-slate-700 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-cyan-600" />
              <span>Sort:</span>
            </label>
            <select
              id="collection-sort"
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as
                    | 'featured'
                    | 'price-asc'
                    | 'price-desc'
                    | 'name-asc'
                    | 'name-desc'
                    | 'newest'
                )
              }
              data-testid="collection-sort-select"
              className="w-full text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-xl px-3 py-2.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            >
              <option value="featured">Featured Essentials</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          <div className="md:col-span-1 flex justify-end">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                data-testid="clear-collection-filters-btn"
                className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 py-2 px-3 rounded-lg border border-red-200 hover:bg-red-50"
                title="Clear all filters"
              >
                <X className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Results summary bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>
            Showing <strong>{filteredProducts.length}</strong> of {rawProducts.length} products
          </span>
          {hasActiveFilters && (
            <span className="text-cyan-700 font-semibold flex items-center gap-1">
              <Filter className="w-3 h-3" />
              Active filters applied
            </span>
          )}
        </div>
      </div>

      {/* Product Grid or Empty State */}
      {filteredProducts.length > 0 ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          data-testid="collection-products-grid"
        >
          {filteredProducts.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantityInCart={getItemQuantity(product.id)}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      ) : (
        <div
          data-testid="empty-collection-results"
          className="rounded-3xl bg-white border border-slate-200/90 p-12 sm:p-20 text-center space-y-6 shadow-warm"
        >
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
            <Search className="w-8 h-8 text-slate-400" aria-hidden="true" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="font-display text-2xl font-bold text-meridian-950">
              No Matching Products Found
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed font-normal">
              No products in {collection.name} matched your filter criteria. Try adjusting your search term or price range.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-meridian-900 text-white text-xs font-bold uppercase tracking-wider shadow-warm-sm hover:bg-meridian-950 transition-colors"
            >
              <span>Reset Collection Filters</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Backward-compatible alias
export const CategoryDetailPage = CollectionDetailPage;
export default CollectionDetailPage;
