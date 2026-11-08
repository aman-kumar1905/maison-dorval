'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { COLLECTIONS, PRODUCTS } from '@/data/jewelleryData';
import SectionHeader from '../common/SectionHeader';
import LuxuryButton from '../common/LuxuryButton';
import { useShop } from '@/context/ShopContext';
import { Eye } from 'lucide-react';

export default function SignatureCollections() {
  const [activeTab, setActiveTab] = useState(0);
  const currentCollection = COLLECTIONS[activeTab];
  const { openQuickView, openVIPModal } = useShop();

  const featuredPieces = PRODUCTS.filter((p) =>
    currentCollection.featuredProducts.includes(p.id)
  );

  return (
    <section id="collections" className="py-24 sm:py-32 bg-[#09090d] border-y border-[#c5a059]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Haute Joaillerie Archives"
          title="Signature"
          italicWord="Collections"
          subtitle="Conceived as wearable architectural monuments, each high jewellery collection requires up to three years of lapidary stone pairing and gold carving."
        />

        {/* Collection Selector Tabs */}
        <div className="flex justify-center border-b border-white/10 mb-12 sm:mb-16 overflow-x-auto no-scrollbar">
          <div className="flex gap-4 sm:gap-10 pb-4">
            {COLLECTIONS.map((col, idx) => (
              <button
                key={col.id}
                onClick={() => setActiveTab(idx)}
                className={`relative pb-3 text-xs sm:text-sm tracking-[0.2em] uppercase font-sans transition-colors whitespace-nowrap ${
                  activeTab === idx
                    ? 'text-[#f4e8cb] font-medium'
                    : 'text-[#7e7a71] hover:text-[#bfb8ab]'
                }`}
              >
                <span>{col.name}</span>
                {activeTab === idx && (
                  <motion.div
                    layoutId="collectionTabUnderline"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Collection Showcase Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCollection.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Left Imagery (Large Editorial Photo with subtle gold frame) */}
            <div className="lg:col-span-7 relative group aspect-[4/3] sm:aspect-[16/11] bg-[#121217] border border-[#c5a059]/25 overflow-hidden">
              <Image
                src={currentCollection.coverImage}
                alt={currentCollection.name}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover brightness-[0.75] contrast-[1.08] transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent opacity-80" />

              {/* Quote overlay on bottom */}
              <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-6 bg-black/60 backdrop-blur-md border-l-2 border-[#c5a059]">
                <p className="font-serif italic text-sm sm:text-base text-[#faf7f2] leading-snug">
                  &ldquo;{currentCollection.accentQuote}&rdquo;
                </p>
                <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#c5a059] mt-2 block">
                  Place Vendôme Atelier Journal
                </span>
              </div>
            </div>

            {/* Right Narrative & Featured Product Teasers */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-[#c5a059] block mb-2">
                  {currentCollection.year} • {currentCollection.pieceCount} Archived Works
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#faf7f2]">
                  {currentCollection.name}
                </h3>
                <p className="font-serif italic text-lg text-gold-gradient mt-1">
                  {currentCollection.tagline}
                </p>
                <p className="text-xs sm:text-sm text-[#bfb8ab] font-sans font-light leading-relaxed mt-4">
                  {currentCollection.description}
                </p>
              </div>

              {/* Featured Pieces in this Collection */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <span className="text-[10.5px] tracking-[0.2em] uppercase font-sans text-[#8e8a7f] block">
                  Key Creations in this Suite
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {featuredPieces.map((piece) => (
                    <div
                      key={piece.id}
                      onClick={() => openQuickView(piece)}
                      className="group p-3 bg-white/[0.02] border border-white/10 hover:border-[#c5a059]/50 transition-all cursor-pointer"
                    >
                      <div className="relative aspect-square w-full mb-2 bg-[#14141a] overflow-hidden">
                        <Image
                          src={piece.primaryImage}
                          alt={piece.name}
                          fill
                          sizes="180px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Eye className="w-4 h-4 text-[#faf7f2]" />
                        </div>
                      </div>
                      <h4 className="font-serif text-xs text-[#faf7f2] line-clamp-1 group-hover:text-[#c5a059] transition-colors">
                        {piece.name}
                      </h4>
                      <p className="text-[10px] font-sans text-[#a39f93]">
                        {piece.metal}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <LuxuryButton
                  variant="solid"
                  size="md"
                  onClick={() => openVIPModal(`Inquiry on ${currentCollection.name} Collection`)}
                  className="w-full sm:w-auto"
                >
                  Acquire from Collection
                </LuxuryButton>
                <LuxuryButton
                  variant="secondary"
                  size="md"
                  href="#featured"
                  className="w-full sm:w-auto"
                >
                  View All Works
                </LuxuryButton>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
