import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Shield,
  Award,
  Headphones,
  Shirt,
  Home,
  Briefcase,
  Activity,
  PenTool,
  CheckCircle2,
  Zap,
  TrendingUp,
  Clock,
  Layers,
  Send,
  Eye
} from 'lucide-react';
import { ProductGrid } from '../components/catalog/ProductGrid';
import { ProductCard } from '../components/catalog/ProductCard';
import { ProductArtwork } from '../components/catalog/ProductArtwork';
import { PRODUCTS } from '../data/products';
import { COLLECTIONS, getCollectionProductCount } from '../data/categories';
import { useCartContext } from '../context/CartContext';

export const LandingPage: React.FC = () => {
  const { getItemQuantity, addToCart } = useCartContext();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubmitted(true);
  };

  // Curated slices for the homepage ensuring no cross-section ID duplication
  const anchorHeadphones = PRODUCTS.find((p) => p.id === 'prod-aero-headphones')!;
  const anchorBackpack = PRODUCTS.find((p) => p.id === 'prod-urban-backpack')!;
  const otherFeatured = PRODUCTS.filter(
    (p) => p.id !== 'prod-aero-headphones' && p.id !== 'prod-urban-backpack' && p.tags?.includes('featured')
  );
  const featuredProducts = [anchorHeadphones, anchorBackpack, ...otherFeatured].filter(Boolean).slice(0, 6);
  const featuredIds = new Set(featuredProducts.map((p) => p.id));

  // Non-overlapping slices for other homepage showcase sections
  const trendingProducts = PRODUCTS.filter((p) => !featuredIds.has(p.id) && (p.badge === 'Trending' || p.tags?.includes('trending'))).slice(0, 4);
  const trendingIds = new Set([...featuredIds, ...trendingProducts.map((p) => p.id)]);

  const newArrivals = PRODUCTS.filter((p) => !trendingIds.has(p.id) && (p.badge === 'New' || p.tags?.includes('bestseller'))).slice(0, 4);
  const arrivalIds = new Set([...trendingIds, ...newArrivals.map((p) => p.id)]);

  const recentlyViewedSample = PRODUCTS.filter((p) => !arrivalIds.has(p.id)).slice(0, 4);

  const getCollectionIcon = (slug: string) => {
    switch (slug) {
      case 'electronics':
        return <Headphones className="w-6 h-6" aria-hidden="true" />;
      case 'fashion':
        return <Shirt className="w-6 h-6" aria-hidden="true" />;
      case 'home-living':
        return <Home className="w-6 h-6" aria-hidden="true" />;
      case 'bags-accessories':
        return <Briefcase className="w-6 h-6" aria-hidden="true" />;
      case 'fitness-lifestyle':
        return <Activity className="w-6 h-6" aria-hidden="true" />;
      case 'stationery':
        return <PenTool className="w-6 h-6" aria-hidden="true" />;
      default:
        return <Layers className="w-6 h-6" aria-hidden="true" />;
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 animate-fadeIn">
      {/* 1. Marketplace Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-meridian-950 via-meridian-900 to-meridian-950 text-white pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-meridian-800">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Headline & Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-meridian-800/80 text-cyan-300 text-xs font-semibold tracking-wider uppercase border border-cyan-500/30 shadow-warm-sm">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                <span>CartFlow 4.0 Multi-Collection Marketplace</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
                Everyday essentials.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 block mt-1">
                  Thoughtfully chosen.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Explore 30 curated products across six distinct departments. Built with pure integer currency arithmetic, resolution-independent vector artwork, and deterministic browser automation.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/explore"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-meridian-950 text-xs uppercase tracking-widest font-extrabold transition-all shadow-meridian hover:shadow-cyan-glow active:scale-95"
                >
                  <span>Explore 30 Products</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>

                <Link
                  to="/collections"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-meridian-800 hover:bg-meridian-700 text-white border border-meridian-700 text-xs uppercase tracking-widest font-bold transition-all shadow-warm-sm hover:border-slate-400"
                >
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Browse Collections</span>
                </Link>
              </div>

              {/* Engineering Metrics */}
              <div className="pt-8 border-t border-meridian-800/80 grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0">
                <div>
                  <span className="font-display text-2xl font-extrabold text-white block">30</span>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">Catalogue Items</span>
                </div>
                <div>
                  <span className="font-display text-2xl font-extrabold text-cyan-400 block">6</span>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">Collections</span>
                </div>
                <div>
                  <span className="font-display text-2xl font-extrabold text-emerald-400 block">100%</span>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">Integer Math</span>
                </div>
              </div>
            </div>

            {/* Right Showcase Hero Card (5 Cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl bg-meridian-800/80 p-5 border border-meridian-700/80 shadow-2xl backdrop-blur-md">
                <div className="rounded-2xl bg-white text-slate-800 p-6 sm:p-7 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs uppercase font-extrabold text-cyan-600 tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 fill-cyan-600" />
                      Featured Demonstration Item
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Verified Spec
                    </span>
                  </div>

                  {/* Artwork */}
                  <div className="w-full h-56 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center relative overflow-hidden">
                    <ProductArtwork
                      product={PRODUCTS[0]}
                      className="w-full h-full object-contain p-6 text-meridian-900"
                    />
                    <span className="absolute bottom-3 right-3 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-meridian-900 text-white">
                      {PRODUCTS[0].category}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-xl font-bold text-meridian-950">
                      {PRODUCTS[0].name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                      {PRODUCTS[0].description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 font-bold block">Fixed Price</span>
                      <span className="text-2xl font-extrabold text-meridian-950 font-sans">₹1,499</span>
                    </div>
                    <Link
                      to={`/product/${PRODUCTS[0].id}`}
                      className="px-5 py-2.5 rounded-xl bg-meridian-900 hover:bg-meridian-950 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-warm-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Six Collection Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="collections-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest block mb-1">
              Explore By Department
            </span>
            <h2 id="collections-heading" className="font-display text-3xl sm:text-4xl font-extrabold text-meridian-950 tracking-tight">
              Six Curated Collections
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/categories"
              className="text-xs font-bold text-slate-600 hover:text-cyan-700 inline-flex items-center gap-1 uppercase tracking-wider"
            >
              <span>Departments</span>
            </Link>
            <span className="text-slate-300">|</span>
            <Link
              to="/collections"
              className="text-xs font-bold text-cyan-600 hover:text-cyan-700 inline-flex items-center gap-1 uppercase tracking-wider"
            >
              <span>All Collections ({COLLECTIONS.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {COLLECTIONS.map((col) => {
            const count = getCollectionProductCount(col.slug);
            return (
              <Link
                key={col.slug}
                to={`/collection/${col.slug}`}
                className="group rounded-2xl bg-white border border-slate-200/90 p-6 shadow-warm hover:shadow-warm-lg hover:border-cyan-500/50 transition-all flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-meridian-900 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-warm-sm">
                  {getCollectionIcon(col.slug)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-meridian-950 group-hover:text-cyan-700 transition-colors">
                      {col.name}
                    </h3>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {count} items
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                    {col.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan-600 mt-3 group-hover:translate-x-1 transition-transform">
                    Explore Department &rarr;
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Main Product Grid (Required title "The Curated Collection" for QE-05 test locator) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductGrid
          products={featuredProducts.length > 0 ? featuredProducts : PRODUCTS.slice(0, 6)}
          getItemQuantity={getItemQuantity}
          onAddToCart={addToCart}
          title="The Curated Collection"
          subtitle="Precision-engineered demonstration essentials crafted for performance, durability, and daily elegance."
        />
      </section>

      {/* 4. Trending Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="trending-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-600 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-500" />
              <span>Community Highlights</span>
            </div>
            <h2 id="trending-heading" className="font-display text-3xl sm:text-4xl font-extrabold text-meridian-950">
              Trending Demonstration Items
            </h2>
          </div>
          <Link
            to="/explore"
            className="text-xs font-bold text-cyan-600 hover:text-cyan-700 uppercase tracking-wider inline-flex items-center gap-1"
          >
            <span>View All ({PRODUCTS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {trendingProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              quantityInCart={getItemQuantity(p.id)}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </section>

      {/* 5. New Arrivals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="new-arrivals-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              <span>Fresh Additions</span>
            </div>
            <h2 id="new-arrivals-heading" className="font-display text-3xl sm:text-4xl font-extrabold text-meridian-950">
              New Marketplace Arrivals
            </h2>
          </div>
          <Link
            to="/explore?sort=newest"
            className="text-xs font-bold text-cyan-600 hover:text-cyan-700 uppercase tracking-wider inline-flex items-center gap-1"
          >
            <span>See New Arrivals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {newArrivals.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              quantityInCart={getItemQuantity(p.id)}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </section>

      {/* 6. Recently Viewed / Quick Discovery Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="recent-heading">
        <div className="flex items-center justify-between pb-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-cyan-600" />
            <h2 id="recent-heading" className="font-display text-2xl font-bold text-meridian-950">
              Recently Viewed Showcase
            </h2>
          </div>
          <span className="text-xs text-slate-400">Curated Demonstration History</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {recentlyViewedSample.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              quantityInCart={getItemQuantity(p.id)}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </section>

      {/* 7. Newsletter Demo Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-meridian-900 text-white p-8 sm:p-14 shadow-warm-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              Demonstration Newsletter
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              Stay Informed on Marketplace Releases
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Subscribe to simulate release updates. This is an interactive frontend demonstration: no email data is stored, transmitted, or shared.
            </p>

            {newsletterSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-semibold inline-flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Simulation complete: Subscription dispatched locally to demonstration state!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white text-slate-800 text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  aria-label="Email address for demonstration newsletter"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-meridian-950 text-xs font-bold uppercase tracking-wider transition-all shadow-warm-sm active:scale-95 inline-flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe</span>
                </button>
              </form>
            )}

            <div className="pt-2 text-[11px] text-slate-400">
              <span>Client-Side UI Simulation • Zero Tracking Cookies</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Marketplace Trust Information Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-14 shadow-warm">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-600">
              Platform Engineering
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-meridian-950">
              Designed for Convenience. Verified for Precision.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              CartFlow combines the rich exploration of a modern retail marketplace with the rigorous deterministic testing standards expected in enterprise quality engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-slate-100">
            <div className="space-y-2 text-center md:text-left">
              <div className="w-10 h-10 rounded-xl bg-meridian-50 border border-meridian-100 flex items-center justify-center text-meridian-900 mx-auto md:mx-0 shadow-warm-sm">
                <Award className="w-5 h-5 text-cyan-600" aria-hidden="true" />
              </div>
              <h4 className="font-display text-base font-bold text-meridian-950">Deterministic Math</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Pure integer arithmetic strictly eliminates IEEE 754 floating-point rounding errors.</p>
            </div>

            <div className="space-y-2 text-center md:text-left">
              <div className="w-10 h-10 rounded-xl bg-meridian-50 border border-meridian-100 flex items-center justify-center text-meridian-900 mx-auto md:mx-0 shadow-warm-sm">
                <Zap className="w-5 h-5 text-emerald-600" aria-hidden="true" />
              </div>
              <h4 className="font-display text-base font-bold text-meridian-950">Double-Click Guard</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Synchronous useRef lock intercepts duplicate submissions before React re-render cycles.</p>
            </div>

            <div className="space-y-2 text-center md:text-left">
              <div className="w-10 h-10 rounded-xl bg-meridian-50 border border-meridian-100 flex items-center justify-center text-meridian-900 mx-auto md:mx-0 shadow-warm-sm">
                <Shield className="w-5 h-5 text-cyan-600" aria-hidden="true" />
              </div>
              <h4 className="font-display text-base font-bold text-meridian-950">Transparent Pricing</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Exact integer Indian Rupee (₹) pricing with zero hidden delivery charges or fees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Closing CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-3xl bg-meridian-950 text-white p-10 sm:p-16 space-y-6 shadow-warm-lg border border-meridian-800">
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to experience CartFlow 4.0?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto">
            Explore 30 products across six departments and test our competition-grade deterministic checkout engine.
          </p>
          <div className="pt-2">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-meridian-950 text-xs uppercase tracking-widest font-extrabold transition-all shadow-meridian"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
