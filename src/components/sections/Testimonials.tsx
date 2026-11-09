'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from '@/data/jewelleryData';
import SectionHeader from '../common/SectionHeader';
import { Quote, ChevronLeft, ChevronRight, Award } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  };

  const next = () => {
    setCurrentIndex((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));
  };

  const activeTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 sm:py-32 bg-[#070709] relative overflow-hidden">
      {/* Background Subtle Luxury Glow */}
      <div className="absolute inset-0 bg-radial-luxury opacity-30 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="Private Commissions • Concept Showcase"
          title="Sample Client Provenance"
          subtitle="Conceptual reflections illustrating bespoke high-jewellery commissions crafted under Maison D’Orval atelier standards (Demo Archive)."
        />

        {/* Testimonial Stage */}
        <div className="relative bg-[#0b0b10] border border-[#c5a059]/25 p-8 sm:p-14 md:p-16">
          <Quote className="w-10 h-10 sm:w-14 sm:h-14 text-[#c5a059]/25 mb-6" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#faf7f2] font-light leading-relaxed">
                &ldquo;{activeTestimonial.quote}&rdquo;
              </p>

              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-lg text-[#f4e8cb]">
                    {activeTestimonial.clientName}
                  </h4>
                  <p className="text-xs text-[#8e8a7f] font-sans">
                    {activeTestimonial.title} • {activeTestimonial.location}
                  </p>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#c5a059]/10 border border-[#c5a059]/25 text-[10.5px] font-sans text-[#e5c378] tracking-wider uppercase self-start sm:self-auto">
                  <Award className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{activeTestimonial.jewelleryCommissioned}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/5">
            <div className="text-[11px] font-sans text-[#706c64] tracking-widest uppercase">
              Sample Archive {currentIndex + 1} of {TESTIMONIALS.length}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-9 h-9 border border-white/10 hover:border-[#c5a059] flex items-center justify-center text-[#d4cfc5] hover:text-[#c5a059] transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="w-9 h-9 border border-white/10 hover:border-[#c5a059] flex items-center justify-center text-[#d4cfc5] hover:text-[#c5a059] transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

