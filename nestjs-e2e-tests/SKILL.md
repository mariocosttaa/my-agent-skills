---
name: nestjs-e2e-tests
description: >
  Guides writing browser E2E tests with Playwright: Page Object Model (POM), selectors (data-testid,
  role, label), fixtures for auth/setup, and test structure. Use when creating or editing E2E tests
  that run in a real browser (frontend + API). Enforces POM, stable selectors, comments in English.
  Does not cover unit or API-only integration tests.
---

# E2E Tests (Browser) — Playwright

Skill for writing browser E2E tests with **Playwright**: **Page Object Model (POM)** required, stable selectors (data-testid, role, label), **fixtures** for auth/setup, and comments in English. Focus on critical business happy paths.

---

## When creating or editing tests: ask before running and fixing

1. **Run and fix tests:** When creating or changing E2E tests, **ask** the user if they want you to run the tests and, if they fail, fix them. Do not assume you should run and fix automatically.
2. **Only modify test files (e2e/):** If making the tests pass requires changing **code outside the E2E folder** (e.g. frontend components, pages, API, config), **do not do it**. Instead, **ask** the user: explain what is failing and what change in another file would be needed (e.g. add `data-testid`, change text or flow), and ask if they want you to apply that change. You may change files inside `e2e/` (specs, pages, fixtures) to fix the tests.

Summary: ask if you should run tests and fix; when fixing, only touch files inside `e2e/`; any change in frontend or backend requires prior confirmation.

---

## Tool

- **Playwright** — community consensus for browser E2E (auto-waiting, multi-browser, single suite).
- Do not use fragile CSS/XPath selectors; prefer attributes and roles that resist UI changes.

---

## Page Object Model (POM) — required

- **Problem:** Selectors scattered in tests break when the UI changes (IDs, classes); hard to maintain.
- **Solution:** One class per page (or relevant section) that encapsulates locators and actions. Tests use only the Page Object API.

### Where to put them
- **`e2e/pages/`** or **`tests/pages/**`** — e.g. `login.page.ts`, `dashboard.page.ts`. Optional: `base.page.ts` with common methods (navigation, waits).

### Rules
- Each Page Object receives Playwright `Page` in the constructor; exposes methods like `goto()`, `login(email, password)`, `expectWelcomeMessage(name)`.
- **Selectors stay only inside the Page Object** — specs do not use `page.getByTestId(...)` directly; they use `loginPage.login(...)`.
- If a selector changes, update only the Page Object; tests remain valid.

---

## Selectors — order of preference

| Priority | Selector | Example | When to use |
|------------|---------|---------|-------------|
| 1st | **data-testid** | `page.getByTestId('email-input')` | Elementos sem texto estável, listas, componentes dinâmicos. |
| 2nd | **Role + name** | `page.getByRole('button', { name: 'Login' })` | Botões, links, headings acessíveis. |
| 3rd | **Label** | `page.getByLabel('Email')` | Inputs associados a labels. |
| 4th | **Text** | `page.getByText('Bem-vindo')` | Conteúdo visível estável. |
| Avoid | CSS / XPath | `page.locator('#btn-submit')` | Quebra com redesigns e refactors. |

- In code (Page Objects), prefer **data-testid** for form inputs and buttons when text or structure changes often; use **getByRole** and **getByLabel** for accessibility and stability.
- Comments in code should indicate, if useful, why a selector was chosen (e.g. "data-testid because label changes per locale").

---

## Folder structure

```
e2e/                          # ou playwright/ ou tests/e2e/
  tests/                      # specs
    auth/
      login.spec.ts
      register.spec.ts
    users/
      user-journey.spec.ts
  pages/                      # Page Objects (POM)
    login.page.ts
    dashboard.page.ts
    base.page.ts              # optional: common methods
  fixtures/                   # Playwright extensions (auth, page objects)
    auth.fixture.ts           # authenticatedPage, loginPage, etc.
  utils/                      # optional: factories, helpers
    data-factory.ts
  playwright.config.ts
```

- Specs in `e2e/tests/` (or equivalent); Page Objects in `e2e/pages/`; fixtures in `e2e/fixtures/`.
- File names: `*.spec.ts` for tests; `*.page.ts` for Page Objects; `*.fixture.ts` for Playwright extensions.

---

## Playwright fixtures — auth and repeated setup

- **Problem:** Logging in (or other setup) in each test duplicates code and makes tests long.
- **Solution:** Extend Playwright `test` with **fixtures** that provide, for example, an already authenticated page or ready-to-use Page Objects.

Example idea (details in [reference.md](reference.md)):
- Fixture `authenticatedPage`: before handing the page to the test, navigates to login and fills credentials; the test receives an already authenticated session.
- Fixtures `loginPage`, `dashboardPage`: build Page Objects from `page`, to use as `test('...', async ({ loginPage, dashboardPage }) => { ... })`.

This avoids repeating the login flow in dozens of tests; keeps specs focused on the journey to validate.

---

## Isolation and stability

- **Isolation:** Each test should be independent (new browser context; Playwright handles this by default). Do not depend on execution order or state left by another test.
- **beforeEach:** If needed, go to a base URL (e.g. `/`) or clear state to ensure a known starting point.
- **Data:** Use **factories** (like in integration tests) for test data; do not hardcode strings/objects inline in many places.
- **What to test:** **Critical happy paths** — login/logout, registration, main flows (e.g. checkout), permissions (admin vs user). Do not use E2E for edge cases; that belongs in unit/integration.

---

## Comments (same pattern as other test skills)

- **Language:** Always **English**.
- **Style:** One or two lines, objective.
- **Where:** At the top of the file or `describe` (what is being tested); in Page Objects (page responsibility); in fixtures (what the fixture does); in non-obvious steps inside the test.

---

## Quick rules

| Rule | Detail |
|-------|--------|
| Tool | Playwright |
| Pattern | Page Object Model; selectors only inside pages |
| Selectors | data-testid > getByRole/getByLabel > getByText > avoid CSS/XPath |
| Structure | e2e/tests/, e2e/pages/, e2e/fixtures/ |
| Repeated auth | Fixtures (e.g. authenticatedPage) |
| Data | Factories when applicable (reuse integration tests pattern) |
| Focus | Critical happy paths; few E2E tests |
| Comments | English, 1–2 lines, objective |

---

## Summary

- **POM** for all tested pages/flows; stable selectors (data-testid, role, label).
- **Fixtures** for login and Page Objects; clean specs without repeated setup.
- **Structure** clear: tests/, pages/, fixtures/, config.
- **Comments** in English, concise.

See [reference.md](reference.md) for full examples of Page Object, auth fixture and spec. Templates in `assets/`: `page.template.ts`, `auth.fixture.template.ts`, `playwright.config.snippet.ts`.
