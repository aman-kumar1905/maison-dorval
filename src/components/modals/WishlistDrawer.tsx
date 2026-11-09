'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '@/context/ShopContext';
import { PRODUCTS } from '@/data/jewelleryData';
import { X, Heart, ShoppingBag, Trash2, Sparkles } from 'lucide-react';
import LuxuryButton from '../common/LuxuryButton';

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    closeWishlist,
    moveToCart,
    toggleWishlist,
    currencySymbol,
    openQuickView,
  } = useShop();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeWishlist}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="absolute inset-y-0 right-0 max-w-full w-full sm:max-w-md bg-[#09090d] border-l border-[#c5a059]/20 shadow-[0_0_80px_rgba(0,0,0,0.9)] flex flex-col justify-between"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#c5a059] fill-[#c5a059]" />
                  <h3 className="font-serif text-xl text-[#faf7f2] tracking-wide">
                    Private Wishlist
                  </h3>
                </div>
                <p className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#c5a059] mt-0.5">
                  {wishlist.length} {wishlist.length === 1 ? 'Creation Saved' : 'Creations Saved'}
                </p>
              </div>
              <button
                onClick={closeWishlist}
                className="text-[#9e9a90] hover:text-[#faf7f2] p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
                aria-label="Close wishlist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Wishlist Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-white/5 space-y-6">
              {wishlistedProducts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-5">
                  <div className="w-16 h-16 rounded-full border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059]/50 bg-white/[0.02]">
                    <Heart className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-[#faf7f2]">
                      Your Wishlist is Empty
                    </h4>
                    <p className="text-xs text-[#8e8a7f] max-w-xs mt-1.5 font-sans leading-relaxed">
                      Save exceptional high-jewellery creations to view in private salon consultations or curate your personal suite.
                    </p>
                  </div>
                  <LuxuryButton
                    variant="primary"
                    size="sm"
                    href="/#featured"
                    onClick={closeWishlist}
                  >
                    Discover Sovereign Jewels
                  </LuxuryButton>
                </div>
              ) : (
                wishlistedProducts.map((product) => (
                  <div key={product.id} className="pt-6 first:pt-0 flex gap-4">
                    {/* Thumbnail Image */}
                    <div
                      onClick={() => {
                        closeWishlist();
                        openQuickView(product);
                      }}
                      className="relative w-20 h-24 bg-[#14141a] border border-white/10 shrink-0 cursor-pointer overflow-hidden group"
                    >
                      <Image
                        src={product.primaryImage}
                        alt={product.name}
                        fill
                        sizes="80px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Item Information */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/product/${product.id}`}
                            onClick={closeWishlist}
                            className="font-serif text-sm text-[#faf7f2] hover:text-[#c5a059] transition-colors leading-snug"
                          >
                            {product.name}
                          </Link>
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className="text-[#7a766c] hover:text-red-400 p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center transition-colors"
                            aria-label={`Remove ${product.name} from wishlist`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[10px] tracking-wider uppercase font-sans text-[#a39f93] mt-0.5">
                          {product.metal}
                        </p>
                        <p className="font-serif text-xs text-[#f4e8cb] mt-1">
                          {currencySymbol}
                          {product.price.toLocaleString()}
                        </p>
                      </div>

                      {/* Actions: Move to Bag */}
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() => moveToCart(product.id)}
                          className="flex-1 py-1.5 px-3 bg-[#c5a059] hover:bg-[#e5c378] text-[#070709] text-[10px] tracking-[0.16em] uppercase font-sans font-medium flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Move to Bag</span>
                        </button>
                        <Link
                          href={`/product/${product.id}`}
                          onClick={closeWishlist}
                          className="py-1.5 px-2.5 border border-white/15 hover:border-[#c5a059] text-[10px] text-[#faf7f2] hover:text-[#c5a059] tracking-wider uppercase font-sans transition-colors"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary / CTA */}
            {wishlistedProducts.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#07070a]/90 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#9a958b]">
                  <span className="font-sans uppercase tracking-wider text-[10px]">
                    Total Portfolio Value
                  </span>
                  <span className="font-serif text-sm text-[#f4e8cb]">
                    {currencySymbol}
                    {wishlistedProducts
                      .reduce((sum, p) => sum + p.price, 0)
                      .toLocaleString()}
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => {
                      wishlistedProducts.forEach((p) => moveToCart(p.id));
                    }}
                    className="w-full py-2.5 bg-gradient-to-r from-[#c5a059] via-[#e5c378] to-[#c5a059] text-[#070709] text-[11px] tracking-[0.2em] uppercase font-medium flex items-center justify-center gap-2 hover:brightness-105 transition-all shadow-md"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move All to Bag</span>
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[9.5px] text-[#6d6961] uppercase tracking-wider pt-1 font-sans">
                    <Sparkles className="w-3 h-3 text-[#c5a059]" />
                    <span>Discreet Personal Client Curations</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
