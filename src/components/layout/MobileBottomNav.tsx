import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Heart, ShoppingBag } from 'lucide-react';
import { useCartContext } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { itemCount, setIsDrawerOpen } = useCartContext();
  const { wishlistCount } = useWishlist();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-2 py-1 shadow-lg"
    >
      <div className="flex items-center justify-around h-14 max-w-md mx-auto">
        {/* Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] rounded-lg transition-colors ${
            isActive('/') ? 'text-meridian-950 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
          aria-label="Navigate to Home"
        >
          <Home className={`w-5 h-5 ${isActive('/') ? 'text-cyan-600' : ''}`} aria-hidden="true" />
          <span className="text-[10px] mt-0.5">Home</span>
        </Link>

        {/* Explore */}
        <Link
          to="/shop"
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] rounded-lg transition-colors ${
            isActive('/shop') ? 'text-meridian-950 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
          aria-label="Explore Marketplace Collection"
        >
          <Compass className={`w-5 h-5 ${isActive('/shop') ? 'text-cyan-600' : ''}`} aria-hidden="true" />
          <span className="text-[10px] mt-0.5">Explore</span>
        </Link>

        {/* Wishlist */}
        <Link
          to="/wishlist"
          className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[44px] rounded-lg transition-colors ${
            isActive('/wishlist') ? 'text-meridian-950 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
          aria-label={`Wishlist with ${wishlistCount} saved items`}
        >
          <div className="relative">
            <Heart className={`w-5 h-5 ${isActive('/wishlist') ? 'text-cyan-600' : ''}`} aria-hidden="true" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 inline-flex items-center justify-center min-w-[16px] h-3.5 px-1 text-[9px] font-bold rounded-full bg-cyan-600 text-white">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">Saved</span>
        </Link>

        {/* Cart Trigger */}
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className="relative flex flex-col items-center justify-center min-w-[56px] min-h-[44px] rounded-lg text-slate-500 hover:text-slate-900 transition-colors"
          aria-label={`Shopping bag containing ${itemCount} items`}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-meridian-900" aria-hidden="true" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 inline-flex items-center justify-center min-w-[16px] h-3.5 px-1 text-[9px] font-extrabold rounded-full bg-emerald-500 text-white shadow-warm-sm">
                {itemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 font-semibold text-meridian-950">Bag</span>
        </button>
      </div>
    </nav>
  );
};
