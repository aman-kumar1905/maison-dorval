'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CATEGORIES } from '@/data/jewelleryData';
import SectionHeader from '../common/SectionHeader';
import { ArrowUpRight } from 'lucide-react';

export default function CategoryShowcase() {
  const [featuredCategory, ...otherCategories] = CATEGORIES;

  return (
    <section id="categories" className="py-24 sm:py-32 bg-[#070709] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The Maison Universes"
          title="Curated by"
          italicWord="Precious Materiality"
          subtitle="From sovereign 18-karat gold and flawless Type IIa diamonds to rare unheated gemstones, discover creations sculpted by master French artisans."
        />

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Main Hero Category Tile (Haute Or / Solstice) - Spans 7 columns */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative group overflow-hidden bg-[#0d0d12] border border-[#c5a059]/20 min-h-[460px] sm:min-h-[580px] flex flex-col justify-end p-8 sm:p-12"
          >
            <Image
              src={featuredCategory.image}
              alt={featuredCategory.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 brightness-[0.65] contrast-[1.08]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-black/40 to-transparent" />
            <div className="absolute inset-0 border border-transparent group-hover:border-[#c5a059]/40 transition-colors duration-500 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] tracking-[0.28em] font-sans text-[#c5a059] uppercase font-medium">
                  {featuredCategory.frenchTitle}
                </span>
                <span className="w-4 h-[1px] bg-[#c5a059]/40" />
                <span className="text-[10px] text-[#a39f93] font-sans">
                  {featuredCategory.itemCount} Creations
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#faf7f2] font-light">
                {featuredCategory.title}
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-[#bfb8ab] font-sans font-light max-w-md leading-relaxed">
                {featuredCategory.shortDesc}
              </p>

              <div className="mt-6 flex items-center justify-between pt-6 border-t border-white/10">
                <span className="text-[11px] font-serif italic text-[#c5a059]">
                  Highlight: {featuredCategory.highlightPiece}
                </span>

                <Link
                  href="#featured"
                  className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.2em] uppercase text-[#f4e8cb] hover:text-[#c5a059] transition-colors group-hover:translate-x-1 duration-300"
                >
                  <span>Explore Universe</span>
                  <ArrowUpRight className="w-4 h-4 text-[#c5a059]" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Column Grid - 4 Sub-Categories - Spans 5 columns */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 sm:gap-8">
            {otherCategories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.12 }}
                className="relative group overflow-hidden bg-[#0d0d12] border border-[#c5a059]/15 min-h-[260px] flex flex-col justify-end p-6 sm:p-8"
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 40vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.55] contrast-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-black/50 to-transparent" />
                <div className="absolute inset-0 border border-transparent group-hover:border-[#c5a059]/40 transition-colors duration-500 pointer-events-none" />

                <div className="relative z-10 flex items-end justify-between">
                  <div>
                    <span className="text-[9.5px] tracking-[0.24em] font-sans text-[#c5a059] uppercase block mb-1">
                      {cat.frenchTitle}
                    </span>
                    <h4 className="font-serif text-2xl sm:text-2xl text-[#faf7f2]">
                      {cat.title}
                    </h4>
                    <p className="text-[11px] text-[#a39f93] font-sans font-light mt-1 max-w-xs line-clamp-1">
                      {cat.highlightPiece}
                    </p>
                  </div>

                  <Link
                    href="#featured"
                    className="w-9 h-9 border border-white/20 rounded-full flex items-center justify-center text-[#c5a059] group-hover:border-[#c5a059] group-hover:bg-[#c5a059] group-hover:text-[#070709] transition-all duration-300"
                    aria-label={`View ${cat.title}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

