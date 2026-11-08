'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '@/context/ShopContext';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data/jewelleryData';

const POPULAR_SEARCHES = ['Solitaire', 'Emerald', 'Gold Choker', 'Bridal', 'Platinum 950', 'Sapphire'];

export default function SearchModal() {
  const { isSearchOpen, closeSearch, openQuickView, currencySymbol } = useShop();
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.metal.toLowerCase().includes(q) ||
        (p.gemstone && p.gemstone.toLowerCase().includes(q))
    );
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-12 flex items-start justify-center pt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSearch}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative bg-[#09090d] border border-[#c5a059]/30 shadow-[0_25px_80px_rgba(0,0,0,0.95)] max-w-3xl w-full z-10 p-6 sm:p-8"
        >
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <span className="text-[10px] tracking-[0.24em] uppercase font-sans text-[#c5a059] flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              Maison Archives & Catalogue
            </span>
            <button
              onClick={closeSearch}
              className="text-[#8e8a7f] hover:text-[#faf7f2] p-1.5 transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mt-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c5a059]" />
            <input
              type="text"
              autoFocus
              placeholder="Search diamonds, 18k gold, emeralds, bridal suites..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[#121218] border border-white/10 text-sm text-[#faf7f2] pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#c5a059] font-sans"
            />
          </div>

          {/* Popular searches suggestions */}
          {!query && (
            <div className="mt-6">
              <span className="text-[10.5px] uppercase tracking-[0.18em] text-[#7d7971] font-sans block mb-3">
                Curated Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs text-[#c5a059] border border-[#c5a059]/20 hover:border-[#c5a059] px-3 py-1.5 transition-colors font-sans"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results list */}
          {query && (
            <div className="mt-6 max-h-96 overflow-y-auto space-y-3">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-10 text-[#8e8a7f] font-sans text-xs">
                  No high jewellery creations found matching &ldquo;{query}&rdquo;.
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      closeSearch();
                      openQuickView(product);
                    }}
                    className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 hover:border-[#c5a059]/40 hover:bg-white/[0.04] transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-16 bg-[#15151c] shrink-0 overflow-hidden">
                        <Image
                          src={product.primaryImage}
                          alt={product.name}
                          fill
                          sizes="60px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-serif text-base text-[#faf7f2] group-hover:text-gold-gradient transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-[11px] text-[#8e8a7f] font-sans">
                          {product.metal} • {product.caratWeight || product.category}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-serif text-sm text-[#f4e8cb]">
                        {currencySymbol}
                        {product.price.toLocaleString()}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#8e8a7f] group-hover:text-[#c5a059] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
