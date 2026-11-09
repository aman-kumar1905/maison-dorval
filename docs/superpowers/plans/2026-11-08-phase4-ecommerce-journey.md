# Phase 4: Complete E-Commerce Demo Journey Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a dedicated Wishlist Drawer, enhanced `/product/[id]` detail pages, a multi-step Checkout Simulation with demo order reference generation, and local Appointment persistence, preserving the luxury aesthetic and zero-backend constraints.

**Architecture:** Client-side Next.js 16 App Router application with state management in `ShopContext`, localStorage persistence, dynamic static generation (`generateStaticParams`) for `/product/[id]`, and standardized modal/drawer components with Framer Motion.

**Tech Stack:** Next.js 16 (App Router, static prerendering), React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, Playwright.

**Spec:** User request "Maison D’Orval — Phase 4: Complete E-Commerce Demo Journey"

---

## Global Constraints
- Preserve existing obsidian-black (`#070709`) and champagne-gold (`#c5a059`) luxury identity and tokens.
- All interactive touch targets must be $\ge 44 \times 44\text{px}$.
- No real credit card or payment credentials requested or processed. Clearly designate all transactions as demonstration simulations.
- No backend API server or third-party CRM required; use hydration-safe `localStorage` persistence.
- Zero ESLint errors, zero Next.js build errors, zero broken images, zero horizontal overflows.

---

## Review Focus
1. **Hydration safety on localStorage access**: Initial render must not mismatch SSR output (`queueMicrotask` / `useEffect` hydration guard).
2. **Dynamic product route parameter validation**: Navigating to an unknown ID must gracefully render `notFound()`.
3. **Wishlist to Cart transfer**: Moving an item from Wishlist to Cart must atomically add the item to cart and remove it from wishlist without losing state.
4. **Checkout form validation**: Incomplete email or shipping address must prevent order placement until valid.
5. **Static parameter generation**: `/product/[id]` must declare `generateStaticParams()` returning all 8 product IDs for static Next.js compilation.

---

## Tasks

### Task 1: Type Definitions and ShopContext Expansion
**Files:**
- Modify: `src/types/jewellery.ts`
- Modify: `src/context/ShopContext.tsx`

- [x] Add `DemoAppointment` and `DemoOrder` interfaces in `src/types/jewellery.ts`.
- [x] Add `isWishlistOpen`, `openWishlist`, `closeWishlist`, `moveToCart`, `isCheckoutOpen`, `openCheckout`, `closeCheckout`, `appointments`, `saveAppointment`, `orders`, `placeOrder` to `ShopContextType`.
- [x] Implement `localStorage` synchronization for `orval_demo_appointments` and `orval_demo_orders`.
- [x] Verify `npm run lint` and `npm run build` pass.

### Task 2: Dedicated Wishlist Drawer Component
**Files:**
- Create: `src/components/modals/WishlistDrawer.tsx`
- Modify: `src/components/layout/Navbar.tsx`
- Modify: `src/app/layout.tsx`

- [x] Create `WishlistDrawer.tsx` with sliding animation, item cards (image, title, metal, price), "Move to Bag" CTA, remove item button, empty state, and minimum 44×44px touch targets.
- [x] Update `Navbar.tsx` to bind the wishlist heart button to `openWishlist()`.
- [x] Mount `WishlistDrawer` in `src/app/layout.tsx` alongside other global drawers.
- [x] Verify wishlist count badge updates and drawer opens/closes cleanly.

### Task 3: Dedicated Dynamic Product Detail Route `/product/[id]`
**Files:**
- Create: `src/app/product/[id]/page.tsx`
- Modify: `src/components/sections/FeaturedProducts.tsx`
- Modify: `src/components/modals/QuickViewModal.tsx`

- [x] Implement `src/app/product/[id]/page.tsx` with `generateStaticParams()`, breadcrumbs, dual-image gallery switcher, metal options selector, category-aware sizing selector, technical specifications table, "Acquire Creation" CTA, "Book Private Salon Viewing" CTA, and 3 curated related products.
- [x] Add "View Full Creation Page" link inside `QuickViewModal.tsx` while preserving Quick View modal functionality.
- [x] Add product title link to `/product/${product.id}` in `FeaturedProducts.tsx`.
- [x] Verify all 8 static product pages compile successfully.

### Task 4: Interactive Checkout Simulation Modal
**Files:**
- Create: `src/components/modals/CheckoutModal.tsx`
- Modify: `src/components/modals/CartDrawer.tsx`
- Modify: `src/app/layout.tsx`

- [x] Create `CheckoutModal.tsx` with 4 steps:
  1. Bag Review & Valuation
  2. Client Information (Name, Email, Phone)
  3. Delivery Protocol (Armoured Courier or Private Salon Collection)
  4. Confirmation Screen with unique reference (`MDO-2026-XXXXX`), demo disclaimer banner, estimated delivery window, and local storage record.
- [x] Update `CartDrawer.tsx` to open `CheckoutModal` when clicking "Proceed with Concierge".
- [x] Mount `CheckoutModal` in `src/app/layout.tsx`.
- [x] Verify complete checkout simulation lifecycle.

### Task 5: Appointment Persistence & Reference Generation
**Files:**
- Modify: `src/components/modals/VIPAppointmentModal.tsx`

- [x] Update `VIPAppointmentModal.tsx` to call `saveAppointment` upon form submission.
- [x] Display the generated appointment reference (e.g. `SALON-PARIS-8291`) and appointment summary on the confirmation card.
- [x] Provide clear indication: "Saved locally to this browser session (Demo Booking Archive)".
- [x] Verify appointments persist across page reloads in `localStorage`.

### Task 6: Quality Assurance & Playwright Automated Verification
**Files:**
- Create: `scratch/verify_phase4.js`
- Test viewports: Desktop (1440px), Tablet (768px), Mobile (375px & 390px).

- [x] Execute `npm run lint` and `npm run build`.
- [x] Write and run `verify_phase4.js` verifying:
  - Wishlist drawer opens, displays saved items, moves item to cart, and removes item.
  - `/product/orval-01` loads, displays gallery, specs, metal switcher, and related items.
  - Checkout simulation progresses through client details and generates order reference.
  - VIP appointment modal generates and displays appointment reference and persists to storage.
  - Capture verification screenshots for all new workflows.
- [x] Deliver structured Phase 4 Report and Final Engineering Report.

