# Reference: GIN Workflow

## Quick conventions

| Element | Format |
|----------|---------|
| Jira code | `GIN-AZ-42` (uppercase, hyphen) |
| Branch | Same as Jira code |
| Directory | `/<jira-code>/` |
| requisitos.md | pt-PT, requirement description |
| plan.md | pt-PT, execution plan (fill during) |
| tasks.md | pt-PT, checklist `[ ]` / `[x]` |
| overview.md | pt-PT, final summary (fill on completion) |
| suggestions.md | pt-PT, optional; errors and suggestions with reference/location |
| qa-plan.md | pt-PT, optional; QA handoff with context, credentials, test scenarios |

## tasks.md format

- `[ ]` — to do
- `[x]` — done
- Blank line between each task
- Optional: short description below the task (one or more lines), before the next

## Jira integration

- The Jira code comes from the issue identifier (e.g. GIN-AZ-42). The user manages Kanban and PR.
- When creating the branch and directory, use the exact issue code.
- Reference the code in commits when useful: `feat(GIN-AZ-42): add email validation`.

## Relationship with other skills

- **github-readme**: Use when updating the README; include reference to the feature files.
- **git-commits**: Granular commits and descriptive messages.
- **qa-agent**: Use when creating qa-plan or when the user wants browser testing, test-case design, or QA validation.

## suggestions.md format

Sections: **Errors found**, **Improvement suggestions**, **Other notes**. Table with columns:

| Location | Description | Objective |
|----------|-------------|-----------|
| `path/file:line` or `path/file` | What was observed | What to fix or improve |

## Phases

- **Start (setup)**: branch, directory, requirements, structure, README.
- **During (filling)**: plan, tasks, suggestions (optional), overview on completion.
- **On completion**: overview, README; ask if user needs QA handoff; if yes, create qa-plan.md.

## Templates

See `assets/requisitos.template.md`, `assets/plan.template.md`, `assets/tasks.template.md`, `assets/overview.template.md`, `assets/suggestions.template.md`, `assets/qa-plan.template.md`.
