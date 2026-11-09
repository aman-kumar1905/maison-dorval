'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '@/context/ShopContext';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Truck,
  Building2,
  Sparkles,
  AlertCircle,
  ShoppingBag,
} from 'lucide-react';
import LuxuryButton from '../common/LuxuryButton';

const SALON_COLLECTION_POINTS = [
  'Place Vendôme Salon — Paris (Demo Concept)',
  'Madison Avenue Maison — New York (Demo Concept)',
  'Mayfair Viewing Suite — London (Demo Concept)',
  'Ginza Exclusive Salon — Tokyo (Demo Concept)',
  'Fashion Avenue Suite — Dubai (Demo Concept)',
];

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    closeCheckout,
    cart,
    cartTotal,
    currencySymbol,
    placeOrder,
  } = useShop();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [salutation, setSalutation] = useState('Madame');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'courier' | 'salon'>('courier');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('France');
  const [selectedSalon, setSelectedSalon] = useState(SALON_COLLECTION_POINTS[0]);
  const [giftNote, setGiftNote] = useState('');
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isCheckoutOpen) return null;

  const handleNextFromClientInfo = () => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!fullName.trim() || !phone.trim() || !isValidEmail) {
      setErrorMsg('Please provide your name, a valid email address, and phone contact.');
      return;
    }
    setErrorMsg('');
    setStep(3);
  };

  const handleNextFromDelivery = () => {
    if (deliveryMethod === 'courier' && (!address.trim() || !city.trim() || !postalCode.trim())) {
      setErrorMsg('Please provide complete armoured courier delivery address details.');
      return;
    }
    setErrorMsg('');
    setStep(4);
  };

  const handleConfirmOrder = () => {
    const orderRef = placeOrder({
      items: cart,
      total: cartTotal,
      currency: currencySymbol,
      clientName: `${salutation} ${fullName}`.trim(),
      email,
      phone,
      deliveryMethod,
      address: deliveryMethod === 'courier' ? address : undefined,
      city: deliveryMethod === 'courier' ? city : undefined,
      postalCode: deliveryMethod === 'courier' ? postalCode : undefined,
      country: deliveryMethod === 'courier' ? country : undefined,
      salon: deliveryMethod === 'salon' ? selectedSalon : undefined,
      giftNote: giftNote.trim() || undefined,
    });

    setConfirmedOrderId(orderRef);
    setStep(5);
  };

  const handleClose = () => {
    setStep(1);
    setConfirmedOrderId(null);
    closeCheckout();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          className="relative bg-[#09090d] border border-[#c5a059]/30 shadow-[0_30px_90px_rgba(0,0,0,0.95)] max-w-2xl w-full z-10 overflow-hidden my-auto"
        >
          {/* Header Bar */}
          <div className="px-6 sm:px-8 py-5 border-b border-white/10 flex items-center justify-between bg-[#0b0b10]">
            <div>
              <span className="text-[9.5px] tracking-[0.24em] uppercase font-sans text-[#c5a059] flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3 h-3" />
                Maison D’Orval White-Glove Concierge
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#faf7f2] mt-0.5">
                {step === 5 ? 'Acquisition Registered' : 'Private Checkout Simulation'}
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="text-[#8e8a7f] hover:text-[#faf7f2] p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Indicator (Hidden on confirmation step) */}
          {step < 5 && (
            <div className="px-6 sm:px-8 pt-4 pb-2 bg-[#08080b] border-b border-white/5">
              <div className="flex items-center justify-between text-[10px] font-sans tracking-widest uppercase text-[#7a766c]">
                <span className={step >= 1 ? 'text-[#c5a059] font-medium' : ''}>1. Bag</span>
                <span className="w-6 h-[1px] bg-white/10" />
                <span className={step >= 2 ? 'text-[#c5a059] font-medium' : ''}>2. Patron</span>
                <span className="w-6 h-[1px] bg-white/10" />
                <span className={step >= 3 ? 'text-[#c5a059] font-medium' : ''}>3. Delivery</span>
                <span className="w-6 h-[1px] bg-white/10" />
                <span className={step >= 4 ? 'text-[#c5a059] font-medium' : ''}>4. Review</span>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {errorMsg && (
            <div className="px-6 sm:px-8 py-3 bg-red-950/40 border-b border-red-500/30 flex items-center gap-2 text-xs text-red-200 font-sans">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Modal Content Body */}
          <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
            {/* STEP 1: BAG REVIEW */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-serif text-lg text-[#faf7f2]">
                    High Jewellery Bag Review
                  </h4>
                  <p className="text-xs text-[#8e8a7f] font-sans mt-0.5">
                    Review your bespoke selections before providing confidential delivery instructions.
                  </p>
                </div>

                <div className="divide-y divide-white/5 space-y-4">
                  {cart.map((item) => (
                    <div key={item.product.id} className="pt-4 first:pt-0 flex gap-4 items-center">
                      <div className="relative w-16 h-20 bg-[#121218] border border-white/10 shrink-0 overflow-hidden">
                        <Image
                          src={item.product.primaryImage}
                          alt={item.product.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-serif text-sm text-[#faf7f2] truncate">
                          {item.product.name}
                        </h5>
                        <p className="text-[10.5px] font-sans text-[#a39f93]">
                          {item.selectedMetal || item.product.metal} • {item.selectedSize}
                        </p>
                        <p className="text-xs font-serif text-[#f4e8cb] mt-1">
                          Qty: {item.quantity} × {currencySymbol}
                          {item.product.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-center text-sm">
                  <span className="font-sans text-[#a39f93] uppercase tracking-wider text-[11px]">
                    Total Suite Valuation
                  </span>
                  <span className="font-serif text-xl text-[#f4e8cb]">
                    {currencySymbol}
                    {cartTotal.toLocaleString()}
                  </span>
                </div>

                <div className="p-3 bg-white/[0.02] border border-[#c5a059]/20 flex items-center gap-2 text-[10.5px] font-sans text-[#d4cfc5]">
                  <ShieldCheck className="w-4 h-4 text-[#c5a059] shrink-0" />
                  <span>Includes white-glove armoured delivery & complimentary 30-day vault return guarantee.</span>
                </div>

                <div className="pt-2 flex justify-end">
                  <LuxuryButton
                    variant="solid"
                    size="md"
                    onClick={() => setStep(2)}
                    className="w-full sm:w-auto"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Continue to Patron Details
                  </LuxuryButton>
                </div>
              </div>
            )}

            {/* STEP 2: CLIENT INFORMATION */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-serif text-lg text-[#faf7f2]">
                    Patron Confidential Information
                  </h4>
                  <p className="text-xs text-[#8e8a7f] font-sans mt-0.5">
                    Your identity remains protected under Maison D’Orval discretion protocols.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    {['Madame', 'Monsieur', 'Dr.', 'Hon.'].map((sal) => (
                      <button
                        key={sal}
                        type="button"
                        onClick={() => setSalutation(sal)}
                        className={`py-1.5 px-3 text-xs font-sans border transition-all ${
                          salutation === sal
                            ? 'border-[#c5a059] bg-[#c5a059]/15 text-[#f4e8cb]'
                            : 'border-white/10 text-[#8e8a7f] hover:border-white/25'
                        }`}
                      >
                        {sal}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="text-[10px] tracking-[0.18em] uppercase font-sans text-[#8e8a7f] block mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alexandra Dumas"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#111116] border border-white/10 text-xs text-[#faf7f2] px-3.5 py-2.5 focus:outline-none focus:border-[#c5a059] font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] tracking-[0.18em] uppercase font-sans text-[#8e8a7f] block mb-1">
                        Confidential Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="client@vendome.fr"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#111116] border border-white/10 text-xs text-[#faf7f2] px-3.5 py-2.5 focus:outline-none focus:border-[#c5a059] font-sans"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-[0.18em] uppercase font-sans text-[#8e8a7f] block mb-1">
                        Telephone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+33 1 42 68 00 00"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#111116] border border-white/10 text-xs text-[#faf7f2] px-3.5 py-2.5 focus:outline-none focus:border-[#c5a059] font-sans"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/10">
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs font-sans text-[#8e8a7f] hover:text-[#faf7f2] flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Bag</span>
                  </button>
                  <LuxuryButton
                    variant="solid"
                    size="md"
                    onClick={handleNextFromClientInfo}
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Delivery Protocol
                  </LuxuryButton>
                </div>
              </div>
            )}

            {/* STEP 3: DELIVERY PROTOCOL */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-serif text-lg text-[#faf7f2]">
                    Discreet Handover & Delivery Protocol
                  </h4>
                  <p className="text-xs text-[#8e8a7f] font-sans mt-0.5">
                    Select white-glove armoured delivery to your private address or collection at a Maison salon.
                  </p>
                </div>

                {/* Delivery Option Selector */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('courier')}
                    className={`p-4 border text-left transition-all ${
                      deliveryMethod === 'courier'
                        ? 'border-[#c5a059] bg-[#c5a059]/15 text-[#faf7f2]'
                        : 'border-white/10 bg-[#09090d] text-[#8e8a7f] hover:border-white/25'
                    }`}
                  >
                    <Truck className="w-5 h-5 text-[#c5a059] mb-2" />
                    <span className="font-serif text-sm block">Armoured Courier</span>
                    <span className="text-[10px] text-[#8e8a7f] block font-sans mt-0.5">
                      Direct private residence handover
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('salon')}
                    className={`p-4 border text-left transition-all ${
                      deliveryMethod === 'salon'
                        ? 'border-[#c5a059] bg-[#c5a059]/15 text-[#faf7f2]'
                        : 'border-white/10 bg-[#09090d] text-[#8e8a7f] hover:border-white/25'
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-[#c5a059] mb-2" />
                    <span className="font-serif text-sm block">Private Salon Collection</span>
                    <span className="text-[10px] text-[#8e8a7f] block font-sans mt-0.5">
                      Collection by prior appointment
                    </span>
                  </button>
                </div>

                {/* Courier Address Fields */}
                {deliveryMethod === 'courier' ? (
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-[10px] tracking-[0.18em] uppercase font-sans text-[#8e8a7f] block mb-1">
                        Private Delivery Address *
                      </label>
                      <input
                        type="text"
                        placeholder="12 Place Vendôme, Suite 4"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-[#111116] border border-white/10 text-xs text-[#faf7f2] px-3.5 py-2.5 focus:outline-none focus:border-[#c5a059] font-sans"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-[10px] tracking-[0.18em] uppercase font-sans text-[#8e8a7f] block mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          placeholder="Paris"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full bg-[#111116] border border-white/10 text-xs text-[#faf7f2] px-3 py-2.5 focus:outline-none focus:border-[#c5a059] font-sans"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] tracking-[0.18em] uppercase font-sans text-[#8e8a7f] block mb-1">
                          Postal Code *
                        </label>
                        <input
                          type="text"
                          placeholder="75001"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className="w-full bg-[#111116] border border-white/10 text-xs text-[#faf7f2] px-3 py-2.5 focus:outline-none focus:border-[#c5a059] font-sans"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] tracking-[0.18em] uppercase font-sans text-[#8e8a7f] block mb-1">
                          Country
                        </label>
                        <input
                          type="text"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full bg-[#111116] border border-white/10 text-xs text-[#faf7f2] px-3 py-2.5 focus:outline-none focus:border-[#c5a059] font-sans"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 pt-2">
                    <label className="text-[10px] tracking-[0.18em] uppercase font-sans text-[#8e8a7f] block">
                      Select Collection Salon *
                    </label>
                    <select
                      value={selectedSalon}
                      onChange={(e) => setSelectedSalon(e.target.value)}
                      className="w-full bg-[#111116] border border-white/15 text-xs text-[#faf7f2] px-3.5 py-3 rounded-none focus:outline-none focus:border-[#c5a059] font-sans"
                    >
                      {SALON_COLLECTION_POINTS.map((s) => (
                        <option key={s} value={s} className="bg-[#111116]">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Optional Gift Inscription */}
                <div>
                  <label className="text-[10px] tracking-[0.18em] uppercase font-sans text-[#8e8a7f] block mb-1">
                    Complimentary Calligraphed Gift Inscription (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Inscribed on heavy Parisian parchment paper with wax seal..."
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    className="w-full bg-[#111116] border border-white/10 text-xs text-[#faf7f2] p-3 focus:outline-none focus:border-[#c5a059] font-sans resize-none"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/10">
                  <button
                    onClick={() => setStep(2)}
                    className="text-xs font-sans text-[#8e8a7f] hover:text-[#faf7f2] flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Patron</span>
                  </button>
                  <LuxuryButton
                    variant="solid"
                    size="md"
                    onClick={handleNextFromDelivery}
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Review Acquisition
                  </LuxuryButton>
                </div>
              </div>
            )}

            {/* STEP 4: CONFIDENTIAL REVIEW & PLACEMENT */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-serif text-lg text-[#faf7f2]">
                    Final Acquisition Review
                  </h4>
                  <p className="text-xs text-[#8e8a7f] font-sans mt-0.5">
                    Confirm your high jewellery commission instructions.
                  </p>
                </div>

                {/* Important Demonstration Notice */}
                <div className="p-4 bg-[#c5a059]/10 border border-[#c5a059]/40 space-y-1.5 text-xs font-sans text-[#e5c378]">
                  <div className="flex items-center gap-2 font-medium uppercase tracking-wider text-[11px] text-[#f4e8cb]">
                    <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
                    <span>Demonstration Simulation Protocol</span>
                  </div>
                  <p className="text-[11px] text-[#d6d0c4] leading-relaxed">
                    This is an interactive boutique demonstration. <strong>No real financial transaction is conducted</strong>, and no credit card details are collected. Clicking confirm registers a simulated demo order reference.
                  </p>
                </div>

                {/* Summary Table */}
                <div className="border border-white/10 bg-white/[0.02] p-4 space-y-3 text-xs font-sans">
                  <div className="flex justify-between pb-2 border-b border-white/5">
                    <span className="text-[#8e8a7f]">Patron Name:</span>
                    <span className="text-[#faf7f2] font-medium">{salutation} {fullName}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-white/5">
                    <span className="text-[#8e8a7f]">Contact:</span>
                    <span className="text-[#faf7f2]">{email} • {phone}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-white/5">
                    <span className="text-[#8e8a7f]">Delivery Method:</span>
                    <span className="text-[#faf7f2]">
                      {deliveryMethod === 'courier' ? `Armoured Courier (${city}, ${country})` : selectedSalon}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 font-serif text-sm">
                    <span className="text-[#c5a059]">Total Valuation:</span>
                    <span className="text-[#f4e8cb] text-base">
                      {currencySymbol}
                      {cartTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/10">
                  <button
                    onClick={() => setStep(3)}
                    className="text-xs font-sans text-[#8e8a7f] hover:text-[#faf7f2] flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Delivery</span>
                  </button>
                  <LuxuryButton
                    variant="solid"
                    size="lg"
                    onClick={handleConfirmOrder}
                    icon={<Lock className="w-3.5 h-3.5" />}
                  >
                    Confirm & Place Demo Order
                  </LuxuryButton>
                </div>
              </div>
            )}

            {/* STEP 5: CONFIRMATION SCREEN */}
            {step === 5 && (
              <div className="text-center py-6 space-y-5">
                <div className="w-16 h-16 rounded-full border border-[#c5a059] mx-auto flex items-center justify-center text-[#c5a059] bg-[#c5a059]/10">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <span className="text-[10px] tracking-[0.28em] uppercase font-sans text-[#c5a059] block mb-1">
                    Concierge Dossier Registered
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#faf7f2]">
                    High Jewellery Order Confirmed
                  </h3>
                  <p className="text-xs text-[#a39f93] font-sans mt-2 max-w-md mx-auto leading-relaxed">
                    Thank you, {salutation} {fullName}. Your acquisition has been recorded under Maison D’Orval private registry.
                  </p>
                </div>

                {/* Order Reference Badge */}
                <div className="inline-block px-5 py-3 bg-[#0d0d14] border border-[#c5a059]/40 space-y-1">
                  <span className="text-[9.5px] uppercase tracking-[0.25em] font-sans text-[#8e8a7f] block">
                    Unique Order Reference
                  </span>
                  <span className="font-mono text-base text-[#f4e8cb] tracking-wider font-semibold block">
                    {confirmedOrderId}
                  </span>
                </div>

                <div className="p-4 bg-white/[0.02] border border-white/5 max-w-md mx-auto text-left text-xs font-sans space-y-2 text-[#9a958b]">
                  <div className="flex items-center gap-2 text-[#faf7f2]">
                    <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>A notification dossier has been logged for {email}.</span>
                  </div>
                  <p className="text-[11px] text-[#7a766c] leading-relaxed">
                    This order is stored locally in your browser demo archive. Our Chief Concierge simulation is ready for client salon inspection.
                  </p>
                </div>

                <div className="pt-4 flex justify-center">
                  <LuxuryButton
                    variant="solid"
                    size="md"
                    onClick={handleClose}
                    icon={<ShoppingBag className="w-3.5 h-3.5" />}
                  >
                    Return to Maison Showcase
                  </LuxuryButton>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

