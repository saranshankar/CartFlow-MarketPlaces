# CartFlow 4.0 — Features & Functional Architecture
> **Document Reference:** CF-DOC-FEAT-V4  
> **Status:** RATIFIED & AUDITED  
> **Release Target:** CartFlow 4.0 Multi-Collection Marketplace

---

## 1. Executive Summary

CartFlow 4.0 transforms the original CartFlow 3.0 checkout demonstrator into an enterprise-class, multi-collection e-commerce marketplace while preserving all 56 baseline quality guarantees, test IDs, and financial arithmetic principles.

The platform introduces a **30-product demonstration catalogue**, **6 curated lifestyle and productivity collections**, advanced multi-attribute search and filtering, resolution-independent local vector artwork, and an expanded suite of **73 comprehensive automated Playwright scenarios**.

---

## 2. Core Functional Pillars

### 2.1 Multi-Collection Catalogue Architecture
- **30 Synthetic Products:** Distributed across 6 collections with zero external network dependencies.
- **Pure Integer Pricing:** Prices range from ₹349 to ₹3,499. Every transaction, subtotal, and line item is computed using integer arithmetic to prevent floating-point inaccuracy.
- **Resolution-Independent SVG Vector Artwork:** Bespoke, high-fidelity SVG graphics for all 30 products embedded locally inside `ProductArtwork.tsx`, eliminating broken image links and external CDN vulnerabilities.

### 2.2 Advanced Discovery Engine
- **Global Search with Autocomplete:** Debounced real-time search across product names, categories, descriptions, features, tags, and keywords. Supports keyboard navigation (Arrow Up/Down, Enter, Escape).
- **Multi-Attribute Exploration (`/explore`):**
  - Collection chip filters for instant filtering.
  - Min and max price boundary clamping.
  - 6 Sort options: Featured, Price: Low to High, Price: High to Low, Name: A to Z, Name: Z to A, and Newest Arrivals.
  - Instant zero-state reset.
- **Collection Storefronts (`/collection/:slug`):** Dedicated collection pages with breadcrumb navigation and contextual search.

### 2.3 Curated Product Detail Pages (PDP)
- **Deep Specifications:** Material compositions, dimensions, weights, and technical specifications for each item.
- **Adaptive Quantity Stepper:** Constrained between $1 \le Q \le 10$ with live visual and screen-reader announcements.
- **Cross-Sell Recommendations:** Algorithmically recommended products from the same collection.
- **Wishlist Integration:** Instant toggle with header counter reflection.
- **Demo Review Framework:** Honest, non-commercial user feedback simulation clearly labeled as local demonstration data.

### 2.4 Resilient Cart & Shopping Bag
- **Dual Presentation:** Slide-over accessible cart drawer available on all routes, alongside a dedicated full-page shopping bag (`/cart`).
- **Dynamic Line Totals:** Synchronous updates upon stepper interaction ($P \times Q$).
- **Persistent State:** Automatic synchronization with browser `localStorage`, with graceful fallback for private/incognito browsing.

### 2.5 Defensive Checkout & Concurrency Protection
- **Single-Field Validation:** Validates required Customer Name with strict whitespace rejection.
- **Non-Destructive Validation Failures:** In the event of an empty or whitespace-only submission, entered data and shopping bag state are strictly preserved.
- **Synchronous Concurrency Lock:** Utilizes an atomic `useRef` lock to neutralize rapid double-clicks on the "Place Order" button, ensuring exactly one order reference (`CF-YYYYMMDD-XXXX`) is issued.
- **Order Confirmation Receipt:** Complete itemized receipt with reference, customer name, date, items, and total, alongside a "Start New Order" full application reset.

---

## 3. Backward Compatibility Commitment

CartFlow 4.0 maintains 100% backward compatibility with CartFlow 3.0:
- Anchor products `prod-aero-headphones` (₹1,499) and `prod-urban-backpack` (₹999) preserve all baseline attributes and test IDs.
- All 56 baseline Playwright tests pass unconditionally.
- Legacy routes (`/shop`, `/categories`, `/category/:slug`, `/confirmation`) remain active aliases.
- CartFlow 3.0 release archive (`CartFlow_3.0_Final_Submission.zip`, SHA-256: `b6e806922d6be62788d97a82079a02e2b1acd40f64555b4d47411a8e9a7aa247`) is preserved without modification.
