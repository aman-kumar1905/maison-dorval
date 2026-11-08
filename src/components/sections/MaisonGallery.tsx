'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { INSTAGRAM_POSTS } from '@/data/jewelleryData';
import SectionHeader from '../common/SectionHeader';
import { Heart, ArrowUpRight } from 'lucide-react';

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function MaisonGallery() {
  return (
    <section className="py-24 sm:py-32 bg-[#09090d] border-t border-[#c5a059]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Chronicles & Social Curation"
          title="Moments from the"
          italicWord="Maison Gazette"
          subtitle="A behind-the-scenes gaze into our Parisian workshops, red carpet creations, and the private lives of our high jewellery pieces."
        />

        {/* Gallery Mosaic Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative aspect-square bg-[#111116] border border-white/5 overflow-hidden"
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.78]"
              />

              {/* Hover Dark Overlay with Details */}
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between text-left">
                <div className="flex items-center justify-between text-[10px] text-[#c5a059] font-sans">
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-[#c5a059]" />
                    {post.likes}
                  </span>
                </div>

                <div>
                  <p className="text-[10px] text-[#d4cfc5] font-sans font-light line-clamp-3 leading-relaxed">
                    {post.caption}
                  </p>
                  {post.productTag && (
                    <span className="mt-2 inline-block text-[9px] uppercase tracking-wider text-[#c5a059] border-b border-[#c5a059]/40">
                      {post.productTag}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Maison Handle & Follow Banner */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-8 text-xs font-sans text-[#8e8a7f]">
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <InstagramIcon className="w-4 h-4 text-[#c5a059]" />
            <span className="text-[#faf7f2] font-medium tracking-wider">
              @MaisonDorval
            </span>
            <span className="text-[#6d6961]">• 420K Patrons Worldwide</span>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#c5a059] hover:text-[#f4e8cb] tracking-[0.2em] uppercase transition-colors"
          >
            <span>Follow The Gazette</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
