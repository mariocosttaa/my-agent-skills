---
name: gin-workflow
description: >
  Plans and executes the workflow per requirement in the GIN project (Jira + repository).
  Use when the user indicates a Jira requirement (e.g. GIN-AZ-42), asks to create/open a feature,
  write requisitos.md, plan.md, tasks.md, suggestions.md or overview.md, update the README, or
  follow the workflow. The skill should be read at the start (setup) and during (filling).
  Use github-readme when working on the README.
---

# GIN Workflow — Requirement → Plan → Tasks → Overview

Workflow per requirement in the repository. *Context:* the requirement comes from Jira (e.g. GIN-AZ-42); the user manages Kanban and PR. The skill should be **re-read at the start** (setup) and **during** (filling). Files: `requisitos.md`, `plan.md`, `tasks.md`, `overview.md`; `suggestions.md` is optional.

---

## Phase 1: Start (setup)

Branch, directory, requirements, structure and README.

| Step | What to do |
|-------|-------------|
| 1 | Create the feature branch: `git checkout -b GIN-AZ-42`. |
| 2 | Create the feature directory: `/<jira-code>/`. |
| 3 | Create `requisitos.md` with the requirement description (pt-PT). |
| 4 | Create `plan.md`, `tasks.md`, `overview.md` (templates or empty); optionally `suggestions.md`. |
| 5 | Update the README with the new feature section and links to the files. |

---

## Phase 2: During (filling)

Plan, tasks, suggestions and overview throughout implementation.

| File | When to fill |
|----------|------------------|
| `plan.md` | During: approach, decisions, order of work. |
| `tasks.md` | During: mark `[x]` as you progress; add tasks if needed. |
| `suggestions.md` | During (optional): errors and suggestions that do not depend on the requirement. |
| `overview.md` | On completion: final summary of what was implemented. |

---

## The files

| File | Required | Purpose |
|----------|-------------|-----------|
| `requisitos.md` | ✅ | Requirement description, acceptance criteria. |
| `plan.md` | ✅ | Execution plan; fill during implementation. |
| `tasks.md` | ✅ | Checklist `[ ]` / `[x]`; update during. |
| `overview.md` | ✅ | Final summary (fill on completion). |
| `suggestions.md` | Optional | Errors found and suggestions that do not depend on the requirement; with reference and location. |

### suggestions.md (optional)

Records **errors found** and **suggestions** during implementation that **are not part of the current requirement**. Sections: Errors found, Improvement suggestions, Other notes. Table with columns *Location* (file/path/line), *Description* and *Objective*. See [assets/suggestions.template.md](assets/suggestions.template.md).

---

## Format of `tasks.md`

Each task is a line with `[ ]` (to do) or `[x]` (done). Blank line between tasks. Optionally, a short description below the task.

```markdown
[x] - Create email validation endpoint

[ ] - Add unit tests

Implement with Jest, mock the repository.

[ ] - Update API documentation
```

**Rules:**
- `[ ]` = to do; `[x]` = done.
- Blank line between each task.
- Below the task (optional): short description in one or more lines, before the next task.
- Update `tasks.md` as you progress; mark `[x]` when the task is done.

---

## Agent behaviour

### Phase 1: Start (setup) — when the user provides the requirement

1. **Identify the Jira code** (e.g. GIN-AZ-42). If not given, ask.
2. **Create the structure**:
   - Branch: `git checkout -b GIN-AZ-42`.
   - Directory: `/<jira-code>/` (e.g. `/GIN-AZ-42/`).
3. **Create the files** inside that directory:
   - `requisitos.md` — requirement description in pt-PT.
   - `plan.md` — template or empty (to fill during).
   - `tasks.md` — initial checklist with `[ ]`; derive from the requirement.
   - `overview.md` — empty or with header (to fill on completion).
   - `suggestions.md` — optional, empty (to fill during).
4. **Update the README** with the new feature section.
5. Confirm to the user: directory created, files created, README updated.

### Phase 2: During (filling) — during implementation

- **plan.md**: Fill approach, decisions, order of work; update if the plan changes.
- **tasks.md**: Mark `[x]` when done; add short descriptions below tasks; add new tasks if needed.
- **suggestions.md** (optional): Record errors found and suggestions; always indicate the location (file/path) and objective.
- Granular commits and descriptive messages on the feature branch.

### On completion

- **Review `tasks.md`**: relevant tasks with `[x]`.
- **Fill `overview.md`**: concise summary of what was implemented (pt-PT).
- **Update the README** if needed.

---

## Repository README

- **When:** When creating a new feature or on completion.
- **How:** Use **github-readme**; ask before rewriting the entire README.
- **Required content:** Section referencing the files per feature:
  - `requisitos.md`, `plan.md`, `tasks.md`, `overview.md`; optionally `suggestions.md`.

Example: "In each `<jira-code>/` folder there are `requisitos.md`, `plan.md`, `tasks.md`, `overview.md` and, optionally, `suggestions.md`."

---

## Templates

- [assets/requisitos.template.md](assets/requisitos.template.md)
- [assets/plan.template.md](assets/plan.template.md)
- [assets/tasks.template.md](assets/tasks.template.md)
- [assets/overview.template.md](assets/overview.template.md)
- [assets/suggestions.template.md](assets/suggestions.template.md) (optional)

See [reference.md](reference.md) for more.

---

## Quick rules

- **Language**: all files always in **Portuguese (pt-PT)** (requisitos, plan, tasks, overview, suggestions).
- **Location**: all in `/<jira-code>/`, e.g. `GIN-AZ-42/requisitos.md`, `GIN-AZ-42/plan.md`, etc.
- **Branch**: name equals Jira code (e.g. `GIN-AZ-42`).
- **tasks.md**: `[ ]` to do, `[x]` done; blank line between tasks; optional short description below.
- **Commits**: granular and descriptive on the feature branch.
- **README**: update in the start phase and on completion; include section linking to the feature files.
