import React from 'react';
import {
  Headphones,
  Speaker,
  Watch,
  Zap,
  Video,
  Sun,
  Shirt,
  Sparkles,
  Scissors,
  Coffee,
  Heart,
  Wind,
  Layers,
  Flame,
  Briefcase,
  ShoppingBag,
  CreditCard,
  Glasses,
  Activity,
  Droplet,
  Dumbbell,
  BookOpen,
  PenTool,
  Grid,
  Bookmark
} from 'lucide-react';
import { Product } from '../../types';

interface ProductArtworkProps {
  product: Product;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ProductArtwork: React.FC<ProductArtworkProps> = ({
  product,
  className = '',
  size = 'md'
}) => {
  // If product is Aero Headphones or Urban Backpack, preserve original bespoke detailed SVGs
  if (product.id === 'prod-aero-headphones') {
    return (
      <svg
        viewBox="0 0 240 240"
        className={`w-full h-full object-contain p-4 text-meridian-900 transition-transform duration-500 group-hover:scale-105 ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="120" cy="120" r="85" fill="#F1F5F9" />
        <path d="M60 135 C60 65 180 65 180 135" stroke="#0F1E36" strokeWidth="10" strokeLinecap="round" />
        <path d="M75 110 C75 80 165 80 165 110" stroke="#00A3C4" strokeWidth="3.5" strokeLinecap="round" opacity="0.9" />
        <rect x="42" y="115" width="34" height="65" rx="17" fill="#172B4D" stroke="#0F1E36" strokeWidth="3" />
        <rect x="48" y="125" width="22" height="45" rx="11" fill="#E2E8F0" />
        <rect x="164" y="115" width="34" height="65" rx="17" fill="#172B4D" stroke="#0F1E36" strokeWidth="3" />
        <rect x="170" y="125" width="22" height="45" rx="11" fill="#E2E8F0" />
        <circle cx="59" cy="116" r="4" fill="#00A3C4" />
        <circle cx="181" cy="116" r="4" fill="#00A3C4" />
      </svg>
    );
  }

  if (product.id === 'prod-urban-backpack') {
    return (
      <svg
        viewBox="0 0 240 240"
        className={`w-full h-full object-contain p-4 text-meridian-900 transition-transform duration-500 group-hover:scale-105 ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="120" cy="120" r="85" fill="#F1F5F9" />
        <path d="M100 62 C100 45 140 45 140 62" stroke="#00A3C4" strokeWidth="6" strokeLinecap="round" />
        <path
          d="M70 85 C70 68 170 68 170 85 L176 190 C176 198 168 205 160 205 L80 205 C72 205 64 198 64 190 Z"
          fill="#0F1E36"
          stroke="#0A1424"
          strokeWidth="3"
        />
        <rect x="80" y="125" width="80" height="60" rx="10" fill="#172B4D" stroke="#00A3C4" strokeWidth="2" />
        <line x1="88" y1="145" x2="152" y2="145" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 3" />
        <circle cx="92" cy="100" r="3" fill="#00A3C4" />
        <circle cx="148" cy="100" r="3" fill="#00A3C4" />
      </svg>
    );
  }

  // Category Theme Colors & Icons
  const getVisualSpec = () => {
    switch (product.collectionSlug) {
      case 'electronics':
        return {
          bg: 'from-cyan-900/10 via-slate-100 to-slate-50',
          accent: 'text-cyan-600',
          ring: 'border-cyan-500/20',
          icon: product.id.includes('speaker') ? Speaker :
                product.id.includes('watch') ? Watch :
                product.id.includes('charger') ? Zap :
                product.id.includes('webcam') ? Video :
                product.id.includes('light') ? Sun : Headphones
        };
      case 'fashion':
        return {
          bg: 'from-amber-900/10 via-slate-100 to-slate-50',
          accent: 'text-amber-700',
          ring: 'border-amber-500/20',
          icon: product.id.includes('shirt') ? Shirt :
                product.id.includes('wool') ? Sparkles :
                product.id.includes('belt') ? Scissors :
                product.id.includes('sneakers') ? Sparkles : Shirt
        };
      case 'home-living':
        return {
          bg: 'from-emerald-900/10 via-slate-100 to-slate-50',
          accent: 'text-emerald-700',
          ring: 'border-emerald-500/20',
          icon: product.id.includes('coffee') || product.id.includes('pour') ? Coffee :
                product.id.includes('cushion') ? Heart :
                product.id.includes('diffuser') ? Wind :
                product.id.includes('bamboo') ? Layers :
                product.id.includes('candle') ? Flame : Coffee
        };
      case 'bags-accessories':
        return {
          bg: 'from-blue-900/10 via-slate-100 to-slate-50',
          accent: 'text-blue-700',
          ring: 'border-blue-500/20',
          icon: product.id.includes('tote') ? ShoppingBag :
                product.id.includes('wallet') ? CreditCard :
                product.id.includes('pouch') || product.id.includes('cable') ? Briefcase :
                product.id.includes('sunglasses') ? Glasses : Briefcase
        };
      case 'fitness-lifestyle':
        return {
          bg: 'from-teal-900/10 via-slate-100 to-slate-50',
          accent: 'text-teal-700',
          ring: 'border-teal-500/20',
          icon: product.id.includes('yoga') ? Activity :
                product.id.includes('flask') || product.id.includes('water') ? Droplet :
                product.id.includes('bands') ? Dumbbell :
                product.id.includes('jump') ? Activity :
                product.id.includes('massage') ? Sparkles : Dumbbell
        };
      case 'stationery':
        return {
          bg: 'from-indigo-900/10 via-slate-100 to-slate-50',
          accent: 'text-indigo-700',
          ring: 'border-indigo-500/20',
          icon: product.id.includes('journal') || product.id.includes('dot') ? BookOpen :
                product.id.includes('pen') || product.id.includes('brass') ? PenTool :
                product.id.includes('mat') ? Grid :
                product.id.includes('stand') ? Bookmark : BookOpen
        };
      default:
        return {
          bg: 'from-slate-100 to-slate-50',
          accent: 'text-cyan-600',
          ring: 'border-slate-200',
          icon: Sparkles
        };
    }
  };

  const spec = getVisualSpec();
  const IconComponent = spec.icon;

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  return (
    <div
      className={`w-full h-full rounded-2xl bg-gradient-to-br ${spec.bg} border ${spec.ring} flex flex-col items-center justify-center p-6 relative overflow-hidden transition-transform duration-500 group-hover:scale-105 ${className}`}
      aria-label={product.name}
    >
      {/* Subtle geometric background watermark circle */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-36 h-36 rounded-full border-2 border-slate-300/40" />
        <div className="w-48 h-48 rounded-full border border-slate-300/20 absolute" />
      </div>

      {/* Primary Centered Icon Artwork */}
      <div className="relative z-10 w-24 h-24 rounded-2xl bg-white/90 shadow-warm-sm border border-slate-200/60 flex items-center justify-center">
        <IconComponent className={`${iconSizes[size]} ${spec.accent}`} aria-hidden="true" />
      </div>

      {/* Visual Subtitle Tag */}
      <span className="relative z-10 mt-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 px-2.5 py-0.5 rounded-full bg-white/80 border border-slate-200/50 shadow-warm-xs">
        {product.category}
      </span>
    </div>
  );
};
