# qa-agent

**v1.4** — Cursor skill for **QA engineering**: browser testing, user profiles, test resources, structured reports.

> **Required: Browser MCP** — [mario-playwright-mcp](https://github.com/mariocosttaa/mario-playwright-mcp) (recommended) or **browsermcp** in `.cursor/mcp.json`. Without MCP, the agent cannot run browser tests.

## What this skill does

- **Browser testing** — Navigate, snapshot, click, type, screenshot via Browser MCP.
- **10 user profiles** — normal, power-clicker, url-manipulator, security-tester, etc. to simulate different behaviours.
- **Test resources** — Records browser, resolution, URLs, test type in every run.
- **Output** — `QA-AGENT/<project>/test/<timestamp>/` with `report/` and `browser/` folders.
- **Workflow** — Task plan before testing, post-action analysis, console and network capture.

## When to use

- Test a website, page, or app in the browser.
- QA, regression, test cases, inspect page, debug console.

## Prerequisites

| Requirement | Details |
|-------------|---------|
| **Browser MCP** | mario-playwright-mcp or browsermcp in `.cursor/mcp.json` |
| **App** | Dev server or deployed URL |

## Files

| File | Use |
|------|-----|
| `SKILL.md` | Agent instructions |
| `STRUCTURE.md` | Output folder layout |
| `reference.md` | Best practices |
| `examples.md` | MCP workflow examples |
| `assets/task-plan.template.md` | Task plan (mandatory before testing) |
| `assets/user-profiles.template.md` | 10 user profiles reference |

## Install

**Latest:**
```bash
git clone https://github.com/mariocosttaa/my-agent-skills.git
cp -r my-agent-skills/qa-agent ~/.cursor/skills/
```

**Specific version:** clone repo → checkout `versions` → copy `qa-agent/versions/vX.Y/` to `~/.cursor/skills/qa-agent/`.

---

→ [See all skills](https://github.com/mariocosttaa/my-agent-skills)
