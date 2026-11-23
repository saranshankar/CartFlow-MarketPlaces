import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Menu, X, Layers } from 'lucide-react';
import { useCartContext } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { SearchBar } from '../common/SearchBar';
import { CategoryNavigation } from './CategoryNavigation';

export const MarketplaceHeader: React.FC = () => {
  const { itemCount, setIsDrawerOpen } = useCartContext();
  const { wishlistCount } = useWishlist();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-warm-sm transition-all">
      {/* Tier 1: Primary Marketplace Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 sm:gap-8">
        {/* Brand Wordmark & Marketplace Badge */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-xl p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-meridian-900 text-white flex items-center justify-center transition-transform group-hover:scale-105 shadow-warm-sm">
              <Layers className="w-5 h-5 text-cyan-400" aria-hidden="true" />
            </div>
            <div>
              <span className="font-display text-2xl font-extrabold tracking-tight text-meridian-950 block leading-none">
                Cart<span className="text-cyan-600 font-bold">Flow</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-500 block mt-0.5">
                Marketplace
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Global Search Bar */}
        <div className="flex-1 max-w-2xl hidden md:block">
          <SearchBar />
        </div>

        {/* Right Action Icons: Wishlist, Cart & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Wishlist Quick Button */}
          <Link
            to="/wishlist"
            aria-label={`Wishlist containing ${wishlistCount} items`}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:text-meridian-900 hover:bg-slate-100 transition-colors relative"
          >
            <div className="relative">
              <Heart className="w-5 h-5 text-slate-600 hover:text-cyan-600 transition-colors" aria-hidden="true" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-2 inline-flex items-center justify-center min-w-[18px] h-4 px-1 text-[10px] font-bold rounded-full bg-cyan-600 text-white shadow-warm-sm">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="text-xs font-semibold hidden lg:inline">Saved</span>
          </Link>

          {/* Cart Trigger Button */}
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            data-testid="header-cart-button"
            aria-label={`Shopping bag containing ${itemCount} items`}
            className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-xl bg-meridian-900 hover:bg-meridian-950 text-white transition-all shadow-warm-sm active:scale-95 group"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span
                data-testid="cart-badge"
                className="absolute -top-2 -right-2.5 inline-flex items-center justify-center min-w-[18px] h-4 px-1 text-[10px] font-extrabold rounded-full bg-emerald-500 text-white shadow-warm-sm"
              >
                {itemCount}
              </span>
            </div>
            <div className="text-left hidden sm:block">
              <span className="text-[10px] uppercase font-bold text-slate-300 block leading-tight">
                My Bag
              </span>
              <span className="text-xs font-bold text-white leading-tight">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
            </div>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Row (shown only on small screens) */}
      <div className="md:hidden px-4 pb-3">
        <SearchBar />
      </div>

      {/* Tier 2: Marketplace Category Strip */}
      <CategoryNavigation />

      {/* Mobile Expanded Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-fadeIn shadow-warm-lg">
          <nav aria-label="Mobile Navigation Drawer" className="space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                isActive('/') ? 'bg-meridian-900 text-white' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              Home Marketplace
            </Link>
            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                isActive('/shop') ? 'bg-meridian-900 text-white' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              Collection Catalogue
            </Link>
            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                isActive('/cart') ? 'bg-meridian-900 text-white' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              Shopping Bag ({itemCount})
            </Link>
            <Link
              to="/checkout"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                isActive('/checkout') ? 'bg-meridian-900 text-white' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              Checkout Simulation
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
