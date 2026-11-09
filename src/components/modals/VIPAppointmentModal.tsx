'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '@/context/ShopContext';
import { X, Calendar, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import LuxuryButton from '../common/LuxuryButton';

const BOUTIQUES = [
  'Place Vendôme Salon — Paris (Demo Concept)',
  'Madison Avenue Maison — New York (Demo Concept)',
  'Mayfair Viewing Suite — London (Demo Concept)',
  'Ginza Exclusive Salon — Tokyo (Demo Concept)',
  'Fashion Avenue Suite — Dubai (Demo Concept)',
];

export default function VIPAppointmentModal() {
  const { isVIPModalOpen, closeVIPModal, vipSubject, saveAppointment } = useShop();

  const [submitted, setSubmitted] = useState(false);
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    boutique: BOUTIQUES[0],
    date: '2026-11-20',
    time: '15:00',
    notes: '',
  });

  if (!isVIPModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = saveAppointment({
      subject: vipSubject,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      boutique: formData.boutique,
      date: formData.date,
      time: formData.time,
      notes: formData.notes,
    });
    setConfirmedRef(ref);
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setConfirmedRef(null);
    closeVIPModal();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative bg-[#09090d] border border-[#c5a059]/30 shadow-[0_30px_90px_rgba(0,0,0,0.95)] max-w-xl w-full z-10 p-5 sm:p-8 md:p-10 my-auto max-h-[92vh] overflow-y-auto"
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-[#8e8a7f] hover:text-[#faf7f2] p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full border border-[#c5a059] mx-auto flex items-center justify-center text-[#c5a059] bg-[#c5a059]/10">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <span className="text-[10px] tracking-[0.26em] uppercase font-sans text-[#c5a059] block mb-1">
                  Private Reservation Registered
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#faf7f2]">
                  Salon Viewing Reserved
                </h3>
              </div>

              {/* Reference Number */}
              <div className="inline-block px-5 py-2.5 bg-[#0e0e14] border border-[#c5a059]/40 space-y-0.5">
                <span className="text-[9px] uppercase tracking-[0.24em] font-sans text-[#8e8a7f] block">
                  Appointment Reference
                </span>
                <span className="font-mono text-sm text-[#f4e8cb] font-semibold tracking-wider">
                  {confirmedRef}
                </span>
              </div>

              {/* Summary Details */}
              <div className="p-4 bg-white/[0.02] border border-white/5 max-w-sm mx-auto text-left text-xs font-sans space-y-1.5 text-[#a39f93]">
                <div className="flex justify-between">
                  <span className="text-[#7a766c]">Patron:</span>
                  <span className="text-[#faf7f2] font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7a766c]">Salon:</span>
                  <span className="text-[#faf7f2]">{formData.boutique}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7a766c]">Date & Time:</span>
                  <span className="text-[#faf7f2]">{formData.date} at {formData.time}</span>
                </div>
                <div className="pt-2 border-t border-white/5 text-[10.5px] text-[#c5a059]">
                  Demo Appointment Record — Saved locally to this browser session.
                </div>
              </div>

              <div className="pt-2">
                <LuxuryButton
                  variant="solid"
                  size="sm"
                  onClick={handleClose}
                >
                  Close Confirmation
                </LuxuryButton>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <span className="text-[10px] tracking-[0.26em] uppercase font-sans text-[#c5a059] flex items-center justify-center gap-1.5 font-medium">
                  <Sparkles className="w-3 h-3" />
                  Maison D’Orval Private Salon
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#faf7f2] mt-1">
                  Private Salon Viewing
                </h3>
                <p className="text-xs text-[#9a958b] font-sans mt-2 max-w-md mx-auto">
                  Experience our rarest high-jewellery suites in the absolute privacy of our historical salons with a dedicated Master Gemologist.
                </p>
                {vipSubject && (
                  <div className="mt-3 inline-block px-3 py-1 bg-white/[0.03] border border-white/10 text-[11px] text-[#e8dfcf] font-sans">
                    Inquiry: <span className="text-[#c5a059]">{vipSubject}</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] tracking-[0.18em] uppercase font-sans text-[#8e8a7f] block mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Alexandra Dumas (Demo)"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#111116] border border-white/10 text-xs text-[#faf7f2] px-3 py-2.5 rounded-none focus:outline-none focus:border-[#c5a059] font-sans"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.18em] uppercase font-sans text-[#8e8a7f] block mb-1">
                      Telephone / WhatsApp *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+33 1 42 68 00 00"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#111116] border border-white/10 text-xs text-[#faf7f2] px-3 py-2.5 rounded-none focus:outline-none focus:border-[#c5a059] font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] tracking-[0.18em] uppercase font-sans text-[#8e8a7f] block mb-1">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="liaison@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#111116] border border-white/10 text-xs text-[#faf7f2] px-3 py-2.5 rounded-none focus:outline-none focus:border-[#c5a059] font-sans"
                  />
                </div>

                <div>
                  <label className="text-[10px] tracking-[0.18em] uppercase font-sans text-[#8e8a7f] block mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#c5a059]" />
                    Select Flagship Salon
                  </label>
                  <select
                    value={formData.boutique}
                    onChange={(e) => setFormData({ ...formData, boutique: e.target.value })}
                    className="w-full bg-[#111116] border border-white/10 text-xs text-[#faf7f2] px-3 py-2.5 rounded-none focus:outline-none focus:border-[#c5a059] font-sans"
                  >
                    {BOUTIQUES.map((b) => (
                      <option key={b} value={b} className="bg-[#111116]">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] tracking-[0.18em] uppercase font-sans text-[#8e8a7f] block mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-[#c5a059]" />
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#111116] border border-white/10 text-xs text-[#faf7f2] px-3 py-2.5 rounded-none focus:outline-none focus:border-[#c5a059] font-sans"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.18em] uppercase font-sans text-[#8e8a7f] block mb-1">
                      Preferred Time
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-[#111116] border border-white/10 text-xs text-[#faf7f2] px-3 py-2.5 rounded-none focus:outline-none focus:border-[#c5a059] font-sans"
                    >
                      <option value="11:00">11:00 AM (Morning Salon)</option>
                      <option value="14:00">02:00 PM (Afternoon Salon)</option>
                      <option value="16:30">04:30 PM (Champagne Salon)</option>
                      <option value="19:00">07:00 PM (Private Twilight Salon)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] tracking-[0.18em] uppercase font-sans text-[#8e8a7f] block mb-1">
                    Special Inquiries or Confidential Requests
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Specific diamond shape preferences, bridal date, or security arrangements..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-[#111116] border border-white/10 text-xs text-[#faf7f2] px-3 py-2 rounded-none focus:outline-none focus:border-[#c5a059] font-sans resize-none"
                  />
                </div>

                <LuxuryButton
                  type="submit"
                  variant="solid"
                  size="md"
                  className="w-full mt-4"
                >
                  Request Confidential Appointment
                </LuxuryButton>

                <p className="text-[9.5px] text-center text-[#706c64] font-sans pt-1">
                  All consultations adhere strictly to high-jewellery confidentiality and privacy protocols.
                </p>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

