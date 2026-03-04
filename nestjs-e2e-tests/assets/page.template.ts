// e2e/pages/{name}.page.ts
// Page Object for {page name}: {brief description of responsibility}.
import { Page, Locator } from '@playwright/test';

export class {Name}Page {
  constructor(private page: Page) {
    // Prefer: getByTestId('...'), getByRole('button', { name: '...' }), getByLabel('...')
  }

  async goto(path: string = '/{path}') {
    await this.page.goto(path);
  }

  // Add methods that perform actions or assertions; keep selectors inside this class.
}
