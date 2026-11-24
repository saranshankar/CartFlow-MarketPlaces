import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider, useCartContext } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { TopUtilityBar } from './components/layout/TopUtilityBar';
import { MarketplaceHeader } from './components/layout/MarketplaceHeader';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { CartDrawer } from './components/cart/CartDrawer';

import { LandingPage } from './pages/LandingPage';
import { ShopPage } from './pages/ShopPage';
import { ExplorePage } from './pages/ExplorePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryDetailPage } from './pages/CategoryDetailPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { CollectionDetailPage } from './pages/CollectionDetailPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { ProductDetailPage } from './pages/ProductDetailPage';

const AppContent: React.FC = () => {
  const { itemCount, total, confirmedOrder, checkoutStatus, validationErrors } = useCartContext();

  return (
    <div className="min-h-screen bg-canvas text-slate-800 flex flex-col font-sans selection:bg-cyan-100 selection:text-meridian-950">
      {/* Skip to Main Content Link for Keyboard Accessibility (WCAG 2.4.1) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-meridian-900 focus:text-white focus:rounded-xl focus:shadow-warm-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 font-bold text-xs uppercase tracking-wider"
      >
        Skip to main content
      </a>

      {/* Accessible Live Region for Screen Readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {checkoutStatus === 'ORDER_CONFIRMED' && confirmedOrder
          ? `Order confirmed with reference ${confirmedOrder.reference}. Total paid: ₹${confirmedOrder.total}`
          : validationErrors.customerName || validationErrors.cart
          ? `Checkout validation error: ${validationErrors.customerName || validationErrors.cart}`
          : `Shopping bag updated: ${itemCount} items, total ₹${total}`}
      </div>

      <ScrollToTop />
      <TopUtilityBar />
      <MarketplaceHeader />
      <CartDrawer />

      <main id="main-content" tabIndex={-1} className="flex-1 w-full pb-16 md:pb-0 outline-none">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/category/:slug" element={<CategoryDetailPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collection/:slug" element={<CollectionDetailPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/order-confirmed" element={<ConfirmationPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>

      <MobileBottomNav />
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <AppContent />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
