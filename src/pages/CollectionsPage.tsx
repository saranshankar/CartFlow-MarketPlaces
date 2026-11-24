import React from 'react';
import { Link } from 'react-router-dom';
import {
  Headphones,
  Shirt,
  Home,
  Briefcase,
  Activity,
  PenTool,
  ArrowRight,
  Grid,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { getAllCollections, getCollectionProductCount } from '../data/categories';

export const CollectionsPage: React.FC = () => {
  const collections = getAllCollections();

  const getCollectionIcon = (slug: string) => {
    switch (slug) {
      case 'electronics':
        return <Headphones className="w-7 h-7" aria-hidden="true" />;
      case 'fashion':
        return <Shirt className="w-7 h-7" aria-hidden="true" />;
      case 'home-living':
        return <Home className="w-7 h-7" aria-hidden="true" />;
      case 'bags-accessories':
        return <Briefcase className="w-7 h-7" aria-hidden="true" />;
      case 'fitness-lifestyle':
        return <Activity className="w-7 h-7" aria-hidden="true" />;
      case 'stationery':
        return <PenTool className="w-7 h-7" aria-hidden="true" />;
      default:
        return <Grid className="w-7 h-7" aria-hidden="true" />;
    }
  };

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 animate-fadeIn"
      data-testid="collections-page"
    >
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-600">
          <Sparkles className="w-4 h-4 text-cyan-500" aria-hidden="true" />
          <span>Marketplace Department Directory</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-meridian-950">
          Curated Collections
        </h1>
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
          Explore our six verified departments. Each collection contains authentic demonstration items engineered with pure integer pricing, responsive layouts, and deterministic data flow.
        </p>
      </div>

      {/* Collections Grid (also supports legacy data-testid for regression tests) */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        data-testid="collections-grid"
      >
        {collections.map((col) => {
          const count = getCollectionProductCount(col.slug);

          return (
            <article
              key={col.slug}
              data-testid={`collection-card-${col.slug}`}
              className="group rounded-3xl bg-white border border-slate-200/90 p-8 shadow-warm hover:shadow-warm-xl hover:border-cyan-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <div className="w-14 h-14 rounded-2xl bg-meridian-900 text-cyan-400 flex items-center justify-center transition-transform group-hover:scale-110 shadow-warm-sm">
                    {getCollectionIcon(col.slug)}
                  </div>
                  <span
                    data-testid={`collection-count-${col.slug}`}
                    className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {count} {count === 1 ? 'Product' : 'Products'}
                  </span>
                </div>

                <div className="pt-6 space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-600 block">
                    {col.tagline}
                  </span>
                  <h2 className="font-display text-2xl font-bold text-meridian-950 group-hover:text-cyan-700 transition-colors">
                    {col.name}
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed font-normal pt-1 line-clamp-3">
                    {col.description}
                  </p>
                </div>

                <div className="pt-4 flex items-center gap-2 text-xs text-emerald-700 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                  <span>Deterministic Catalogue • 100% Client-Side</span>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  to={`/collection/${col.slug}`}
                  data-testid={`explore-collection-${col.slug}`}
                  className="w-full inline-flex items-center justify-between py-3.5 px-6 rounded-xl bg-slate-50 group-hover:bg-meridian-900 group-hover:text-white text-meridian-950 text-xs font-bold uppercase tracking-wider transition-all border border-slate-200 group-hover:border-meridian-900"
                >
                  <span>Explore {col.name}</span>
                  <ArrowRight className="w-4 h-4 text-cyan-500 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

// Backward-compatible alias
export const CategoriesPage = CollectionsPage;
export default CollectionsPage;
