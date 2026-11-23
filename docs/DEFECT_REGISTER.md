# CartFlow 3.0 — Defect Register & Resolution Log
> **Document Reference:** CF-SDET-DEF-2026-V5  
> **Evaluation Phase:** Phase 5 Final SDET Audit  
> **Defect Logging Standard:** IEEE 829 / ISO 29119 Reference

---

## 1. Defect Classification & Summary Matrix

| Defect ID | Title & Area | Severity | Detection Phase | Resolution Status | Verified By |
|:---:|---|:---:|:---:|:---:|:---:|
| **DEF-01** | Port Contention on Duplicate Search `beforeEach` Nav | **Medium** | Phase 4 Cross-Browser | **RESOLVED** | `discovery.spec.ts` (19/19 PASS) |
| **DEF-02** | Cart Drawer Modal Backdrop Pointer Interception | **Low** | Phase 3 PDP Automation | **RESOLVED** | `pdp.spec.ts:67` (PDP-05 PASS) |
| **DEF-03** | WAI-ARIA Combobox `aria-expanded` Boolean Desync | **Low** | Phase 4 Accessibility | **RESOLVED** | `accessibility.spec.ts:42` (A11Y-03 PASS) |
| **DEF-04** | Corrupted Non-Array `localStorage` Schema Crash | **Medium** | Phase 5 Exploratory | **RESOLVED** | `quality-engineering.spec.ts:143` (QE-07 PASS) |
| **DEF-05** | Missing Accessible "Skip to main content" Link | **Medium** | Phase 4 Accessibility | **RESOLVED** | `accessibility.spec.ts:9` (A11Y-01 PASS) |

---

## 2. Detailed Defect Reports

### Defect DEF-01: Port Contention on Redundant Search Navigation
- **Description:** `tests/e2e/discovery.spec.ts` executed two consecutive `await page.goto('/')` calls within `beforeEach`, occasionally inducing local Vite dev server socket contention under rapid parallel test runs.
- **Reproduction Steps:**
  1. Launch full Playwright test runner.
  2. Execute `discovery.spec.ts` under high system CPU load.
  3. Observe occasional timeout in `beforeEach` hook.
- **Expected Behavior:** Tests should navigate once to establish origin, execute state cleanup, and proceed directly to test execution in $<1\text{s}$.
- **Actual Behavior:** Redundant second navigation triggered duplicate HTTP handshake.
- **Severity:** Medium
- **Resolution:** Removed the redundant second navigation. Average execution dropped to 980ms per test.

### Defect DEF-02: Slide-Over Cart Drawer Backdrop Pointer Interception
- **Description:** Adding multi-unit items from the Product Detail Page automatically opened the quick-cart slide-over drawer as designed. However, automated tests attempting to click the background header cart icon were intercepted by the drawer's modal overlay.
- **Reproduction Steps:**
  1. Open `/product/prod-aero-headphones`.
  2. Click `[data-testid="pdp-add-to-cart"]`.
  3. Attempt to click `[data-testid="header-cart-button"]` without dismissing the open drawer.
- **Expected Behavior:** Cart drawer opens seamlessly; test assertions check the active drawer directly.
- **Actual Behavior:** Playwright actionability check flagged pointer event interception from modal overlay.
- **Severity:** Low
- **Resolution:** Updated test assertions to inspect the immediately opened drawer subtotal directly.

### Defect DEF-03: WAI-ARIA Combobox `aria-expanded` Boolean Desync
- **Description:** The search input reflected `aria-expanded={isOpen}` even when query suggestions were empty, violating the WAI-ARIA 1.2 Combobox specification.
- **Reproduction Steps:**
  1. Focus search input.
  2. Observe `aria-expanded` attribute before typing any characters.
- **Expected Behavior:** `aria-expanded="true"` only when popup suggestion list is populated and visible in DOM.
- **Actual Behavior:** Attribute evaluated to `"true"` on focus prior to typing query.
- **Severity:** Low
- **Resolution:** Bound `aria-expanded={Boolean(isOpen && query.trim().length > 0)}`.

### Defect DEF-04: Corrupted Non-Array `localStorage` Schema Crash
- **Description:** `CartContext.tsx` used `JSON.parse(stored)` directly without validating whether the parsed output was an array. Malformed non-array payloads (e.g. `{"corrupt": true}`) caused runtime crashes during `.reduce()` or `.filter()`.
- **Reproduction Steps:**
  1. In browser console, execute: `localStorage.setItem('cartflow_items', '{"bad": "data"}');`
  2. Reload page.
  3. App crashed with `items.reduce is not a function`.
- **Expected Behavior:** Corrupted data should be rejected and reset to clean `[]`.
- **Actual Behavior:** Uncaught TypeError halted application rendering.
- **Severity:** Medium
- **Resolution:** Added defensive `Array.isArray()` and item structure sanitization in `CartContext.tsx`. Verified via automated scenario `QE-07`.

### Defect DEF-05: Missing Accessible "Skip to main content" Link
- **Description:** Keyboard and screen-reader users could not bypass top navigation landmarks to access primary page content, failing WCAG 2.4.1 Bypass Blocks.
- **Reproduction Steps:**
  1. Open application.
  2. Press Tab key.
  3. Focus remained trapped in top utility navigation links.
- **Expected Behavior:** First Tab press focuses a prominent "Skip to main content" link that immediately shifts focus to `<main id="main-content">`.
- **Actual Behavior:** No skip link was present in DOM.
- **Severity:** Medium
- **Resolution:** Implemented skip link in `App.tsx` and verified via automated scenario `A11Y-01`.

---

## 3. Residual Defect Status
- **Critical Defects:** 0
- **High Severity Defects:** 0
- **Medium Severity Defects:** 0 (all 3 resolved)
- **Low Severity Defects:** 0 (all 2 resolved)
- **Net Outstanding Defect Count:** **0**
