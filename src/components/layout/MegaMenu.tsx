'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES } from '@/data/jewelleryData';
import { ArrowUpRight } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeMenu: string | null;
}

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* TASK 2: Backdrop for outside click dismissal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 top-[70px] bg-black/60 backdrop-blur-sm z-30 pointer-events-auto"
            data-backdrop="megamenu"
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onMouseLeave={onClose}
            className="absolute top-full left-0 w-full bg-[#08080b]/98 backdrop-blur-xl border-b border-[#c5a059]/25 shadow-[0_30px_60px_rgba(0,0,0,0.85)] z-40 overflow-hidden"
          >
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-12 gap-8">
          {/* Left: Category Columns */}
          <div className="col-span-8 grid grid-cols-3 gap-6">
            <div>
              <h3 className="text-xs font-serif tracking-[0.25em] text-[#c5a059] uppercase mb-4 pb-2 border-b border-white/10">
                Haute Joaillerie
              </h3>
              <ul className="space-y-3 font-sans text-xs tracking-[0.08em] text-[#bfb8ab]">
                <li>
                  <Link
                    href="/#categories"
                    onClick={onClose}
                    className="hover:text-[#f4e8cb] transition-colors flex items-center justify-between group"
                  >
                    <span>Solitaire High Rings</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#c5a059]" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#categories"
                    onClick={onClose}
                    className="hover:text-[#f4e8cb] transition-colors flex items-center justify-between group"
                  >
                    <span>Articulated Gold Chokers</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#c5a059]" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#categories"
                    onClick={onClose}
                    className="hover:text-[#f4e8cb] transition-colors flex items-center justify-between group"
                  >
                    <span>Cascade Ear Pendants</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#c5a059]" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#categories"
                    onClick={onClose}
                    className="hover:text-[#f4e8cb] transition-colors flex items-center justify-between group"
                  >
                    <span>Sculptural Silver Cuffs</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#c5a059]" />
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-serif tracking-[0.25em] text-[#c5a059] uppercase mb-4 pb-2 border-b border-white/10">
                Bridal Couture
              </h3>
              <ul className="space-y-3 font-sans text-xs tracking-[0.08em] text-[#bfb8ab]">
                <li>
                  <Link
                    href="/#bridal"
                    onClick={onClose}
                    className="hover:text-[#f4e8cb] transition-colors flex items-center justify-between group"
                  >
                    <span>Bespoke Solitaire Commissions</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#c5a059]" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#bridal"
                    onClick={onClose}
                    className="hover:text-[#f4e8cb] transition-colors flex items-center justify-between group"
                  >
                    <span>Emerald-Cut Eternity Bands</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#c5a059]" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#bridal"
                    onClick={onClose}
                    className="hover:text-[#f4e8cb] transition-colors flex items-center justify-between group"
                  >
                    <span>High Tiara & Headpieces</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#c5a059]" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#bridal"
                    onClick={onClose}
                    className="hover:text-[#f4e8cb] transition-colors flex items-center justify-between group"
                  >
                    <span>Private Salon Diamond Sourcing</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#c5a059]" />
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-serif tracking-[0.25em] text-[#c5a059] uppercase mb-4 pb-2 border-b border-white/10">
                Savoir-Faire
              </h3>
              <ul className="space-y-3 font-sans text-xs tracking-[0.08em] text-[#bfb8ab]">
                <li>
                  <Link
                    href="/#craftsmanship"
                    onClick={onClose}
                    className="hover:text-[#f4e8cb] transition-colors flex items-center justify-between group"
                  >
                    <span>Place Vendôme Atelier</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#c5a059]" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#craftsmanship"
                    onClick={onClose}
                    className="hover:text-[#f4e8cb] transition-colors flex items-center justify-between group"
                  >
                    <span>Type IIa Diamond Selection</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#c5a059]" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#craftsmanship"
                    onClick={onClose}
                    className="hover:text-[#f4e8cb] transition-colors flex items-center justify-between group"
                  >
                    <span>Ethical Provenance Protocol</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#c5a059]" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#craftsmanship"
                    onClick={onClose}
                    className="hover:text-[#f4e8cb] transition-colors flex items-center justify-between group"
                  >
                    <span>Heirloom Restoration & Care</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#c5a059]" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Curated Spotlight Preview */}
          <div className="col-span-4 pl-6 border-l border-white/10 flex flex-col justify-between">
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm group">
              <Image
                src={CATEGORIES[1].image}
                alt={CATEGORIES[1].title}
                fill
                sizes="400px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-5 flex flex-col justify-end">
                <span className="text-[10px] tracking-[0.2em] font-sans text-[#c5a059] uppercase font-medium">
                  Spotlight Creation
                </span>
                <h4 className="text-base font-serif text-[#faf7f2] mt-0.5">
                  Bague Étoile Polaire • 3.12ct
                </h4>
                <p className="text-[11px] text-[#bfb8ab] font-sans font-light mt-1">
                  Type IIa flawless solitaire mounted in platinum 950.
                </p>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between text-[11px] tracking-[0.16em] uppercase font-sans">
              <span className="text-[#8e8a7f]">Atelier Paris • 1894</span>
              <Link
                href="/#collections"
                onClick={onClose}
                className="text-[#c5a059] hover:text-[#f4e8cb] transition-colors flex items-center gap-1"
              >
                <span>View Solstice 2026</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

