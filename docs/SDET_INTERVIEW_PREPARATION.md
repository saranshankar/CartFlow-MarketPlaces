# CartFlow 3.0 — SDET Technical Interview Preparation
> **Document Reference:** CF-SDET-INT-2026-V5  
> **Purpose:** Deep-Dive Technical Q&A Based on Actual Project Implementation

---

### Q1: Explain the CartFlow 3.0 Architecture.
**Answer:** CartFlow 3.0 is a client-side single-page application built on React 18, TypeScript (strict mode), Vite, Tailwind CSS, and React Router v6. It features unidirectional state management via `CartContext` and `WishlistContext`. The application architecture separates domain calculations (`utils/calculations.ts`) from presentation components. State persistence is handled through fault-tolerant `localStorage` synchronization with defensive type-sanitization. The presentation layer implements the **Meridian Modern Marketplace** design system (`#0F1E36` Meridian Navy, `#00A3C4` Electric Cyan, `#10B981` Emerald, `#F8FAFC` Canvas) with local vector illustrations.

---

### Q2: Why did you choose Playwright over Cypress or Selenium?
**Answer:** Playwright was chosen for several technical advantages:
1. **Auto-Waiting Engine:** Playwright automatically waits for elements to be actionable (visible, enabled, stable) before executing clicks or fills, eliminating arbitrary sleep calls (`page.waitForTimeout(3000)`).
2. **Native Multi-Tab & Multi-Browser Support:** Directly automates Chromium, Microsoft Edge, Firefox, and WebKit through devtools protocols without needing separate WebDriver binaries.
3. **Trace Viewer & Failure Artifacts:** Produces complete execution traces with DOM snapshots, console logs, and network call graphs on failure (`trace: 'retain-on-failure'`).
4. **Fast Parallel Execution:** Leverages worker processes for fast headless execution without browser memory leaks.

---

### Q3: How does the Page Object Model (POM) work in this project?
**Answer:** We implemented [`CartFlowPage.ts`](file:///c:/Users/HEMANTH/Documents/SDETintern/tests/e2e/pages/CartFlowPage.ts) in `tests/e2e/pages/`. It centralizes all DOM locators (using customer-facing roles like `getByRole('button', { name: ... })` and resilient `getByTestId(...)`) and reusable business actions (`addHeadphones()`, `enterCustomerName()`, `placeOrder()`). Crucially, action methods do not hide assertions; they perform atomic user actions, allowing individual test specifications to make explicit, granular web-first assertions. This prevents test coupling and makes refactoring UI changes effortless.

---

### Q4: How do you prevent duplicate checkout submissions from rapid double-clicks?
**Answer:** In React, state updates via `useState` are asynchronous and batched. If a customer clicks "Place Order" twice in rapid succession (e.g. within 50ms), both clicks fire before React triggers a re-render to disable the button. We solved this with a synchronous reference lock using React's `useRef`:
```typescript
const isSubmittingRef = useRef<boolean>(false);

const submitOrder = (customerName: string): boolean => {
  if (isSubmittingRef.current) return false; // Synchronously drops concurrent click
  isSubmittingRef.current = true;
  setIsSubmitting(true);
  // ... process single order ...
  isSubmittingRef.current = false;
  setIsSubmitting(false);
  return true;
};
```
Because `useRef.current` updates synchronously in memory, the second click is intercepted and dropped immediately before any subsequent processing.

---

### Q5: How do you test quantity calculations and avoid floating-point errors?
**Answer:** Floating-point arithmetic in JavaScript (`0.1 + 0.2 = 0.30000000000000004`) frequently introduces rounding bugs in e-commerce apps. In `utils/calculations.ts`, we enforce integer arithmetic by converting prices and quantities using `Math.round(unitPrice)` and `Math.floor(quantity)`. In Playwright (`checkout.spec.ts` Mandatory 3 and `pdp.spec.ts` PDP-04), we test stepper increments step-by-step and assert exact displayed rupee strings (`toHaveText('₹1,499')` $\rightarrow$ `toHaveText('₹2,998')` $\rightarrow$ `toHaveText('₹4,497')`), validating that line totals and order totals match with zero precision drift.

---

### Q6: How do you handle localStorage persistence and test it?
**Answer:** State changes in `CartContext` and `WishlistContext` trigger `useEffect` hooks that serialize data to `localStorage`. On application boot, state initializers parse stored data. We implemented defensive sanitizers in `CartContext.tsx` (`Array.isArray(parsed)` and property validation) so corrupted or non-array payloads in `localStorage` do not crash the app. We test persistence in Playwright via `QE-03` and `QE-07`: items are added, `page.reload()` is invoked, and we verify that the cart badge and item subtotals persist accurately.

---

### Q7: How do you test negative scenarios?
**Answer:** We deliberately exercise failure boundaries:
1. **Empty Cart Checkout:** Navigating to `/checkout` with 0 items, clicking "Place Order", and asserting `cart-error` alert (`REG-01`).
2. **Missing Customer Name:** Submitting with empty or whitespace-only strings, asserting that submission is blocked, validation alerts appear, and user input is preserved (`Mandatory 2A`, `Mandatory 2B`).
3. **Invalid Product Route:** Navigating to `/product/unknown-sku` and asserting `invalid-product-state` with a return link (`PDP-07`).
4. **Corrupted Storage:** Injecting non-array JSON into `localStorage` and asserting graceful fallback to clean state (`QE-07`).

---

### Q8: How do you identify and eliminate flaky tests?
**Answer:**
1. **Eliminate Arbitrary Sleeps:** Never use `page.waitForTimeout()`. Rely on Playwright's auto-retrying assertions (`await expect(locator).toBeVisible()`).
2. **State Isolation:** Purge `localStorage` in `test.beforeEach` to prevent cross-test contamination.
3. **Prevent Port Contention:** Avoid redundant multiple navigations inside setup hooks.
4. **Retries on Failure:** Use Playwright trace captures (`trace: 'retain-on-failure'`) to inspect DOM snapshots, console logs, and action logs on the exact millisecond a failure occurs.

---

### Q9: How do you balance test IDs and semantic locators?
**Answer:** We follow the Testing Library guiding principle: *Test your software the way customers use it.*
- We prioritize semantic roles and labels: `getByRole('button', { name: /Add Aero Wireless/i })`, `getByLabel(/Customer Name/i)`.
- We use `data-testid` strategically where semantic queries would be ambiguous, duplicate, or subject to microcopy changes (e.g., `order-total`, `cart-badge`, `pdp-qty-value`).
- We avoid brittle CSS class names (e.g. `.bg-meridian-900`) and arbitrary XPath selectors.

---

### Q10: How do you validate responsive layouts?
**Answer:** We created an automated viewport auditor ([`scripts/audit-ui-ux.mjs`](file:///c:/Users/HEMANTH/Documents/SDETintern/scripts/audit-ui-ux.mjs)) that visits all 13 routes across 5 viewport configurations ($1440 \times 900$, $1280 \times 800$, $768 \times 1024$, $375 \times 812$, $390 \times 844$). The script programmatically evaluates `document.documentElement.scrollWidth > clientWidth` to guarantee zero horizontal overflow, audits broken images, and verifies that the persistent mobile bottom bar does not overlap content via `pb-16 md:pb-0`.

---

### Q11: How do you approach accessibility (a11y) testing?
**Answer:** We approach accessibility through both static structure and automated browser tests:
1. **Bypass Blocks (WCAG 2.4.1):** Implemented a visible "Skip to main content" link verified via keyboard Tab navigation in `A11Y-01`.
2. **Combobox ARIA (WCAG 4.1.2):** Implemented `role="combobox"`, `aria-autocomplete="list"`, and synchronized `aria-expanded` in `SearchBar.tsx`, verified in `A11Y-03`.
3. **Modal Dialogs (WCAG 2.1.2):** Slide-over drawer dialog verified for `role="dialog"`, `aria-modal="true"`, and Escape-key dismissal in `A11Y-07`.
4. **Form Labels & Alerts:** Inputs linked via `htmlFor`/`id`, `aria-invalid`, and `aria-describedby` to `role="alert"` validation messages in `A11Y-05`.
5. **Live Regions (WCAG 4.1.3):** Polite live region announces shopping bag updates and order confirmation references in `A11Y-06`.

---

### Q12: What is your overall test strategy?
**Answer:** Our test strategy employs the standard Test Pyramid:
- **Unit / Static Layer:** Strict TypeScript compiler checks (`tsc --noEmit`) and ESLint rules enforcing hooks safety and code quality.
- **Integration / Utility Layer:** Pure unit calculations for line totals and order totals.
- **End-to-End Layer:** 56 Playwright browser scenarios simulating authentic customer journeys (Checkout, Discovery, Wishlist, PDP, Accessibility, Quality Engineering).
- **Manual Exploratory Pass:** Verified manual test scripts for empty-cart checkout (M01), rapid double-clicks (M02), and cross-device screenshots.

---

### Q13: What genuine defects did you discover and resolve during testing?
**Answer:**
1. *Socket Contention:* Duplicate navigation in `discovery.spec.ts` `beforeEach` caused local server latency; resolved by pruning redundant calls.
2. *Modal Backdrop Pointer Interception:* Slide-over cart drawer opening on PDP additions intercepted subsequent clicks; resolved by asserting drawer state directly.
3. *Combobox ARIA Desync:* `aria-expanded` evaluated to true when query suggestions were empty; resolved by synchronizing with suggestion existence.
4. *Corrupted LocalStorage Vulnerability:* Malformed non-array payloads in `localStorage` could crash the app; resolved by adding defensive `Array.isArray()` sanitizers.
5. *WCAG Skip Link Absence:* Missing skip navigation link; resolved by adding an accessible `#main-content` bypass link.

---

### Q14: What are the intentional architectural limitations of this application?
**Answer:**
1. **Client-Side Only Scope:** Per challenge specification, there is no remote SQL database, backend API, or live payment processor. All orders and state exist in browser memory and `localStorage`.
2. **Synthetic Two-Product Catalog:** The catalog is strictly constrained to 2 items (Headphones ₹1,499 and Backpack ₹999) to maintain evaluation fidelity without inventing unverified inventory.
3. **Browser Engine Environment:** Automated tests run against Chromium (Google Chrome) and Microsoft Edge. Firefox and WebKit binaries were absent from the Windows evaluation sandbox and are documented transparently.

---

### Q15: What would you improve next if given more time?
**Answer:**
1. **Mock Service Worker (MSW):** Integrate MSW to simulate network latencies, HTTP 500 error responses, and offline connectivity transitions.
2. **Axe-Core Automated Scanning:** Integrate `@axe-core/playwright` to run continuous WCAG violation audits on every page transition.
3. **Visual Regression Testing:** Implement Playwright visual screenshot comparisons (`toHaveScreenshot()`) with strict pixel-diff thresholds.
4. **CI/CD Pipeline:** Package tests into GitHub Actions workflow matrix executing cross-platform on Ubuntu, macOS, and Windows runners.
