'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import MegaMenu from './MegaMenu';

interface NavLinkItem {
  label: string;
  href: string;
  hasMenu?: boolean;
}

const LEFT_NAV_LINKS: NavLinkItem[] = [
  { label: 'Haute Or', href: '/#categories', hasMenu: true },
  { label: 'Diamants', href: '/#categories', hasMenu: true },
  { label: 'Bridal Couture', href: '/#bridal', hasMenu: true },
];

const RIGHT_NAV_LINKS: NavLinkItem[] = [
  { label: 'Collections', href: '/#collections' },
  { label: 'L’Atelier', href: '/#craftsmanship' },
];

const MOBILE_NAV_LINKS = [
  { label: 'Haute Or', href: '/#categories' },
  { label: 'Diamants Éternels', href: '/#categories' },
  { label: 'Argent & Platine', href: '/#categories' },
  { label: 'Bridal Couture', href: '/#bridal' },
  { label: 'Collections Signatures', href: '/#collections' },
  { label: 'L’Atelier Place Vendôme', href: '/#craftsmanship' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const {
    openCart,
    cartCount,
    openSearch,
    openVIPModal,
    wishlist,
    openWishlist,
  } = useShop();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // TASK 2: Auto-dismiss MegaMenu on scroll (>15px) or Escape key
  useEffect(() => {
    if (!activeMegaMenu) return;

    const initialScrollY = window.scrollY;

    const handleScrollDismiss = () => {
      if (Math.abs(window.scrollY - initialScrollY) > 15) {
        setActiveMegaMenu(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMegaMenu(null);
      }
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.dataset.backdrop === 'megamenu' || (headerRef.current && !headerRef.current.contains(target))) {
        setActiveMegaMenu(null);
      }
    };

    window.addEventListener('scroll', handleScrollDismiss, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('touchstart', handlePointerDown);

    return () => {
      window.removeEventListener('scroll', handleScrollDismiss);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('touchstart', handlePointerDown);
    };
  }, [activeMegaMenu]);

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#070709]/92 backdrop-blur-md border-b border-[#c5a059]/20 shadow-[0_12px_40px_rgba(0,0,0,0.8)] py-3'
            : 'bg-transparent border-b border-white/[0.07] py-5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          {/* TASK 1: Balanced 3-column layout preventing center logo collision at 1440px */}
          <div className="flex lg:grid lg:grid-cols-[1fr_auto_1fr] items-center justify-between gap-2 lg:gap-4">
            {/* Left Column: Mobile Menu Toggle & Primary Category Navigation */}
            <div className="flex items-center justify-start gap-4 xl:gap-7 min-w-0">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-[#faf7f2] p-2.5 min-w-[44px] min-h-[44px] -ml-2 hover:text-[#c5a059] transition-colors flex items-center justify-center"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <nav className="hidden lg:flex items-center gap-4 xl:gap-7">
                {LEFT_NAV_LINKS.map((link) => (
                  <div
                    key={link.label}
                    onMouseEnter={() => link.hasMenu && setActiveMegaMenu(link.label)}
                    className="relative group py-2 shrink-0"
                  >
                    <Link
                      href={link.href}
                      className="text-[11px] xl:text-[11.5px] font-sans tracking-[0.16em] xl:tracking-[0.2em] text-[#d6d0c4] hover:text-[#f4e8cb] uppercase transition-colors flex items-center gap-1 whitespace-nowrap"
                    >
                      <span>{link.label}</span>
                      {link.hasMenu && (
                        <ChevronDown className="w-3 h-3 text-[#c5a059]/60 group-hover:rotate-180 transition-transform duration-300" />
                      )}
                    </Link>
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a059] group-hover:w-full transition-all duration-300" />
                  </div>
                ))}
              </nav>
            </div>

            {/* Center Column: Visually Centered Brand Logotype with Strict Sizing */}
            <div className="flex flex-col items-center justify-center text-center shrink-0 px-2 lg:px-6">
              <Link href="/" className="group inline-flex flex-col items-center">
                <span className="font-display text-lg sm:text-xl lg:text-[1.45rem] xl:text-[1.7rem] tracking-[0.22em] xl:tracking-[0.28em] text-[#faf7f2] uppercase group-hover:text-gold-gradient transition-all duration-500 font-light whitespace-nowrap">
                  Maison D’Orval
                </span>
                <span className="text-[7.5px] xl:text-[8.5px] tracking-[0.3em] xl:tracking-[0.38em] text-[#c5a059] uppercase font-sans mt-0.5 group-hover:text-[#f4e8cb] transition-colors whitespace-nowrap">
                  Haute Joaillerie • Paris
                </span>
              </Link>
            </div>

            {/* Right Column: Remaining Nav Links & Interactive Action Icons */}
            <div className="flex items-center justify-end gap-2.5 sm:gap-3 xl:gap-5 min-w-0">
              <nav className="hidden lg:flex items-center gap-4 xl:gap-7">
                {RIGHT_NAV_LINKS.map((link) => (
                  <div
                    key={link.label}
                    onMouseEnter={() => link.hasMenu && setActiveMegaMenu(link.label)}
                    className="relative group py-2 shrink-0"
                  >
                    <Link
                      href={link.href}
                      className="text-[11px] xl:text-[11.5px] font-sans tracking-[0.16em] xl:tracking-[0.2em] text-[#d6d0c4] hover:text-[#f4e8cb] uppercase transition-colors flex items-center gap-1 whitespace-nowrap"
                    >
                      <span>{link.label}</span>
                      {link.hasMenu && (
                        <ChevronDown className="w-3 h-3 text-[#c5a059]/60 group-hover:rotate-180 transition-transform duration-300" />
                      )}
                    </Link>
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a059] group-hover:w-full transition-all duration-300" />
                  </div>
                ))}
              </nav>

              {/* VIP Salon appointment link */}
              <button
                onClick={() => openVIPModal('Private Salon Viewing')}
                className="hidden 2xl:inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-[#c5a059] hover:text-[#f4e8cb] border border-[#c5a059]/30 hover:border-[#c5a059] px-2.5 py-1.5 rounded-none transition-all uppercase font-sans whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-2.5 h-2.5" />
                <span>Private Salon</span>
              </button>

              <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                {/* Search button with min 44x44px touch target */}
                <button
                  onClick={openSearch}
                  aria-label="Search creations"
                  className="text-[#d6d0c4] hover:text-[#c5a059] transition-colors p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </button>

                {/* Wishlist button with min 44x44px touch target */}
                <button
                  onClick={openWishlist}
                  aria-label="Wishlist"
                  className="relative text-[#d6d0c4] hover:text-[#c5a059] transition-colors p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                  {wishlist.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 bg-[#c5a059] text-[#070709] text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center font-sans">
                      {wishlist.length}
                    </span>
                  )}
                </button>

                {/* Cart Drawer trigger with min 44x44px touch target */}
                <button
                  onClick={openCart}
                  aria-label="View Shopping Bag"
                  className="relative text-[#d6d0c4] hover:text-[#c5a059] transition-colors p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center group gap-1.5"
                >
                  <div className="relative">
                    <ShoppingBag className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                    {cartCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1.5 -right-1.5 bg-[#c5a059] text-[#070709] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-sans shadow-md"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </div>
                  <span className="hidden xl:inline text-[11px] font-sans tracking-[0.16em] uppercase text-[#a39f93] group-hover:text-[#faf7f2] transition-colors">
                    Bag
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hover Mega Menu */}
        <MegaMenu
          isOpen={activeMegaMenu !== null}
          activeMenu={activeMegaMenu}
          onClose={() => setActiveMegaMenu(null)}
        />
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: '0%' }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#070709]/98 backdrop-blur-2xl z-50 flex flex-col justify-between p-8 overflow-y-auto lg:hidden"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <span className="font-display text-lg tracking-[0.24em] text-[#faf7f2] uppercase">
                  Maison D’Orval
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#faf7f2] hover:text-[#c5a059] transition-colors p-2"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-8 flex flex-col space-y-6">
                {MOBILE_NAV_LINKS.map((link, idx) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-serif text-2xl text-[#faf7f2] hover:text-[#c5a059] transition-colors block"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 space-y-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openVIPModal('Private Salon Viewing');
                }}
                className="w-full py-3.5 border border-[#c5a059] text-[#c5a059] text-xs uppercase tracking-[0.22em] font-sans hover:bg-[#c5a059] hover:text-[#070709] transition-colors"
              >
                Book Private Salon
              </button>
              <p className="text-center text-[10px] tracking-[0.2em] uppercase font-sans text-[#78746c]">
                Place Vendôme • Paris 1894
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

