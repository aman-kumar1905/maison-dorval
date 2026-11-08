'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '@/context/ShopContext';
import { Sparkles, Globe, ChevronRight } from 'lucide-react';

const ANNOUNCEMENTS = [
  'Complimentary White-Glove Armoured Delivery & Insurance Worldwide',
  'Private Salon Viewings: Place Vendôme, Paris & Madison Avenue, New York',
  'Complimentary Bespoke Hand-Engraving on All Solitaire Creations',
  'Responsible Jewellery Council (RJC) Certified • 100% Conflict-Free Stones',
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const { currency, setCurrency, openVIPModal } = useShop();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-[#050507] border-b border-[#c5a059]/15 text-[#d6d0c4] text-[10.5px] tracking-[0.16em] uppercase font-sans z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-9 flex items-center justify-between">
        {/* Left: Global Maison concierge */}
        <div className="hidden lg:flex items-center gap-2 text-[#9a958b]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse" />
          <span>Place Vendôme • Paris</span>
        </div>

        {/* Center: Rotating luxury notes */}
        <div className="flex-1 flex items-center justify-center overflow-hidden h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex items-center gap-2 text-center text-[#e8dfcf] font-light"
            >
              <Sparkles className="w-3 h-3 text-[#c5a059] hidden sm:inline" />
              <span>{ANNOUNCEMENTS[index]}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Currency Selector & Concierge button */}
        <div className="flex items-center gap-4 text-[#9a958b]">
          <button
            onClick={() => openVIPModal('Private Concierge Request')}
            className="hidden sm:flex items-center gap-1 hover:text-[#f4e8cb] transition-colors"
          >
            <span>Concierge</span>
            <ChevronRight className="w-3 h-3 text-[#c5a059]" />
          </button>

          <div className="flex items-center gap-1 pl-2 border-l border-white/10">
            <Globe className="w-3 h-3 text-[#c5a059]/70" />
            <div className="flex gap-1.5">
              {(['USD', 'EUR', 'GBP'] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`transition-colors px-1 py-0.5 rounded text-[10px] ${
                    currency === curr
                      ? 'text-[#c5a059] font-medium border-b border-[#c5a059]'
                      : 'text-[#858074] hover:text-[#e8dfcf]'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
