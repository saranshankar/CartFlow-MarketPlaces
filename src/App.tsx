import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider, useCartContext } from './context/CartContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { CartDrawer } from './components/cart/CartDrawer';

import { LandingPage } from './pages/LandingPage';
import { ShopPage } from './pages/ShopPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ConfirmationPage } from './pages/ConfirmationPage';

const AppContent: React.FC = () => {
  const { itemCount, total, confirmedOrder, checkoutStatus, validationErrors } = useCartContext();

  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col font-sans selection:bg-forest-100 selection:text-forest-900">
      {/* Accessible Live Region for Screen Readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {checkoutStatus === 'ORDER_CONFIRMED' && confirmedOrder
          ? `Order confirmed with reference ${confirmedOrder.reference}. Total paid: ₹${confirmedOrder.total}`
          : validationErrors.customerName || validationErrors.cart
          ? `Checkout validation error: ${validationErrors.customerName || validationErrors.cart}`
          : `Shopping bag updated: ${itemCount} items, total ₹${total}`}
      </div>

      <ScrollToTop />
      <AnnouncementBar />
      <Navbar />
      <CartDrawer />

      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
