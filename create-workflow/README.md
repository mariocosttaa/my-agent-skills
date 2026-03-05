# create-workflow

**Skill that guides creation of workflow skills in Cursor** — per-requirement workflows, branch conventions, Jira/Linear integration, repo-specific vs generic.

---

## When to use

- You want to **define a development workflow** for a project or team.
- You need to **create a workflow skill** (like gin-workflow) for another context.
- You want to document conventions (branches, requisitos, plan, tasks, overview).

---

## Main content (SKILL.md)

- Questions before starting (type, scope, integration, file structure, language).
- Workflow types: generic vs repo-specific; when to create a rule.
- Rule template for repo-specific workflows with `alwaysApply: true`.

---

## Files

- **SKILL.md** — Agent instructions.
- **reference.md** — Rule vs Skill, example rule, difference from gin-workflow.
- **README.md** — This file (for humans).

---

## Install

```bash
git clone -b create-workflow https://github.com/mariocosttaa/my-agent-skills.git
cp -r my-agent-skills/create-workflow ~/.cursor/skills/
```

---

## Reference

See [gin-workflow](https://github.com/mariocosttaa/my-agent-skills/tree/gin-workflow) as a complete workflow skill example.
