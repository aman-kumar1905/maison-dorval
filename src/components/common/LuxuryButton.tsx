'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface LuxuryButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'solid' | 'ghost' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function LuxuryButton({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  icon,
  disabled = false,
  type = 'button',
}: LuxuryButtonProps) {
  const sizeClasses = {
    sm: 'px-5 py-2.5 text-[11px] tracking-[0.2em]',
    md: 'px-7 py-3.5 text-xs tracking-[0.22em]',
    lg: 'px-9 py-4 text-xs tracking-[0.25em]',
  }[size];

  const variantClasses = {
    primary:
      'border border-[#c5a059]/60 text-[#f4e8cb] bg-transparent hover:bg-[#c5a059] hover:text-[#070709] hover:border-[#c5a059] hover:shadow-[0_0_24px_rgba(197,160,89,0.25)] transition-all duration-500 ease-out',
    solid:
      'bg-gradient-to-r from-[#d4af37] via-[#e5c378] to-[#c5a059] text-[#070709] font-medium hover:brightness-110 hover:shadow-[0_0_30px_rgba(212,175,55,0.35)] transition-all duration-300',
    secondary:
      'border border-white/20 text-[#faf7f2] bg-white/[0.03] hover:border-white/50 hover:bg-white/[0.08] transition-all duration-300',
    ghost:
      'text-[#c5a059] hover:text-[#f4e8cb] px-0 py-1 bg-transparent group inline-flex items-center gap-2 border-b border-[#c5a059]/40 hover:border-[#c5a059] transition-all duration-300',
  }[variant];

  const commonClass = `relative inline-flex items-center justify-center font-sans uppercase select-none cursor-pointer transition-transform active:scale-[0.98] ${sizeClasses} ${variantClasses} ${
    disabled ? 'opacity-40 pointer-events-none' : ''
  } ${className}`;

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={commonClass}>
        <span>{children}</span>
        {icon && <span className="ml-2.5 transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={commonClass}
    >
      <span>{children}</span>
      {icon && <span className="ml-2.5 transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
    </motion.button>
  );
}

