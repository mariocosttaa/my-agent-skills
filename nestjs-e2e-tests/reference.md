# Reference: E2E Tests (Browser) — Playwright, POM, Fixtures

Full examples: Page Objects, selector choices, Playwright fixtures for auth, and a spec. Comments in English.

---

## 1. Page Object — Login (e2e/pages/login.page.ts)

Encapsulates all selectors and actions for the login page. If the UI changes, only this file is updated.

```typescript
// Page Object for login: form fields and submit action; selectors in one place.
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private emailInput: Locator;
  private passwordInput: Locator;
  private submitButton: Locator;

  constructor(private page: Page) {
    this.emailInput = page.getByTestId('email-input');
    this.passwordInput = page.getByTestId('password-input');
    this.submitButton = page.getByRole('button', { name: 'Login' });
  }

  async goto(baseUrl: string = '/login') {
    await this.page.goto(baseUrl);
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

Use `data-testid` for inputs if the label or placeholder changes (e.g. i18n); use `getByRole('button', { name: 'Login' })` for the submit button so the test reflects the visible label.

---

## 2. Page Object — Dashboard (e2e/pages/dashboard.page.ts)

Represents the post-login screen; exposes assertions or actions that tests need.

```typescript
// Page Object for dashboard: assertions on welcome message and main content.
import { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class DashboardPage {
  constructor(private page: Page) {}

  async expectWelcomeMessage(name: string) {
    await expect(this.page.getByText(`Welcome, ${name}`)).toBeVisible();
  }

  async expectDashboardLoaded() {
    await expect(this.page.getByTestId('dashboard-content')).toBeVisible();
  }
}
```

---

## 3. Base Page (optional, e2e/pages/base.page.ts)

Shared navigation or helpers used by multiple pages.

```typescript
// Base page: common helpers (e.g. goto, wait for load).
import { Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected page: Page) {}

  async goto(path: string) {
    await this.page.goto(path);
  }
}
```

Then `LoginPage` and `DashboardPage` can extend `BasePage` if you want a common base; otherwise keep pages flat and independent.

---

## 4. Playwright fixture — auth and page objects (e2e/fixtures/auth.fixture.ts)

Extends the base `test` to provide pre-built Page Objects and an authenticated page so specs do not repeat login.

```typescript
// Fixtures: inject Page Objects and authenticated session to avoid repeating login in every test.
import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';

export const test = base.extend<{
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  authenticatedPage: Page;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  authenticatedPage: async ({ page }, use) => {
    await page.goto('/login');
    const loginPage = new LoginPage(page);
    await loginPage.login('user@test.com', 'Password123!');
    await use(page);
  },
});

export { expect } from '@playwright/test';
```

In specs, use `test('...', async ({ loginPage, dashboardPage }) => { ... })` or `test('...', async ({ authenticatedPage }) => { ... })` so you do not instantiate Page Objects or perform login in every test.

---

## 5. E2E spec using POM and fixtures (e2e/tests/auth/login.spec.ts)

Tests stay short and readable; selectors and login flow live in pages and fixtures.

```typescript
// E2E: user can open login, submit credentials, and see dashboard welcome message.
import { test, expect } from '../../fixtures/auth.fixture';

test('user can login successfully', async ({ loginPage, dashboardPage }) => {
  await loginPage.goto();
  await loginPage.login('user@test.com', 'Password123!');

  await dashboardPage.expectWelcomeMessage('John');
  await dashboardPage.expectDashboardLoaded();
});

test('authenticated user sees dashboard without logging in again', async ({
  authenticatedPage,
  dashboardPage,
}) => {
  await dashboardPage.expectWelcomeMessage('John');
});
```

If baseUrl is set in `playwright.config.ts`, pass it into `loginPage.goto(baseUrl)` or use a relative path from config.

---

## 6. Selector choice — when to use what

| Scenario | Prefer | Reason |
|----------|--------|--------|
| Form input (email, password) | `getByTestId('email-input')` or `getByLabel('Email')` | Stable across redesigns or i18n; label is good for a11y. |
| Submit / primary button | `getByRole('button', { name: 'Login' })` | Matches visible text and role. |
| Dynamic or repeated content | `getByTestId('item-1')` or role+name | Unique and stable. |
| Static visible text | `getByText('Welcome')` | Validates what the user sees. |
| Avoid | `page.locator('.btn-primary')`, XPath | Breaks on class or DOM changes. |

Keep selector logic inside Page Objects; specs should only call methods like `loginPage.login(...)`.

---

## 7. Comment placement (E2E)

- **Top of file / describe:** What flow or feature is under test (e.g. "E2E: user can open login, submit credentials, and see dashboard").
- **Page Object class:** One line describing the page or fragment (e.g. "Page Object for login: form fields and submit action").
- **Fixture file:** What the fixture provides (e.g. "inject Page Objects and authenticated session").
- **Inside test:** Only when the scenario or assertion is not obvious from the test name.

Comments in **English**, one or two lines, objective.

---

## 8. What to test in E2E (scope)

- **Do:** Critical happy paths — login, logout, register, main user journeys (e.g. create resource, checkout), permission differences (admin vs user).
- **Do not:** Edge cases, validation details, or business rules that are better covered by unit/integration tests. E2E is expensive; keep the suite small and stable.
