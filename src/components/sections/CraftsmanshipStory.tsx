'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';
import { Sparkles, Award, Shield, Hammer } from 'lucide-react';

const CRAFT_PILLARS = [
  {
    icon: Sparkles,
    title: 'Type IIa Diamond Rigor',
    desc: 'Less than 1% of world diamonds qualify as Type IIa—free of detectable nitrogen impurities, delivering unparalleled celestial clarity.',
  },
  {
    icon: Hammer,
    title: 'Lost-Wax Sculpting',
    desc: 'Each master model is initially hand-carved in artisan wax by master jewelers before receiving dozens of burnishing passes.',
  },
  {
    icon: Shield,
    title: 'Fairmined 18K Gold',
    desc: 'We strictly utilize 100% certified fairmined and recycled precious metals, safeguarding miners, ecosystems, and cultural integrity.',
  },
  {
    icon: Award,
    title: 'Place Vendôme Hallmarking',
    desc: 'Every piece is stamped with the historical French state eagle head hallmark and the private Maison D’Orval maker’s stamp.',
  },
];

const MILESTONES = [
  {
    year: '1894',
    title: 'Founding on Place Vendôme',
    text: 'Master Jeweller Henri d’Orval opens the atelier at No. 12 Place Vendôme, catering to European royal households.',
  },
  {
    year: '1925',
    title: 'Exposition des Arts Décoratifs',
    text: 'Awarded the Grand Prix for revolutionary geometric platinum settings with natural Colombian emeralds.',
  },
  {
    year: '1968',
    title: 'The Articulated Gold Serpent',
    text: 'Pioneered the proprietary invisible kinetic link system, allowing heavy gold chokers to drape like velvet.',
  },
  {
    year: '2026',
    title: 'Collection Solstice',
    text: 'A celebration of 130 years: unifying rare unheated gemstones with cutting-edge optical light capture.',
  },
];

export default function CraftsmanshipStory() {
  const [selectedMilestone, setSelectedMilestone] = useState(0);

  return (
    <section id="craftsmanship" className="py-24 sm:py-32 bg-[#08080b] relative border-b border-[#c5a059]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="130 Years of Savoir-Faire"
          title="The Secret of"
          italicWord="Place Vendôme"
          subtitle="True luxury cannot be hurried. In our Parisian ateliers, centuries-old lapidary traditions merge with the exacting precision of modern gemological science."
        />

        {/* Dual Imagery Atelier Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/11] bg-[#121218] border border-[#c5a059]/25 overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1200&q=85"
              alt="Master Jeweller at work with loupe"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover brightness-[0.72] contrast-[1.08] hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] tracking-[0.25em] font-sans text-[#c5a059] uppercase block mb-1">
                Atelier Place Vendôme
              </span>
              <p className="font-serif text-lg text-[#faf7f2]">
                Hand-setting 28 micro-prongs under 40x stereoscopic magnification.
              </p>
            </div>
          </motion.div>

          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-[10.5px] uppercase tracking-[0.25em] font-sans text-[#c5a059] block">
                Ethical Stewardship & Provenance
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#faf7f2] leading-tight">
                Crafted for Eternity, <br />
                <span className="italic font-serif font-normal text-gold-gradient">
                  Honoring the Earth
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-[#b5b0a3] font-sans font-light leading-relaxed">
                Every Maison D’Orval creation carries an unbroken chain of custody. We believe the true nobility of a jewel lies not only in its dazzling beauty, but in the respect and dignity of the hands that unearthed it.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {CRAFT_PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 bg-white/[0.02] border border-white/5 hover:border-[#c5a059]/30 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-[#c5a059] mb-2.5" />
                    <h4 className="font-serif text-base text-[#faf7f2] mb-1">
                      {pillar.title}
                    </h4>
                    <p className="text-[11px] text-[#8e8a7f] font-sans font-light leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Historical Timeline Carousel */}
        <div className="pt-12 border-t border-white/10">
          <div className="text-center mb-8">
            <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-[#c5a059]">
              Historical Milestones
            </span>
            <h4 className="font-serif text-2xl text-[#faf7f2] mt-1">
              Chronicles of the Maison
            </h4>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {MILESTONES.map((m, idx) => (
              <button
                key={m.year}
                onClick={() => setSelectedMilestone(idx)}
                className={`p-5 text-left border transition-all ${
                  selectedMilestone === idx
                    ? 'border-[#c5a059] bg-[#c5a059]/10'
                    : 'border-white/10 bg-[#0c0c11] hover:border-white/20'
                }`}
              >
                <span className="font-display text-2xl text-[#c5a059] block mb-1">
                  {m.year}
                </span>
                <h5 className="font-serif text-sm text-[#faf7f2] mb-1">
                  {m.title}
                </h5>
                <p className="text-[11px] text-[#8e8a7f] font-sans font-light leading-relaxed line-clamp-3">
                  {m.text}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
