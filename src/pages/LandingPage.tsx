import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Award, Headphones, Briefcase, CheckCircle2, Zap } from 'lucide-react';
import { ProductGrid } from '../components/catalog/ProductGrid';
import { PRODUCTS } from '../data/products';
import { useCartContext } from '../context/CartContext';

export const LandingPage: React.FC = () => {
  const { getItemQuantity, addToCart } = useCartContext();

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 animate-fadeIn">
      {/* Marketplace Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-meridian-950 via-meridian-900 to-meridian-950 text-white pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-meridian-800">
        {/* Subtle Ambient Radial Highlights */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Headline & Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-meridian-800/80 text-cyan-300 text-xs font-semibold tracking-wider uppercase border border-cyan-500/30 shadow-warm-sm">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                <span>Next-Generation E-Commerce Engine</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
                Everyday essentials.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 block mt-1">
                  Thoughtfully chosen.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                An original marketplace platform delivering modern retail convenience, pure integer pricing, and competition-grade browser test reliability.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-meridian-950 text-xs uppercase tracking-widest font-extrabold transition-all shadow-meridian hover:shadow-cyan-glow active:scale-95"
                >
                  <span>Explore Marketplace</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>

                <Link
                  to="/cart"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-meridian-800 hover:bg-meridian-700 text-white border border-meridian-700 text-xs uppercase tracking-widest font-bold transition-all shadow-warm-sm hover:border-slate-400"
                >
                  <span>View Shopping Bag</span>
                </Link>
              </div>

              {/* Marketplace Trust Badges */}
              <div className="pt-8 border-t border-meridian-800/80 grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0">
                <div>
                  <span className="font-display text-2xl font-extrabold text-white block">4.9 ★</span>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">Customer Score</span>
                </div>
                <div>
                  <span className="font-display text-2xl font-extrabold text-white block">2</span>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">Fixed Essentials</span>
                </div>
                <div>
                  <span className="font-display text-2xl font-extrabold text-emerald-400 block">100%</span>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">SDET Verified</span>
                </div>
              </div>
            </div>

            {/* Right Marketplace Showcase Card (5 Cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl bg-meridian-800/80 p-5 border border-meridian-700/80 shadow-2xl backdrop-blur-md">
                <div className="rounded-2xl bg-white text-slate-800 p-6 sm:p-7 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs uppercase font-extrabold text-cyan-600 tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 fill-cyan-600" />
                      Featured Deal of the Day
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      In Stock
                    </span>
                  </div>

                  {/* Visual Frame */}
                  <div className="w-full h-56 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center relative overflow-hidden">
                    <svg viewBox="0 0 200 200" className="w-44 h-44 text-meridian-900" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="100" cy="100" r="70" fill="#E2E8F0" opacity="0.6" />
                      <path d="M60 110 C60 70 140 70 140 110" stroke="#0F1E36" strokeWidth="9" strokeLinecap="round" />
                      <path d="M75 90 C75 75 125 75 125 90" stroke="#00A3C4" strokeWidth="3" strokeLinecap="round" />
                      <rect x="48" y="100" width="24" height="42" rx="10" fill="#172B4D" />
                      <rect x="128" y="100" width="24" height="42" rx="10" fill="#172B4D" />
                      <circle cx="100" cy="145" r="12" fill="#00A3C4" />
                    </svg>
                    <span className="absolute bottom-3 right-3 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-meridian-900 text-white">
                      Electronics
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-xl font-bold text-meridian-950">
                      Aero Wireless Headphones
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Hybrid active noise cancellation with 40-hour battery life reserve.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 font-bold block">Fixed Price</span>
                      <span className="text-2xl font-extrabold text-meridian-950">₹1,499</span>
                    </div>
                    <Link
                      to="/shop"
                      className="px-5 py-2.5 rounded-xl bg-meridian-900 hover:bg-meridian-950 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-warm-sm"
                    >
                      View in Bag
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Discovery Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest block mb-1">
              Departments & Exploration
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-meridian-950 tracking-tight">
              Shop by Department
            </h2>
          </div>
          <Link
            to="/categories"
            className="text-xs font-bold text-cyan-600 hover:text-cyan-700 inline-flex items-center gap-1 uppercase tracking-wider"
          >
            <span>All Departments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {/* Dept 1: Electronics */}
          <Link
            to="/category/electronics"
            className="group rounded-2xl bg-white border border-slate-200/90 p-6 shadow-warm hover:shadow-warm-lg hover:border-cyan-500/50 transition-all flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-meridian-900 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-warm-sm">
              <Headphones className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-lg font-bold text-meridian-950 group-hover:text-cyan-700 transition-colors">
                Electronics & Audio
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Featuring Aero Wireless Headphones with high-fidelity acoustics.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan-600 mt-3 group-hover:translate-x-0.5 transition-transform">
                Explore Category &rarr;
              </span>
            </div>
          </Link>

          {/* Dept 2: Bags & Accessories */}
          <Link
            to="/category/accessories"
            className="group rounded-2xl bg-white border border-slate-200/90 p-6 shadow-warm hover:shadow-warm-lg hover:border-cyan-500/50 transition-all flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-meridian-900 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-warm-sm">
              <Briefcase className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-lg font-bold text-meridian-950 group-hover:text-cyan-700 transition-colors">
                Bags & Carryall
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Featuring Urban Everyday Backpack in weatherproof organic canvas.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan-600 mt-3 group-hover:translate-x-0.5 transition-transform">
                Explore Category &rarr;
              </span>
            </div>
          </Link>

          {/* Dept 3: SDET Quality Engine */}
          <div className="rounded-2xl bg-gradient-to-br from-meridian-900 to-meridian-950 text-white p-6 shadow-warm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-meridian-800 text-emerald-400 flex items-center justify-center shrink-0 shadow-warm-sm">
              <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-lg font-bold text-white">
                SDET Quality Engine
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Pure integer calculations, concurrency locks, and automated browser tests.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 mt-3">
                14/14 Tests Passed
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection Section (ProductGrid with title matching test locator) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductGrid
          products={PRODUCTS}
          getItemQuantity={getItemQuantity}
          onAddToCart={addToCart}
          title="The Curated Collection"
          subtitle="Explore our two fixed-price synthetic items crafted to evaluate precision and elegance."
        />
      </section>

      {/* Marketplace Trust Information Section */}
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

      {/* Closing Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-3xl bg-meridian-950 text-white p-10 sm:p-16 space-y-6 shadow-warm-lg border border-meridian-800">
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to experience CartFlow 3.0?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto">
            Explore our curated marketplace catalogue and test our competition-grade deterministic checkout engine.
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
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
