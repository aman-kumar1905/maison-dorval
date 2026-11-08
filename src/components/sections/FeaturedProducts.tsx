'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '@/data/jewelleryData';
import SectionHeader from '../common/SectionHeader';
import { useShop } from '@/context/ShopContext';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import LuxuryButton from '../common/LuxuryButton';

const FILTER_TABS = [
  { id: 'all', label: 'All Creations' },
  { id: 'diamond', label: 'Solitaire Diamonds' },
  { id: 'gold', label: 'Haute Or 18K' },
  { id: 'bridal', label: 'Bridal Suites' },
  { id: 'gemstone', label: 'Rare Gemstones' },
];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('all');
  const { openQuickView, addToCart, toggleWishlist, isWishlisted, currencySymbol } = useShop();

  const filteredProducts = useMemo(() => {
    if (activeTab === 'all') return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === activeTab);
  }, [activeTab]);

  return (
    <section id="featured" className="py-24 sm:py-32 bg-[#070709] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Masterpiece Creations"
          title="Exceptional"
          italicWord="High Jewellery"
          subtitle="Individually hallmarked and registered in the Maison archives. Every stone is hand-selected on Place Vendôme for exceptional clarity and fire."
        />

        {/* Filter Navigation Tabs */}
        <div className="flex justify-center border-b border-white/10 mb-12 sm:mb-16 overflow-x-auto no-scrollbar">
          <div className="flex gap-4 sm:gap-8 pb-3">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-3 text-xs tracking-[0.2em] uppercase font-sans transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-[#f4e8cb] font-medium'
                    : 'text-[#7e7a71] hover:text-[#bfb8ab]'
                }`}
              >
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="productTabIndicator"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c5a059]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => {
              const favorited = isWishlisted(product.id);

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="group relative bg-[#0b0b0f] border border-[#c5a059]/15 flex flex-col justify-between hover:border-[#c5a059]/40 transition-colors duration-500"
                >
                  {/* Top Badges & Wishlist */}
                  <div className="relative aspect-[4/5] w-full bg-[#111116] overflow-hidden">
                    {/* Primary Image */}
                    <Image
                      src={product.primaryImage}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
                    />

                    {/* Secondary Worn / Macro Image on Hover */}
                    <Image
                      src={product.secondaryImage}
                      alt={`${product.name} detail`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover absolute inset-0 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-105"
                    />

                    {/* Subtle Dark Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                    {/* Corner Tag */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                      {product.isSignature && (
                        <span className="bg-[#c5a059]/90 text-[#070709] text-[9px] font-sans font-semibold tracking-[0.2em] uppercase px-2 py-0.5">
                          Signature
                        </span>
                      )}
                      {product.isNewArrival && (
                        <span className="bg-white/10 backdrop-blur-md text-[#faf7f2] text-[9px] font-sans tracking-[0.2em] uppercase px-2 py-0.5 border border-white/15">
                          Solstice 2026
                        </span>
                      )}
                      {product.isBespokeOnly && (
                        <span className="bg-[#1c1c24]/90 text-[#e5c378] text-[9px] font-sans tracking-[0.2em] uppercase px-2 py-0.5 border border-[#c5a059]/30">
                          Bespoke Only
                        </span>
                      )}
                    </div>

                    {/* Wishlist button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/40 backdrop-blur-sm text-[#faf7f2] hover:text-[#c5a059] transition-colors"
                      aria-label="Save to wishlist"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          favorited ? 'fill-[#c5a059] text-[#c5a059]' : ''
                        }`}
                      />
                    </button>

                    {/* Hover Quick Action Overlay */}
                    <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                      <button
                        onClick={() => openQuickView(product)}
                        className="flex-1 py-2.5 bg-black/80 backdrop-blur-md border border-[#c5a059]/40 hover:border-[#c5a059] text-[#faf7f2] hover:text-[#c5a059] text-[10px] tracking-[0.2em] uppercase font-sans flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>

                      <button
                        onClick={() => addToCart(product)}
                        className="p-2.5 bg-[#c5a059] text-[#070709] hover:bg-[#e5c378] transition-colors"
                        aria-label="Add to cart"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-sans tracking-[0.2em] text-[#a39f93] uppercase">
                        <span>{product.metal}</span>
                        {product.caratWeight && (
                          <span className="text-[#c5a059]">{product.caratWeight}</span>
                        )}
                      </div>

                      <h4
                        onClick={() => openQuickView(product)}
                        className="font-serif text-lg text-[#faf7f2] mt-1 line-clamp-1 hover:text-gold-gradient transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h4>

                      <p className="text-[11px] text-[#8e8a7f] font-sans line-clamp-1 mt-0.5">
                        {product.subtitle}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="font-serif text-base text-[#f4e8cb]">
                        {currencySymbol}
                        {product.price.toLocaleString()}
                      </span>

                      <button
                        onClick={() => openQuickView(product)}
                        className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#c5a059] hover:text-[#faf7f2] transition-colors"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Salon Consultation Banner */}
        <div className="mt-16 text-center">
          <p className="text-xs text-[#8e8a7f] font-sans uppercase tracking-[0.25em] mb-4">
            Bespoke Gemstone Sourcing on Request
          </p>
          <LuxuryButton
            variant="ghost"
            href="#craftsmanship"
          >
            Learn about Place Vendôme Diamond Certification
          </LuxuryButton>
        </div>
      </div>
    </section>
  );
}
