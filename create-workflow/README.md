# create-workflow

Cursor skill for **creating workflow skills** — per-requirement workflows, branch conventions, Jira/Linear, repo-specific vs generic.

## What this skill does

- **Questions first** — Type, scope, integration, file structure, language before implementing.
- **Workflow types** — Generic vs repo-specific; when to create a rule.
- **Rule template** — Repo-specific workflow with `alwaysApply: true`.
- **Output** — Skill structure similar to gin-workflow (requisitos, plan, tasks, overview).

## When to use

- Define a development workflow for a project or team.
- Create a workflow skill (like gin-workflow) for another context.
- Document conventions (branches, requisitos, plan, tasks, overview).

## Files

| File | Use |
|------|-----|
| `SKILL.md` | Agent instructions |
| `reference.md` | Rule vs Skill, example rule, difference from gin-workflow |

## Install

```bash
git clone -b create-workflow https://github.com/mariocosttaa/my-agent-skills.git
cp -r my-agent-skills/create-workflow ~/.cursor/skills/
```

**Example:** [gin-workflow](https://github.com/mariocosttaa/my-agent-skills/tree/gin-workflow) — complete workflow skill.

---

→ [See all skills on main](https://github.com/mariocosttaa/my-agent-skills)
