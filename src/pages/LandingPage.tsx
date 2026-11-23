import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, HeartHandshake, Award } from 'lucide-react';
import { ProductGrid } from '../components/catalog/ProductGrid';
import { PRODUCTS } from '../data/products';
import { useCartContext } from '../context/CartContext';

export const LandingPage: React.FC = () => {
  const { getItemQuantity, addToCart } = useCartContext();

  return (
    <div className="space-y-20 sm:space-y-28 pb-16 animate-fadeIn">
      {/* Editorial Luxury Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-16 pb-12 sm:pb-20 border-b border-warmgrey/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Headline & Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand text-forest-800 text-xs font-semibold tracking-wider uppercase border border-warmgrey">
                <Sparkles className="w-3.5 h-3.5 text-terracotta-500" aria-hidden="true" />
                <span>Modern Organic Lifestyle</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-charcoal tracking-tight leading-[1.1]">
                Everyday essentials.{' '}
                <span className="italic font-normal text-forest-700 block">
                  Thoughtfully chosen.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-olive max-w-xl leading-relaxed">
                Discover the intentional pieces crafted to make everyday living feel effortless, enduring, and quietly luxurious.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-forest-800 hover:bg-forest-900 text-ivory text-xs uppercase tracking-widest font-semibold transition-all shadow-warm hover:shadow-warm-lg active:scale-95"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>

                <Link
                  to="/cart"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-sand text-charcoal border border-warmgrey text-xs uppercase tracking-widest font-semibold transition-all shadow-warm-sm hover:border-olive/60"
                >
                  <span>View Shopping Bag</span>
                </Link>
              </div>

              {/* Editorial Metrics Banner */}
              <div className="pt-8 border-t border-warmgrey/70 grid grid-cols-3 gap-6 max-w-lg">
                <div>
                  <span className="font-serif text-2xl font-bold text-charcoal block">4.9 ★</span>
                  <span className="text-[11px] text-olive uppercase tracking-wider">Curated Rating</span>
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold text-charcoal block">2</span>
                  <span className="text-[11px] text-olive uppercase tracking-wider">Fixed Essentials</span>
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold text-charcoal block">100%</span>
                  <span className="text-[11px] text-olive uppercase tracking-wider">Deterministic</span>
                </div>
              </div>
            </div>

            {/* Right Editorial Composition (5 Cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl bg-sand p-4 border border-warmgrey shadow-warm-xl overflow-hidden">
                <div className="rounded-2xl bg-white p-6 sm:p-8 space-y-6">
                  {/* Decorative Organic Visual Frame */}
                  <div className="w-full h-64 rounded-xl bg-ivory border border-warmgrey/80 flex items-center justify-center relative overflow-hidden">
                    <svg viewBox="0 0 200 200" className="w-48 h-48 text-forest-800/80" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="100" cy="100" r="70" fill="#EDE7DC" opacity="0.6" />
                      <path d="M60 110 C60 70 140 70 140 110" stroke="#183D32" strokeWidth="8" strokeLinecap="round" />
                      <rect x="50" y="100" width="22" height="40" rx="10" fill="#245343" />
                      <rect x="128" y="100" width="22" height="40" rx="10" fill="#245343" />
                      <circle cx="100" cy="140" r="15" fill="#C87552" opacity="0.8" />
                    </svg>
                    <span className="absolute bottom-3 right-3 text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-forest-800 text-ivory">
                      Bespoke Craft
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] uppercase tracking-widest font-bold text-terracotta-500 block mb-1">
                      Featured Essential
                    </span>
                    <h3 className="font-serif text-xl font-bold text-charcoal">
                      Aero Wireless Headphones
                    </h3>
                    <p className="text-xs text-olive mt-1 leading-relaxed">
                      Engineered for timeless acoustic clarity and calm ritual listening.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductGrid
          products={PRODUCTS}
          getItemQuantity={getItemQuantity}
          onAddToCart={addToCart}
          title="The Curated Collection"
          subtitle="Explore our two fixed-price synthetic items crafted to evaluate precision and elegance."
        />
      </section>

      {/* Brand Story Editorial Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-sand/60 border border-warmgrey p-8 sm:p-14">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-terracotta-500">
              The Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              Less, but better. Always.
            </h2>
            <p className="text-sm sm:text-base text-olive leading-relaxed font-normal">
              CartFlow was conceived around the belief that true luxury is not found in an endless catalogue of noise, but in a small number of impeccably resolved pieces that deliver absolute reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-warmgrey">
            <div className="space-y-2 text-center md:text-left">
              <div className="w-10 h-10 rounded-full bg-white border border-warmgrey flex items-center justify-center text-forest-800 mx-auto md:mx-0 shadow-warm-sm">
                <Award className="w-5 h-5 text-forest-800" aria-hidden="true" />
              </div>
              <h4 className="font-serif text-base font-bold text-charcoal">Thoughtful Selection</h4>
              <p className="text-xs text-olive leading-relaxed">Every item represents hours of refinement, materials research, and purpose.</p>
            </div>

            <div className="space-y-2 text-center md:text-left">
              <div className="w-10 h-10 rounded-full bg-white border border-warmgrey flex items-center justify-center text-forest-800 mx-auto md:mx-0 shadow-warm-sm">
                <HeartHandshake className="w-5 h-5 text-forest-800" aria-hidden="true" />
              </div>
              <h4 className="font-serif text-base font-bold text-charcoal">Frictionless Experience</h4>
              <p className="text-xs text-olive leading-relaxed">Deterministic calculations, instant state updates, and clean customer recovery.</p>
            </div>

            <div className="space-y-2 text-center md:text-left">
              <div className="w-10 h-10 rounded-full bg-white border border-warmgrey flex items-center justify-center text-forest-800 mx-auto md:mx-0 shadow-warm-sm">
                <Shield className="w-5 h-5 text-forest-800" aria-hidden="true" />
              </div>
              <h4 className="font-serif text-base font-bold text-charcoal">Transparent Pricing</h4>
              <p className="text-xs text-olive leading-relaxed">Exact integer Indian Rupee (₹) arithmetic without hidden markups or unexpected fees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-3xl bg-forest-900 text-ivory p-10 sm:p-16 space-y-6 shadow-warm-lg">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            Ready to experience CartFlow?
          </h2>
          <p className="text-sm sm:text-base text-sand/80 max-w-lg mx-auto">
            Explore our curated collection and test our competition-grade deterministic checkout engine.
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-ivory text-forest-900 text-xs uppercase tracking-widest font-semibold hover:bg-sand transition-all shadow-warm"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
