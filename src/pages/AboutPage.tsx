import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Code2,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const architecturalPillars = [
    {
      title: 'Pure Integer Monetary Arithmetic',
      icon: Cpu,
      description:
        'All prices, line totals, and order calculations are calculated using strict integer paise/rupees arithmetic, eliminating IEEE-754 binary floating-point drift and rounding errors.'
    },
    {
      title: 'Deterministic State & Concurrency Shield',
      icon: ShieldCheck,
      description:
        'Client-side cart, wishlist, and checkout flows operate with deterministic double-submit debouncing, unique cryptographic order references, and complete localStorage hydration.'
    },
    {
      title: 'Zero External Asset Dependency',
      icon: Code2,
      description:
        'All 30 demonstration products feature bespoke, resolution-independent vector illustrations rendered purely in code—ensuring instant page loads, zero CDN outages, and offline resilience.'
    },
    {
      title: 'Continuous Quality & SDET Testing',
      icon: CheckCircle2,
      description:
        'Every release undergoes end-to-end Playwright automation covering visual layouts, accessibility (WCAG AA), responsive breakpoints (375px to 1440px), search indexing, and cart workflows.'
    }
  ];

  const collectionsSummary = [
    { name: 'Electronics & Audio', count: 6, desc: 'High-fidelity audio, wearables, and fast wireless desktop power hubs.' },
    { name: 'Fashion & Apparel', count: 5, desc: 'Natural flax linen, superfine merino knits, and tailored utility wear.' },
    { name: 'Home & Living', count: 5, desc: 'Ceramic pour-over brewers, washed textiles, and aromatic lifestyle goods.' },
    { name: 'Bags & Accessories', count: 5, desc: 'Weatherproof commuter backpacks, waxed canvas totes, and leather wallets.' },
    { name: 'Fitness & Lifestyle', count: 5, desc: 'Antimicrobial cork yoga mats, double-wall sports flasks, and jump ropes.' },
    { name: 'Stationery & Writing', count: 4, desc: 'Bleed-proof dot-grid journals, machined brass writing pens, and desk pads.' }
  ];

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 animate-fadeIn"
      data-testid="about-page"
    >
      {/* Hero Section */}
      <div className="relative rounded-3xl bg-meridian-900 text-white p-8 sm:p-14 overflow-hidden shadow-warm-xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-24 -mt-24" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              CartFlow 4.0 Architecture
            </span>
            <span className="text-xs text-slate-300 font-semibold">
              Multi-Collection Marketplace
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Engineered for Precision &amp; Delight.
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal pt-2">
            CartFlow 4.0 is an advanced, production-grade e-commerce marketplace demonstration application. Built from the ground up to showcase modern React frontend architecture, comprehensive accessibility compliance, and industrial-strength SDET test automation.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-meridian-950 font-bold text-xs uppercase tracking-wider transition-all shadow-warm-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Explore 30 Products</span>
            </Link>
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/20"
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Browse Collections</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Architectural Pillars */}
      <section className="space-y-8" aria-labelledby="pillars-heading">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-600">
            <Cpu className="w-4 h-4 text-cyan-500" />
            <span>Engineering Principles</span>
          </div>
          <h2 id="pillars-heading" className="font-display text-3xl font-extrabold text-meridian-950">
            Architectural Guarantees
          </h2>
          <p className="text-sm text-slate-500 font-normal">
            Every transaction, calculation, and component adheres to deterministic mathematical and architectural rigor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {architecturalPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="rounded-3xl bg-white border border-slate-200/90 p-8 shadow-warm hover:shadow-warm-lg transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-meridian-900 text-cyan-400 flex items-center justify-center shadow-warm-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-meridian-950">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6 Collections Breakdown */}
      <section className="space-y-8" aria-labelledby="collections-summary-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-600 mb-1">
              <Layers className="w-4 h-4 text-cyan-500" />
              <span>Marketplace Structure</span>
            </div>
            <h2 id="collections-summary-heading" className="font-display text-3xl font-extrabold text-meridian-950">
              Six Verified Departments (30 Products)
            </h2>
          </div>
          <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-slate-100 text-meridian-950 border border-slate-200">
            100% Client-Side Demonstration
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collectionsSummary.map((col) => (
            <div
              key={col.name}
              className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3 hover:border-cyan-500/40 transition-colors shadow-warm-sm"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-display text-lg font-bold text-meridian-950">{col.name}</h4>
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-100">
                  {col.count} items
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{col.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demonstration Notice */}
      <div className="rounded-3xl bg-slate-50 border border-slate-200 p-8 sm:p-10 text-center space-y-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 mx-auto">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
        </div>
        <div className="max-w-xl mx-auto space-y-2">
          <h3 className="font-display text-2xl font-bold text-meridian-950">
            Transparent Demonstration Sandbox
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            CartFlow 4.0 is engineered solely as a high-fidelity demonstration and testing benchmark. No actual monetary payments are processed, no physical shipping takes place, and zero third-party telemetry or cookies are recorded.
          </p>
        </div>
        <div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-meridian-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-meridian-950 transition-all shadow-warm-sm"
          >
            <span>Start Exploring Products</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
