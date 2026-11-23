# CartFlow – Comprehensive Risk-Based Test Plan
**Project:** CartFlow – Mini Checkout and Browser Test Suite  
**Author:** Senior SDET / QA Automation Engineer  
**Document Version:** 1.0.0  
**Status:** Approved & Executed (100% Pass Rate)

---

## 1. Project Overview & Testing Objectives

CartFlow is a competition-grade client-side e-commerce mini checkout application designed to evaluate precision financial arithmetic, input validation resilience, double-click protection, and end-to-end browser automation reliability using Playwright and TypeScript.

### Primary Objectives:
1. **Mathematical Precision:** Validate that unit price, quantity steppers, line totals, and order totals are calculated using pure integer arithmetic with strictly zero floating-point imprecision and zero unauthorized fees or taxes.
2. **Defensive Validation & Data Integrity:** Guarantee that empty carts, blank customer names, and whitespace-only strings are rejected with accessible alerts, while preserving user-entered data across validation events.
3. **Double-Click & Race Condition Prevention:** Validate that a synchronous submission lock (`useRef`) prevents duplicate order generation, duplicate references, and re-submission from the confirmation screen.
4. **Deterministic Automation:** Provide a robust Playwright suite with 100% semantic locators and zero arbitrary sleeps (`waitForTimeout` banned).

---

## 2. Scope Matrix

### In Scope:
- Synthetic product catalog (exactly two fixed-price items: Aero Wireless Headphones @ ₹1,499 and Urban Everyday Backpack @ ₹999).
- Cart mutations: add, duplicate add, quantity increment/decrement (clamped $\ge 1$), dedicated item removal, empty cart transition.
- Exact monetary calculations: $\text{LineTotal} = \text{UnitPrice} \times \text{Qty}$ and $\text{OrderTotal} = \sum \text{LineTotals}$ with `Intl.NumberFormat('en-IN')`.
- Checkout form validation (Customer Name required; whitespace rejected; data preserved).
- Synchronous double-click guard (`useRef`) and checkout state machine (`EMPTY_CART`, `CART_POPULATED`, `VALIDATION_FAILED`, `PROCESSING`, `ORDER_CONFIRMED`).
- Order confirmation view with unique reference (`CF-YYYYMMDD-XXXX`), customer name, itemized receipt, and settlement total.
- Automated browser testing (3 Mandatory Scenarios + 8 High-Value Regression Scenarios in Playwright).
- Manual test verification (M01 Empty Cart Checkout, M02 Rapid Double-Click).

### Out of Scope:
- External backend services, REST/GraphQL APIs, databases, or cloud persistence (100% pure client-side state).
- Real or simulated payment gateway processing, credit card fields, OTP, or CVV.
- Taxes, delivery charges, discounts, coupons, or promo codes (strictly zero fee policy).

---

## 3. Test Environment Baseline

| Parameter | Configuration |
|---|---|
| **Operating System** | Windows 11 Enterprise (x64) |
| **Node.js Runtime** | v24.16.0 |
| **Package Manager** | npm 11.13.0 |
| **Application Framework** | React 18.3.1 + TypeScript 5.6.3 + Vite 5.4.11 |
| **Styling Engine** | Tailwind CSS 3.4.16 (Midnight Indigo Commerce Theme) |
| **Automation Framework** | Playwright 1.49.1 (`@playwright/test`) |
| **Browser Engine** | Google Chrome (Chromium Channel) |
| **Base URL** | `http://localhost:5173` (Dev Server) / `http://localhost:4173` (Preview Server) |

---

## 4. Functional Risk Register & Priority Ranking

| Priority | Risk Category | Risk Description | Severity | Likelihood | Mitigation & Test Strategy |
|---|---|---|---|---|---|
| **P1** | **Incorrect Monetary Calculations** | Floating point representation errors (`0.1 + 0.2`) or stale totals during rapid stepper clicks. | Critical | High | Pure integer arithmetic (`Math.round`), `Intl.NumberFormat`, and reactive derived state in `useCart`. Verified in Mandatory Scenario 3 & Regression REG-02. |
| **P2** | **Duplicate Order Submission** | Rapid double-clicking on "Place Order" creates multiple orders or duplicate references. | Critical | High | Synchronous submission lock (`isSubmittingRef = useRef<boolean>(false)`) engages immediately before React re-render. Verified in Mandatory Scenario 1, Regression REG-06, and Manual M02. |
| **P3** | **Invalid Checkout Validation** | Submitting blank or whitespace-only customer name creates order or wipes entered text. | High | High | `validateCheckout` trims string, emits accessible `role="alert"`, and preserves controlled input. Verified in Mandatory Scenarios 2A, 2B, and REG-07. |
| **P4** | **Empty Cart Handling** | Submitting checkout with 0 items displays success or corrupts application state. | High | Medium | Dual-layer guard: empty cart validation alert + state machine `EMPTY_CART` status. Verified in Regression REG-01 and Manual M01. |
| **P5** | **Cart Quantity & Removal Errors** | Decrementing below 1, negative quantities, or inability to remove last item. | Medium | Medium | Stepper hardware clamp (`disabled` at qty 1) + dedicated remove action. Verified in REG-03 and REG-04. |
| **P6** | **Order Confirmation Correctness** | Non-unique reference or mismatched customer name / line item receipt. | Medium | Low | Timestamp + crypto suffix (`CF-YYYYMMDD-XXXX`), atomic immutable `Order` object snapshot. Verified in Mandatory Scenario 1 and REG-07. |
| **P7** | **Responsive & Accessibility Deficiencies** | Poor contrast, missing ARIA attributes, horizontal scroll on mobile. | Low | Low | WCAG 2.1 AA tokens, Inter typography, tabular numbers, fluid CSS Grid. Verified in automated visual audit. |

---

## 5. Comprehensive Test Scenarios Matrix

| Scenario ID | Test Title | Priority | Preconditions | Key Test Steps | Expected Result | Actual Result | Status | Evidence Reference |
|---|---|---|---|---|---|---|---|---|
| **M-01** | Mandatory 1: Successful Checkout Flow | P1/P6 | Clean page; catalog loaded | 1. Add Headphones<br>2. Fill name "Alex Morgan"<br>3. Place Order | Exactly 1 confirmation view; customer name, ref `CF-YYYYMMDD-XXXX`, and ₹1,499 visible | Single confirmation; reference `CF-20261123-XXXX`; ₹1,499 verified | **PASS** | `artifacts/screenshots/successful-checkout.png` |
| **M-02A** | Mandatory 2A: Missing Customer Name | P3 | Clean page; 1 item in cart | 1. Leave name empty<br>2. Place Order | Error "Please enter your name." visible; no confirmation; cart preserved | Visible alert displayed; cart items intact; on checkout page | **PASS** | `artifacts/screenshots/missing-name-validation.png` |
| **M-02B** | Mandatory 2B: Whitespace Customer Name | P3 | Clean page; 1 item in cart | 1. Enter `"     "`<br>2. Place Order | Error "whitespace" visible; entered spaces preserved in input | Alert displayed; input value `"     "` preserved | **PASS** | `evidence/phase3/mandatory-2b-whitespace-name.png` |
| **M-03** | Mandatory 3: Exact Quantity Calculation | P1 | Clean page | 1. Add Headphones (₹1,499)<br>2. Inc to 2 (₹2,998)<br>3. Add Backpack (₹999)<br>4. Assert ₹3,997<br>5. Dec to 1 (₹2,498) | All line totals and order totals match exact integer sum | Line totals: ₹2,998, ₹999; Order totals: ₹3,997, ₹2,498 | **PASS** | `artifacts/screenshots/quantity-update.png` |
| **REG-01** | Empty Cart Checkout Blocked | P4 | Clean page; cart empty | 1. Enter name "John Doe"<br>2. Place Order | Visible alert "Your cart is empty"; order not placed | Error alert visible; no order placed | **PASS** | Automated Playwright report |
| **REG-02** | Product Removal Recalculates Total | P5 | 2 products in cart | 1. Remove Backpack | Backpack removed; total drops to ₹1,499 | Item row unmounted; total updated | **PASS** | Automated Playwright report |
| **REG-03** | Decrement Bound at Minimum Qty 1 | P5 | 1 item in cart (qty 1) | 1. Inspect decrement btn<br>2. Attempt click | Decrement button has `disabled` attribute; qty remains 1 | Button disabled; qty clamped at 1 | **PASS** | Automated Playwright report |
| **REG-04** | Removing Last Product Shows Empty State | P5 | 1 item in cart | 1. Remove item | EmptyCart component renders | Empty cart message visible | **PASS** | Automated Playwright report |
| **REG-05** | Duplicate Add Increments Quantity | P5 | Clean page | 1. Click Add Headphones twice | 1 item row with quantity = 2; total ₹2,998 | 1 row present; qty = 2; total ₹2,998 | **PASS** | Automated Playwright report |
| **REG-06** | Rapid Double-Click Concurrency | P2 | 1 item; valid name | 1. Click Place Order twice rapidly | Exactly 1 confirmation; synchronous lock drops 2nd click | 1 confirmation generated; 0 duplicate orders | **PASS** | Automated Playwright report |
| **REG-07** | Whitespace Trimming on Receipt | P3 | 1 item in cart | 1. Enter `"   Sneha Patel   "`<br>2. Place Order | Confirmation shows trimmed `"Sneha Patel"` | Trimmed name rendered | **PASS** | Automated Playwright report |
| **REG-08** | Order Reset Restores Clean State | P6 | Order confirmed view | 1. Click "Start New Order" | View resets to catalog; cart empty; input cleared | Pristine baseline restored | **PASS** | Automated Playwright report |
| **MAN-01** | Manual Test M01: Empty Cart Checkout | P4 | Clean page; cart empty | 1. Enter "Jane Doe"<br>2. Place Order | Alert displayed; no confirmation; name preserved | Clear guidance displayed; application usable | **PASS** | `artifacts/screenshots/empty-cart-manual.png` |
| **MAN-02** | Manual Test M02: Rapid Double-Click | P2 | 1 item in cart | 1. Enter "Jane Doe"<br>2. Click Place Order twice | Exactly 1 confirmation; reference `CF-YYYYMMDD-XXXX` | 1 confirmation; reference `CF-20261123-F64D` | **PASS** | `artifacts/screenshots/rapid-double-click.png` |

---

## 6. Execution & Pass/Fail Criteria

- **Automated Execution:** 100% of the 12 Playwright test cases must pass without retries or skips.
- **Manual Execution:** Both manual scenarios (M01 & M02) must exhibit zero contradictory states and produce genuine screenshots.
- **Code Quality:** Zero TypeScript compilation errors (`tsc --noEmit`), zero ESLint warnings, zero horizontal overflow on mobile viewports.
- **Outcome:** All criteria satisfied. Suite is 100% passed.
