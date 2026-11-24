# CartFlow 4.0 — Technical Architecture Document
> **Document Reference:** CF-ENG-ARCH-2026-V4  
> **Status:** RATIFIED & IMPLEMENTED  
> **Target Framework:** React 18, TypeScript (Strict), Tailwind CSS, Vite  
> **Release Branch:** `feature/cartflow-4-multi-collection`

---

## 1. System Overview & Core Tenets

CartFlow 4.0 scales the CartFlow architecture into a robust, multi-collection e-commerce platform while maintaining strict client-side determinism and competitive engineering rigor. The system adheres to six foundational engineering tenets:

1. **Mathematical Determinism:** All currency representations and arithmetic operations are executed using 100% pure integer arithmetic in Indian Rupees (`₹`). Floating-point numbers are prohibited for financial calculations ($P \times Q = \text{integer}$).
2. **Deterministic Offline Local Surface:** Zero external runtime microservices, CDN dependencies, or payment gateways. All assets, vector illustrations, and product models reside entirely within the local build.
3. **Defensive Concurrency & Race Condition Shielding:** A synchronous `useRef` latch locks state transitions during order submission, preventing duplicate transaction records and multiple order references under aggressive user double-clicks.
4. **Resilient Local Persistence:** Automatic bidirectional synchronization of shopping bag and wishlist state to browser `localStorage` with resilient `try/catch` fault tolerance for private/restricted browsing modes.
5. **Universal Accessibility (WCAG 2.1 AA):** Semantic HTML5 landmarks, WAI-ARIA combobox patterns for global search, screen-reader live announcement regions, explicit form associations, and keyboard-accessible skip links.
6. **Multi-Collection Architecture:** Scaled from the baseline 2-product catalog to a 30-product demonstration catalog distributed across 6 dedicated lifestyle and productivity collections.

---

## 2. Component & Directory Architecture

```
src/
├── components/
│   ├── cart/
│   │   ├── CartDrawer.tsx          # Accessible slide-over drawer modal
│   │   ├── CartItem.tsx            # Stepper row, price formatter, removal
│   │   └── EmptyCart.tsx           # Zero-state placeholder with browse CTA
│   ├── catalog/
│   │   ├── ProductArtwork.tsx      # Bespoke local SVG vector illustrations (30 products)
│   │   ├── ProductCard.tsx         # Catalog card with title link, price, add, qty badge
│   │   └── ProductGrid.tsx         # Responsive grid container (1, 2, 3 or 4 columns)
│   ├── checkout/
│   │   ├── CheckoutForm.tsx        # Customer name input with alert integration
│   │   ├── OrderReceipt.tsx        # Settled order receipt & confirmation display
│   │   └── OrderSummary.tsx        # Itemized breakdown & settled total
│   ├── common/
│   │   ├── SearchBar.tsx           # WAI-ARIA combobox with debounced autocomplete
│   │   └── ValidationMessage.tsx   # role="alert" message container
│   ├── layout/
│   │   ├── CategoryNavigation.tsx  # Department & collection navigation strip
│   │   ├── Footer.tsx              # Directory, copyright, SDET guarantee
│   │   ├── MarketplaceHeader.tsx   # Desktop/mobile navigation, counters, drawer
│   │   ├── MobileBottomNav.tsx     # Fixed bottom bar for touch devices
│   │   ├── ScrollToTop.tsx         # Automatic scroll reset on route change
│   │   └── TopUtilityBar.tsx       # Currency, trust badges, shipping notices
│   └── pdp/
│       └── DemoFeedbackSection.tsx # Factual demo reviews & non-commercial disclaimer
├── context/
│   ├── CartContext.tsx             # Unidirectional cart state & submission lock
│   └── WishlistContext.tsx         # Persistent wishlist store
├── data/
│   ├── categories.ts               # 6 Curated collections with dynamic count derivation
│   └── products.ts                 # 30 Synthetic products across 6 collections
├── pages/
│   ├── AboutPage.tsx               # Architecture, pure integer math & SDET philosophy
│   ├── CartPage.tsx                # Dedicated full-page shopping bag
│   ├── CategoriesPage.tsx          # Legacy category directory (backward compatibility)
│   ├── CategoryDetailPage.tsx      # Legacy category filter view
│   ├── CheckoutPage.tsx            # Defensive checkout verification form
│   ├── CollectionDetailPage.tsx    # Dedicated collection storefront (/collection/:slug)
│   ├── CollectionsPage.tsx         # Visual directory of all 6 collections (/collections)
│   ├── ConfirmationPage.tsx        # Order confirmation receipt (/order-confirmed, /confirmation)
│   ├── ContactPage.tsx             # Interactive customer service simulation
│   ├── ExplorePage.tsx             # Multi-attribute filter & query engine (/explore)
│   ├── LandingPage.tsx             # Multi-collection marketplace storefront (/)
│   ├── ProductDetailPage.tsx       # Dedicated PDP route (/product/:id)
│   ├── SearchResultsPage.tsx       # Dedicated search query results page (/search?q=...)
│   ├── ShopPage.tsx                # Legacy catalog view (/shop)
│   └── WishlistPage.tsx            # Saved items view (/wishlist)
├── types/
│   └── index.ts                    # Product, Collection, Order, CartItem TypeScript contracts
└── utils/
    ├── calculations.ts             # Pure integer line totals and order sums
    ├── currency.ts                 # Indian Rupee integer formatter (₹)
    ├── reference.ts                # CF-YYYYMMDD-XXXX deterministic generator
    ├── search.ts                   # Multi-attribute search, filter, and 6-mode sort
    └── validation.ts               # Defensive input and whitespace validators
```

---

## 3. Data Contracts & Domain Models

### 3.1 Product Contract (`Product`)
```typescript
export interface Product {
  id: string;               // Unique immutable identifier (e.g. prod-aero-headphones)
  name: string;             // Display title
  slug: string;             // URL-friendly slug
  price: number;            // Strictly integer in Indian Rupees (e.g. 1499)
  originalPrice?: number;   // Original retail price for discount display
  description: string;      // Concise descriptive summary
  category: string;         // Legacy category identifier
  collectionSlug: string;   // Associated collection identifier
  image: string;            // Local vector key
  features: string[];       // Key technical features
  specs?: Record<string, string>; // Material, dimensions, weight, origin
  details?: string;         // Extended product narrative
  rating: number;           // Demonstration rating score
  reviewCount: number;      // Demonstration review count
  inStock: boolean;         // Inventory flag
  isFeatured?: boolean;     // Featured storefront placement flag
  isNewArrival?: boolean;   // New arrivals placement flag
  isTrending?: boolean;     // Trending items placement flag
  tags?: string[];          // Search & filter tags
  keywords?: string[];      // Search optimization keywords
}
```

### 3.2 Collection Contract (`Collection`)
```typescript
export interface Collection {
  id: string;               // Unique collection ID (e.g. col-electronics)
  name: string;             // Display name (e.g. Electronics)
  slug: string;             // URL parameter (e.g. electronics)
  description: string;      // Curatorial overview
  productCount: number;     // Dynamically derived product count
  image: string;            // Visual banner key
  featuredProductIds: string[]; // Anchor products
}
```

---

## 4. Concurrency Locking & Double-Click Mitigation

The checkout subsystem employs a synchronous lock mechanism built into `CartContext`:

```typescript
const isSubmittingRef = useRef<boolean>(false);

const submitOrder = useCallback((customerName: string): Order | null => {
  // Synchronous atomic lock check
  if (isSubmittingRef.current) {
    return null;
  }
  isSubmittingRef.current = true;

  try {
    // 1. Validation check
    const trimmed = customerName.trim();
    if (!trimmed) {
      isSubmittingRef.current = false;
      return null;
    }

    // 2. Cart items check
    if (items.length === 0) {
      isSubmittingRef.current = false;
      return null;
    }

    // 3. Deterministic order creation
    const newOrder: Order = {
      reference: generateOrderReference(),
      customerName: trimmed,
      items: [...items],
      totalAmount: calculateTotal(items),
      timestamp: new Date().toISOString(),
    };

    setConfirmedOrder(newOrder);
    setItems([]);
    return newOrder;
  } finally {
    // Release lock on completion or error
    isSubmittingRef.current = false;
  }
}, [items]);
```

---

## 5. Pure Integer Arithmetic Verification

Floating-point accumulation is mathematically prevented by using pure integer arithmetic:

$$\text{Line Total} = P_i \times Q_i \quad \text{where } P_i \in \mathbb{Z}^+, Q_i \in [1, 10]$$
$$\text{Order Total} = \sum_{i=1}^{n} (P_i \times Q_i) \quad \text{where } \text{Order Total} \in \mathbb{Z}^+$$

Formatting occurs strictly at the presentation boundary via `formatCurrency(amount: number)`:
```typescript
export const formatCurrency = (amount: number): string => {
  const rounded = Math.round(amount);
  return '₹' + rounded.toLocaleString('en-IN');
};
```

---

## 6. Route Architecture Matrix

| Route | View Component | Description |
| :--- | :--- | :--- |
| `/` | `LandingPage.tsx` | Marketplace storefront with hero, 6 collections, featured strip, trending |
| `/explore` | `ExplorePage.tsx` | Full 30-product discovery engine with search, chips, price filters, 6 sort modes |
| `/collections` | `CollectionsPage.tsx` | Visual directory of all 6 collections with dynamic counts |
| `/collection/:slug` | `CollectionDetailPage.tsx` | Slug-filtered collection view with contextual search and filters |
| `/product/:id` | `ProductDetailPage.tsx` | PDP with vector artwork, specs, quantity bounds, related items |
| `/wishlist` | `WishlistPage.tsx` | Saved items view with individual and bulk "Move to Bag" |
| `/cart` | `CartPage.tsx` | Dedicated full-page shopping cart with steppers and live totals |
| `/checkout` | `CheckoutPage.tsx` | Defensive single-field checkout with non-destructive validation |
| `/order-confirmed` | `ConfirmationPage.tsx` | Settled order receipt and reference generator |
| `/search` | `SearchResultsPage.tsx` | Query-filtered search results page (`?q=...`) |
| `/about` | `AboutPage.tsx` | Comprehensive architectural documentation and SDET philosophy |
| `/contact` | `ContactPage.tsx` | Interactive customer service simulation with reference generation |
| `/shop` | `ShopPage.tsx` | Legacy baseline catalog (backward-compatible alias) |
| `/categories` | `CategoriesPage.tsx` | Legacy category directory (backward-compatible alias) |
| `/category/:slug` | `CategoryDetailPage.tsx` | Legacy category filter (backward-compatible alias) |
| `/confirmation` | `ConfirmationPage.tsx` | Legacy checkout receipt (backward-compatible alias) |
