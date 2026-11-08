'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '@/context/ShopContext';
import { X, ShieldCheck, Heart, Sparkles, Check } from 'lucide-react';
import LuxuryButton from '../common/LuxuryButton';
import { MetalType } from '@/types/jewellery';

const SIZES = ['48 (EU) / 4.5 (US)', '50 (EU) / 5.25 (US)', '52 (EU) / 6 (US)', '54 (EU) / 6.75 (US)', '56 (EU) / 7.5 (US)'];
const METALS: MetalType[] = ['Platinum 950', '18k Yellow Gold', '18k Rose Gold'];

export default function QuickViewModal() {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    currencySymbol,
    toggleWishlist,
    isWishlisted,
    openVIPModal,
  } = useShop();

  const [activeImage, setActiveImage] = useState<'primary' | 'secondary'>('primary');
  const [selectedSize, setSelectedSize] = useState('52 (EU) / 6 (US)');
  const [selectedMetal, setSelectedMetal] = useState<MetalType>('Platinum 950');
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;

  const handleAdd = () => {
    addToCart(quickViewProduct, 1, selectedSize, selectedMetal);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      closeQuickView();
    }, 1200);
  };

  const isFavorited = isWishlisted(quickViewProduct.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#09090d] border border-[#c5a059]/30 shadow-[0_25px_70px_rgba(0,0,0,0.95)] max-w-4xl w-full z-10 overflow-hidden my-auto"
        >
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 text-[#a39f93] hover:text-[#faf7f2] p-2 bg-black/40 rounded-full backdrop-blur-sm transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Imagery with toggle */}
            <div className="relative bg-[#0d0d12] flex flex-col justify-between p-6">
              <div className="relative aspect-square w-full overflow-hidden border border-white/5">
                <Image
                  src={
                    activeImage === 'primary'
                      ? quickViewProduct.primaryImage
                      : quickViewProduct.secondaryImage
                  }
                  alt={quickViewProduct.name}
                  fill
                  sizes="600px"
                  className="object-cover transition-all duration-700"
                />
              </div>

              {/* Thumbnail Selector */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setActiveImage('primary')}
                  className={`relative w-16 h-16 border overflow-hidden transition-all ${
                    activeImage === 'primary' ? 'border-[#c5a059]' : 'border-white/10 opacity-60'
                  }`}
                >
                  <Image
                    src={quickViewProduct.primaryImage}
                    alt="Studio shot"
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
                <button
                  onClick={() => setActiveImage('secondary')}
                  className={`relative w-16 h-16 border overflow-hidden transition-all ${
                    activeImage === 'secondary' ? 'border-[#c5a059]' : 'border-white/10 opacity-60'
                  }`}
                >
                  <Image
                    src={quickViewProduct.secondaryImage}
                    alt="Detail shot"
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              </div>
            </div>

            {/* Right: Specs and Actions */}
            <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.24em] uppercase font-sans text-[#c5a059]">
                    {quickViewProduct.metal}
                  </span>
                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className="text-[#8e8a7f] hover:text-[#c5a059] transition-colors p-1"
                    aria-label="Save to wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isFavorited ? 'fill-[#c5a059] text-[#c5a059]' : ''
                      }`}
                    />
                  </button>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl text-[#faf7f2] mt-1">
                  {quickViewProduct.name}
                </h3>
                <p className="text-xs text-[#a39f93] font-sans mt-1">
                  {quickViewProduct.subtitle}
                </p>

                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-serif text-2xl text-gold-gradient">
                    {currencySymbol}
                    {quickViewProduct.price.toLocaleString()}
                  </span>
                  {quickViewProduct.caratWeight && (
                    <span className="text-xs text-[#a39f93] font-sans border-l border-white/15 pl-3">
                      {quickViewProduct.caratWeight}
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#bfb8ab] font-sans font-light leading-relaxed mt-4">
                  {quickViewProduct.description}
                </p>

                {/* Craftsmanship Specifications */}
                <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                  <h4 className="text-[10.5px] uppercase tracking-[0.2em] font-sans text-[#e8dfcf] flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#c5a059]" />
                    Atelier Specifications
                  </h4>
                  <ul className="text-[11px] text-[#9e9a90] space-y-1 font-sans">
                    {quickViewProduct.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#c5a059]" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metal Selector */}
                <div className="mt-4 space-y-1.5">
                  <label className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#a39f93] block">
                    Precious Metal
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {METALS.map((metal) => (
                      <button
                        key={metal}
                        type="button"
                        onClick={() => setSelectedMetal(metal)}
                        className={`text-[10px] px-2.5 py-1.5 border font-sans uppercase tracking-wider transition-all ${
                          selectedMetal === metal
                            ? 'border-[#c5a059] bg-[#c5a059]/15 text-[#f4e8cb]'
                            : 'border-white/10 text-[#8e8a7f] hover:border-white/20'
                        }`}
                      >
                        {metal}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size selector */}
                <div className="mt-4 space-y-2">
                  <label className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#a39f93] block">
                    Select Finger Size (Complimentary Resizing Available)
                  </label>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full bg-[#121218] border border-white/10 text-xs text-[#faf7f2] px-3 py-2.5 rounded-none focus:outline-none focus:border-[#c5a059] font-sans"
                  >
                    {SIZES.map((sz) => (
                      <option key={sz} value={sz} className="bg-[#121218]">
                        {sz}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <LuxuryButton
                  variant="solid"
                  size="md"
                  onClick={handleAdd}
                  className="w-full"
                  icon={added ? <Check className="w-4 h-4" /> : undefined}
                >
                  {added ? 'Added to Bag' : 'Add to High Jewellery Bag'}
                </LuxuryButton>

                <div className="flex gap-2">
                  <LuxuryButton
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      closeQuickView();
                      openVIPModal(`Inquiry on ${quickViewProduct.name}`);
                    }}
                    className="w-full"
                  >
                    Inquire with Place Vendôme Salon
                  </LuxuryButton>
                </div>

                <div className="flex items-center justify-center gap-2 text-[10px] tracking-[0.16em] uppercase text-[#7a766c] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Insured Armoured Shipping • 30-Day Maison Return</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
