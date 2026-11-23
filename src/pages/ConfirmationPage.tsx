import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { OrderReceipt } from '../components/checkout/OrderReceipt';
import { useCartContext } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';

export const ConfirmationPage: React.FC = () => {
  const { confirmedOrder, resetOrder } = useCartContext();
  const navigate = useNavigate();

  if (!confirmedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6 animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-sand flex items-center justify-center text-olive mx-auto">
          <ShoppingBag className="w-7 h-7 text-forest-800" aria-hidden="true" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-charcoal">
          No Active Order Found
        </h2>
        <p className="text-sm text-olive max-w-sm mx-auto">
          You currently have no active order confirmation. Start by exploring our collection.
        </p>
        <div>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-forest-800 hover:bg-forest-900 text-ivory text-xs uppercase tracking-wider font-semibold transition-all shadow-warm"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 animate-fadeIn">
      <OrderReceipt
        order={confirmedOrder}
        onResetOrder={() => {
          resetOrder();
          navigate('/shop');
        }}
      />
    </div>
  );
};
