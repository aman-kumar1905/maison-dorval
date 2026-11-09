'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  italicWord?: string;
  subtitle?: string;
  alignment?: 'center' | 'left';
  className?: string;
  variant?: 'monochrome' | 'classic' | 'subtle';
}

export default function SectionHeader({
  eyebrow,
  title,
  italicWord,
  subtitle,
  alignment = 'center',
  className = '',
  variant = 'monochrome',
}: SectionHeaderProps) {
  const isCenter = alignment === 'center';

  return (
    <div className={`mb-14 md:mb-20 ${isCenter ? 'text-center mx-auto' : 'text-left'} max-w-3xl ${className}`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`flex items-center gap-3 ${isCenter ? 'justify-center' : 'justify-start'} mb-3`}
        >
          <span className="w-6 h-[1px] bg-[#c5a059]/40" />
          <span className="text-[10.5px] font-sans tracking-[0.25em] text-[#c5a059] uppercase font-medium">
            {eyebrow}
          </span>
          {isCenter && <span className="w-6 h-[1px] bg-[#c5a059]/40" />}
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.15rem] font-serif font-light tracking-[0.015em] text-[#faf7f2] leading-[1.18]"
      >
        <span>{title}</span>
        {italicWord && (
          <span
            className={
              variant === 'classic'
                ? 'font-serif italic font-light text-[#e5c378] ml-2'
                : variant === 'subtle'
                ? 'font-serif font-light text-[#f4e8cb] ml-2'
                : 'font-serif font-light text-[#faf7f2] ml-2'
            }
          >
            {italicWord}
          </span>
        )}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={`mt-4 text-sm sm:text-base text-[#bfb8ab] font-sans font-light leading-relaxed ${
            isCenter ? 'max-w-xl mx-auto' : 'max-w-xl'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

