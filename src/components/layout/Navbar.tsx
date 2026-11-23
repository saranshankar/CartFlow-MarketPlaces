import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';
import { useCartContext } from '../../context/CartContext';

export const Navbar: React.FC = () => {
  const { itemCount, setIsDrawerOpen } = useCartContext();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/shop' },
    { name: 'Cart', path: '/cart' },
    { name: 'Checkout', path: '/checkout' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-warmgrey transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Wordmark */}
        <Link to="/" className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 rounded-lg p-1">
          <div className="w-10 h-10 rounded-full bg-forest-800 text-ivory flex items-center justify-center transition-transform group-hover:scale-105 shadow-warm-sm">
            <span className="font-serif font-bold text-lg">C</span>
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-tight text-charcoal block leading-none">
              Cart<span className="text-forest-700 italic font-normal">Flow</span>
            </span>
            <span className="text-[10px] tracking-widest uppercase font-medium text-olive block mt-0.5">
              Everyday Essentials
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium tracking-wide transition-colors py-1 relative ${
                isActive(link.path)
                  ? 'text-forest-800 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-forest-800'
                  : 'text-olive hover:text-charcoal'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Action: Cart Button & Mobile Menu */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            data-testid="header-cart-button"
            aria-label={`Shopping bag containing ${itemCount} items`}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-sand hover:bg-warmgrey/70 text-charcoal border border-warmgrey transition-all hover:scale-[1.02] active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-forest-800" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline">Bag</span>
            <span
              data-testid="cart-badge"
              className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold rounded-full bg-forest-800 text-ivory"
            >
              {itemCount}
            </span>
          </button>

          <Link
            to="/shop"
            className="hidden lg:inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full bg-forest-800 hover:bg-forest-900 text-ivory transition-colors shadow-warm-sm"
          >
            <span>Explore</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 rounded-lg text-charcoal hover:bg-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-sand border-b border-warmgrey px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                isActive(link.path)
                  ? 'bg-ivory text-forest-800 font-bold'
                  : 'text-charcoal hover:bg-ivory/50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              to="/checkout"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl bg-forest-800 text-ivory text-sm font-semibold shadow-warm-sm"
            >
              Go to Checkout
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
