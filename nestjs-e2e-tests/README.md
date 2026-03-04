# E2E Tests (Browser) skill

Cursor skill that guides writing **browser E2E tests** with **Playwright**.

## What it covers

- **Tool:** Playwright (auto-waiting, multi-browser).
- **Page Object Model (POM):** Required; selectors and actions encapsulated in classes in `e2e/pages/`.
- **Selectors:** data-testid > getByRole/getByLabel > getByText; avoid CSS/XPath.
- **Fixtures:** Extend `test` for Page Objects and authenticated session (`authenticatedPage`), avoiding repeated login.
- **Structure:** `e2e/tests/`, `e2e/pages/`, `e2e/fixtures/`; `playwright.config.ts`.
- **Comments:** In English, 1–2 lines, objective.
- **Scope:** Critical happy paths (login, register, main flows, permissions); not edge cases.

## What it does not cover

- **Unit** tests — see nestjs-unit-tests skill.
- **API-only integration** tests — see nestjs-integration-tests skill.

## Activation

The skill applies when the user creates or edits browser E2E tests (Playwright, Page Objects, Cypress, login/UI flows, etc.).

## Source

From [my-agent-skills](https://github.com/mariocosttaa/my-agent-skills): `git clone -b nestjs-e2e-tests https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/nestjs-e2e-tests ~/.cursor/skills/`
