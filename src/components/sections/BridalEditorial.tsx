'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '@/context/ShopContext';
import LuxuryButton from '../common/LuxuryButton';
import { Sparkles, Diamond, HeartHandshake } from 'lucide-react';

const DIAMOND_CUTS = [
  {
    id: 'emerald',
    name: 'Emerald Cut',
    ratio: '1.45 : 1',
    facets: 57,
    character: 'Hall of Mirrors with step-cut clean lines, favored by Parisian aristocrats.',
    icon: '⬟',
  },
  {
    id: 'cushion',
    name: 'Old Mine Cushion',
    ratio: '1.05 : 1',
    facets: 64,
    character: 'Soft pillowed corners with antique romantic candlelight dispersion.',
    icon: '◈',
  },
  {
    id: 'brilliant',
    name: 'Round Brilliant',
    ratio: '1.00 : 1',
    facets: 58,
    character: 'The ultimate optical fire with 360-degree light symmetry.',
    icon: '○',
  },
  {
    id: 'oval',
    name: 'Royal Oval',
    ratio: '1.38 : 1',
    facets: 58,
    character: 'Elongates the finger with graceful symmetry and expansive surface spread.',
    icon: '⬭',
  },
  {
    id: 'pear',
    name: 'Teardrop Pear',
    ratio: '1.55 : 1',
    facets: 58,
    character: 'Dramatic silhouette blending round brilliance and marquise point.',
    icon: '💧',
  },
];

export default function BridalEditorial() {
  const [selectedCut, setSelectedCut] = useState(DIAMOND_CUTS[0]);
  const { openVIPModal } = useShop();

  return (
    <section id="bridal" className="relative py-28 sm:py-36 bg-[#060608] overflow-hidden border-t border-[#c5a059]/20">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial-luxury opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Full-Height Couture Editorial Photography */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-6 relative aspect-[3/4] sm:aspect-[4/5] bg-[#0c0c11] border border-[#c5a059]/30 overflow-hidden"
          >
            <Image
              src="/images/editorial/reine-blanche-tiara.jpg"
              alt="Maison D'Orval Reine Blanche Tiara & Parure"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover brightness-[0.85] contrast-[1.1] transition-transform duration-1000 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-black/30" />

            {/* Corner Badge */}
            <div className="absolute top-6 left-6 p-4 bg-black/60 backdrop-blur-md border border-[#c5a059]/30">
              <span className="text-[10px] tracking-[0.26em] uppercase font-sans text-[#c5a059] block font-medium">
                Haute Bridal Suite
              </span>
              <p className="font-serif text-sm text-[#faf7f2] mt-0.5">
                The Reine Blanche Tiara & Parure
              </p>
            </div>
          </motion.div>

          {/* Right Column: Editorial Narrative & Diamond Cut Exploration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-6 space-y-8"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                <span className="text-[11px] tracking-[0.3em] uppercase font-sans text-[#c5a059] font-medium">
                  L’Art de la Cérémonie
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#faf7f2] leading-[1.15]">
                The Architecture of <br />
                <span className="italic font-serif font-normal text-gold-gradient">
                  Eternal Devotion
                </span>
              </h2>

              <p className="mt-5 text-sm sm:text-base text-[#b3ada2] font-sans font-light leading-relaxed">
                In our Place Vendôme salon, every bridal creation is approached as a sovereign family heirloom. From confidential diamond lot sourcing to hand-carving platinum prongs that dissolve into light, your engagement suite is uniquely yours.
              </p>
            </div>

            {/* Interactive Diamond Silhouette Selector */}
            <div className="p-6 bg-[#0c0c11] border border-[#c5a059]/20 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs uppercase tracking-[0.2em] font-sans text-[#f4e8cb] flex items-center gap-2">
                  <Diamond className="w-3.5 h-3.5 text-[#c5a059]" />
                  Diamond Architecture & Silhouette
                </span>
                <span className="text-[10px] text-[#c5a059] font-sans uppercase tracking-widest">
                  Type IIa Selection
                </span>
              </div>

              {/* Cut Selector Buttons */}
              <div className="grid grid-cols-5 gap-2">
                {DIAMOND_CUTS.map((cut) => (
                  <button
                    key={cut.id}
                    onClick={() => setSelectedCut(cut)}
                    className={`py-2 px-1 text-center border transition-all ${
                      selectedCut.id === cut.id
                        ? 'border-[#c5a059] bg-[#c5a059]/10 text-[#f4e8cb]'
                        : 'border-white/10 bg-transparent text-[#7a766c] hover:border-white/30 hover:text-[#faf7f2]'
                    }`}
                  >
                    <span className="text-base block mb-0.5">{cut.icon}</span>
                    <span className="text-[9px] font-sans uppercase tracking-wider block truncate">
                      {cut.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Cut Details Output */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCut.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="pt-2 space-y-2"
                >
                  <div className="flex items-baseline justify-between text-xs font-sans">
                    <span className="font-serif text-lg text-[#faf7f2]">
                      {selectedCut.name}
                    </span>
                    <span className="text-[#a39f93] text-[11px]">
                      {selectedCut.facets} Hand-Polished Facets • Ratio {selectedCut.ratio}
                    </span>
                  </div>
                  <p className="text-xs text-[#9a958b] font-sans font-light leading-relaxed">
                    {selectedCut.character}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Atelier Services Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-[#a8a397]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                <span>Comprehensive Gemological Dossier</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                <span>Complimentary Lifetime Sizing</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                <span>Confidential Global Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                <span>Wax Model Fitting in Paris Salon</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <LuxuryButton
                variant="solid"
                size="md"
                onClick={() => openVIPModal('Bespoke Bridal Commission')}
                className="w-full sm:w-auto"
                icon={<HeartHandshake className="w-3.5 h-3.5" />}
              >
                Book Bespoke Bridal Salon
              </LuxuryButton>

              <LuxuryButton
                variant="secondary"
                size="md"
                href="#featured"
                className="w-full sm:w-auto"
              >
                Explore Solitaire Bands
              </LuxuryButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

