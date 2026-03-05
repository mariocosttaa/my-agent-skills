# git-commits

Cursor skill for **commit messages** and **branch flow**: Conventional Commits, file grouping, and stash/checkout workflow.

## What this skill does

- **Commit format** — `type[(scope)]: description` + optional bullet body (feat, fix, docs, refactor, etc.).
- **Grouping** — Focus per commit; related files together; avoid mixing unrelated changes.
- **Branch workflow** — Stash → checkout feature branch → pop → commit → push.
- **Rules** — Asks commit language (EN or other); never adds `Made-with: Cursor` or similar trailers (mandatory).

## When to use

- Writing or reviewing commit messages.
- Deciding how to group files into commits.
- Switching branch while carrying uncommitted changes.

## Files

| File | Use |
|------|-----|
| `SKILL.md` | Agent instructions |
| `reference.md` | Conventional Commits, SemVer, revert, branch strategies |
| `README.md` | This file (for humans) |

## Install

**Latest:**
```bash
git clone https://github.com/mariocosttaa/my-agent-skills.git
cp -r my-agent-skills/git-commits ~/.cursor/skills/
```

**Specific version:** clone repo → checkout `versions` → copy `git-commits/versions/vX.Y/` to `~/.cursor/skills/git-commits/`.

---

→ [See all skills](https://github.com/mariocosttaa/my-agent-skills)
