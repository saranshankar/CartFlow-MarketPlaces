# CartFlow 4.0 — Application Route Architecture & Reference
> **Document Reference:** CF-DOC-ROUTES-V4  
> **Status:** RATIFIED & AUDITED  
> **Scope:** 12 Primary Marketplace Routes + 4 Backward-Compatible Aliases

---

## 1. Route Architecture Overview

CartFlow 4.0 delivers a rich, multi-collection e-commerce routing system implemented with React Router DOM v6. All routes are 100% client-side, offline-safe, and deterministic. Every route is protected against invalid state transitions and gracefully falls back to appropriate zero-states or redirects.

```
/
├── /explore                     # Full catalogue discovery, search & filtering
├── /collections                 # 6-collection marketplace directory
│   └── /collection/:slug        # Slug-filtered collection storefront
├── /product/:id                 # Individual product detail page (PDP)
├── /wishlist                    # Saved products with "Move to Bag" actions
├── /cart                        # Dedicated shopping bag with item steppers
├── /checkout                    # Defensive single-field customer checkout
├── /order-confirmed             # Settled order receipt & reference display
├── /search                      # Query-based search results (?q=...)
├── /about                       # Engineering architecture & SDET philosophy
└── /contact                     # Interactive customer support simulation
```

---

## 2. Primary Route Specifications

### 1. Storefront Home (`/`)
- **Component:** `src/pages/LandingPage.tsx`
- **Role:** High-conversion marketplace homepage.
- **Key Sections:**
  - Hero banner with immediate exploration CTAs.
  - 6 Collection visual entry cards with live counts.
  - "The Curated Collection" featured products strip (anchor products).
  - Trending now highlights.
  - New arrivals grid.
  - Demonstration newsletter simulation.
- **Test IDs:** `landing-page-container`, `product-card-*`, `product-catalog-grid`.

### 2. Catalogue Exploration (`/explore`)
- **Component:** `src/pages/ExplorePage.tsx`
- **Role:** Multi-attribute discovery engine across all 30 products.
- **Capabilities:**
  - Full-text search keyword query.
  - Active collection chip filters (`all`, `electronics`, `fashion`, `home-living`, `bags-accessories`, `fitness-lifestyle`, `stationery`).
  - Min and max price range inputs with real-time numeric clamping.
  - 6 Sort options (`featured`, `price-asc`, `price-desc`, `name-asc`, `name-desc`, `newest`).
  - Responsive 3-column product grid with zero-result fallback.
- **Test IDs:** `explore-page`, `explore-title`, `collection-chip-*`, `min-price-input`, `max-price-input`, `sort-select`, `product-card-*`.

### 3. Collection Directory (`/collections`)
- **Component:** `src/pages/CollectionsPage.tsx`
- **Role:** Visual directory presenting all 6 collections.
- **Capabilities:**
  - Dynamic product counts derived from catalogue.
  - Custom SVG iconography and collection descriptors.
  - Direct navigation to `/collection/:slug`.
- **Test IDs:** `collections-page`, `collection-card-*`.

### 4. Collection Detail Storefront (`/collection/:slug`)
- **Component:** `src/pages/CollectionDetailPage.tsx`
- **Role:** Focused storefront for a single collection.
- **Supported Slugs:**
  - `electronics` (6 products)
  - `fashion` (5 products)
  - `home-living` (5 products)
  - `bags-accessories` (5 products)
  - `fitness-lifestyle` (5 products)
  - `stationery` (4 products)
- **Capabilities:**
  - Collection header with breadcrumbs.
  - Within-collection search filter.
  - Price filtering and sorting.
  - Empty-collection and invalid-slug resilience.
- **Test IDs:** `collection-detail-page`, `collection-title`, `collection-search-input`, `product-card-*`.

### 5. Product Detail Page (`/product/:id`)
- **Component:** `src/pages/ProductDetailPage.tsx`
- **Role:** In-depth product specification and purchasing view.
- **Capabilities:**
  - Bespoke vector artwork for all 30 products.
  - Dynamic breadcrumbs linked to parent collection.
  - Integer price formatting with zero decimals.
  - Quantity selector ($1 \le Q \le 10$).
  - Add to bag with optimistic feedback.
  - Wishlist toggle.
  - Related product recommendations within the same collection.
  - Demonstration review section with non-commercial disclaimers.
- **Test IDs:** `pdp-container`, `pdp-title`, `pdp-price`, `pdp-qty-stepper`, `pdp-add-to-cart`, `pdp-wishlist-toggle`.

### 6. Wishlist (`/wishlist`)
- **Component:** `src/pages/WishlistPage.tsx`
- **Role:** Saved item curation engine.
- **Capabilities:**
  - LocalStorage persistence.
  - Individual item removal and one-click "Move to Bag".
  - "Move All to Bag" bulk action.
  - Empty wishlist state with browse CTA.
- **Test IDs:** `wishlist-page`, `wishlist-grid`, `wishlist-item-*`, `move-to-cart-*`.

### 7. Shopping Bag (`/cart`)
- **Component:** `src/pages/CartPage.tsx`
- **Role:** Dedicated full-page shopping cart.
- **Capabilities:**
  - Item list with quantity steppers and delete buttons.
  - Real-time line-total calculation ($P \times Q$).
  - Settled subtotal and grand total.
  - Direct checkout navigation.
  - Empty bag zero state.
- **Test IDs:** `cart-page`, `cart-item-*`, `cart-item-qty-*`, `cart-item-remove-*`, `order-total`, `proceed-to-checkout-btn`.

### 8. Checkout Verification (`/checkout`)
- **Component:** `src/pages/CheckoutPage.tsx`
- **Role:** Defensive single-field checkout form.
- **Capabilities:**
  - Empty bag redirect to `/cart`.
  - Required "Customer Name" input.
  - Pure client-side validation rejecting empty/whitespace inputs.
  - Non-destructive validation failure (cart and name preserved).
  - Synchronous `useRef` concurrency shield preventing double order creation.
- **Test IDs:** `checkout-page`, `customer-name-input`, `place-order-button`, `validation-error-message`.

### 9. Order Confirmation Receipt (`/order-confirmed`)
- **Component:** `src/pages/OrderConfirmationPage.tsx`
- **Role:** Settled order receipt presentation.
- **Capabilities:**
  - Deterministic order reference generation (`CF-YYYYMMDD-XXXX`).
  - Itemized purchase summary with quantities and line totals.
  - Final integer total display.
  - Customer name confirmation.
  - "Start New Order" action clearing order state and returning home.
- **Test IDs:** `order-confirmation-view`, `order-receipt`, `order-reference`, `confirmation-customer-name`, `confirmation-total`, `start-new-order-button`.

### 10. Search Results Page (`/search`)
- **Component:** `src/pages/SearchResultsPage.tsx`
- **Role:** Deep-linkable search page (`/search?q=query`).
- **Capabilities:**
  - Synchronized with global header search bar.
  - Price filters and sorting within search results.
  - Query summary badge and result count.
- **Test IDs:** `search-results-page`, `search-query-display`, `search-results-grid`.

### 11. Engineering Architecture & About (`/about`)
- **Component:** `src/pages/AboutPage.tsx`
- **Role:** Comprehensive documentation of CartFlow 4.0 architecture.
- **Key Sections:**
  - Mathematical determinism & pure integer arithmetic.
  - Synchronous double-submission prevention mechanics.
  - 30-Product vector artwork pipeline.
  - SDET automation test suite & testing philosophy.
- **Test IDs:** `about-page`.

### 12. Customer Service Simulation (`/contact`)
- **Component:** `src/pages/ContactPage.tsx`
- **Role:** Interactive contact simulation for customer inquiries.
- **Capabilities:**
  - Form validation with name, email, topic, and message fields.
  - Explicit non-commercial demonstration disclaimers.
  - Interactive success receipt with reference generator.
- **Test IDs:** `contact-page`, `contact-form`, `contact-submit-btn`.

---

## 3. Backward-Compatible Legacy Aliases

To guarantee that 100% of CartFlow 3.0 baseline Playwright tests and bookmarks function without breaking, four legacy routes are preserved as exact aliases:

| Legacy Route | Component | Backward-Compatible Target |
| :--- | :--- | :--- |
| `/shop` | `ShopPage.tsx` | Legacy 2-product catalog view |
| `/categories` | `CategoriesPage.tsx` | Legacy category directory view |
| `/category/:slug` | `CategoryDetailPage.tsx` | Legacy category filter view |
| `/confirmation` | `ConfirmationPage.tsx` | Legacy checkout confirmation receipt |
