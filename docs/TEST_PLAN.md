# CartFlow 3.0 — Master Test Plan
> **Document Reference:** CF-QA-TP-2026-V3  
> **Author:** Senior SDET & QA Automation Lead  
> **Status:** APPROVED & EXECUTED  
> **Baseline Commit:** `5582f51`

---

## 1. Scope & Objectives
The CartFlow 3.0 Master Test Plan establishes the verification framework for the client-side e-commerce platform and automated browser testing suite. The primary objective is to guarantee 100% adherence to competition specifications:
- Uncompromising mathematical accuracy (pure integer financial arithmetic).
- Concurrency and race-condition immunity (synchronous submission locking).
- Full customer accessibility (WCAG 2.1 AA semantic structure).
- Resilient multi-page navigation and persistent cart/wishlist state.

---

## 2. Test Environment & Configurations
- **Operating System:** Windows 11 Enterprise (64-bit)
- **Node Environment:** Node.js v24.16.0 / npm 11.13.0
- **Test Runner:** Playwright 1.49.1 (TypeScript test runner)
- **Browsers Evaluated:**
  - **Chromium / Google Chrome:** Fully verified (55/55 tests passing).
  - **Microsoft Edge:** Fully verified (channel: `msedge`).
  - **Mozilla Firefox & WebKit:** Bounded by local environment (executables not installed in sandbox; documented per guidelines).
- **Target Responsive Viewports:**
  - Desktop: $1440 \times 900$, $1280 \times 800$
  - Tablet: $768 \times 1024$
  - Mobile: $375 \times 812$, $390 \times 844$

---

## 3. Test Suites & Strategy Breakdown

### A. Mandatory Challenge Scenarios (`tests/e2e/checkout.spec.ts`)
| ID | Scenario Title | Objective | Target Assertion |
|:---:|---|---|---|
| **MAND-01** | Successful Checkout | Verify valid checkout produces visible confirmation | Exactly 1 confirmation view; reference matches `CF-YYYYMMDD-XXXX`; name matches input; total settled. |
| **MAND-02A** | Missing Customer Name | Verify empty name blocks submission | Validation alert displayed; no order created; cart preserved. |
| **MAND-02B** | Whitespace-Only Name | Verify whitespace strings are rejected | Input preserved; submission blocked with visible alert. |
| **MAND-03** | Quantity Calculations | Verify changing quantity updates line and order totals | $1 \times 1499 = 1499 \rightarrow 2 \times 1499 = 2998$; order total updates synchronously. |

### B. High-Value Checkout & Multi-Page Regression (`tests/e2e/checkout.spec.ts`)
| ID | Scenario Title | Objective | Target Assertion |
|:---:|---|---|---|
| **REG-01** | Empty Cart Checkout | Block checkout when cart is empty | Alert displayed; order not created. |
| **REG-02** | Product Removal | Recalculate totals on line removal | Order total decreases by exact line total. |
| **REG-03** | Stepper Lower Bound | Prevent decrement below 1 | Decrement button is disabled at quantity 1. |
| **REG-04** | Empty Cart Transition | Show empty state when last item removed | Empty cart illustration and shop link visible. |
| **REG-05** | Duplicate Row Prevention | Adding same product increments quantity | Exactly 1 table row with quantity 2. |
| **REG-06** | Rapid Double-Click | Prevent duplicate order submissions | Exactly 1 order receipt created under concurrent clicks. |
| **REG-07** | Whitespace Trimming | Trim customer name on receipt | Receipt displays clean trimmed customer name. |
| **REG-08** | Order Reset Workflow | "Start New Order" resets application | Cart cleared, input reset, catalog restored. |
| **REG-09** | Multi-Page Transitions | Seamless navigation between pages | Correct URL routes and page headings rendered. |
| **REG-10** | Storage Persistence | Persist cart across navigation | Cart items retained across route switches. |

### C. Discovery, Wishlist & Categories (`tests/e2e/discovery.spec.ts`)
- **SEARCH-01 to SEARCH-06:** Product name matching, department search, case-insensitivity, no-results state, clear button, autocomplete keyboard selection.
- **WISH-01 to WISH-05:** Wishlist badge count, removal, duplicate suppression, page reload persistence, move-to-bag.
- **CAT-01 to CAT-04:** Category directory listing, slug filtering, invalid slug fallback, breadcrumb navigation.
- **EXP-01 to EXP-04:** Price sorting, department filtering chips, filter clearing, query parameter URL synchronization.

### D. Product Detail Pages (`tests/e2e/pdp.spec.ts`)
- **PDP-01 & PDP-02:** Direct SKU loading for Aero Headphones (₹1,499) and Urban Backpack (₹999).
- **PDP-03:** Breadcrumbs hierarchy (`Home` $\rightarrow$ `Categories` $\rightarrow$ `Department` $\rightarrow$ `Product`).
- **PDP-04:** Quantity stepper updates subtotal ($Q \times \text{Price}$).
- **PDP-05:** Multi-quantity "Add to Bag" updates cart badge and opens drawer.
- **PDP-06:** Wishlist toggle from PDP updates header badge.
- **PDP-07:** Invalid SKU fallback displays graceful empty state with return CTA.
- **PDP-08:** Demonstration feedback form allows submitting evaluation reviews.
- **PDP-09:** Navigation from catalog card opens corresponding PDP.

### E. Accessibility & Semantics (`tests/e2e/accessibility.spec.ts`)
- **A11Y-01:** "Skip to main content" link becomes visible on Tab focus and moves focus to `#main-content`.
- **A11Y-02:** Valid H1 heading present on all primary routes.
- **A11Y-03:** Search input implements WAI-ARIA combobox pattern.
- **A11Y-04:** All interactive buttons provide discernible accessible names.
- **A11Y-05:** Form labels and error alerts linked via `aria-describedby` and `aria-invalid`.
- **A11Y-06:** Screen-reader polite live announcement region is present.
- **A11Y-07:** Cart drawer dialog closes on Escape key press.

### F. Quality Engineering & Console Hygiene (`tests/e2e/quality-engineering.spec.ts`)
- **QE-01:** Zero console errors and unhandled exceptions across 11 routes.
- **QE-02:** Quantity maximum boundary ($Q \le 10$) disables stepper increment.
- **QE-03:** Cart state persists across browser page reloads.
- **QE-04:** Rapid repeated add-to-cart clicks increment count without corruption.
- **QE-05:** Empty and whitespace-only search queries navigate safely to explore catalog.
- **QE-06:** Route navigation maintains valid URL and header states.

---

## 4. Entry and Exit Criteria
- **Entry Criteria:**
  - TypeScript compilation passes with 0 errors (`npm run typecheck`).
  - ESLint passes with 0 errors and 0 warnings (`npm run lint`).
  - Production build compiles cleanly (`npm run build`).
- **Exit Criteria:**
  - 100% of automated Playwright test cases pass (55/55).
  - Manual QA scenarios M01 and M02 executed and verified with screenshot evidence.
  - Zero unhandled console errors or horizontal viewport overflow.
