# Skill: git-commits

Cursor skill for **commit messages** and **branch flow**: file grouping, Conventional Commits format, and checkout/stash/push workflow for feature branches.

## When to use

- Writing or reviewing commit messages.
- Deciding how to group files into commits.
- Switching branch while carrying changes (stash → checkout → pop → commit → push).
- Following repository commit rules.

## Main content (SKILL.md)

- **No Made-with trailer** — Never add `Made-with: Cursor` or similar to commit messages. Mandatory.
- Ask commit language (EN or other) and, when in doubt, ask before acting.
- Grouping guideline (focus per commit; file count subjective).
- Format: `type[(scope)]: description` + bullet body.
- Types: feat, fix, docs, style, refactor, perf, test, ci, build, chore.
- Good and bad examples.
- Workflow: stash → checkout → pop → commit → push for feature branch.
- Pre-commit checklist.

## Files

- **SKILL.md** — Agent instructions.
- **reference.md** — Conventional Commits, SemVer, revert, branch strategies.
- **README.md** — This file (for humans; not injected into the agent).

## Install

```bash
git clone -b git-commits https://github.com/mariocosttaa/my-agent-skills.git
cp -r my-agent-skills/git-commits ~/.cursor/skills/
```
