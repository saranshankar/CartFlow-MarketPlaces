# CartFlow 3.0 — Technical Architecture Document
> **Document Reference:** CF-ENG-ARCH-2026-V3  
> **Status:** RATIFIED & IMPLEMENTED  
> **Target Framework:** React 18, TypeScript (Strict), Tailwind CSS, Vite

---

## 1. System Overview & Core Tenets
CartFlow 3.0 is built on five core engineering principles:
1. **Mathematical Determinism:** Strictly integer arithmetic for all currency calculations. Floating-point types are never used for currency summation.
2. **Zero External Surface:** Completely offline-safe client-side application. No remote microservices, external payment gateways, or third-party image CDNs.
3. **Defensive Concurrency:** Concurrency locks on state transitions to eliminate race conditions, double submissions, and duplicate records.
4. **Resilient Local Persistence:** Automatic synchronization to `localStorage` with fault-tolerant try/catch fallbacks.
5. **Accessible by Default:** Semantic HTML5, WAI-ARIA 1.2 patterns, and responsive layout across mobile, tablet, and desktop viewports.

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
│   │   ├── ProductCard.tsx         # Catalog card with title link, price, add
│   │   └── ProductGrid.tsx         # Responsive grid layout container
│   ├── checkout/
│   │   ├── CheckoutForm.tsx        # Customer name input with alert integration
│   │   └── OrderSummary.tsx        # Itemized breakdown & settled total
│   ├── common/
│   │   ├── SearchBar.tsx           # WAI-ARIA combobox with autocomplete
│   │   └── ValidationMessage.tsx   # role="alert" message container
│   ├── layout/
│   │   ├── CategoryNavigation.tsx  # Department strip with live routes
│   │   ├── Footer.tsx              # Directory, copyright, SDET guarantee
│   │   ├── MarketplaceHeader.tsx   # Desktop/mobile navigation & triggers
│   │   ├── MobileBottomNav.tsx     # Fixed bottom bar for touch devices
│   │   ├── ScrollToTop.tsx         # Automatic scroll reset on route change
│   │   └── TopUtilityBar.tsx       # Currency, trust badges, shipping notices
│   └── pdp/
│       └── DemoFeedbackSection.tsx # Factual demo reviews & disclaimer
├── context/
│   ├── CartContext.tsx             # Unidirectional cart state & submission lock
│   └── WishlistContext.tsx         # Persistent wishlist store
├── data/
│   └── products.ts                 # Two immutable synthetic products
├── pages/
│   ├── LandingPage.tsx             # Main marketplace storefront
│   ├── ShopPage.tsx                # Catalog view
│   ├── ExplorePage.tsx             # Filter & sort query engine
│   ├── CategoriesPage.tsx          # Category directory
│   ├── CategoryDetailPage.tsx      # Slug-filtered category view
│   ├── ProductDetailPage.tsx       # Dedicated PDP route (/product/:id)
│   ├── WishlistPage.tsx            # Saved items view
│   ├── CartPage.tsx                # Full-page shopping bag
│   ├── CheckoutPage.tsx            # Checkout verification form
│   └── ConfirmationPage.tsx        # Order receipt & reset view
├── types/
│   └── index.ts                    # Strict TypeScript domain interfaces
└── utils/
    ├── calculations.ts             # Pure integer arithmetic functions
    ├── currency.ts                 # Intl.NumberFormat('en-IN') wrapper
    └── search.ts                   # Search, autocomplete & sorting logic
```

---

## 3. State Management & Data Flow

### A. Cart Context (`CartContext.tsx`)
```mermaid
flowchart TD
    CatalogCard["ProductCard / PDP"] -->|addToCart(product, qty)| CartContext
    CartStepper["CartItem Stepper (+/-)"] -->|updateQuantity(id, delta)| CartContext
    RemoveBtn["Remove Item"] -->|removeFromCart(id)| CartContext
    CartContext -->|Computes pure integer sums| TotalCalc["total = sum(price * qty)"]
    CartContext -->|Syncs| LocalStorage[("localStorage['cartflow_items']")]
    CartContext -->|Provides state| CartDrawer["CartDrawer & CartPage"]
    CartContext -->|Synchronous lock| SubmitLock{"isSubmittingRef.current"}
    SubmitLock -->|Single submission| Confirmation["confirmedOrder & CF-Reference"]
```

### B. Pure Financial Calculation Engine (`utils/calculations.ts`)
```typescript
export function calculateLineTotal(unitPrice: number, quantity: number): number {
  const safePrice = Math.round(Number(unitPrice) || 0);
  const safeQty = Math.max(0, Math.floor(Number(quantity) || 0));
  return safePrice * safeQty;
}

export function calculateOrderTotal(items: readonly CartItem[]): number {
  return items.reduce((accum, item) => {
    return accum + calculateLineTotal(item.product.price, item.quantity);
  }, 0);
}
```
*Key Safeguard:* Zero floating-point multiplication or addition. All currency operations operate on integer paise/rupees directly.

### C. Concurrency & Rapid Double-Click Lock
```typescript
const isSubmittingRef = useRef<boolean>(false);

const submitOrder = useCallback((customerName: string): boolean => {
  // Synchronous atomic check before any React state re-render
  if (isSubmittingRef.current) {
    return false;
  }
  isSubmittingRef.current = true;
  setIsSubmitting(true);

  // Validate inputs
  const trimmed = customerName.trim();
  if (!trimmed || items.length === 0) {
    isSubmittingRef.current = false;
    setIsSubmitting(false);
    return false;
  }

  // Create confirmed order
  const order: OrderConfirmation = {
    reference: generateOrderReference(),
    customerName: trimmed,
    items: [...items],
    total,
    timestamp: new Date().toISOString(),
  };
  setConfirmedOrder(order);
  setItems([]);
  setIsSubmitting(false);
  isSubmittingRef.current = false;
  return true;
}, [items, total]);
```

---

## 4. Routing Architecture
React Router v6 provides client-side SPA routing:
- `/` $\rightarrow$ `LandingPage`
- `/shop` $\rightarrow$ `ShopPage`
- `/explore` $\rightarrow$ `ExplorePage` (supports `?q=`, `?category=`, `?sort=`)
- `/categories` $\rightarrow$ `CategoriesPage`
- `/category/:slug` $\rightarrow$ `CategoryDetailPage` (`electronics`, `accessories`)
- `/product/:id` $\rightarrow$ `ProductDetailPage` (`prod-aero-headphones`, `prod-urban-backpack`)
- `/wishlist` $\rightarrow$ `WishlistPage`
- `/cart` $\rightarrow$ `CartPage`
- `/checkout` $\rightarrow$ `CheckoutPage`
- `/confirmation` & `/order-confirmed` $\rightarrow$ `ConfirmationPage`
- `*` $\rightarrow$ Graceful fallback to `LandingPage`

---

## 5. Playwright Automation Architecture
- Centralized Page Object Model in [`CartFlowPage.ts`](file:///c:/Users/HEMANTH/Documents/SDETintern/tests/e2e/pages/CartFlowPage.ts).
- Semantic customer-visible locators (`getByRole`, `getByLabel`, `getByTestId`).
- Automated screenshots stored in `artifacts/screenshots/` and HTML reports in `artifacts/reports/playwright-report/`.
