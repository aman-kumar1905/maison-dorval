'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useShop } from '@/context/ShopContext';
import LuxuryButton from '../common/LuxuryButton';
import { Sparkles } from 'lucide-react';

export default function Hero() {
  const { openVIPModal } = useShop();
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP cinematic hero reveal animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, ease: 'power3.out', delay: 0.3 }
      );

      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out', delay: 0.8 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-[92vh] min-h-[640px] max-h-[1050px] flex items-center justify-center overflow-hidden bg-[#070709] isolate"
    >
      {/* Background Cinematic Imagery with Ken-Burns scale */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3.5, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=90"
          alt="Maison D'Orval High Jewellery"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.42] contrast-[1.12]"
        />
        {/* Luxury Vignette & Radial Lighting Overlays */}
        <div className="absolute inset-0 bg-hero-vignette" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#070709_95%)]" />
      </motion.div>

      {/* Floating Maison Seal */}
      <div
        ref={badgeRef}
        className="absolute top-8 right-6 sm:right-12 z-10 hidden md:flex items-center gap-3 px-4 py-2 bg-black/40 backdrop-blur-md border border-[#c5a059]/25 rounded-none"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
        <span className="text-[10px] tracking-[0.24em] uppercase font-sans text-[#e5c378]">
          Atelier Place Vendôme • Paris 1894
        </span>
      </div>

      {/* Center Cinematic Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 justify-center mb-6"
        >
          <span className="w-8 h-[1px] bg-[#c5a059]/60" />
          <span className="text-[11px] sm:text-xs tracking-[0.34em] font-sans text-[#c5a059] uppercase font-medium">
            Collection Solstice 2026 • Haute Joaillerie
          </span>
          <span className="w-8 h-[1px] bg-[#c5a059]/60" />
        </motion.div>

        {/* Main Headline */}
        <h1
          ref={headlineRef}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] text-[#faf7f2] font-light leading-[1.08] tracking-tight max-w-4xl"
        >
          The Architecture of <br className="hidden sm:inline" />
          <span className="italic font-serif font-normal text-gold-gradient">
            Pure Light & Gold
          </span>
        </h1>

        {/* Editorial Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg text-[#d8d3c7] font-sans font-light max-w-2xl leading-relaxed tracking-wide"
        >
          One hundred and thirty years of French savoir-faire. Sculpted in responsibly sourced 18-karat gold and Type IIa diamonds, engineered to awaken with the movement of skin.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <LuxuryButton
            href="#collections"
            variant="solid"
            size="lg"
            className="w-full sm:w-auto min-w-[220px]"
          >
            Explore Solstice 2026
          </LuxuryButton>

          <LuxuryButton
            variant="primary"
            size="lg"
            onClick={() => openVIPModal('Private Atelier Viewing')}
            className="w-full sm:w-auto min-w-[220px]"
          >
            Book Private Atelier Viewing
          </LuxuryButton>
        </motion.div>
      </div>

      {/* Bottom Coordinates & Scroll Indicator */}
      <div className="absolute bottom-6 left-0 w-full px-6 sm:px-12 z-10 flex items-center justify-between text-[#8a857b] text-[10px] tracking-[0.24em] font-sans uppercase">
        <div className="hidden sm:block">
          <span>48.8675° N, 2.3294° E</span>
        </div>

        <a
          href="#categories"
          className="mx-auto sm:mx-0 flex flex-col items-center gap-2 group hover:text-[#c5a059] transition-colors"
        >
          <span className="text-[9px] tracking-[0.3em]">Découvrez</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#c5a059] to-transparent relative overflow-hidden">
            <motion.div
              animate={{ y: [0, 32, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="w-full h-2 bg-[#f4e8cb]"
            />
          </div>
        </a>

        <div className="hidden sm:block text-right">
          <span>Place Vendôme • Paris</span>
        </div>
      </div>
    </section>
  );
}
