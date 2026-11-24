# CartFlow 4.0 — Master Test Plan
> **Document Reference:** CF-QA-TP-2026-V4  
> **Author:** Senior SDET & QA Automation Lead  
> **Status:** APPROVED & EXECUTED  
> **Baseline Commit:** `52eca15` | **Release Branch:** `feature/cartflow-4-multi-collection`  
> **Total Test Scenarios:** 73 Automated Playwright Tests (100% Deterministic)

---

## 1. Scope & Objectives
The CartFlow 4.0 Master Test Plan establishes the comprehensive verification framework for the multi-collection e-commerce marketplace and automated browser testing suite. The primary objective is to guarantee 100% adherence to competition specifications and expanded marketplace capabilities:
- **Mathematical Accuracy:** Pure integer financial arithmetic for all 30 products ($P \in [349, 3499]$) with zero floating-point accumulation.
- **Concurrency & Race-Condition Immunity:** Synchronous `useRef` submission locking preventing duplicate order references.
- **Full Customer Accessibility:** WCAG 2.1 AA semantic structure, keyboard navigation, skip links, and ARIA combobox pattern.
- **Multi-Collection Marketplace Scalability:** 30 synthetic products across 6 curated collections with local vector artwork.
- **Resilient Multi-Page Navigation:** 12 primary routes and 4 legacy aliases with zero 404s on hard reload.
- **Persistent State Management:** Cart and wishlist persistence across routes, reloads, and sessions.

---

## 2. Test Environment & Configurations
- **Operating System:** Windows 11 Enterprise (64-bit)
- **Node Environment:** Node.js v24.16.0 / npm 11.13.0
- **Test Runner:** Playwright 1.49.1 (TypeScript test runner, single-worker deterministic mode)
- **Browsers Evaluated:**
  - **Chromium / Google Chrome:** Fully verified (73/73 tests passing).
  - **Microsoft Edge:** Fully verified (channel: `msedge`).
  - **Mozilla Firefox & WebKit:** Bounded by local environment (executables not installed in local sandbox; documented per guidelines).
- **Target Responsive Viewports:**
  - Desktop: $1440 \times 900$, $1280 \times 800$
  - Tablet: $768 \times 1024$
  - Mobile: $375 \times 812$, $390 \times 844$

---

## 3. Test Suites & Strategy Breakdown

### A. Mandatory Challenge Scenarios (`tests/e2e/checkout.spec.ts`) — 4 Tests
| ID | Scenario Title | Objective | Target Assertion |
|:---:|---|---|---|
| **MAND-01** | Successful Checkout | Verify valid checkout produces visible confirmation | Exactly 1 confirmation view; reference matches `CF-YYYYMMDD-XXXX`; name matches input; total settled. |
| **MAND-02A** | Missing Customer Name | Verify empty name blocks submission | Validation alert displayed; no order created; cart preserved. |
| **MAND-02B** | Whitespace-Only Name | Verify whitespace strings are rejected | Input preserved; submission blocked with visible alert. |
| **MAND-03** | Quantity Calculations | Verify changing quantity updates line and order totals | $1 \times 1499 = 1499 \rightarrow 2 \times 1499 = 2998$; order total updates synchronously. |

### B. High-Value Checkout & Regression (`tests/e2e/checkout.spec.ts`) — 10 Tests
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

### C. Discovery, Wishlist & Categories (`tests/e2e/discovery.spec.ts`) — 19 Tests
- **SEARCH-01 to SEARCH-06:** Product name matching, department search, case-insensitivity, no-results state, clear button, autocomplete keyboard selection.
- **WISH-01 to WISH-05:** Wishlist badge count, removal, duplicate suppression, page reload persistence, move-to-bag.
- **CAT-01 to CAT-04:** Category directory listing, slug filtering, invalid slug fallback, breadcrumb navigation.
- **EXP-01 to EXP-04:** Multi-parameter query engine, sorting (price asc/desc), filter reset, responsive layout.

### D. Accessibility & Semantic HTML (`tests/e2e/accessibility.spec.ts`) — 7 Tests
- **A11Y-01:** Skip-to-main-content link becomes visible on keyboard focus and shifts focus.
- **A11Y-02:** Heading hierarchy contains valid H1 on all primary customer routes.
- **A11Y-03:** Search input implements WAI-ARIA combobox pattern.
- **A11Y-04:** Quantity steppers expose explicit accessible names and live boundary feedback.
- **A11Y-05:** Checkout form validation errors expose `role="alert"` and polite screen-reader announcements.
- **A11Y-06:** Color contrast and interactive focus ring visibility.
- **A11Y-07:** Full keyboard-only checkout navigation.

### E. Product Detail Pages (`tests/e2e/pdp.spec.ts`) — 7 Tests
- **PDP-01:** Dynamic route loading and metadata rendering.
- **PDP-02:** Quantity stepper bounds ($1 \le Q \le 10$) and synchronous line price recalculation.
- **PDP-03:** Add-to-bag workflow with cart drawer slide-over and optimistic confirmation.
- **PDP-04:** Wishlist toggle and live counter synchronization.
- **PDP-05:** Related product recommendation navigation.
- **PDP-06:** Demonstration feedback section with factual non-commercial disclaimers.
- **PDP-07:** Invalid product ID graceful 404 fallback.

### F. Quality Engineering & Edge Cases (`tests/e2e/quality-engineering.spec.ts`) — 9 Tests
- **QE-01 to QE-09:** Rapid route toggling, local storage corruption tolerance, extreme input stress testing, viewport reflow, memory leak prevention, offline readiness.

### G. CartFlow 4.0 Multi-Collection Marketplace Suite (`tests/e2e/marketplace-v4.spec.ts`) — 17 Tests
- **V4-01:** Exactly 30 products appear in the marketplace catalogue.
- **V4-02:** All six collections load with dynamically derived product counts.
- **V4-03:** Individual collection pages display accurate products and within-collection search.
- **V4-04:** Multi-attribute global search returns matching results.
- **V4-05:** Search with no results displays empty state and reset button.
- **V4-06:** Price range filters accurately filter catalogue.
- **V4-07:** Sorting alphabetically and by newest orders products correctly.
- **V4-08:** Product detail routes load correctly with specifications and artwork.
- **V4-09:** Any catalogue product can be added to the shopping bag.
- **V4-10:** Multi-item cart quantity calculations and integer line totals.
- **V4-11:** Wishlist state persists across page reload for new items.
- **V4-12:** Cart state persists across page reload.
- **V4-13:** Checkout validation blocks submission without customer name.
- **V4-14:** Concurrency double-click protection blocks duplicate order creation.
- **V4-15:** Order confirmation displays purchased items, quantities, and correct integer total.
- **V4-16:** Mobile viewport navigation drawer operates cleanly.
- **V4-17:** Direct route refresh works without 404 or white screen across marketplace routes.

---

## 4. Test Suite Summary Matrix

| Suite File | Scope | Tests | Target Pass Rate |
| :--- | :--- | :---: | :---: |
| `tests/e2e/checkout.spec.ts` | Mandatory & Core Checkout Regression | 14 | 100% |
| `tests/e2e/discovery.spec.ts` | Global Search, Wishlist & Categories | 19 | 100% |
| `tests/e2e/accessibility.spec.ts` | WCAG 2.1 AA & Keyboard Navigation | 7 | 100% |
| `tests/e2e/pdp.spec.ts` | Product Detail Pages & Recommendations | 7 | 100% |
| `tests/e2e/quality-engineering.spec.ts` | Concurrency, Storage & Edge Cases | 9 | 100% |
| `tests/e2e/marketplace-v4.spec.ts` | CartFlow 4.0 Multi-Collection Verification | 17 | 100% |
| **Total Automated Coverage** | **Complete CartFlow 4.0 Platform** | **73** | **100%** |
