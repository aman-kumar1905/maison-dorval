# Luxury Jewellery Website Fixes & Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolve critical CSS compilation failure, fix layout and pointer event bugs, correct state management issues, and establish automated verification across all viewports.

**Architecture:** Integrate `@tailwindcss/postcss` with Next.js 16 and PostCSS so that Tailwind CSS v4 generates all utility classes. Fix parent container positioning so Next.js Image fill components do not escape their containers. Refactor React state handlers to eliminate double-toggle bubbling and add browser localStorage persistence.

**Tech Stack:** Next.js 16.4.5, React 19, Tailwind CSS v4, PostCSS, Framer Motion, Playwright.

**Spec:** [Audit Report findings from 2026-11-07 Audit]

## Global Constraints
- Do not introduce unnecessary third-party libraries.
- Preserve luxury styling, fonts (Cinzel, Cormorant Garamond, Montserrat), and color palette (#070709, #c5a059).
- Ensure all viewports (desktop 1440px, tablet 768px, mobile 375px) have zero horizontal overflow.
- Ensure all interactive controls (buttons, links, inputs) receive pointer events cleanly without being intercepted.

## Review Focus
- Tailwind utility classes (.relative, .grid, .flex, .hidden) present in compiled CSS output.
- Next.js fill images contained strictly inside their parent cards without stretching to viewport.
- Gift-wrap checkbox toggle in CartDrawer toggles on direct click.
- Cart and wishlist state survive page refreshes via localStorage.
- QuickViewModal displays appropriate size options based on product category (rings vs necklaces vs earrings vs cuffs).

---

### Task 1: Fix Tailwind CSS v4 PostCSS Compilation

**Files:**
- Modify: `package.json`
- Create: `postcss.config.mjs`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: Tailwind v4 stylesheet in `src/app/globals.css`
- Produces: Compiled utility classes (.relative, .absolute, .grid, etc.) in Next.js CSS output

- [ ] **Step 1: Install `@tailwindcss/postcss` in devDependencies**
Run `npm install -D @tailwindcss/postcss`

- [ ] **Step 2: Create `postcss.config.mjs`**
Configure `@tailwindcss/postcss` plugin:
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

- [ ] **Step 3: Update `package.json` scripts if necessary**
Ensure `"build": "next build"` works cleanly.

- [ ] **Step 4: Run production build and verify utility classes exist in output CSS**
Run `npm run build`
Verify `grep -o "\.relative" .next/static/css/*.css` returns matches > 0.

- [ ] **Step 5: Commit**
```bash
git add package.json package-lock.json postcss.config.mjs src/app/globals.css
git commit -m "fix(build): configure @tailwindcss/postcss to compile Tailwind v4 utility classes"
```

---

### Task 2: Eliminate Viewport Overflow and Fix Image Container Containment

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/sections/Hero.tsx`
- Modify: `src/components/sections/BridalEditorial.tsx`

**Interfaces:**
- Consumes: Compiled `.relative` and overflow rules
- Produces: Contained layout with 0 horizontal overflow across 1440px, 768px, 375px viewports

- [ ] **Step 1: Add overflow containment in `src/app/globals.css`**
Ensure `html`, `body`, and `main` have `overflow-x: clip; width: 100%;`.

- [ ] **Step 2: Fix unconstrained absolute elements in `Hero.tsx` and `BridalEditorial.tsx`**
Ensure background glow and vignette layers do not exceed viewport boundaries.

- [ ] **Step 3: Verify using automated script**
Run layout check to verify `desktopOverflow`, `tabletOverflow`, and `mobileOverflow` are all `false`.

- [ ] **Step 4: Commit**
```bash
git add src/app/globals.css src/components/sections/Hero.tsx src/components/sections/BridalEditorial.tsx
git commit -m "fix(ui): eliminate viewport overflow and constrain absolute background layers"
```

---

### Task 3: Fix Component State Bugs and Category-Aware Quick View Sizing

**Files:**
- Modify: `src/components/modals/CartDrawer.tsx`
- Modify: `src/components/modals/QuickViewModal.tsx`
- Modify: `src/context/ShopContext.tsx`

**Interfaces:**
- Consumes: `useShop` context
- Produces: Persisted cart & wishlist in `localStorage`, clean gift-wrap toggle, context-aware sizing

- [ ] **Step 1: Fix gift wrap checkbox bubbling in `CartDrawer.tsx`**
Separate the checkbox click handler from the wrapper click handler using `e.stopPropagation()` or attaching `onClick` solely to the toggle wrapper without duplicate `onChange`.

- [ ] **Step 2: Add `localStorage` persistence and clean initialization in `ShopContext.tsx`**
Initialize `cart` and `wishlist` from `localStorage` safely with hydration check (avoiding SSR mismatch). Do not auto-seed product into cart by default unless cart is loaded from storage.

- [ ] **Step 3: Make sizing in `QuickViewModal.tsx` category-aware**
Show ring sizes for rings (`diamond`, `bridal`), chain lengths for necklaces/chokers (`gold`), wrist circumferences for cuffs (`silver`), and hide size selection for earrings/hoops.

- [ ] **Step 4: Commit**
```bash
git add src/components/modals/CartDrawer.tsx src/components/modals/QuickViewModal.tsx src/context/ShopContext.tsx
git commit -m "fix(store): resolve cart checkbox bubbling, add localStorage persistence, and category-aware sizing"
```

---

### Task 4: Fix Remote Image Configuration and Configure Fallbacks

**Files:**
- Modify: `next.config.ts`

**Interfaces:**
- Consumes: Next.js Image configuration
- Produces: Robust image loading without 500 server errors

- [ ] **Step 1: Update `next.config.ts`**
Ensure `images.remotePatterns` allows all required hosts and add proper format/optimization rules, or unoptimized fallback where appropriate.

- [ ] **Step 2: Verify image requests in Next.js server**
Test `/` page load in browser without 500 error spam.

- [ ] **Step 3: Commit**
```bash
git add next.config.ts
git commit -m "fix(images): optimize remote image loading and error resilience"
```

---

### Task 5: End-to-End Automated Browser Verification & Audit Re-Run

**Files:**
- Test: `/Users/duggu/.gemini/antigravity/brain/4180df28-7740-4dfa-80fa-98f1b5d45581/scratch/audit_tester.js`

**Interfaces:**
- Consumes: Live running Next.js application on port 3009
- Produces: Updated `audit_results.json` with 0 console errors, 0 overflow, and all interactions working

- [ ] **Step 1: Run full Playwright test suite**
Run: `npm run build && npx next start -p 3009` + execute `audit_tester.js`
Expected:
- `desktopOverflow: false`
- `tabletOverflow: false`
- `mobileOverflow: false`
- `megaMenuHoverWorks: true`
- `quickViewOpens: true`
- `cartDrawerOpens: true`
- `giftWrapCheckboxBug: false`
- `searchModalOpens: true`
- `vipModalOpens: true`
- `consoleErrors.length === 0`

- [ ] **Step 2: Commit verified state**
```bash
git status
```

