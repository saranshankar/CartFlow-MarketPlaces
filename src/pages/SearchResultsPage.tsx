import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, X, ArrowUpDown, ShoppingBag, ArrowRight } from 'lucide-react';
import { ProductCard } from '../components/catalog/ProductCard';
import { useCartContext } from '../context/CartContext';
import { searchProducts, SearchOptions } from '../utils/search';
import { COLLECTIONS } from '../data/categories';

export const SearchResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getItemQuantity, addToCart, itemCount } = useCartContext();

  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'all';
  const sortBy = (searchParams.get('sort') as SearchOptions['sortBy']) || 'featured';

  const products = useMemo(() => {
    return searchProducts({
      query,
      category,
      sortBy
    });
  }, [query, category, sortBy]);

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value && value !== 'all' && value !== 'featured') {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    setSearchParams(next);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 animate-fadeIn"
      data-testid="search-results-page"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-600">
            <Search className="w-4 h-4 text-cyan-500" aria-hidden="true" />
            <span>Marketplace Search Index</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-meridian-950">
            {query ? `Search: "${query}"` : 'Marketplace Search'}
          </h1>
          <p className="text-sm text-slate-500 font-normal">
            {products.length} {products.length === 1 ? 'result' : 'results'} discovered across our 30-item multi-collection catalogue.
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <label htmlFor="search-sort" className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <ArrowUpDown className="w-3.5 h-3.5 text-cyan-600" />
            <span>Sort:</span>
          </label>
          <select
            id="search-sort"
            data-testid="search-sort-select"
            value={sortBy}
            onChange={(e) => updateParam('sort', e.target.value)}
            className="text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-xl px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
          >
            <option value="featured">Relevance / Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold" data-testid="search-category-filter-chips">
          <button
            type="button"
            onClick={() => updateParam('category', 'all')}
            className={`px-3.5 py-1.5 rounded-full transition-all border ${
              category === 'all'
                ? 'bg-meridian-900 text-white border-meridian-900 shadow-warm-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            All Collections
          </button>
          {COLLECTIONS.map((col) => {
            const isSelected = category.toLowerCase() === col.slug.toLowerCase();
            return (
              <button
                key={col.slug}
                type="button"
                onClick={() => updateParam('category', col.slug)}
                className={`px-3.5 py-1.5 rounded-full transition-all border ${
                  isSelected
                    ? 'bg-meridian-900 text-white border-meridian-900 shadow-warm-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {col.name}
              </button>
            );
          })}
        </div>

        {(query || (category && category !== 'all') || (sortBy && sortBy !== 'featured')) && (
          <button
            type="button"
            onClick={clearAllFilters}
            data-testid="clear-all-filters-btn"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition-colors py-1.5 px-3 rounded-lg border border-red-200 hover:bg-red-50"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      {/* Query Banner */}
      {query && (
        <div
          data-testid="search-results-banner"
          className="rounded-2xl bg-cyan-50/70 border border-cyan-200 px-5 py-3 flex items-center justify-between text-xs text-cyan-950"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-cyan-600 shrink-0" />
            <span>
              Showing results for: <strong>&quot;{query}&quot;</strong> ({products.length} found)
            </span>
          </div>
          <button
            type="button"
            onClick={() => updateParam('q', '')}
            className="p-1 rounded-md text-cyan-700 hover:text-cyan-900"
            aria-label="Remove search query"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Products Grid or Empty State */}
      {products.length > 0 ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          data-testid="product-catalog-grid"
        >
          {products.map((product) => (
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
          data-testid="no-search-results"
          className="rounded-3xl bg-white border border-slate-200/90 p-12 sm:p-20 text-center space-y-6 shadow-warm"
        >
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
            <Search className="w-8 h-8 text-slate-400" aria-hidden="true" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="font-display text-2xl font-bold text-meridian-950">
              No Products Found
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed font-normal">
              We couldn&apos;t find any items matching &quot;{query}&quot;. Try searching for &quot;headphones&quot;, &quot;backpack&quot;, &quot;linen&quot;, &quot;yoga&quot;, or clear filters.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={clearAllFilters}
              data-testid="no-results-clear-btn"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-meridian-900 text-white text-xs font-bold uppercase tracking-wider shadow-warm-sm"
            >
              <span>Reset Search &amp; Filters</span>
            </button>
          </div>
        </div>
      )}

      {/* Bag preview */}
      {itemCount > 0 && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-warm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-meridian-900 text-cyan-400 flex items-center justify-center font-bold text-xs shadow-warm-sm">
              {itemCount}
            </div>
            <div>
              <span className="text-sm font-bold text-meridian-950 block">
                {itemCount} {itemCount === 1 ? 'item' : 'items'} in your shopping bag
              </span>
              <span className="text-xs text-slate-500">Ready to review and proceed to checkout</span>
            </div>
          </div>

          <Link
            to="/cart"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-meridian-900 hover:bg-meridian-950 text-white text-xs uppercase tracking-wider font-bold transition-all shadow-warm-sm active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-cyan-400" aria-hidden="true" />
            <span>Review Bag &amp; Checkout</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
