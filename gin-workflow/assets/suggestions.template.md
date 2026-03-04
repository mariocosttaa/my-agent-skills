# Suggestions — [Jira Code]

Items observed during implementation that **are not part of the current requirement**. Each entry should have **reference/location** (file, path, line) and **objective** (what to fix or improve). Useful for backlog or future tasks.

---

## Errors found

Problems, bugs or inconsistencies seen in the code; not fixed because they are outside the requirement scope.

| Location | Description | Objective |
|----------|-------------|-----------|
| `src/auth/validators/email.ts:12` | Validation does not handle international domains | Fix regex to support IDN |
| `src/users/repository.ts` | N+1 query in user listing | Add eager loading or batch |

---

## Improvement suggestions

Refactors, UX improvements, comments, technical debt; proposals for future work.

| Location | Description | Objective |
|----------|-------------|-----------|
| `src/users/controller.ts` | Pagination logic repeated in several endpoints | Extract to reusable decorator or interceptor |
| `frontend/Login.tsx` | No visual feedback during loading | Add spinner or skeleton |
| `docker-compose.yml` | Postgres healthcheck could be more robust | Increase interval and timeout |

---

## Other notes

[Optional: general observations, dependencies, technical debt, etc.]
