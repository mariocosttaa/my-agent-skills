# NestJS Unit Tests skill

Cursor skill that guides writing **unit tests** in NestJS with Jest.

## What it covers

- **File placement:** Next to the code under test (co-location).
- **File naming:** `*.spec.ts` (e.g. `users.service.spec.ts`).
- **Syntax:** `Test.createTestingModule()`, mocks with `useValue` and `jest.fn()`, `afterEach(() => jest.resetAllMocks())`.
- **Comments:** Always in **English**, one or two lines, objective; present where they help reading (describe, beforeEach, it, non-obvious steps).
- **What to test:** Services, Controllers (with service mocked), Guards, Pipes, Interceptors. Do not test Modules or private methods directly.

## What it does not cover

- **Integration** tests (API + real DB, Supertest) — see dedicated skill.
- **E2E** tests (browser, Playwright/Cypress) — see dedicated skill.

## Files

| File | Use |
|------|-----|
| `SKILL.md` | Main instructions for the agent. |
| `reference.md` | Full examples (service, controller, guard) with comments. |
| `README.md` | This file — documentation for humans. |

## Activation

The skill applies when the user creates or edits unit tests in NestJS projects (files `*.spec.ts`, mentions of unit tests, Jest, etc.).

## Install

```bash
git clone -b nestjs-unit-tests https://github.com/mariocosttaa/my-agent-skills.git
cp -r my-agent-skills/nestjs-unit-tests ~/.cursor/skills/
```
