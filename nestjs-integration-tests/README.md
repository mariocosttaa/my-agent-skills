# NestJS Integration Tests skill

Cursor skill that guides writing **integration tests** in NestJS (API + DB) with Supertest.

## What it covers

- **Placement and naming:** Files in `test/`, named `*.e2e-spec.ts` or `*.integration-spec.ts`.
- **Test data:** **Factories** in `test/factories/` with overrides — do not define objects inline; optionally **fixtures** in `test/fixtures/` for static data.
- **Dates:** **Deterministic dates** via Jest fake timers and helper in `test/helpers/date.helper.ts` (`TEST_DATE`, `useFakeTime()`); use in factories and asserts.
- **HTTP:** Supertest with `request(app.getHttpServer())`; app created with `Test.createTestingModule` and `createNestApplication()`.
- **Database:** Use of separate test DB and cleanup between tests when needed.
- **Comments:** In English, 1–2 lines, objective (same pattern as unit tests skill).

## What it does not cover

- **Unit** tests — see nestjs-unit-tests skill.
- **Browser E2E** tests (Playwright, Cypress).

## Recommended structure

```
test/
  *.e2e-spec.ts
  factories/       ← user.factory.ts, create-user-dto.factory.ts, etc.
  fixtures/        ← static data (optional)
  helpers/
    date.helper.ts
```

## Activation

The skill applies when the user creates or edits integration/e2e tests in NestJS (files in `test/`, `*.e2e-spec.ts`, Supertest, factories, test DB, etc.).

## Source

From [my-agent-skills](https://github.com/mariocosttaa/my-agent-skills): `git clone -b nestjs-integration-tests https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/nestjs-integration-tests ~/.cursor/skills/`
