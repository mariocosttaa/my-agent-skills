# QA Agent — Examples

Concrete examples of Browser MCP usage and workflows.

---

## Example 1: Login flow with post-action analysis

**Scenario:** Validate login and check for console errors.

1. **Navigate:** `browser_navigate` → `url: "http://localhost:3000/login"`
2. **Inspect:** `browser_snapshot` → read output for `ref` of email input, password input, submit button
3. **Interact:** `browser_type` (email, password), `browser_click` (login button)
4. **Wait:** `browser_wait_for` (if redirect or loading)
5. **Post-action analysis:**
   - `browser_snapshot` to see next screen
   - `browser_take_screenshot` with filename if errors or unexpected UI appear
   - `browser_console_messages` (level: error) with **filename** to save to `console-messages.log`
   - `browser_network_requests` (includeStatic: false) with **filename** to save to `network-requests.json`
6. **Report:** Add issues to errors.md; reference console/network files when relevant

---

## Example 2: Form validation errors

**Scenario:** Submit empty form and verify validation messages.

1. Navigate to the form page
2. `browser_snapshot` to get refs
3. `browser_click` on submit (no input) or `browser_type` with invalid data
4. `browser_snapshot` to see validation messages; take screenshot if errors visible
5. `browser_console_messages` (level: error) to ensure no JS errors during validation

---

## Example 3: Multi-step flow with post-action after each step

**Scenario:** Add item to cart, go to checkout, verify total.

1. Navigate to product page
2. Snapshot → click "Add to cart"
3. **Post-action:** Snapshot, screenshot if errors, console, network
4. Snapshot → click "Checkout"
5. **Post-action:** Snapshot, screenshot if errors, console
6. Verify price/total in tree; report any issues

---

## Example 4: Post-action — error overlay on screen

**Scenario:** After "Create contract", the page shows "Uncaught runtime errors" overlay.

1. **Do not** write overview or declare success.
2. **Immediately** `browser_take_screenshot` → save to `screenshots/contract-created-error-overlay.png`
3. `browser_console_messages` (level: error) with **filename** → save to `console-messages.log`
4. `browser_network_requests` (includeStatic: false) with **filename** → save to `network-requests.json`
5. Add to `errors.md` with severity, steps, screenshot link, console/network excerpts if relevant
6. **Then** continue analysis or write overview

---

## Example 5: Debugging a reported issue

**Scenario:** User says "login fails, check the console".

1. Navigate to login page
2. Perform the failing action (e.g. submit with valid credentials)
3. **Post-action:** `browser_snapshot`, `browser_take_screenshot` (if error visible), `browser_console_messages`, `browser_network_requests`
4. Analyse errors (e.g. 401, network failure, CORS)
5. Report findings with severity, screenshot (if any), and suggested fix

---

## Example 6: Unexpected actions to catch errors

**Scenario:** Try to break the form (empty submit, invalid input, rapid clicks).

1. Navigate to the form page
2. **Empty submit:** Click submit without filling; snapshot + console logs
3. **Invalid input:** Type `' OR 1=1--` in email; special chars in text; snapshot + console logs
4. **Rapid interaction:** Double-click submit; snapshot + console logs
5. Report any uncaught errors, broken UI, or confusing error messages

---

## Example 7: UI/UX evaluation with rating

**Scenario:** User asks "how is the UX of this page?".

1. Navigate and snapshot to understand structure
2. Perform a typical flow (e.g. fill form, submit)
3. Observe: labels, feedback, error messages, loading states
4. Rate each aspect (1–5) with a one-line rationale
5. Summarise in a short report (use qa-report.template.md UI/UX section)
