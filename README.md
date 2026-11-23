# CartFlow 3.0 – Mini Checkout & Browser Test Suite
> **Enterprise SDET Intern Hackathon Submission**  
> Evaluated on:
> - **Solution Completeness & Correctness:** 35%
> - **Technical Execution:** 25%
> - **Testing & Reliability:** 25%
> - **Documentation & Clarity:** 15%

---

## 1. Project Title & Overview
**CartFlow 3.0** is an enterprise-grade client-side e-commerce marketplace and automated browser testing platform built with React 18, TypeScript (strict mode), Tailwind CSS, Vite, and Playwright. Inspired by modern retail architectures (*Amazon, Flipkart, Verdant, Gucci*), CartFlow 3.0 implements the **Meridian Modern Marketplace** design system while strictly honoring the challenge specifications: pure integer financial arithmetic, concurrency locking, accessible semantic UI, and 55 comprehensive Playwright automation scenarios.

---

## 2. Problem Statement
Commercial e-commerce web applications routinely suffer from critical quality regressions:
1. **Floating-point rounding bugs:** Displaying inaccurate prices such as `₹1499.0000000000002` during quantity updates.
2. **Duplicate order creation:** Customers double-clicking "Place Order" under network lag or rendering delay, triggering duplicate transactions.
3. **Destructive validation failures:** Wiping customer-entered fields or clearing the shopping cart on form rejection.
4. **Flaky browser automation:** Tests that rely on arbitrary timeouts (`page.waitForTimeout()`), dynamic IDs, or shared mutable state.
5. **Accessibility barriers:** Inaccessible icon buttons, missing form associations, and missing skip links for keyboard navigation.

---

## 3. Project Objectives
- Implement a 100% deterministic, pure client-side commerce engine with **zero external dependencies or mock servers**.
- Strictly bound the catalog to exactly **two fixed-price synthetic products**:
  - *Aero Wireless Headphones* (`₹1,499`)
  - *Urban Everyday Backpack* (`₹999`)
- Guarantee pure integer monetary calculations with zero floating-point accumulation errors.
- Prevent duplicate order creation via a synchronous `useRef` lock.
- Deliver full keyboard, screen-reader, and responsive accessibility (WCAG 2.1 AA target).
- Provide competition-grade test coverage (55 passing Playwright scenarios) with comprehensive manual testing documentation and screenshot evidence.

---

## 4. Features Implemented
- **Global Search & Autocomplete:** Real-time search by product name and category, debounced autocomplete with Arrow/Enter/Escape keyboard navigation, and clear button.
- **Wishlist Engine:** Persistent client-side wishlist with heart toggles, live header counter badge, and "Move to Bag" actions.
- **Department & Category Discovery:** Directory view (`/categories`) and dedicated department filters (`/category/electronics`, `/category/accessories`).
- **Product Detail Pages (PDP):** Route `/product/:id` featuring high-resolution local vector artwork, feature highlights, quantity selector ($1 \le Q \le 10$), "Add to Bag", and related item recommendations.
- **Demonstration Feedback Section:** Explicitly labeled demo feedback component with clear non-commercial disclaimers, star ratings, and local session review submission.
- **Interactive Cart & Slide-Over Drawer:** Real-time quantity steppers, item removal, line totals, and slide-over drawer accessible from any route.
- **Defensive Checkout Form:** Single required field (*Customer Name*), rejecting empty and whitespace-only submissions while preserving customer input on failure.
- **Synchronous Concurrency Lock:** Prevents double submissions on rapid clicks.
- **Order Confirmation Receipt:** Generates reference `CF-YYYYMMDD-XXXX`, itemized summary, and full application reset.
- **Keyboard Skip Navigation:** Accessible "Skip to main content" link and polite screen-reader live announcements.

---

## 5. Technology Stack
- **Runtime & Environment:** Node.js v24.16.0, npm 11.13.0
- **Framework & Language:** React 18.3.1, TypeScript 5.6.3 (strict mode)
- **Styling & Design System:** Tailwind CSS 3.4.16, Lucide React 0.469.0
- **Build Tool:** Vite 5.4.11
- **Browser Automation:** Playwright 1.49.1 (Chromium & Microsoft Edge)
- **Code Quality:** ESLint 8.57.1, TypeScript Compiler (`tsc --noEmit`)

---

## 6. Application Architecture
CartFlow 3.0 follows a modular unidirectional React component architecture:
```
App (Router, Skip Link, Live Region)
 ├── TopUtilityBar (Trust badges, currency, test suite indicator)
 ├── MarketplaceHeader (Branding, SearchBar, Wishlist badge, Cart button)
 ├── CategoryNavigation (Department strip)
 ├── CartDrawer (Slide-over bag with accessible Escape/backdrop dismiss)
 ├── Main Content Routes
 │    ├── LandingPage (Hero, departments, curated grid)
 │    ├── ShopPage (Full product collection)
 │    ├── ExplorePage (Search query, category chips, sorting)
 │    ├── CategoriesPage (Department directory)
 │    ├── CategoryDetailPage (Filtered department view)
 │    ├── ProductDetailPage (PDP with artwork, specs, stepper, demo reviews)
 │    ├── WishlistPage (Saved items with move-to-bag)
 │    ├── CartPage (Full shopping bag with line totals)
 │    ├── CheckoutPage (Verification form & sticky order summary)
 │    └── ConfirmationPage (Order receipt with reference CF-YYYYMMDD-XXXX)
 ├── MobileBottomNav (Persistent mobile bottom navigation)
 └── Footer (Directory links, accessibility note, SDET guarantees)
```

---

## 7. Project Directory Structure
```
c:\Users\HEMANTH\Documents\SDETintern\
├── artifacts/
│   ├── reports/
│   │   └── playwright-report/        # HTML test report
│   └── screenshots/                   # Verified screenshot evidence
├── docs/
│   ├── TEST_PLAN.md                  # Comprehensive SDET test plan
│   ├── TEST_EXECUTION_REPORT.md      # Test results and pass matrix
│   ├── ACCESSIBILITY_REPORT.md       # WCAG & semantic audit report
│   └── ARCHITECTURE.md               # Technical architecture documentation
├── evidence/
│   └── phase3/                       # Automated scenario screenshot captures
├── scripts/
│   ├── audit-ui-ux.mjs               # Automated viewport & route auditor
│   ├── execute-manual-tests.mjs      # Manual QA runner (M01, M02 & viewports)
│   ├── verify-phase1.mjs             # Phase 1 verification script
│   └── verify-phase2.mjs             # Phase 2 verification script
├── src/
│   ├── components/
│   │   ├── cart/                     # CartItem, CartDrawer, EmptyCart
│   │   ├── catalog/                  # ProductCard, ProductGrid
│   │   ├── checkout/                 # CheckoutForm, OrderSummary
│   │   ├── common/                   # SearchBar, ValidationMessage
│   │   ├── layout/                   # Header, TopUtility, MobileNav, Footer
│   │   └── pdp/                      # DemoFeedbackSection
│   ├── context/                      # CartContext, WishlistContext
│   ├── data/                         # products.ts (2 synthetic products)
│   ├── pages/                        # 10 application page views
│   ├── types/                        # TypeScript domain interfaces
│   └── utils/                        # Pure calculations, search, formatting
├── tests/
│   └── e2e/
│       ├── pages/CartFlowPage.ts     # Enterprise Page Object Model
│       ├── accessibility.spec.ts     # Phase 4C semantic & a11y tests (7 tests)
│       ├── checkout.spec.ts          # Mandatory 1, 2A, 2B, 3 & regression (14 tests)
│       ├── discovery.spec.ts         # Search, Wishlist, Category tests (19 tests)
│       ├── pdp.spec.ts               # Product Detail Page tests (9 tests)
│       └── quality-engineering.spec.ts# Boundaries, console, persistence (6 tests)
├── playwright.config.ts              # Playwright configuration
├── tailwind.config.js                # Meridian Modern Marketplace theme
├── tsconfig.json                     # Strict TypeScript configuration
└── package.json                      # Project dependencies and scripts
```

---

## 8. Installation & Execution Instructions
1. **Prerequisites:**
   - Node.js $\ge$ 18 (Tested on Node.js v24.16.0)
   - npm $\ge$ 9 (Tested on npm 11.13.0)
   - Google Chrome or Microsoft Edge browser installed

2. **Clone & Install:**
   ```bash
   cd c:\Users\HEMANTH\Documents\SDETintern
   npm install
   ```

3. **Start Local Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in any modern web browser.

4. **Production Build & Preview:**
   ```bash
   npm run build
   npm run preview
   ```

---

## 9. Available npm Scripts
| Command | Description |
|---|---|
| `npm run dev` | Starts Vite development server at `http://localhost:5173` |
| `npm run build` | Compiles TypeScript and builds production bundle into `dist/` |
| `npm run preview` | Previews production build locally at `http://localhost:4173` |
| `npm run typecheck` | Executes `tsc --noEmit` to verify strict TypeScript types |
| `npm run lint` | Runs ESLint analysis across all `.ts` and `.tsx` source files |
| `npm run test` | Executes all 55 Playwright end-to-end tests |
| `npm run test:e2e` | Runs complete Playwright browser test suite |
| `npm run test:headed` | Runs Playwright tests with visible browser window |
| `npm run test:ui` | Launches Playwright interactive graphical test UI |
| `npm run test:report` | Opens interactive HTML test execution report |

---

## 10. Product Catalog & Pricing
The application contains strictly two fixed-price synthetic catalog items:
| SKU ID | Product Name | Department | Unit Price | Features |
|---|---|---|:---:|---|
| `prod-aero-headphones` | **Aero Wireless Headphones** | Electronics | **₹1,499** | Hybrid ANC, 40-hr reserve, Bluetooth 5.3, USB-C |
| `prod-urban-backpack` | **Urban Everyday Backpack** | Accessories | **₹999** | Weatherproof canvas, 16" laptop sleeve, anti-theft |

*Formula Guarantee:*
- $\text{LineTotal} = \text{UnitPrice} \times \text{Quantity}$
- $\text{OrderTotal} = \sum \text{LineTotals}$
- Strictly pure integer sums formatted using `Intl.NumberFormat('en-IN')` in Indian Rupee format (`₹X,XXX`). Zero fees, zero hidden taxes.

---

## 11. Application Routes
| URL Path | Component | Purpose |
|---|---|---|
| `/` | `LandingPage` | Marketplace hero, featured departments, daily deal, and curated collection |
| `/shop` | `ShopPage` | Full catalog view with direct "Add to Bag" and Wishlist actions |
| `/explore` | `ExplorePage` | Search query engine with category chips and price sorting |
| `/categories` | `CategoriesPage` | Department directory with computed item counts |
| `/category/:slug` | `CategoryDetailPage` | Filtered department listing (`electronics` / `accessories`) |
| `/product/:id` | `ProductDetailPage` | Detailed product specifications, quantity stepper, and reviews |
| `/wishlist` | `WishlistPage` | Saved items with one-click "Move to Bag" |
| `/cart` | `CartPage` | Full shopping bag with item steppers and order breakdown |
| `/checkout` | `CheckoutPage` | Customer information verification and submission form |
| `/confirmation` | `ConfirmationPage` | Order receipt with reference `CF-YYYYMMDD-XXXX` and reset |
| `/order-confirmed` | `ConfirmationPage` | Canonical alias route for order confirmation |

---

## 12. Testing Strategy
Our SDET testing architecture follows the Test Pyramid methodology:
1. **Static Analysis:** Strict TypeScript (`tsc --noEmit`) and ESLint (`--max-warnings 0`).
2. **Page Object Model (POM):** Centralized locator and action definitions in [`CartFlowPage.ts`](file:///c:/Users/HEMANTH/Documents/SDETintern/tests/e2e/pages/CartFlowPage.ts).
3. **Deterministic Assertions:** Asserting customer-visible state with zero fixed timeouts (`page.waitForTimeout` is strictly prohibited).
4. **Test Isolation:** Dedicated `beforeEach` hooks clearing `localStorage` to guarantee independent test runs.
5. **Cross-Browser Coverage:** Validated on Chromium (Google Chrome) and Microsoft Edge.

---

## 13. Test Execution Commands
- **Run Complete Test Suite (55 tests):**
  ```bash
  npm run test:e2e
  ```
- **Run Specific Test Suites:**
  ```bash
  npx playwright test tests/e2e/checkout.spec.ts
  npx playwright test tests/e2e/discovery.spec.ts
  npx playwright test tests/e2e/pdp.spec.ts
  npx playwright test tests/e2e/accessibility.spec.ts
  npx playwright test tests/e2e/quality-engineering.spec.ts
  ```
- **Run on Microsoft Edge Channel:**
  ```bash
  npx playwright test tests/e2e/checkout.spec.ts --project=msedge
  ```
- **View HTML Test Report:**
  ```bash
  npm run test:report
  ```

---

## 14. Automated Test Coverage
55 automated scenarios executed and passed with 100% success rate:
- **Mandatory Hackathon Scenarios (4 tests):**
  - Mandatory 1: Successful checkout producing visible confirmation and unique reference `CF-YYYYMMDD-XXXX`.
  - Mandatory 2A: Missing customer name blocks checkout and displays accessible alert.
  - Mandatory 2B: Whitespace-only name blocks checkout and preserves customer input.
  - Mandatory 3: Changing quantity updates line total and order total deterministically.
- **High-Value Checkout & Regression (10 tests):**
  - REG-01 through REG-10: Empty cart prevention, item removal, stepper lower bound ($\ge 1$), duplicate row prevention, rapid double-click concurrency lock, whitespace trimming, clean order reset, multi-page routing, and state persistence.
- **Global Search, Wishlist & Discovery (19 tests):**
  - SEARCH-01 to SEARCH-06: Name search, category search, whitespace handling, no-results fallback, input clearing, keyboard autocomplete.
  - WISH-01 to WISH-05: Live count updates, removal, duplicate prevention, persistence across reloads, move-to-bag.
  - CAT-01 to CAT-04: Department counts, slug filtering, invalid slug fallback, breadcrumbs.
  - EXP-01 to EXP-04: Price sorting, filter chips, filter clearing, query param persistence.
- **Product Detail Pages (9 tests):**
  - PDP-01 to PDP-09: Direct SKU loading, exact prices, breadcrumb navigation, quantity stepper subtotal calculation, multi-quantity add to bag, wishlist toggle, invalid product ID handling, demo feedback submission, catalog card navigation.
- **Accessibility & Semantics (7 tests):**
  - A11Y-01 to A11Y-07: Skip to content keyboard navigation, H1 hierarchy on all pages, combobox ARIA pattern, accessible button names, form label and alert associations, live announcement regions, cart drawer Escape-key behavior.
- **Quality Engineering & Console Hygiene (6 tests):**
  - QE-01 to QE-06: Zero console errors across all 11 routes, upper boundary limit ($Q \le 10$), cart reload persistence, rapid sequential additions, whitespace query safety, and URL integrity.

---

## 15. Manual Test Scenarios
- **Test M01 – Empty Cart Checkout:**
  - *Steps:* Navigate to `/checkout` with empty cart, enter "Jane Doe", click "Place Order".
  - *Result:* **PASS.** Order blocked; visible alert displayed; customer name preserved; no confirmation rendered.
- **Test M02 – Rapid Double-Click Protection:**
  - *Steps:* Add Aero Headphones, enter "Jane Doe", click "Place Order" twice within 50ms.
  - *Result:* **PASS.** Exactly one confirmation receipt; unique reference generated; single settlement of ₹1,499.
- **Test M03 – Cross-Device Viewport Verification:**
  - *Devices Verified:* Desktop (1440x900, 1280x800), Tablet (768x1024), Mobile (375x812, 390x844).
  - *Result:* **PASS.** Zero horizontal overflow, responsive navigation, touch targets $\ge 44\text{px}$.

---

## 16. Known Limitations
1. **Client-Side Scope:** By project specification, there is no remote backend, database, or live payment gateway; all orders and feedback are persisted in client memory and `localStorage`.
2. **Synthetic Catalog:** Exactly two fixed products are cataloged; mock catalog expansion is intentionally avoided to preserve hackathon evaluation rules.
3. **Host Browser Environment:** Testing was executed against Chromium (Google Chrome) and Microsoft Edge. Dedicated Firefox and WebKit binaries were not installed in the Windows evaluation sandbox; their status is documented honestly in [`docs/TEST_PLAN.md`](file:///c:/Users/HEMANTH/Documents/SDETintern/docs/TEST_PLAN.md).

---

## 17. Future Enhancements
- Integration with standard headless CMS or backend GraphQL API for dynamic catalog queries.
- Payment gateway integration (Stripe / Razorpay) in sandbox mode.
- Service Worker integration for offline PWA shopping capabilities.
- Automated Lighthouse CI performance scoring in CI/CD pipelines.
