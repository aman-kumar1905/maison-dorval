'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { openVIPModal } = useShop();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#050507] border-t border-[#c5a059]/20 text-[#bfb8ab] font-sans">
      {/* Top Gazette Inscription Banner */}
      <div className="border-b border-white/10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-[#c5a059] text-[10px] tracking-[0.3em] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>La Gazette Privée</span>
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl text-[#faf7f2] font-light">
            Receive Private Salon Invitations
          </h3>

          <p className="text-xs sm:text-sm text-[#8e8a7f] max-w-lg mx-auto font-light leading-relaxed">
            Subscribers receive confidential early previews of our annual Haute Joaillerie collections and invitations to private Place Vendôme viewings.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto mt-6 flex flex-col sm:flex-row gap-2.5 sm:gap-2">
            <input
              type="email"
              required
              placeholder="Your confidential email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-[#101016] border border-white/15 px-4 py-3 text-xs text-[#faf7f2] rounded-none focus:outline-none focus:border-[#c5a059] placeholder:text-[#6a665f]"
            />
            <button
              type="submit"
              className="bg-[#c5a059] text-[#070709] px-6 py-3 min-h-[44px] text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#e5c378] transition-colors flex items-center justify-center gap-2 shrink-0"
            >
              {subscribed ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Enrolled</span>
                </>
              ) : (
                <>
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Main Multi-Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Col 1: Maison Logotype and Heritage */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-display text-lg tracking-[0.25em] text-[#faf7f2] uppercase block">
                Maison D’Orval
              </span>
              <span className="text-[8.5px] tracking-[0.34em] text-[#c5a059] uppercase block mt-0.5">
                Place Vendôme • Paris 1894
              </span>
            </Link>

            <p className="text-xs text-[#8a857b] font-light leading-relaxed">
              Official French Haute Joaillerie purveyor. Dedicated to exceptional diamonds, rare untreated gemstones, and ethical precious metal stewardship.
            </p>

            <div className="flex items-center gap-2 pt-2 text-[#c5a059] text-[10.5px]">
              <ShieldCheck className="w-4 h-4" />
              <span>Traceable Provenance Protocol</span>
            </div>
          </div>

          {/* Col 2: Haute Joaillerie */}
          <div>
            <h4 className="text-xs font-serif tracking-[0.2em] text-[#faf7f2] uppercase mb-4">
              Universes
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8e8a7f] font-light">
              <li>
                <Link href="/#featured" className="hover:text-[#f4e8cb] transition-colors">
                  Solitaire High Rings
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-[#f4e8cb] transition-colors">
                  Haute Or 18K Necklaces
                </Link>
              </li>
              <li>
                <Link href="/#bridal" className="hover:text-[#f4e8cb] transition-colors">
                  Bridal Suites & Tiaras
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-[#f4e8cb] transition-colors">
                  Rare Muzo Emeralds
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-[#f4e8cb] transition-colors">
                  Sculptural Platinum Cuffs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: The Maison */}
          <div>
            <h4 className="text-xs font-serif tracking-[0.2em] text-[#faf7f2] uppercase mb-4">
              The Maison
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8e8a7f] font-light">
              <li>
                <Link href="/#craftsmanship" className="hover:text-[#f4e8cb] transition-colors">
                  Atelier Place Vendôme
                </Link>
              </li>
              <li>
                <Link href="/#craftsmanship" className="hover:text-[#f4e8cb] transition-colors">
                  130 Years of Savoir-Faire
                </Link>
              </li>
              <li>
                <Link href="/#craftsmanship" className="hover:text-[#f4e8cb] transition-colors">
                  Ethical Sourcing Standards
                </Link>
              </li>
              <li>
                <Link href="/#collections" className="hover:text-[#f4e8cb] transition-colors">
                  Historical Archives (1894)
                </Link>
              </li>
              <li>
                <Link href="/#craftsmanship" className="hover:text-[#f4e8cb] transition-colors">
                  Conflict-Free Gemstone Protocol
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Client Services */}
          <div>
            <h4 className="text-xs font-serif tracking-[0.2em] text-[#faf7f2] uppercase mb-4">
              Client Services
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8e8a7f] font-light">
              <li>
                <button
                  onClick={() => openVIPModal('Private Salon Appointment')}
                  className="hover:text-[#f4e8cb] transition-colors text-left"
                >
                  Book Private Salon Viewing
                </button>
              </li>
              <li>
                <button
                  onClick={() => openVIPModal('Custom Ring Resizing')}
                  className="hover:text-[#f4e8cb] transition-colors text-left"
                >
                  Bespoke Ring Sizing Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => openVIPModal('Insurance Valuation Report')}
                  className="hover:text-[#f4e8cb] transition-colors text-left"
                >
                  Independent Lab Documentation
                </button>
              </li>
              <li>
                <button
                  onClick={() => openVIPModal('Heirloom Restoration')}
                  className="hover:text-[#f4e8cb] transition-colors text-left"
                >
                  Atelier Cleaning & Restoration
                </button>
              </li>
              <li>
                <button
                  onClick={() => openVIPModal('White Glove Courier Inquiry')}
                  className="hover:text-[#f4e8cb] transition-colors text-left"
                >
                  Armoured Courier Delivery
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Global Salons */}
          <div>
            <h4 className="text-xs font-serif tracking-[0.2em] text-[#faf7f2] uppercase mb-4">
              Private Salons
            </h4>
            <div className="space-y-3 text-xs text-[#8e8a7f] font-light">
              <div>
                <strong className="text-[#faf7f2] font-normal block font-serif">
                  Paris — Place Vendôme
                </strong>
                <span>Historic Atelier • By Appointment</span>
              </div>
              <div>
                <strong className="text-[#faf7f2] font-normal block font-serif">
                  New York — Madison Avenue
                </strong>
                <span>Private Viewing Suite • By Appointment</span>
              </div>
              <div>
                <strong className="text-[#faf7f2] font-normal block font-serif">
                  London — Mayfair
                </strong>
                <span>Private Viewing Suite • By Appointment</span>
              </div>
              <div>
                <strong className="text-[#faf7f2] font-normal block font-serif">
                  Tokyo — Ginza
                </strong>
                <span>Private Salon • By Appointment</span>
              </div>
            </div>
            <p className="text-[10px] text-[#706c64] font-sans mt-3 italic">
              Private client viewings welcome patrons by prior reservation. (Demo Concept Salons)
            </p>
          </div>
        </div>

        {/* Bottom Legal, Hallmarks and Copyright */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between text-[11px] text-[#706c64] gap-4 sm:gap-6 text-center lg:text-left pb-4 sm:pb-0">
          <div className="max-w-xl leading-relaxed">
            © 1894–2026 Maison D’Orval Haute Joaillerie S.A. All rights reserved. (Demonstration Concept Platform)
          </div>

          <div className="flex flex-wrap justify-center lg:justify-end gap-x-5 sm:gap-x-6 gap-y-2 tracking-wider uppercase text-[10px]">
            <Link href="#" className="hover:text-[#c5a059] transition-colors py-1">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-[#c5a059] transition-colors py-1">
              Legal Mentions
            </Link>
            <Link href="#" className="hover:text-[#c5a059] transition-colors py-1">
              Code of Ethics
            </Link>
            <Link href="#" className="hover:text-[#c5a059] transition-colors py-1">
              Traceability Protocol
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
