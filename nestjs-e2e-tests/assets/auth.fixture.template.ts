// e2e/fixtures/auth.fixture.ts
// Extends Playwright test with Page Objects and authenticated page to avoid repeating login.
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
