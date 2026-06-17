# SauceDemo Checkout QA Test Plan

## Scope Summary

This plan covers the end-to-end SauceDemo checkout workflow for authenticated and unauthenticated users, with Playwright-oriented scenarios spanning cart review, checkout information entry, overview validation, order completion, negative validation, navigation controls, browser back behavior, UI checks, and responsive coverage. Primary execution is expected across the existing `chromium`, `firefox`, and `webkit` Playwright projects, with responsive checks executed using mobile viewport emulation.

## Playwright Execution Notes

- Target environment: `https://www.saucedemo.com`
- Test credentials: `standard_user / secret_sauce`
- Baseline browser coverage: `chromium`, `firefox`, `webkit`
- Responsive coverage: run selected scenarios with mobile emulation such as `iPhone 12` or `Pixel 5`, since the current Playwright config only includes desktop browser projects
- Recommended test isolation: start each scenario from a fresh session or reset app state before execution

## Assumptions and Gaps

- SauceDemo does not display subtotal, tax, or total on the cart page. Those values appear on the checkout overview page only.
- SauceDemo does not implement payment method selection. The overview page displays fixed payment text: `SauceCard #31337`.
- SauceDemo clearly enforces only non-empty checkout fields using inline errors:
  - `Error: First Name is required`
  - `Error: Last Name is required`
  - `Error: Postal Code is required`
- The user story asks for invalid-data validation such as special characters or incomplete formats, but SauceDemo does not visibly expose richer format validation rules in the UI.
- The user story expects the cart to block checkout when empty, but SauceDemo still allows navigation from an empty cart to checkout step one.
- `Order confirmation should clear the cart` is supported by observed behavior: after finishing checkout, the cart badge is no longer shown.
- Browser back-button behavior should be validated separately from in-app `Cancel` buttons because both are supported by the product flow.

---

## Test Case ID: SD-CHK-001

**Description:** Verify successful checkout for a single item from login through order completion.

**Preconditions:**
- User is logged out
- No items are in the cart

**Test Steps:**
1. Navigate to `https://www.saucedemo.com`.
2. Log in with `standard_user` and `secret_sauce`.
3. Add `Sauce Labs Backpack` to the cart.
4. Open the cart.
5. Verify the cart contains the selected item.
6. Click `Checkout`.
7. Enter `Jane` in `First Name`.
8. Enter `Doe` in `Last Name`.
9. Enter `90210` in `Zip/Postal Code`.
10. Click `Continue`.
11. Review the overview page.
12. Click `Finish`.

**Expected Results:**
1. Login succeeds and the inventory page is displayed.
2. The cart badge shows `1` after adding the item.
3. The cart page shows:
   - Item name: `Sauce Labs Backpack`
   - Item description
   - Item price: `$29.99`
   - Quantity: `1`
4. The checkout information page is displayed with `First Name`, `Last Name`, and `Zip/Postal Code` fields.
5. The overview page is displayed with the selected item and summary details.
6. The completion page is displayed with:
   - Heading: `Thank you for your order!`
   - Confirmation message
   - `Back Home` button

**Priority:** High

---

## Test Case ID: SD-CHK-002

**Description:** Verify cart review page content and actions for a populated cart.

**Preconditions:**
- User is logged in
- At least one item has been added to the cart

**Test Steps:**
1. Open the cart page.
2. Review the cart contents.
3. Verify action buttons on the page.
4. Verify each item row presented in the cart.
5. Click `Continue Shopping`.
6. Return to the cart again.

**Expected Results:**
1. The page title area shows `Your Cart`.
2. The cart displays `QTY` and `Description` column headers.
3. Each cart item shows name, description, price, and quantity.
4. `Continue Shopping` and `Checkout` buttons are visible and enabled.
5. `Continue Shopping` returns the user to the inventory page.
6. Returning to the cart preserves cart contents.

**Priority:** High

---

## Test Case ID: SD-CHK-003

**Description:** Verify required-field validation when all checkout information fields are empty.

**Preconditions:**
- User is logged in
- At least one item is in the cart
- User is on `Checkout: Your Information`

**Test Steps:**
1. Leave `First Name`, `Last Name`, and `Zip/Postal Code` empty.
2. Click `Continue`.

**Expected Results:**
1. The user remains on `Checkout: Your Information`.
2. An inline error is displayed with exact text: `Error: First Name is required`.
3. Checkout does not proceed to the overview page.

**Priority:** High

---

## Test Case ID: SD-CHK-004

**Description:** Verify required-field validation sequence for partially completed checkout information.

**Preconditions:**
- User is logged in
- At least one item is in the cart
- User is on `Checkout: Your Information`

**Test Steps:**
1. Enter a valid `First Name` only.
2. Leave `Last Name` and `Zip/Postal Code` empty.
3. Click `Continue`.
4. Enter a valid `Last Name`.
5. Leave `Zip/Postal Code` empty.
6. Click `Continue`.

**Expected Results:**
1. After step 3, an inline error is displayed with exact text: `Error: Last Name is required`.
2. After step 6, an inline error is displayed with exact text: `Error: Postal Code is required`.
3. The user remains on the checkout information page until all required fields are populated.

**Priority:** High

---

## Test Case ID: SD-CHK-005

**Description:** Verify checkout overview page content, summary labels, and totals for a single-item order.

**Preconditions:**
- User is logged in
- At least one item is in the cart
- Valid checkout information has been entered
- User is on `Checkout: Overview`

**Test Steps:**
1. Review the item list on the overview page.
2. Review the summary section.
3. Verify the available action buttons.
4. Compare the displayed totals to the item price.

**Expected Results:**
1. The selected item appears with correct name, description, quantity, and price.
2. The overview shows:
   - `Payment Information:`
   - `SauceCard #31337`
   - `Shipping Information:`
   - `Free Pony Express Delivery!`
   - `Item total`
   - `Tax`
   - `Total`
3. `Cancel` and `Finish` buttons are visible and enabled.
4. For `Sauce Labs Backpack`, the displayed values are:
   - `Item total: $29.99`
   - `Tax: $2.40`
   - `Total: $32.39`

**Priority:** High

---

## Test Case ID: SD-CHK-006

**Description:** Verify order completion page content and post-order cart clearing.

**Preconditions:**
- User is logged in
- User is on `Checkout: Overview` with at least one item ready for purchase

**Test Steps:**
1. Click `Finish`.
2. Review the order confirmation page.
3. Verify the cart badge state.
4. Click `Back Home`.

**Expected Results:**
1. The completion page title area shows `Checkout: Complete!`.
2. The page shows the success header `Thank you for your order!`.
3. The page shows the dispatch confirmation message.
4. The `Back Home` button is visible and enabled.
5. No cart badge is shown after order completion.
6. `Back Home` returns the user to the inventory page.

**Priority:** High

---

## Test Case ID: SD-CHK-007

**Description:** Verify `Cancel` behavior from the checkout information page.

**Preconditions:**
- User is logged in
- User has at least one item in the cart
- User is on `Checkout: Your Information`

**Test Steps:**
1. Click `Cancel` without completing checkout.

**Expected Results:**
1. The user is returned to the cart page.
2. The cart contents remain intact.
3. No order is placed.

**Priority:** Medium

---

## Test Case ID: SD-CHK-008

**Description:** Verify `Cancel` behavior from the checkout overview page.

**Preconditions:**
- User is logged in
- User has at least one item in the cart
- Valid checkout information has been entered
- User is on `Checkout: Overview`

**Test Steps:**
1. Click `Cancel`.

**Expected Results:**
1. The user is returned to the inventory page.
2. No order is placed.
3. The cart remains available for later checkout unless app state is reset.

**Priority:** Medium

---

## Test Case ID: SD-CHK-009

**Description:** Verify direct unauthenticated access to checkout is blocked.

**Preconditions:**
- User is logged out

**Test Steps:**
1. Navigate directly to `https://www.saucedemo.com/checkout-step-one.html`.
2. Observe the resulting page.
3. Repeat for `https://www.saucedemo.com/cart.html` if broader access control coverage is desired.

**Expected Results:**
1. The user is redirected to the SauceDemo login page.
2. Checkout information is not accessible without authentication.
3. Protected checkout flow cannot be completed while logged out.

**Priority:** High

---

## Test Case ID: SD-CHK-010

**Description:** Verify empty-cart checkout behavior against the user story requirement.

**Preconditions:**
- User is logged in
- Cart is empty

**Test Steps:**
1. Open the cart page.
2. Confirm there are no cart items displayed.
3. Click `Checkout`.

**Expected Results:**
1. The cart page shows no item rows.
2. SauceDemo still displays an enabled `Checkout` button.
3. Clicking `Checkout` opens `Checkout: Your Information`.
4. Record this as a product-story gap because the story expects empty-cart restriction, but the live app does not enforce it.

**Priority:** High

---

## Test Case ID: SD-CHK-011

**Description:** Verify browser back-button behavior from checkout step one.

**Preconditions:**
- User is logged in
- At least one item is in the cart
- User has navigated from cart to `Checkout: Your Information`

**Test Steps:**
1. Use the browser back button once while on `Checkout: Your Information`.
2. Observe the resulting page.
3. Re-enter checkout if needed and repeat in each browser project.

**Expected Results:**
1. The browser back action returns the user to the cart page.
2. Cart contents remain intact.
3. No error page or broken state appears.
4. Behavior is consistent across `chromium`, `firefox`, and `webkit`.

**Priority:** Medium

---

## Test Case ID: SD-CHK-012

**Description:** Verify responsive usability of the checkout flow on a mobile viewport.

**Preconditions:**
- User is logged in
- At least one item is in the cart
- Tests are executed with a mobile-emulated viewport such as `iPhone 12` or `Pixel 5`

**Test Steps:**
1. Run the checkout flow from cart to completion using a mobile viewport.
2. Inspect the cart page layout.
3. Inspect the checkout information page layout.
4. Inspect the overview page layout.
5. Verify button accessibility and field usability on each page.
6. Validate portrait scrolling behavior and visibility of primary controls.

**Expected Results:**
1. Content remains readable without horizontal clipping of critical controls.
2. `Checkout`, `Continue`, `Finish`, `Cancel`, and `Back Home` remain visible or reachable through normal scrolling.
3. Input fields on `Checkout: Your Information` remain usable and do not overlap.
4. Summary labels and totals on `Checkout: Overview` remain readable.
5. Any layout breakage should be logged separately because mobile emulation is not part of the current default Playwright project list.

**Priority:** Medium

---

## Test Case ID: SD-CHK-013

**Description:** Verify multi-item order totals as a boundary scenario for the overview summary.

**Preconditions:**
- User is logged in
- Cart is empty

**Test Steps:**
1. Add at least two items with different prices to the cart.
2. Open the cart and confirm both items are listed.
3. Proceed through checkout with valid customer information.
4. Review the overview page totals.
5. Compare the displayed item total to the sum of the selected item prices.

**Expected Results:**
1. Both items appear in cart and overview with correct quantities and prices.
2. `Item total` equals the arithmetic sum of the selected item prices.
3. `Tax` and `Total` are displayed.
4. No item is dropped or duplicated between cart and overview.

**Priority:** Medium

---

## Test Case ID: SD-CHK-014

**Description:** Verify UI labels and action consistency across checkout pages.

**Preconditions:**
- User is logged in
- At least one item is available for checkout

**Test Steps:**
1. Open the cart page.
2. Open `Checkout: Your Information`.
3. Open `Checkout: Overview`.
4. Complete the order and open `Checkout: Complete!`.
5. Review page headings, primary action labels, and key static text on each page.

**Expected Results:**
1. Cart page shows `Your Cart`.
2. Checkout info page shows `Checkout: Your Information`.
3. Overview page shows `Checkout: Overview`.
4. Completion page shows `Checkout: Complete!`.
5. Buttons are labeled consistently with SauceDemo behavior:
   - `Continue Shopping`
   - `Checkout`
   - `Cancel`
   - `Continue`
   - `Finish`
   - `Back Home`
6. No broken text, missing labels, or overlapping controls are visible.

**Priority:** Medium

---

## Test Case ID: SD-CHK-015

**Description:** Verify handling of story-requested invalid data scenarios and document actual application behavior.

**Preconditions:**
- User is logged in
- User is on `Checkout: Your Information`

**Test Steps:**
1. Enter non-empty but atypical values into the checkout fields, such as special characters in names or alphabetic postal code values.
2. Attempt to continue.
3. Observe whether the application blocks progression or only checks for non-empty values.
4. Record the exact observed behavior by browser.

**Expected Results:**
1. The system should be checked for any format-specific validation messages.
2. If no format validation is enforced and only non-empty checks apply, record the result as a story gap rather than a product failure.
3. The test documentation should clearly distinguish implemented behavior from expected future behavior in the story.

**Priority:** Low# SauceDemo Checkout QA Test Plan

## Application Overview

Comprehensive Playwright-oriented QA plan for the SauceDemo checkout workflow covering happy path, validation, navigation, error handling, and responsive behavior based on the user story and live application behavior.

## Test Scenarios

### 1. Checkout Flow

**Seed:** `tests/seed.spec.ts`

#### 1.1. Happy path checkout completes successfully

**File:** `tests/checkout/happy-path.spec.ts`

**Steps:**
  1. Log in as standard_user, add a product, open the cart, start checkout, enter valid customer information, continue to overview, and finish the order.
    - expect: Cart shows the selected item details and checkout entry point.
    - expect: Checkout information page requires first name, last name, and zip/postal code.
    - expect: Overview shows item summary, payment information, shipping information, subtotal, tax, and total.
    - expect: Confirmation page shows a success message and Back Home button.
    - expect: Cart badge is cleared after completion.

#### 1.2. Checkout validations and negative flows

**File:** `tests/checkout/validation.spec.ts`

**Steps:**
  1. Attempt to continue from checkout information with missing required fields and with story-requested invalid formats.
    - expect: Empty required fields show inline errors in sequence: First Name, Last Name, Postal Code.
    - expect: Application behavior for invalid-but-non-empty content should be documented because SauceDemo primarily enforces non-empty fields.

#### 1.3. Navigation, access control, and responsive checks

**File:** `tests/checkout/navigation-and-responsive.spec.ts`

**Steps:**
  1. Verify cancel actions, browser back behavior, unauthenticated direct access, empty-cart checkout behavior, and mobile viewport rendering.
    - expect: Cancel from checkout information returns to cart; Cancel from overview returns to inventory.
    - expect: Unauthenticated direct navigation to checkout redirects to login.
    - expect: Empty cart behavior is documented because SauceDemo still exposes checkout.
    - expect: Checkout pages remain usable on a mobile viewport with no critical overlap or inaccessible controls.
