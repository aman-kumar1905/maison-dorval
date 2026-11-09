'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, MetalType } from '@/types/jewellery';
import { useShop } from '@/context/ShopContext';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LuxuryButton from '@/components/common/LuxuryButton';
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Check,
  Eye,
  Calendar,
  Lock,
} from 'lucide-react';

interface Props {
  product: Product;
  relatedProducts: Product[];
}

const METALS: MetalType[] = [
  '18k Yellow Gold',
  '18k White Gold',
  '18k Rose Gold',
  'Platinum 950',
];

const RING_SIZES = [
  '48 (EU) / 4.5 (US)',
  '50 (EU) / 5.25 (US)',
  '52 (EU) / 6 (US)',
  '54 (EU) / 6.75 (US)',
  '56 (EU) / 7.5 (US)',
  'Bespoke Salon Fitting',
];

const NECKLACE_LENGTHS = [
  '38 cm / 15 in (Collar)',
  '40 cm / 16 in (Choker)',
  '42 cm / 16.5 in (Princess)',
  'Bespoke Salon Tailoring',
];

const CUFF_SIZES = [
  'Small (15 cm / 5.9 in)',
  'Medium (16.5 cm / 6.5 in)',
  'Large (18 cm / 7.1 in)',
  'Bespoke Atelier Fit',
];

export default function ProductDetailClient({ product, relatedProducts }: Props) {
  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
    currencySymbol,
    openVIPModal,
    openQuickView,
  } = useShop();

  const lowerName = product.name.toLowerCase();
  const isRing = ['bague', 'alliance', 'solitaire'].some((t) => lowerName.includes(t));
  const isNecklace = ['collier', 'pendentif', 'parure', 'choker'].some((t) => lowerName.includes(t));
  const isCuff = ['manchette', 'bracelet'].some((t) => lowerName.includes(t));

  const sizingOptions = isRing ? RING_SIZES : isNecklace ? NECKLACE_LENGTHS : isCuff ? CUFF_SIZES : null;
  const sizingLabel = isRing
    ? 'Solitaire Ring Size (EU / US)'
    : isNecklace
    ? 'Articulated Choker Length'
    : isCuff
    ? 'Wrist Circumference'
    : null;

  const defaultSize = isRing ? RING_SIZES[2] : isNecklace ? NECKLACE_LENGTHS[1] : isCuff ? CUFF_SIZES[1] : 'Standard Atelier Fitting';

  const metalOptions: MetalType[] = METALS.includes(product.metal)
    ? METALS
    : [product.metal, ...METALS];

  const [selectedImage, setSelectedImage] = useState<'primary' | 'secondary'>('primary');
  const [selectedMetal, setSelectedMetal] = useState<MetalType>(product.metal);
  const [selectedSize, setSelectedSize] = useState<string>(defaultSize);
  const [added, setAdded] = useState(false);

  const favorited = isWishlisted(product.id);

  const activeImageUrl =
    selectedImage === 'primary' ? product.primaryImage : product.secondaryImage;

  const handleAcquire = () => {
    const finalSize = sizingOptions ? selectedSize : 'Standard Atelier Fitting';
    addToCart(product, 1, finalSize, selectedMetal);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-[#faf7f2] flex flex-col">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center flex-wrap gap-2 text-xs font-sans text-[#7a766c]">
            <li>
              <Link href="/" className="hover:text-[#c5a059] transition-colors">
                Maison D’Orval
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3 h-3 text-[#504c44]" />
            </li>
            <li>
              <Link href="/#featured" className="hover:text-[#c5a059] transition-colors uppercase">
                Creations
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3 h-3 text-[#504c44]" />
            </li>
            <li>
              <span className="capitalize hover:text-[#c5a059] transition-colors">
                {product.category}
              </span>
            </li>
            <li>
              <ChevronRight className="w-3 h-3 text-[#504c44]" />
            </li>
            <li className="text-[#f4e8cb] font-serif truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Product Hero Section: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Interactive Dual Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/5] sm:aspect-square w-full bg-[#0c0c11] border border-[#c5a059]/20 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImageUrl}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={activeImageUrl}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Watermark Hallmark */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-[#c5a059]/30 text-[9.5px] font-sans tracking-[0.2em] text-[#e5c378] uppercase">
                <Sparkles className="w-3 h-3 text-[#c5a059]" />
                <span>Place Vendôme Atelier</span>
              </div>

              {/* Wishlist Button floating over gallery */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[#faf7f2] hover:text-[#c5a059] transition-colors"
                aria-label="Toggle wishlist"
              >
                <Heart
                  className={`w-4 h-4 ${
                    favorited ? 'fill-[#c5a059] text-[#c5a059]' : ''
                  }`}
                />
              </button>
            </div>

            {/* Thumbnail Switcher */}
            <div className="grid grid-cols-4 gap-3">
              <button
                onClick={() => setSelectedImage('primary')}
                className={`relative aspect-square bg-[#0c0c11] border overflow-hidden transition-all ${
                  selectedImage === 'primary'
                    ? 'border-[#c5a059] ring-1 ring-[#c5a059]'
                    : 'border-white/10 opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={product.primaryImage}
                  alt="Primary view"
                  fill
                  sizes="120px"
                  className="object-cover"
                />
                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/75 text-[8px] font-sans text-[#c5a059] uppercase tracking-wider">
                  Front
                </span>
              </button>

              <button
                onClick={() => setSelectedImage('secondary')}
                className={`relative aspect-square bg-[#0c0c11] border overflow-hidden transition-all ${
                  selectedImage === 'secondary'
                    ? 'border-[#c5a059] ring-1 ring-[#c5a059]'
                    : 'border-white/10 opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={product.secondaryImage}
                  alt="Detail / worn view"
                  fill
                  sizes="120px"
                  className="object-cover"
                />
                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/75 text-[8px] font-sans text-[#c5a059] uppercase tracking-wider">
                  Macro
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: High Jewellery Specs and Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border-b border-white/10 pb-6">
              <span className="text-[10px] tracking-[0.28em] uppercase font-sans text-[#c5a059] block mb-2">
                Haute Joaillerie Reference • {product.id.toUpperCase()}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#faf7f2] font-light leading-tight">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#b8b3a7] font-sans mt-2 leading-relaxed">
                {product.subtitle}
              </p>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-serif text-2xl sm:text-3xl text-[#f4e8cb]">
                  {currencySymbol}
                  {product.price.toLocaleString()}
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#7a766c]">
                  Import Duties & Armoured Courier Included
                </span>
              </div>
            </div>

            {/* Description Paragraph */}
            <p className="text-xs sm:text-sm text-[#bfb8ab] font-sans font-light leading-relaxed">
              {product.description}
            </p>

            {/* Metal Selection */}
            <div className="space-y-2.5">
              <label className="text-[10.5px] tracking-[0.2em] uppercase font-sans text-[#c5a059] block">
                Precious Metal Selection
              </label>
              <div className="grid grid-cols-2 gap-2">
                {metalOptions.map((metal) => (
                  <button
                    key={metal}
                    type="button"
                    onClick={() => setSelectedMetal(metal)}
                    className={`py-2 px-3 text-[11px] border text-left font-sans transition-all flex items-center justify-between ${
                      selectedMetal === metal
                        ? 'border-[#c5a059] bg-[#c5a059]/15 text-[#f4e8cb]'
                        : 'border-white/10 bg-[#09090d] text-[#8e8a7f] hover:border-white/25'
                    }`}
                  >
                    <span>{metal}</span>
                    {selectedMetal === metal && (
                      <Check className="w-3.5 h-3.5 text-[#c5a059]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizing Selection if applicable */}
            {sizingOptions && sizingLabel && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10.5px] tracking-[0.2em] uppercase font-sans text-[#c5a059]">
                    {sizingLabel}
                  </label>
                  <button
                    onClick={() => openVIPModal(`Sizing Consultation for ${product.name}`)}
                    className="text-[10px] text-[#8e8a7f] hover:text-[#c5a059] underline underline-offset-2 font-sans"
                  >
                    Sizing Guide & Salon Fitting
                  </button>
                </div>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full bg-[#0c0c12] border border-white/15 text-xs text-[#faf7f2] px-3.5 py-3 rounded-none focus:outline-none focus:border-[#c5a059] font-sans"
                >
                  {sizingOptions.map((sz) => (
                    <option key={sz} value={sz} className="bg-[#0c0c12]">
                      {sz}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Technical Specifications Table */}
            <div className="border border-white/10 bg-white/[0.02] p-4 space-y-2.5">
              <span className="text-[10px] tracking-[0.22em] uppercase font-sans text-[#c5a059] block mb-1">
                Gemological & Technical Dossier
              </span>
              <div className="grid grid-cols-2 gap-y-2 text-xs font-sans">
                {product.caratWeight && (
                  <div>
                    <span className="text-[#7a766c] block text-[10px] uppercase tracking-wider">
                      Carat Weight
                    </span>
                    <span className="text-[#faf7f2]">{product.caratWeight}</span>
                  </div>
                )}
                {product.diamondGrade && (
                  <div>
                    <span className="text-[#7a766c] block text-[10px] uppercase tracking-wider">
                      Diamond Grade
                    </span>
                    <span className="text-[#faf7f2]">{product.diamondGrade}</span>
                  </div>
                )}
                {product.gemstone && (
                  <div>
                    <span className="text-[#7a766c] block text-[10px] uppercase tracking-wider">
                      Gemstone Cut
                    </span>
                    <span className="text-[#faf7f2]">{product.gemstone}</span>
                  </div>
                )}
                <div>
                  <span className="text-[#7a766c] block text-[10px] uppercase tracking-wider">
                    Purity Hallmark
                  </span>
                  <span className="text-[#faf7f2]">{selectedMetal}</span>
                </div>
              </div>

              {/* Bullet Details */}
              <ul className="pt-2 border-t border-white/5 space-y-1 text-[11px] text-[#9e9a90] font-sans">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#c5a059]" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-2">
              <LuxuryButton
                variant="solid"
                size="lg"
                onClick={handleAcquire}
                className="w-full justify-center"
                icon={added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
              >
                {added ? 'Creation Added to Bag' : 'Acquire Creation'}
              </LuxuryButton>

              <LuxuryButton
                variant="secondary"
                size="md"
                onClick={() => openVIPModal(`Viewing Reservation for ${product.name}`)}
                className="w-full justify-center"
                icon={<Calendar className="w-3.5 h-3.5" />}
              >
                Book Private Salon Viewing
              </LuxuryButton>
            </div>

            {/* White Glove Assurances */}
            <div className="pt-4 border-t border-white/10 space-y-2 text-[10.5px] font-sans text-[#8e8a7f]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>Complimentary Armoured Courier Delivery with White-Glove Handover</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>Confidential Maison Vault Protocol • 30-Day Heritage Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Curated Related Creations */}
        <section className="mt-20 sm:mt-28 border-t border-white/10 pt-16">
          <div className="text-center mb-10">
            <span className="text-[10px] tracking-[0.28em] uppercase font-sans text-[#c5a059]">
              Complementary Suites
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#faf7f2] mt-1">
              Curated Companions from the Suite
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                className="group relative bg-[#0b0b0f] border border-[#c5a059]/15 hover:border-[#c5a059]/40 transition-colors duration-500 flex flex-col justify-between"
              >
                <div className="relative aspect-[4/5] w-full bg-[#111116] overflow-hidden">
                  <Image
                    src={rel.primaryImage}
                    alt={rel.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Quick View trigger */}
                  <button
                    onClick={() => openQuickView(rel)}
                    className="absolute bottom-3 right-3 p-2 bg-black/60 backdrop-blur-md text-[#faf7f2] hover:text-[#c5a059] border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Inspect ${rel.name}`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-5 flex flex-col justify-between flex-1 space-y-2">
                  <div>
                    <span className="text-[9.5px] uppercase tracking-wider font-sans text-[#c5a059] block">
                      {rel.metal}
                    </span>
                    <Link
                      href={`/product/${rel.id}`}
                      className="font-serif text-base text-[#faf7f2] hover:text-[#c5a059] transition-colors line-clamp-1 mt-0.5"
                    >
                      {rel.name}
                    </Link>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="font-serif text-sm text-[#f4e8cb]">
                      {currencySymbol}
                      {rel.price.toLocaleString()}
                    </span>
                    <Link
                      href={`/product/${rel.id}`}
                      className="text-[10px] tracking-widest uppercase font-sans text-[#c5a059] hover:text-[#faf7f2] transition-colors"
                    >
                      View Piece
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

