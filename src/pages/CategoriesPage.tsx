import React from 'react';
import { Link } from 'react-router-dom';
import { Headphones, Briefcase, ArrowRight, Grid, ShieldCheck } from 'lucide-react';
import { getAllCategories, getCategoryProductCount } from '../data/categories';

export const CategoriesPage: React.FC = () => {
  const categories = getAllCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 animate-fadeIn" data-testid="categories-page">
      {/* Header */}
      <div className="max-w-2xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-600">
          <Grid className="w-4 h-4 text-cyan-500" aria-hidden="true" />
          <span>Department Directory</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-meridian-950">
          Marketplace Categories
        </h1>
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
          Explore our verified departments. Every product category contains authentic items engineered with pure integer pricing and 100% test reliability.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-testid="categories-grid">
        {categories.map((cat) => {
          const count = getCategoryProductCount(cat.slug);
          const isElectronics = cat.slug === 'electronics';

          return (
            <article
              key={cat.slug}
              data-testid={`category-card-${cat.slug}`}
              className="group rounded-3xl bg-white border border-slate-200/90 p-8 shadow-warm hover:shadow-warm-xl hover:border-cyan-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <div className="w-14 h-14 rounded-2xl bg-meridian-900 text-cyan-400 flex items-center justify-center transition-transform group-hover:scale-110 shadow-warm-sm">
                    {isElectronics ? (
                      <Headphones className="w-7 h-7" aria-hidden="true" />
                    ) : (
                      <Briefcase className="w-7 h-7" aria-hidden="true" />
                    )}
                  </div>
                  <span
                    data-testid={`category-count-${cat.slug}`}
                    className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700"
                  >
                    {count} {count === 1 ? 'Product' : 'Products'}
                  </span>
                </div>

                <div className="pt-6 space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-600 block">
                    {cat.tagline}
                  </span>
                  <h2 className="font-display text-2xl font-bold text-meridian-950 group-hover:text-cyan-700 transition-colors">
                    {cat.name}
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed font-normal pt-1">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 flex items-center gap-2 text-xs text-emerald-700 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                  <span>Guaranteed In Stock • Instant Dispatch</span>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  to={`/category/${cat.slug}`}
                  data-testid={`explore-category-${cat.slug}`}
                  className="w-full inline-flex items-center justify-between py-3.5 px-6 rounded-xl bg-slate-50 group-hover:bg-meridian-900 group-hover:text-white text-meridian-950 text-xs font-bold uppercase tracking-wider transition-all border border-slate-200 group-hover:border-meridian-900"
                >
                  <span>Explore {cat.name}</span>
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
