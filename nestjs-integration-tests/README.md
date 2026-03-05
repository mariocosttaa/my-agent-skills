# nestjs-integration-tests

Cursor skill for **integration tests** in NestJS (API + DB) with Supertest, factories, deterministic dates.

## What this skill does

- **Placement** — `test/`, `*.e2e-spec.ts` or `*.integration-spec.ts`.
- **Factories** — `test/factories/` with overrides; no inline objects; optionally `test/fixtures/` for static data.
- **Dates** — Jest fake timers, `date.helper.ts` (`TEST_DATE`, `useFakeTime()`).
- **HTTP** — Supertest, `Test.createTestingModule`, `createNestApplication()`.
- **Database** — Separate test DB, cleanup between tests.

## When to use

- Integration/e2e tests in NestJS, Supertest, factories, test DB.

**Not for:** unit tests (nestjs-unit-tests) or browser E2E (nestjs-e2e-tests).

## Files

| File | Use |
|------|-----|
| `SKILL.md` | Agent instructions |
| `reference.md` | Factories, date helper, structure |
| `assets/` | Factory and date helper templates |

## Install

**Latest:**
```bash
git clone https://github.com/mariocosttaa/my-agent-skills.git
cp -r my-agent-skills/nestjs-integration-tests ~/.cursor/skills/
```

**Specific version:** clone repo → checkout `versions` → copy `nestjs-integration-tests/versions/vX.Y/` to `~/.cursor/skills/nestjs-integration-tests/`.

---

→ [See all skills](https://github.com/mariocosttaa/my-agent-skills)
