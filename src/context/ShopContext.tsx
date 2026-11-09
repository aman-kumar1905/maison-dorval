'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, MetalType, DemoAppointment, DemoOrder } from '@/types/jewellery';
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
  isWishlistOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  moveToCart: (productId: string, selectedSize?: string, selectedMetal?: MetalType) => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
  appointments: DemoAppointment[];
  saveAppointment: (appt: Omit<DemoAppointment, 'id' | 'createdAt'>) => string;
  orders: DemoOrder[];
  placeOrder: (order: Omit<DemoOrder, 'id' | 'createdAt'>) => string;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isVIPModalOpen, setIsVIPModalOpen] = useState(false);
  const [vipSubject, setVipSubject] = useState('Private Salon Appointment');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [appointments, setAppointments] = useState<DemoAppointment[]>([]);
  const [orders, setOrders] = useState<DemoOrder[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    queueMicrotask(() => {
      try {
        const savedCart = localStorage.getItem('orval_cart');
        const savedWishlist = localStorage.getItem('orval_wishlist');
        const savedCurrency = localStorage.getItem('orval_currency');
        const savedAppointments = localStorage.getItem('orval_demo_appointments');
        const savedOrders = localStorage.getItem('orval_demo_orders');

        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          if (Array.isArray(parsedCart)) setCart(parsedCart);
        }
        if (savedWishlist) {
          const parsedWishlist = JSON.parse(savedWishlist);
          if (Array.isArray(parsedWishlist)) setWishlist(parsedWishlist);
        }
        if (savedCurrency && ['USD', 'EUR', 'GBP'].includes(savedCurrency)) {
          setCurrency(savedCurrency as 'USD' | 'EUR' | 'GBP');
        }
        if (savedAppointments) {
          const parsedAppts = JSON.parse(savedAppointments);
          if (Array.isArray(parsedAppts)) setAppointments(parsedAppts);
        }
        if (savedOrders) {
          const parsedOrders = JSON.parse(savedOrders);
          if (Array.isArray(parsedOrders)) setOrders(parsedOrders);
        }
      } catch {
        // Ignore storage access and parse errors
      } finally {
        setIsHydrated(true);
      }
    });
  }, []);

  // Sync state to localStorage after hydration
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('orval_cart', JSON.stringify(cart));
    } catch {}
  }, [cart, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('orval_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('orval_currency', currency);
    } catch {}
  }, [currency, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('orval_demo_appointments', JSON.stringify(appointments));
    } catch {}
  }, [appointments, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('orval_demo_orders', JSON.stringify(orders));
    } catch {}
  }, [orders, isHydrated]);

  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£';

  const openCart = () => {
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };
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

  const openWishlist = () => {
    setIsCartOpen(false);
    setIsWishlistOpen(true);
  };
  const closeWishlist = () => setIsWishlistOpen(false);

  const moveToCart = (
    productId: string,
    selectedSize?: string,
    selectedMetal?: MetalType
  ) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (product) {
      setIsWishlistOpen(false);
      addToCart(product, 1, selectedSize, selectedMetal);
      setWishlist((prev) => prev.filter((id) => id !== productId));
    }
  };

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  const saveAppointment = (appt: Omit<DemoAppointment, 'id' | 'createdAt'>): string => {
    const id = `SALON-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAppointment: DemoAppointment = {
      ...appt,
      id,
      createdAt: new Date().toISOString(),
    };
    setAppointments((prev) => [newAppointment, ...prev]);
    return id;
  };

  const placeOrder = (order: Omit<DemoOrder, 'id' | 'createdAt'>): string => {
    const id = `MDO-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: DemoOrder = {
      ...order,
      id,
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return id;
  };

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
        isWishlistOpen,
        openWishlist,
        closeWishlist,
        moveToCart,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        appointments,
        saveAppointment,
        orders,
        placeOrder,
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
