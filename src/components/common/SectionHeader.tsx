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
}

export default function SectionHeader({
  eyebrow,
  title,
  italicWord,
  subtitle,
  alignment = 'center',
  className = '',
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
          className="flex items-center gap-3 justify-center mb-3"
        >
          <span className="w-6 h-[1px] bg-[#c5a059]/40" />
          <span className="text-[11px] font-sans tracking-[0.25em] text-[#c5a059] uppercase font-medium">
            {eyebrow}
          </span>
          <span className="w-6 h-[1px] bg-[#c5a059]/40" />
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-light tracking-tight text-[#faf7f2] leading-[1.15]"
      >
        {title}{' '}
        {italicWord && (
          <span className="italic font-serif font-normal text-gold-gradient">
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
          className={`mt-4 text-sm sm:text-base text-[#a3a3af] font-sans font-light leading-relaxed ${
            isCenter ? 'max-w-xl mx-auto' : 'max-w-xl'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
