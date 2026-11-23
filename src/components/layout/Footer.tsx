import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-forest-900 text-ivory border-t border-forest-800/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-forest-800">
          {/* Brand Story Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-ivory text-forest-900 flex items-center justify-center font-serif font-bold text-lg">
                C
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-ivory">
                Cart<span className="text-terracotta-400 italic font-normal">Flow</span>
              </span>
            </div>
            <p className="text-sm text-sand/80 max-w-sm leading-relaxed font-normal">
              A curated commerce ritual devoted to pieces that make everyday living effortless, intentional, and enduring.
            </p>
            <div className="flex items-center gap-2 text-xs text-sand/70 pt-2">
              <ShieldCheck className="w-4 h-4 text-naturalgreen" aria-hidden="true" />
              <span>Deterministic Client-Side Architecture • Zero External Tracking</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-terracotta-400">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-sand/80 hover:text-ivory transition-colors">
                  Home Editorial
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-sand/80 hover:text-ivory transition-colors">
                  Curated Collection
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-sand/80 hover:text-ivory transition-colors">
                  Shopping Bag
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="text-sand/80 hover:text-ivory transition-colors">
                  Minimal Checkout
                </Link>
              </li>
            </ul>
          </div>

          {/* Standards & Philosophy */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-terracotta-400">
              Engineering Pillars
            </h4>
            <p className="text-xs text-sand/70 leading-relaxed">
              Every detail engineered for reliability: strict integer arithmetic (₹ INR), synchronous race-condition guards, and automated Playwright test guarantees.
            </p>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-terracotta-400 hover:text-terracotta-300 transition-colors"
              >
                <span>View All 2 Curated Essentials</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sand/60">
          <p>© {currentYear} CartFlow Commerce. SDET Intern Hackathon Challenge Project.</p>
          <div className="flex items-center gap-4">
            <span>WCAG 2.1 AA Accessible</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-terracotta-400 fill-terracotta-400" aria-hidden="true" /> in Pure TypeScript
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
