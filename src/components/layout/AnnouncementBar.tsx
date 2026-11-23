import React from 'react';
import { Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-forest-800 text-ivory text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 border-b border-forest-900/40">
      <Sparkles className="w-3.5 h-3.5 text-terracotta-400 shrink-0" aria-hidden="true" />
      <span>Complimentary shipping on all curated rituals & essentials • 30-day effortless returns</span>
    </div>
  );
};
