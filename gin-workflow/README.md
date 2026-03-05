# gin-workflow

Cursor skill for the **GIN project workflow** — per-requirement planning and execution (Jira + repository).

## What it does

- Creates branch and directory from Jira code (e.g. `GIN-AZ-42`).
- Guides creation of `requisitos.md`, `plan.md`, `tasks.md`, `overview.md`, `suggestions.md`.
- Links implementation with README Feature section and commit messages.
- Uses pt-PT for requirement documents; follows Jira naming conventions.

## When to use

- User indicates a Jira requirement (e.g. GIN-AZ-42).
- Creating or opening a feature branch.
- Writing requirements or implementation docs.
- Updating the README with feature references.

## Files

| File | Use |
|------|-----|
| `SKILL.md` | Main instructions for the agent. |
| `reference.md` | Quick conventions, templates, phases. |
| `assets/` | Templates (requisitos, plan, tasks, overview, suggestions). |
| `README.md` | This file — documentation for humans. |

## Install

```bash
git clone -b gin-workflow https://github.com/mariocosttaa/my-agent-skills.git
cp -r my-agent-skills/gin-workflow ~/.cursor/skills/
```
