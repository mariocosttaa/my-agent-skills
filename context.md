# my-skills — Internal Context (do not commit)

Local guidance for the agent and maintainers. This file is in `.gitignore`.

---

## Repo overview

- **Repo:** [github.com/mariocosttaa/my-agent-skills](https://github.com/mariocosttaa/my-agent-skills)
- **Purpose:** Cursor Agent Skills (agentskills.io format)
- **Install targets:** `~/.cursor/skills/` (global) or `.cursor/skills/` (project)

---

## Branches

| Branch | Purpose |
|--------|---------|
| **main** | All skills, latest. Default. |
| **versions** | Snapshot of all skills at release points. Used for tagging and historical versions. |
| **`<skill-name>`** | Single-skill branch (e.g. `gin-workflow`, `docker`). For users who want only that skill. |

Current skill branches: `create-cursor-skill`, `create-workflow`, `docker`, `editor-cursor-skill`, `gin-workflow`, `git-commits`, `github-readme`, `nestjs-e2e-tests`, `nestjs-integration-tests`, `nestjs-unit-tests`, `qa-agent`.

---

## Versioning workflow

1. **Edits:** Edit skills on `main` (or feature branches, then merge to main).
2. **Sync to global:** Use editor-cursor-skill: edit in repo → copy to `~/.cursor/skills/`.
3. **Release:** When releasing:
   - Merge/cherry-pick to `versions`
   - Create tag, e.g. `git tag -a v1.0 -m "Release 1.0"` on `versions` or `main`
   - Push: `git push origin versions && git push origin --tags`
4. **Skill branches:** Keep in sync with main (merge main into each skill branch when releasing).

---

## Paths (macOS)

| Location | Path |
|----------|------|
| Repo (source) | `/Users/mario/Documents/dev-projects/others/my-skills/` |
| Global skills | `~/.cursor/skills/` |
| Global rules | `~/.cursor/rules/` |

**Rules (global):** `no-commit-trailers.mdc` — never add `Made-with: Cursor` to commits. Mandatory.

---

## Checklist: new skill

- [ ] Create skill folder in repo (`main`)
- [ ] Add to README table (Skills section)
- [ ] Add to "Install all" command
- [ ] Create branch `skill-name` (optional, for single-skill clones)
- [ ] Sync to versions when releasing
- [ ] Copy to `~/.cursor/skills/` for local use

## Checklist: new rule (global)

- [ ] Create `.mdc` in repo `.cursor/rules/`
- [ ] Copy to `~/.cursor/rules/` for global effect
- [ ] Document in README or context if user-facing

---

## Checklist: update README

- [ ] Skills table: name, description, install command
- [ ] Install all: include all skill folder names
- [ ] Versioning section: branches, tags
- [ ] MCP table if relevant
- [ ] Repo link

---

## Git commands (reference)

```bash
# Clone specific skill
git clone -b gin-workflow https://github.com/mariocosttaa/my-agent-skills.git

# Clone all (main)
git clone https://github.com/mariocosttaa/my-agent-skills.git

# Checkout specific version (when tagged)
git fetch --tags
git checkout tags/v1.0
```
