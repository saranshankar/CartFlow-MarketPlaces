import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Grid, Headphones, Briefcase, Compass, Shield, ShoppingBag, CreditCard } from 'lucide-react';

export const CategoryNavigation: React.FC = () => {
  const location = useLocation();

  const links = [
    { name: 'All Categories', path: '/categories', icon: Grid },
    { name: 'Electronics & Audio', path: '/category/electronics', icon: Headphones },
    { name: 'Bags & Accessories', path: '/category/accessories', icon: Briefcase },
    { name: 'Explore', path: '/explore', icon: Compass },
    { name: 'Collection', path: '/shop', icon: null }, // Required for Playwright REG-09
    { name: 'Cart', path: '/cart', icon: ShoppingBag }, // Required for Playwright REG-09
    { name: 'Checkout', path: '/checkout', icon: CreditCard }, // Required for Playwright REG-09
    { name: 'About', path: '/explore', icon: Shield },
  ];

  const isActive = (path: string) => {
    if (path.includes('?')) {
      return location.pathname + location.search === path;
    }
    return location.pathname === path;
  };

  return (
    <nav
      aria-label="Marketplace Category Navigation"
      className="bg-white border-b border-slate-200/90 text-xs font-semibold text-slate-700 overflow-x-auto scrollbar-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center gap-1 sm:gap-2 py-1.5 whitespace-nowrap min-w-max">
          {links.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    active
                      ? 'bg-meridian-900 text-white font-semibold shadow-warm-sm'
                      : 'text-slate-700 hover:text-meridian-900 hover:bg-slate-100'
                  }`}
                >
                  {Icon && <Icon className={`w-3.5 h-3.5 ${active ? 'text-cyan-400' : 'text-slate-500'}`} aria-hidden="true" />}
                  <span>{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
