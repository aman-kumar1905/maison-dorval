'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '@/context/ShopContext';
import { X, Trash2, Plus, Minus, Gift, ArrowRight } from 'lucide-react';
import LuxuryButton from '../common/LuxuryButton';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    currencySymbol,
    openVIPModal,
    openCheckout,
  } = useShop();

  const [giftWrap, setGiftWrap] = useState(true);

  const handleCheckout = () => {
    openCheckout();
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
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
                <h3 className="font-serif text-xl text-[#faf7f2] tracking-wide">
                  Your Haute Joaillerie Bag
                </h3>
                <p className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#c5a059] mt-0.5">
                  Complimentary Armoured Courier
                </p>
              </div>
              <button
                onClick={closeCart}
                className="text-[#9e9a90] hover:text-[#faf7f2] p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-white/5 space-y-6">
              {cart.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <p className="font-serif text-xl text-[#d4cfc5]">
                    Your jewel case is presently empty
                  </p>
                  <p className="text-xs text-[#8a857b] font-sans max-w-xs mx-auto">
                    Explore our high-jewellery creations, solitaire diamonds, and bespoke bridal collections.
                  </p>
                  <LuxuryButton
                    variant="primary"
                    size="sm"
                    onClick={closeCart}
                    className="mt-4"
                  >
                    Explore Creations
                  </LuxuryButton>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="pt-6 first:pt-0 flex gap-4">
                    <div className="relative w-20 h-24 bg-[#111116] border border-white/10 shrink-0 overflow-hidden">
                      <Image
                        src={item.product.primaryImage}
                        alt={item.product.name}
                        fill
                        sizes="100px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-base text-[#faf7f2] leading-snug">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-[#6d6a62] hover:text-[#d9534f] transition-colors p-0.5"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-[#c5a059] font-sans mt-0.5">
                          {item.selectedMetal || item.product.metal}
                        </p>
                        {item.selectedSize && (
                          <p className="text-[10px] text-[#8e8a7f] font-sans">
                            Size: {item.selectedSize}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-white/10 px-2 py-0.5 gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="text-[#8e8a7f] hover:text-[#faf7f2]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-sans text-[#faf7f2] min-w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="text-[#8e8a7f] hover:text-[#faf7f2]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-serif text-sm text-[#faf7f2]">
                          {currencySymbol}
                          {(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Summary */}
            {cart.length > 0 && (
              <div className="p-6 bg-[#07070a] border-t border-white/10 space-y-4">
                {/* Gift packaging option */}
                <div
                  onClick={() => setGiftWrap(!giftWrap)}
                  className="flex items-center gap-3 p-2.5 rounded bg-white/[0.02] border border-white/5 cursor-pointer hover:border-[#c5a059]/30 transition-colors"
                >
                  <Gift className="w-4 h-4 text-[#c5a059] shrink-0" />
                  <div className="flex-1 text-[11px] font-sans">
                    <span className="text-[#e8dfcf] block font-medium">
                      Maison D’Orval Signature Gift Presentation
                    </span>
                    <span className="text-[#8a857b]">
                      Handmade jewel case with wax seal & handwritten card
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={(e) => {
                      e.stopPropagation();
                      setGiftWrap(e.target.checked);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="accent-[#c5a059] w-4 h-4 cursor-pointer"
                    aria-label="Signature Gift Presentation"
                  />
                </div>

                {/* Subtotal */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-sans text-[#a39f93]">
                    <span>Subtotal</span>
                    <span className="text-[#faf7f2]">
                      {currencySymbol}
                      {cartTotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs font-sans text-[#a39f93]">
                    <span>Insured Courier</span>
                    <span className="text-[#c5a059] uppercase tracking-wider text-[10px]">
                      Complimentary
                    </span>
                  </div>
                  <div className="flex justify-between font-serif text-lg text-[#faf7f2] pt-2 border-t border-white/10">
                    <span>Total Estimate</span>
                    <span className="text-[#f4e8cb]">
                      {currencySymbol}
                      {cartTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-2">
                  <LuxuryButton
                    variant="solid"
                    size="md"
                    onClick={handleCheckout}
                    className="w-full"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Proceed with Concierge
                  </LuxuryButton>

                  <button
                    onClick={() => {
                      closeCart();
                      openVIPModal('Custom Ring Sizing & Atelier Consultation');
                    }}
                    className="w-full text-center text-[10px] tracking-[0.2em] uppercase font-sans text-[#c5a059] hover:text-[#f4e8cb] min-h-[44px] flex items-center justify-center py-2 transition-colors"
                  >
                    Request Custom Sizing Consultation
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

