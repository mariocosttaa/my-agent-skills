# qa-agent

**v1.4** — Cursor skill for **QA engineering** — browser testing, code review, UI/UX evaluation, structured reports.

> **Required: Browser MCP** — This skill uses **[mario-playwright-mcp](https://github.com/mariocosttaa/mario-playwright-mcp)** (recommended) or **browsermcp** in `.cursor/mcp.json`. Without MCP, the agent cannot run browser tests. Add the MCP server and restart Cursor before use.

---

## What it does

- Browser-based testing (navigate, snapshot, click, type, screenshot) via **Browser MCP**
- **User profiles** — 10 profiles (normal, power-clicker, url-manipulator, security-tester, etc.) to simulate different behaviours; ask user: all profiles or normal only (default: all)
- **Test resources** — Record browser, resolution, URLs accessed, type of test in every run
- Code review, UI/UX evaluation, post-action analysis
- Reports in `QA-AGENT/<project>/test/<timestamp>/` with `report/` and `browser/` folders

## When to use

- User wants to **test a website**, test in browser, test a page
- QA, quality assurance, test cases, regression, inspect page, debug console

## Prerequisites

| Requirement | Details |
|-------------|---------|
| **Browser MCP** | [mario-playwright-mcp](https://github.com/mariocosttaa/mario-playwright-mcp) (recommended) or `browsermcp` in `.cursor/mcp.json` |
| App reachable | Dev server or deployed URL |

This skill is designed to work with **mario-playwright-mcp**, which provides network payload capture, screenshots to workspace, and `.mcp-output` organization.

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

```bash
git clone -b qa-agent https://github.com/mariocosttaa/my-agent-skills.git
cp -r my-agent-skills/qa-agent ~/.cursor/skills/
```
