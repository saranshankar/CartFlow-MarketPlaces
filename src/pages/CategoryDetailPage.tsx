import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, AlertCircle, ArrowUpDown } from 'lucide-react';
import { getCategoryBySlug, getProductsByCategorySlug } from '../data/categories';
import { ProductCard } from '../components/catalog/ProductCard';
import { useCartContext } from '../context/CartContext';
import { Product } from '../types';

export const CategoryDetailPage: React.FC = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const { getItemQuantity, addToCart } = useCartContext();
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name-asc'>('featured');

  const category = getCategoryBySlug(slug);
  const rawProducts = category ? getProductsByCategorySlug(slug) : [];

  // Sorting
  const sortedProducts: Product[] = [...rawProducts];
  if (sortBy === 'price-asc') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name-asc') {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6 animate-fadeIn" data-testid="invalid-category-state">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" aria-hidden="true" />
        </div>
        <div className="space-y-2 max-w-md mx-auto">
          <h1 className="font-display text-2xl font-bold text-meridian-950">
            Category Not Found
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed font-normal">
            The department &quot;{slug}&quot; does not exist in our synthetic catalog. Please browse our directory.
          </p>
        </div>
        <div>
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-meridian-900 text-white text-xs font-bold uppercase tracking-wider shadow-warm-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Categories</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 animate-fadeIn" data-testid="category-detail-page">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb Navigation" data-testid="breadcrumb-navigation" className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-meridian-950 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/categories" className="hover:text-meridian-950 transition-colors">
          Categories
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-bold text-meridian-950 truncate">{category.name}</span>
      </nav>

      {/* Category Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-600 block">
            {category.tagline}
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-meridian-950">
            {category.name}
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed font-normal pt-1">
            {category.description}
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
          <label htmlFor="category-sort" className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <ArrowUpDown className="w-3.5 h-3.5 text-cyan-600" />
            <span>Sort by:</span>
          </label>
          <select
            id="category-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'name-asc')}
            className="text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-xl px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus-visible:ring-cyan-500/20"
          >
            <option value="featured">Featured Essentials</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
          </select>
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-testid="category-products-grid">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantityInCart={getItemQuantity(product.id)}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};
