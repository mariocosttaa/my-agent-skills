---
name: nestjs-integration-tests
description: >
  Guides writing NestJS integration tests (API + DB): file placement in test/, naming (*.e2e-spec.ts),
  Supertest, test database, factories for request/response data, and fake timers for dates. Use when
  creating or editing integration or e2e tests for NestJS. Enforces factories/fixtures instead of
  inline test data, comments in English, and deterministic dates. Does not cover unit tests or
  browser E2E (Playwright/Cypress).
---

# NestJS Integration Tests

Skill for writing NestJS integration tests: real HTTP calls (Supertest), test database, **factories** for reusable data (avoid inline data), **fixed dates** with fake timers, and comments in English.

---

## When creating or editing tests: ask before running and fixing

1. **Run and fix tests:** When creating or changing integration tests, **ask** the user if they want you to run the tests and, if they fail, fix them. Do not assume you should run and fix automatically.
2. **Only modify test files (and helpers/factories):** If making the tests pass requires changing **code outside the test folder** (e.g. controllers, services, modules, app config, migrations), **do not do it**. Instead, **ask** the user: explain what is failing and what change would be needed in another file, and ask if they want you to apply that change or prefer to resolve it another way. You may change files inside `test/` (specs, factories, fixtures, helpers) to fix the tests.

Summary: ask if you should run tests and fix; when fixing, only touch files inside `test/`; any change in `src/` or another folder requires prior confirmation.

---

## File placement and naming

- **Placement:** Integration tests live in a **`test/`** folder at project root (separate from `src/`).
- **Name:** `*.e2e-spec.ts` (NestJS convention) or `*.integration-spec.ts`.
  - Examples: `test/app.e2e-spec.ts`, `test/users.e2e-spec.ts`, `test/auth.integration-spec.ts`.

Recommended structure:
```
test/
  app.e2e-spec.ts
  users.e2e-spec.ts
  jest-e2e.json           ← Jest config for e2e (optional)
  factories/               ← reusable data (see below)
    user.factory.ts
    create-user-dto.factory.ts
  fixtures/                ← dados estáticos se necessário
  helpers/
    date.helper.ts         ← freeze time para datas determinísticas
```

Não colocar testes de integração junto ao código em `src/`; a pasta `test/` isola o contexto “app completa + HTTP + DB”.

---

## Factories instead of inline data (required by default)

- **Problem:** Defining test objects (user, POST body, expected response) in each test makes maintenance hard: if the API changes the body, dozens of places need updating.
- **Solution:** Use **factory functions** that return a base object and accept optional **overrides**.

### Where to put them
- **`test/factories/`** — one factory per entity or DTO (e.g. `user.factory.ts`, `create-user-dto.factory.ts`).

### Factory format
- Function that returns base object + spread of overrides: `{ ...base, ...overrides }`.
- Use fixed dates from the date helper (e.g. `TEST_DATE`) to keep asserts deterministic.

Example:
```typescript
// test/factories/user.factory.ts
import { TEST_DATE } from '../helpers/date.helper';

export const createUserMock = (overrides: Partial<User> = {}) => ({
  id: 1,
  email: 'test@test.com',
  name: 'John Doe',
  role: 'user',
  createdAt: TEST_DATE,
  ...overrides,
});

export const createUserDtoMock = (overrides: Partial<CreateUserDto> = {}) => ({
  email: 'test@test.com',
  password: 'Password123!',
  name: 'John Doe',
  ...overrides,
});
```

Nos testes:
```typescript
// Do not define inline; use factory.
await request(app.getHttpServer())
  .post('/users')
  .send(createUserDtoMock())           // base
  .expect(201);

await request(app.getHttpServer())
  .post('/users')
  .send(createUserDtoMock({ email: 'other@test.com' }))  // only change what matters
  .expect(201);
```

- **Fixtures:** For lists or data that never varies (e.g. roles, countries), you can use files in `test/fixtures/` with static data. For payloads and entities that vary by scenario, prefer factories.

---

## Deterministic dates (fake timers)

- **Problem:** `expect(entity.createdAt).toEqual(new Date())` fails by milliseconds (flaky tests).
- **Solution:** Freeze time with **Jest Fake Timers** and a centralised fixed date.

### Recommended helper
- **`test/helpers/date.helper.ts`** — export a constant `TEST_DATE` (e.g. `new Date('2024-01-15T10:00:00.000Z')`) and a function or `beforeEach`/`afterEach` blocks that:
  - `jest.useFakeTimers()` and `jest.setSystemTime(TEST_DATE)` in setup;
  - `jest.runOnlyPendingTimers()` and `jest.useRealTimers()` in teardown.

Example usage in specs:
```typescript
import { TEST_DATE, useFakeTime } from '../helpers/date.helper';

describe('Users API (integration)', () => {
  useFakeTime(); // applies fake timers in beforeEach/afterEach

  it('POST /users sets createdAt', async () => {
    const res = await request(app.getHttpServer())
      .post('/users')
      .send(createUserDtoMock())
      .expect(201);
    expect(new Date(res.body.createdAt)).toEqual(TEST_DATE);
  });
});
```

- Factories should use `TEST_DATE` (or equivalent) for `createdAt`/`updatedAt` so asserts do not depend on the real clock.
- Always restore real timers in `afterEach` to avoid affecting other tests or runners.

---

## Comments (same pattern as unit tests)

- **Language:** Always **English**.
- **Style:** One or two lines, objective.
- **Where:** At the top of `describe` (what is being tested), in `beforeAll`/`beforeEach` (app or DB setup), and in non-obvious steps inside `it` (e.g. why a factory with a certain override is used, what is being validated in the response).

---

## Spec syntax and structure

- **App:** `Test.createTestingModule({ imports: [AppModule] })` (or required modules), then `createNestApplication()`, `app.init()` in `beforeAll`; `app.close()` in `afterAll`.
- **HTTP:** Use **Supertest**: `request(app.getHttpServer()).get(...).post(...).expect(...)`.
- **Database:** Use a separate **test database** (env var, e.g. `DB_NAME=app_test`). Between tests, clean data or use transactions (e.g. `afterEach` with truncate/delete of used tables) for isolation.
- **Assertions:** Validate status, response body and, when relevant, that data persisted in the DB (direct query or re-get). For date fields, compare with `TEST_DATE` (or value derived from the helper).

---

## Quick rules

| Rule | Detail |
|-------|--------|
| Folder | `test/` at root |
| Name | `*.e2e-spec.ts` or `*.integration-spec.ts` |
| Test data | Factories in `test/factories/` with overrides; do not define objects inline |
| Dates | `TEST_DATE` + `useFakeTimers` / `jest.setSystemTime`; restore with `useRealTimers` |
| DB | Dedicated test DB; clean between tests when needed |
| Comments | English, 1–2 lines, objective |
| HTTP | Supertest in `request(app.getHttpServer())` |

---

## Summary

- **Where:** `test/*.e2e-spec.ts`, with `test/factories/`, `test/helpers/`, optionally `test/fixtures/`.
- **Data:** Use factories (and DTOs/request body) with overrides whenever possible; fixtures for static data.
- **Dates:** Always deterministic via fake timers and `TEST_DATE` (or equivalent) in the helper.
- **Comments:** In English, concise, at points that help read the test.

See [reference.md](reference.md) for full examples of factories, date helper, and integration specs. Templates in `assets/`: `date.helper.template.ts`, `factory.template.ts`, `dto-factory.template.ts`.
