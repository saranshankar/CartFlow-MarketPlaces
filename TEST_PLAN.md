# CartFlow 2.0 – Comprehensive Risk-Based Test Plan
**Project:** CartFlow – Mini Checkout and Browser Test Suite (CartFlow 2.0)  
**Author:** Senior SDET / QA Automation Engineer  
**Document Version:** 2.0.0  
**Status:** Approved & Executed (100% Pass Rate across 14 Automated + 2 Manual Tests)

---

## 1. Project Overview & Testing Objectives

CartFlow 2.0 is a competition-grade client-side e-commerce mini checkout application and automated test suite. The project models an editorial luxury commerce brand (*Warm Editorial Luxury + Modern Organic Minimalism*) across a full multi-page architecture (`/`, `/shop`, `/cart`, `/checkout`, `/confirmation`).

### Primary Quality Objectives:
1. **Mathematical Precision:** Validate that unit price, quantity steppers, line totals, and order totals are calculated using pure integer arithmetic with strictly zero floating-point imprecision and zero unauthorized fees, delivery charges, or taxes.
2. **Defensive Validation & Data Integrity:** Guarantee that empty carts, blank customer names, and whitespace-only strings are rejected with accessible alerts, while preserving user-entered data across validation events.
3. **Double-Click & Race Condition Prevention:** Validate that a synchronous submission lock (`useRef`) prevents duplicate order generation, duplicate references, and re-submission from the confirmation screen.
4. **State Persistence Across Multi-Page Routes:** Verify that shopping bag contents, line totals, and customer details persist across route navigations (`/` $\leftrightarrow$ `/shop` $\leftrightarrow$ `/cart` $\leftrightarrow$ `/checkout`) and browser page reloads via `localStorage`.
5. **Deterministic Automation:** Provide a robust Playwright suite with 100% semantic locators and zero arbitrary sleeps (`waitForTimeout` banned).

---

## 2. Scope Matrix

### In Scope:
- **Synthetic Product Catalog:** Exactly two fixed-price items: Aero Wireless Headphones @ ₹1,499 and Urban Everyday Backpack @ ₹999.
- **Multi-Page Route Navigation:**
  - `/` (Editorial Landing Page)
  - `/shop` (Curated Collection Catalogue)
  - `/cart` (Full-Page Shopping Bag)
  - `/checkout` (Two-Column Luxury Checkout)
  - `/confirmation` (Order Receipt Confirmation)
- **Cart Operations:** Add product, duplicate add (increments quantity without row duplication), quantity steppers (clamped $\ge 1$, decrement disabled at 1), item removal, empty cart transition.
- **Drawer Interaction:** Quick slide-over bag drawer (`CartDrawer`) with backdrop blur, keyboard escape dismiss, and automatic dismissal on route changes.
- **Financial Calculations:**
  $$\text{LineTotal} = \text{UnitPrice} \times \text{Qty}$$
  $$\text{OrderTotal} = \sum \text{LineTotals}$$
  - Formatted using `Intl.NumberFormat('en-IN')` in Indian Rupee format (`₹X,XXX`). Strictly zero taxes, delivery charges, discounts, or hidden fees.
- **Customer Form Validation:** Single required Customer Name field; blank input blocked; whitespace-only blocked; customer text strictly preserved on validation errors.
- **Order Processing & Prevention of Race Conditions:** Synchronous `useRef` lock preventing duplicate submissions from rapid double-clicks.
- **Order Confirmation:** Unique alphanumeric order reference (`CF-YYYYMMDD-XXXX`), customer name, itemized breakdown, and clean reset workflow.
- **Automated Browser Testing:** 14 Playwright tests (4 Mandatory scenarios + 10 High-Value Regression scenarios).
- **Manual Quality Assurance:** M01 (Empty cart checkout) and M02 (Rapid double-click protection) with full visual evidence.

### Out of Scope:
- External backend services, REST/GraphQL APIs, databases, or cloud servers (100% pure client-side state).
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
| **Client Routing** | React Router DOM 6.28.0 |
| **Styling Engine** | Tailwind CSS 3.4.16 (Warm Editorial Luxury Theme) |
| **Automation Framework** | Playwright 1.49.1 (`@playwright/test`) |
| **Browser Engine** | Google Chrome (Chromium Channel) |
| **Base URL** | `http://localhost:5173` (Dev) / `http://localhost:4173` (Preview) |

---

## 4. Functional Risk Register & Priority Ranking

| Priority | Risk Category | Risk Description | Severity | Likelihood | Mitigation & Test Strategy |
|---|---|---|---|---|---|
| **P1** | **Incorrect Monetary Calculations** | Floating point representation errors (`0.1 + 0.2`) or stale totals during rapid stepper clicks. | Critical | High | Pure integer arithmetic (`Math.round`), `Intl.NumberFormat`, and reactive derived state in `useCartContext`. Verified in Mandatory 3 & Regression REG-02. |
| **P2** | **Duplicate Order Submission** | Rapid double-clicking on "Place Order" creates multiple orders or duplicate references. | Critical | High | Synchronous submission lock (`isSubmittingRef = useRef<boolean>(false)`) engages immediately before React re-render. Verified in Mandatory 1, REG-06, and Manual M02. |
| **P3** | **Invalid Checkout Validation** | Submitting blank or whitespace-only customer name creates order or wipes entered text. | High | High | `validateCheckout` trims string, emits accessible `role="alert"`, and preserves controlled input. Verified in Mandatory 2A, 2B, and REG-07. |
| **P4** | **Empty Cart Handling** | Submitting checkout with 0 items displays success or corrupts application state. | High | Medium | Dual-layer guard: empty cart validation alert + state machine `EMPTY_CART` status. Verified in REG-01 and Manual M01. |
| **P5** | **Cart Quantity & Removal Errors** | Decrementing below 1, negative quantities, or inability to remove last item. | Medium | Medium | Stepper hardware clamp (`disabled` at qty 1) + dedicated remove action. Verified in REG-03 and REG-04. |
| **P6** | **State Loss Across Routes** | Navigating between `/shop`, `/cart`, and `/checkout` loses selected products. | High | Medium | Dual-layer persistence via React Context + synchronized `localStorage`. Verified in REG-09 and REG-10. |
| **P7** | **Order Confirmation Integrity** | Non-unique reference or mismatched customer name / line item receipt. | Medium | Low | Timestamp + crypto suffix (`CF-YYYYMMDD-XXXX`), atomic immutable `Order` object snapshot. Verified in Mandatory 1 and REG-08. |

---

## 5. Comprehensive Test Scenarios Matrix (14 Automated + 2 Manual)

| Scenario ID | Test Title | Priority | Scope | Expected Result | Status |
|---|---|---|---|---|---|
| **M-01** | Mandatory 1: Successful Checkout Flow | P1/P2/P7 | Automated | Exactly 1 confirmation view; customer name, ref `CF-YYYYMMDD-XXXX`, and ₹1,499 visible | **PASS** |
| **M-02A** | Mandatory 2A: Missing Customer Name | P3 | Automated | Error "Please enter your name." visible; no confirmation; cart preserved | **PASS** |
| **M-02B** | Mandatory 2B: Whitespace Customer Name | P3 | Automated | Error "whitespace" visible; entered spaces preserved in input | **PASS** |
| **M-03** | Mandatory 3: Exact Quantity Calculation | P1 | Automated | Line totals: ₹2,998, ₹999; Order totals: ₹3,997, ₹2,498. Pure integer math. | **PASS** |
| **REG-01** | Empty Cart Checkout Blocked | P4 | Automated | Visible alert "Your cart is empty"; order not placed | **PASS** |
| **REG-02** | Product Removal Recalculates Total | P5 | Automated | Removing backpack updates order total to ₹1,499 immediately | **PASS** |
| **REG-03** | Decrement Bound at Minimum Qty 1 | P5 | Automated | Decrement button has `disabled` attribute; qty clamped at 1 | **PASS** |
| **REG-04** | Removing Last Product Shows Empty State | P5 | Automated | Removing single item renders empty cart state | **PASS** |
| **REG-05** | Duplicate Add Increments Quantity | P5 | Automated | Adding same product twice sets qty = 2 with exactly 1 row | **PASS** |
| **REG-06** | Rapid Double-Click Protection | P2 | Automated | Simultaneous clicks yield exactly 1 order confirmation | **PASS** |
| **REG-07** | Whitespace Trimming on Receipt | P3 | Automated | Input `"   Sneha Patel   "` rendered as `"Sneha Patel"` on receipt | **PASS** |
| **REG-08** | Order Reset Workflow | P7 | Automated | "Start New Order" resets cart, customer name, and redirects to catalog | **PASS** |
| **REG-09** | Multi-Page Route Transitions | P6 | Automated | Seamless transitions between `/`, `/shop`, `/cart`, and `/checkout` | **PASS** |
| **REG-10** | Cart State Persistence Across Routes | P6 | Automated | Bag count, items, and totals remain intact across navigations | **PASS** |
| **MAN-01** | Test M01: Manual Empty Cart Checkout | P4 | Manual | Order blocked; error displayed; name preserved; app interactive | **PASS** |
| **MAN-02** | Test M02: Manual Rapid Double-Click | P2 | Manual | Exactly 1 confirmation; reference `CF-20261123-XXXX`; zero duplicates | **PASS** |
