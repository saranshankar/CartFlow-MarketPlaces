# CartFlow – Mini Checkout and Browser Test Suite

> **Competition-Quality SDET Hackathon Submission**  
> Built to satisfy strict criteria: Solution Completeness & Correctness (35%), Technical Execution (25%), Testing & Reliability (25%), and Documentation & Clarity (15%).

---

## 1. Project Name
**CartFlow – Mini Checkout and Browser Test Suite**

## 2. Project Overview
CartFlow is a high-reliability, client-side commerce checkout interface coupled with an enterprise-grade automated browser test suite powered by **Playwright with TypeScript**. The application adheres to the **"Midnight Indigo Commerce"** design theme, providing a commercial-grade, accessible (WCAG 2.1 AA), and responsive shopping experience.

Every financial calculation is performed using pure integer arithmetic (strictly preventing floating-point rounding errors), customer validation preserves user input upon submission errors, and a synchronous `useRef` lock prevents race conditions and duplicate order generation caused by rapid double-clicking.

---

## 3. Problem Statement
Commercial web applications frequently suffer from:
1. **Floating-point rounding bugs:** Displaying currency values like `$19.990000000000002` or off-by-one cent totals during quantity adjustments.
2. **Duplicate order creation:** Customers double-clicking "Place Order" under slow network conditions or brief UI lag, generating duplicate charges.
3. **Destructive validation failures:** Wiping customer-entered fields or clearing the cart when submission validation fails.
4. **Flaky automation suites:** Tests that depend on arbitrary fixed sleeps (`waitForTimeout`), brittle CSS class selectors, or shared mutable state between test runs.

CartFlow completely solves these challenges through deterministic pure state management, a synchronous submission lock, and a web-first automated Playwright testing suite.

---

## 4. Key Features
- **Fixed Synthetic Product Catalog:** Exactly two synthetic products with fixed prices:
  - *Aero Wireless Headphones* — `₹1,499` (Electronics)
  - *Urban Everyday Backpack* — `₹999` (Accessories)
- **Zero-Network Visual Assets:** Embedded local SVG vector graphics guaranteeing instant rendering with 0% asset failure rate.
- **Accurate Financial Engine:**
  - $\text{LineTotal} = \text{UnitPrice} \times \text{Quantity}$
  - $\text{OrderTotal} = \sum \text{LineTotals}$
  - Formatted using `Intl.NumberFormat('en-IN')` in Indian Rupee format (`₹X,XXX`). Strictly zero taxes, delivery charges, discounts, or hidden fees.
- **Quantity Stepper Controls:** Reactive increment (`+`) and decrement (`-`) steppers strictly bounded $\ge 1$ (decrement button disabled at quantity 1).
- **Dedicated Item Removal:** Discrete removal control to cleanly delete products and transition to the empty cart state.
- **Defensive Customer Validation:**
  - One required field: **Customer Name**.
  - Rejects blank inputs and whitespace-only strings with accessible `role="alert"` messages.
  - Preserves user input and cart state across validation failures.
- **Synchronous Double-Click Prevention:** Synchronous `useRef` lock (`isSubmittingRef.current = true`) intercepts and drops rapid concurrent clicks before the next React re-render cycle.
- **Unique Order Confirmation:** Generates an alphanumeric order reference (`CF-YYYYMMDD-XXXX`), renders an itemized receipt, and supports clean state resets via "Start New Order".
- **Accessible (WCAG 2.1 AA):** High-contrast color palette, visible focus rings, ARIA live regions, and screen-reader announcements.

---

## 5. Technology Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Runtime** | Node.js | v24.16.0 | Modern JavaScript/TypeScript execution runtime |
| **Package Manager** | npm | 11.13.0 | Dependency management and script lifecycle |
| **Framework** | React | 18.3.1 | Declarative component architecture & hooks |
| **Language** | TypeScript | 5.6.3 | Strict end-to-end type safety |
| **Bundler** | Vite | 5.4.11 | Fast HMR dev server and optimized rollup production builds |
| **Styling** | Tailwind CSS | 3.4.16 | Utility-first "Midnight Indigo Commerce" styling |
| **Icons** | Lucide React | 0.469.0 | Scalable accessible UI icons |
| **E2E Automation** | Playwright | 1.49.1 | Browser automation with auto-waiting assertions |
| **Browser Engine** | Chromium / Chrome | System | Real browser execution |

---

## 6. Architecture Overview

```
                                  +-----------------------+
                                  |       App.tsx         |
                                  | (State Orchestrator)  |
                                  +-----------+-----------+
                                              |
                     +------------------------+------------------------+
                     |                                                 |
         +-----------v-----------+                         +-----------v-----------+
         |     ProductCatalog    |                         |      CartSummary      |
         | (Fixed Synthetic Cat) |                         | (Item Steppers & Total|
         +-----------+-----------+                         +-----------+-----------+
                     |                                                 |
         +-----------v-----------+                         +-----------v-----------+
         |      ProductCard      |                         |       CartItem        |
         | (Aero & Urban Cards)  |                         | (Qty Clamped >= 1)    |
         +-----------------------+                         +-----------+-----------+
                                                                       |
                                                           +-----------v-----------+
                                                           |     CheckoutForm      |
                                                           | (Name Input & Submit) |
                                                           +-----------+-----------+
                                                                       |
                                                   [Synchronous useRef Submission Lock]
                                                                       |
                                                           +-----------v-----------+
                                                           |   OrderConfirmation   |
                                                           | (Unique Ref & Receipt)|
                                                           +-----------------------+
```

### Architectural Highlights:
1. **Single Source of Truth (`useCart.ts`):** All cart mutations occur through a dedicated hook exposing immutable update handlers.
2. **Pure Arithmetic Utilities (`src/utils/calculations.ts`):** Testable utility functions devoid of side effects.
3. **Synchronous Submission Lock:** Defeats race conditions by engaging a synchronous ref guard alongside React state transitions.
4. **Page Object Model (`tests/e2e/pages/CartFlowPage.ts`):** Encapsulates page selectors, actions, and assertions for clean, maintainable E2E tests.

---

## 7. Folder Structure

```
SDETintern/
├── artifacts/                  # Official evidence archive
│   ├── reports/
│   │   └── playwright-report/  # Interactive HTML test report
│   └── screenshots/            # Real full-page screenshots
│       ├── empty-cart-manual.png
│       ├── missing-name-validation.png
│       ├── quantity-update.png
│       ├── rapid-double-click.png
│       └── successful-checkout.png
├── evidence/                   # Phased engineering evidence logs
│   ├── phase1/
│   ├── phase2/
│   └── phase3/
├── scripts/                    # Headless inspection & verification runners
│   ├── execute-manual-tests.mjs
│   ├── verify-phase1.mjs
│   └── verify-phase2.mjs
├── src/
│   ├── components/             # Modular React components
│   │   ├── CartItem.tsx
│   │   ├── CartSummary.tsx
│   │   ├── CheckoutForm.tsx
│   │   ├── EmptyCart.tsx
│   │   ├── Header.tsx
│   │   ├── OrderConfirmation.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductCatalog.tsx
│   │   └── ValidationMessage.tsx
│   ├── data/
│   │   └── products.ts         # Immutable synthetic products
│   ├── hooks/
│   │   └── useCart.ts          # Core cart state management
│   ├── types/
│   │   └── index.ts            # Domain TypeScript types
│   ├── utils/
│   │   ├── calculations.ts     # Pure integer math utilities
│   │   ├── currency.ts         # Intl.NumberFormat INR formatting
│   │   └── validation.ts       # Defensive validation rules
│   ├── App.tsx                 # Main application orchestrator
│   ├── index.css               # Design tokens & Tailwind directives
│   └── main.tsx                # Entry point
├── tests/
│   └── e2e/
│       ├── pages/
│       │   └── CartFlowPage.ts # Playwright Page Object Model
│       └── checkout.spec.ts    # 12 Playwright E2E browser tests
├── playwright.config.ts        # Playwright runner configuration
├── tailwind.config.js          # Midnight Indigo palette definition
├── tsconfig.json               # Strict TypeScript configuration
├── vite.config.ts              # Vite server & bundler configuration
├── package.json                # Project manifest and scripts
├── TEST_PLAN.md                # Risk-based test plan and traceability matrix
├── TEST_RESULTS.md             # Execution report (automated, manual, defect log)
└── README.md                   # Complete master documentation
```

---

## 8. Prerequisites
- **Node.js:** v18.0.0 or higher (Tested and verified on **Node.js v24.16.0**).
- **npm:** v9.0.0 or higher (Tested on **npm v11.13.0**).
- **Browser:** Google Chrome, Chromium, or Microsoft Edge installed on the local system.

---

## 9. Installation Instructions

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone <repository-url>
cd SDETintern

# Install project dependencies cleanly
npm install
```

---

## 10. Development Execution

Start the local Vite development server:

```bash
npm run dev
```

The application will be accessible at: `http://localhost:5173`

---

## 11. Production Build

Build the optimized production distribution:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The preview server will be accessible at: `http://localhost:4173`

---

## 12. Lint and Type-Check Commands

Run strict TypeScript compiler verification without emitting files:

```bash
npm run typecheck
```

Execute ESLint static analysis across all TypeScript and TSX files:

```bash
npm run lint
```

---

## 13. Playwright Installation Instructions

Playwright is included as a devDependency in `package.json`. If browser binaries need to be fetched:

```bash
npx playwright install chromium
```

*(Note: On systems with Google Chrome already installed, `playwright.config.ts` is configured to use the local Chrome channel directly).*

---

## 14. Browser Test Execution

Run the complete automated browser test suite headlessly:

```bash
npm test
```

Run tests in headed mode (visible browser window):

```bash
npm run test:headed
```

Run tests with the interactive Playwright UI:

```bash
npm run test:ui
```

---

## 15. HTML Report Generation and Viewing

Playwright automatically compiles an interactive HTML test report upon suite completion:

```bash
npm run test:report
```

The report is located at: `artifacts/reports/playwright-report/index.html`

---

## 16. Automated Test Scenarios

The suite includes **12 automated test cases** (3 Mandatory Scenarios + 8 High-Value Regression Scenarios):

| Test ID | Category | Scenario Title | Assertion Target |
|---|---|---|---|
| **M1** | Mandatory | Successful Checkout | Visible confirmation, valid reference `CF-YYYYMMDD-XXXX`, exact customer name, total ₹1,499 |
| **M2A** | Mandatory | Missing Required Name | Visible validation alert, confirmation hidden, cart intact, stays on page |
| **M2B** | Mandatory | Whitespace-Only Name | Whitespace-specific error alert, input text preserved in DOM, confirmation hidden |
| **M3** | Mandatory | Exact Quantity Calculation | Headphones: ₹1,499 $\rightarrow$ 2 units: ₹2,998 $\rightarrow$ Add Backpack: ₹3,997 $\rightarrow$ Dec Headphones: ₹2,498 |
| **REG-01** | Regression | Empty Cart Checkout Guard | Submitting 0 items displays visible warning; blocks order creation |
| **REG-02** | Regression | Product Removal Recalculation | Removing Backpack from 2 items updates total to exact ₹1,499 |
| **REG-03** | Regression | Minimum Quantity Boundary | Decrement button has `disabled` attribute at qty 1; cannot drop below 1 |
| **REG-04** | Regression | Empty Cart State Transition | Removing last product renders `EmptyCart` component |
| **REG-05** | Regression | Duplicate Addition Handling | Adding same product twice updates item quantity to 2 (no duplicate rows) |
| **REG-06** | Regression | Rapid Double-Click Protection | Concurrent clicks engage synchronous `useRef` lock; produces exactly 1 order |
| **REG-07** | Regression | Whitespace Trimming on Receipt | Name with leading/trailing spaces (`"   Sneha Patel   "`) trimmed on receipt |
| **REG-08** | Regression | State Reset Workflow | "Start New Order" resets cart, clears customer name, restores catalog |

---

## 17. Manual Test Scenarios

Two mandatory manual tests were executed in a live browser session:
1. **Test M01 (Empty Cart Checkout):** Entering customer name with an empty cart and clicking "Place Order". Verified that the order is blocked with a visible error message (`artifacts/screenshots/empty-cart-manual.png`).
2. **Test M02 (Rapid Double-Click):** Populating the cart, entering a name, and rapidly clicking "Place Order" twice. Verified that exactly one order confirmation and reference were created (`artifacts/screenshots/rapid-double-click.png`).

---

## 18. Test Results Summary

- **Automated Tests:** **12 passed, 0 failed, 0 skipped** (Execution time: **20.7s**).
- **Manual Tests:** **2 passed, 0 failed** (Verified in real browser).
- **Open Defects:** **0**.
- **Defect Logs:** See [TEST_RESULTS.md](file:///c:/Users/HEMANTH/Documents/SDETintern/TEST_RESULTS.md) for detailed analysis of development-time defect resolutions.

---

## 19. Known Limitations
- Application is client-side only; refreshing the browser resets cart state (by design for this hackathon evaluation).
- Product catalog is fixed to exactly two synthetic items to enable deterministic test assertions.

---

## 20. Project Scope and Frontend-Only Architecture
Per the hackathon specification:
- Strictly **no backend**, **no database**, **no external APIs**, and **no mock network calls**.
- All state transitions and order references are computed client-side.
- Zero tracking or telemetry.
