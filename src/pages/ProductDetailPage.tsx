import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronRight,
  Plus,
  Minus,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Check,
  AlertCircle,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCartContext } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../utils/currency';
import { ProductCard } from '../components/catalog/ProductCard';
import { ProductArtwork } from '../components/catalog/ProductArtwork';
import { DemoFeedbackSection } from '../components/pdp/DemoFeedbackSection';

export const ProductDetailPage: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const { addToCart, getItemQuantity } = useCartContext();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // Lookup in central 30-product catalog
  const product = PRODUCTS.find(
    (p) => p.id === id || p.slug === id || p.id === `prod-${id}` || p.name.toLowerCase().includes(id.toLowerCase())
  );

  // Find related products from the same collection
  const relatedProducts = product
    ? PRODUCTS.filter(
        (p) =>
          (p.collectionSlug === product.collectionSlug || p.category === product.category) &&
          p.id !== product.id
      ).slice(0, 3)
    : [];
  const wishlisted = product ? isInWishlist(product.id) : false;

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleIncrement = () => {
    if (quantity < 10) setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  if (!product) {
    return (
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6 animate-fadeIn"
        data-testid="invalid-product-state"
      >
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto shadow-warm-sm">
          <AlertCircle className="w-8 h-8" aria-hidden="true" />
        </div>
        <div className="space-y-2 max-w-md mx-auto">
          <h1 className="font-display text-3xl font-bold text-meridian-950">
            Product Not Found
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed font-normal">
            The requested product ID &quot;{id}&quot; does not match our synthetic catalog. Our catalog consists strictly of two verified essentials.
          </p>
        </div>
        <div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-meridian-900 text-white text-xs font-bold uppercase tracking-wider shadow-warm-sm hover:bg-meridian-950 transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>Return to Marketplace Catalogue</span>
          </Link>
        </div>
      </div>
    );
  }

  const categorySlug =
    product.collectionSlug ||
    (product.category.toLowerCase().includes('elec') ? 'electronics' : 'accessories');

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12 sm:space-y-16 animate-fadeIn"
      data-testid="product-detail-page"
    >
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb Navigation" data-testid="pdp-breadcrumbs" className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-meridian-950 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/categories" className="hover:text-meridian-950 transition-colors">
          Categories
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to={`/category/${categorySlug}`} className="hover:text-meridian-950 transition-colors">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-bold text-meridian-950 truncate">{product.name}</span>
      </nav>

      {/* Main Product Showcase (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Visual Artwork Frame (6 Cols) */}
        <div className="lg:col-span-6 rounded-3xl bg-white border border-slate-200 p-8 shadow-warm flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-meridian-900 text-white shadow-warm-sm">
              {product.badge || 'Essential'}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200">
              {product.category}
            </span>
          </div>

          <div className="w-full flex items-center justify-center py-4">
            <ProductArtwork
              product={product}
              className="w-full h-full max-h-96 object-contain p-8 text-meridian-900"
            />
          </div>
        </div>

        {/* Right Column: Purchasing & Specifications Hub (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3 pb-6 border-b border-slate-200">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-cyan-500" />
              <span>Verified Synthetic Specification</span>
            </div>

            <h1
              data-testid="pdp-product-name"
              className="font-display text-3xl sm:text-4xl font-extrabold text-meridian-950 tracking-tight"
            >
              {product.name}
            </h1>

            <div className="flex items-baseline gap-4 pt-1">
              <span
                data-testid="pdp-product-price"
                className="text-3xl sm:text-4xl font-extrabold text-meridian-950 tabular-nums font-sans"
              >
                {formatCurrency(product.price)}
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Pure Fixed Price • Zero Fees
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-normal pt-2">
              {product.description}
            </p>
          </div>

          {/* Factual Features Checklist */}
          <div className="space-y-3 pb-6 border-b border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Verified Feature Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity Selector & Add to Bag Actions */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <label htmlFor="pdp-qty-stepper" className="text-xs font-bold text-slate-700">
                Quantity:
              </label>

              {/* Accessible Quantity Stepper */}
              <div
                id="pdp-qty-stepper"
                role="group"
                aria-label="Quantity selector"
                className="flex items-center rounded-xl bg-slate-100 border border-slate-200 p-1"
              >
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  data-testid="pdp-qty-decrement"
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-slate-800 transition-all ${
                    quantity <= 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white shadow-warm-sm active:scale-95'
                  }`}
                >
                  <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                </button>

                <span
                  data-testid="pdp-qty-value"
                  className="w-10 text-center text-sm font-bold text-meridian-950 tabular-nums select-none"
                  aria-live="polite"
                >
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={handleIncrement}
                  disabled={quantity >= 10}
                  aria-label="Increase quantity"
                  data-testid="pdp-qty-increment"
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-slate-800 transition-all ${
                    quantity >= 10 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white shadow-warm-sm active:scale-95'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>

              <span className="text-xs text-slate-500 font-semibold">
                Subtotal: <strong className="text-meridian-950">{formatCurrency(product.price * quantity)}</strong>
              </span>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                aria-label={`Add ${quantity} ${product.name} to cart`}
                data-testid="pdp-add-to-cart"
                className={`w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-4 px-8 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-meridian active:scale-95 ${
                  justAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-meridian-900 hover:bg-meridian-950 text-white'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added {quantity} to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-cyan-400" />
                    <span>Add to Bag • {formatCurrency(product.price * quantity)}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
                data-testid="pdp-toggle-wishlist"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all active:scale-95 ${
                  wishlisted
                    ? 'bg-cyan-50 border-cyan-400 text-cyan-700 shadow-warm-sm'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${wishlisted ? 'fill-cyan-600 text-cyan-600' : 'text-slate-500'}`}
                  aria-hidden="true"
                />
                <span>{wishlisted ? 'Saved' : 'Wishlist'}</span>
              </button>
            </div>

            {/* In-Stock & SDET Quality Guarantee */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-slate-700">Deterministic Engine Verified</span>
              </div>
              <span className="text-[11px] text-slate-400">Pure integer settlement</span>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Feedback & Review Section (Phase 3B) */}
      <DemoFeedbackSection productId={product.id} productName={product.name} />

      {/* Related Discovery Section */}
      {relatedProducts.length > 0 && (
        <section aria-labelledby="related-heading" className="space-y-6 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-600 block mb-1">
                More in {product.category}
              </span>
              <h2 id="related-heading" className="font-display text-2xl font-bold text-meridian-950">
                Related Marketplace Essentials
              </h2>
            </div>
            <Link
              to={`/category/${categorySlug}`}
              className="text-xs font-bold text-cyan-600 hover:text-cyan-700 uppercase tracking-wider"
            >
              View Full Collection &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard
                key={rel.id}
                product={rel}
                quantityInCart={getItemQuantity(rel.id)}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
