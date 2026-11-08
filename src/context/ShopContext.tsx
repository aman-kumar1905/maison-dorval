'use client';

import React, { createContext, useContext, useState } from 'react';
import { Product, CartItem, MetalType } from '@/types/jewellery';
import { PRODUCTS } from '@/data/jewelleryData';

interface ShopContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedMetal?: MetalType) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  currency: 'USD' | 'EUR' | 'GBP';
  setCurrency: (currency: 'USD' | 'EUR' | 'GBP') => void;
  currencySymbol: string;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  isVIPModalOpen: boolean;
  vipSubject: string;
  openVIPModal: (subject?: string) => void;
  closeVIPModal: () => void;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const initialItem = PRODUCTS[0];
    return initialItem
      ? [
          {
            product: initialItem,
            quantity: 1,
            selectedSize: '52 (EU) / 6 (US)',
            selectedMetal: initialItem.metal,
          },
        ]
      : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isVIPModalOpen, setIsVIPModalOpen] = useState(false);
  const [vipSubject, setVipSubject] = useState('Private Salon Appointment');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£';

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedSize = '52 (EU) / 6 (US)',
    selectedMetal = product.metal
  ) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedSize,
          selectedMetal,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const openVIPModal = (subject = 'Private Salon Appointment') => {
    setVipSubject(subject);
    setIsVIPModalOpen(true);
  };
  const closeVIPModal = () => setIsVIPModalOpen(false);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  return (
    <ShopContext.Provider
      value={{
        cart,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        currency,
        setCurrency,
        currencySymbol,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        isVIPModalOpen,
        vipSubject,
        openVIPModal,
        closeVIPModal,
        isSearchOpen,
        openSearch,
        closeSearch,
        wishlist,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
