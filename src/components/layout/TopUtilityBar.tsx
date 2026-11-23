import React from 'react';
import { ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TopUtilityBar: React.FC = () => {
  return (
    <div className="bg-meridian-950 text-slate-300 text-[11px] font-medium border-b border-meridian-800/60 hidden sm:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between">
        {/* Left: Shipping & Guarantee Notice */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <Truck className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="font-semibold">Complimentary Express Shipping</span>
          </div>
          <span className="text-meridian-700">•</span>
          <span className="text-slate-400">Zero hidden fees • Pure client-side arithmetic</span>
        </div>

        {/* Right: Currency & SDET Trust Badge */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span className="text-slate-300">INR (₹) Indian Rupee</span>
          </div>

          <span className="text-meridian-700">•</span>

          <Link
            to="/shop"
            className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            <span>SDET Test Suite Verified</span>
          </Link>

          <span className="text-meridian-700">•</span>

          <div className="flex items-center gap-1 text-cyan-300">
            <Sparkles className="w-3 h-3 text-cyan-400" aria-hidden="true" />
            <span>CartFlow 3.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};
