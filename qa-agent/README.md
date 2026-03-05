# qa-agent

Cursor skill for acting as a **QA engineer**. When testing web apps or UIs — **always use browser testing** via Browser MCP (browsermcp or mario-playwright-mcp).

## What it does

- **Browser testing required** — For web apps, pages, or UIs, the agent **must** run tests in the browser (navigate, snapshot, click, type, screenshot). No QA session without browser when testing web.
- Reviews code for defects (security, correctness, architecture, performance)
- Evaluates UI/UX and provides ratings (clarity, feedback, consistency, error handling)
- Catches errors via unexpected inputs and unusual sequences
- Runs browser-based tests using **Browser MCP** (navigate, snapshot, click, type, screenshot)
- **Post-action analysis** — always inspects the next screen after significant actions (submit, create, save)
- **Screenshots** — captures error overlays and unexpected UI; links them in reports
- **Console + network** — uses `browser_console_messages` and `browser_network_requests` for debugging
- Reports findings with severity (Critical, High, Medium, Low) and screenshot links
- Output in `QA-AGENT/<project>/test/<timestamp>/` with `report/` (all .md) and `browser/` (console, network, screenshots)

## When to use

- User wants to **test a website**, **test in browser**, test a page, or test a web app
- User mentions QA, quality assurance, testing, test cases, code review
- User wants to inspect a page, debug via console logs, or validate behaviour in the browser
- User asks for regression testing, test coverage, or exploratory testing

**Rule:** If the user wants to test something in a browser — use this skill and run browser testing.

## Prerequisites

- **Browser MCP** — **mario-playwright-mcp** (recommended) or browsermcp in Cursor MCP config
- mario-playwright-mcp saves screenshots to disk for reports; agent must show which MCP is used before starting
- App reachable (e.g. dev server on localhost or deployed URL)

## Files

| File | Use |
|------|-----|
| `SKILL.md` | Main instructions for the agent |
| `STRUCTURE.md` | Output folder: `report/` + `browser/` under `QA-AGENT/<project>/test/<project>_<env>_<scope>_<timestamp>/` |
| `reference.md` | Best practices, principles, automation strategy |
| `examples.md` | Concrete MCP workflow examples (post-action, error overlay) |
| `assets/errors.template.md` | Errors with Screenshot column |
| `README.md` | This file — documentation for humans |

## Source

From [my-agent-skills](https://github.com/mariocosttaa/my-agent-skills):

```bash
git clone -b qa-agent https://github.com/mariocosttaa/my-agent-skills.git
cp -r my-agent-skills/qa-agent ~/.cursor/skills/
```
