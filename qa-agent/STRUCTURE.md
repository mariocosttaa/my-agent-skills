# QA Agent — Output Structure

Folder layout for QA test output. Supports multiple projects and multiple test runs per project.

---

## Hierarchy

**Run folder name** — Include full context: `<project>_<env>_<scope>_<YYYY-MM-DD_HH-mm-ss>`  
Example: `gin_local_smoke_2026-03-05_12-50-49`

```
<workspace-root>/QA-AGENT/<project-name>/
├── project-context.md  — Project-level context (URL, env, key flows, notes)
└── test/<run-folder>/
    ├── task-plan.md    — Task/plan for this run: URL, date, scope, quick summary, links
    ├── report/
    │   ├── overview.md     — Full overview (plan, scope, summary)
    │   ├── errors.md       — Bugs/errors with screenshot links
    │   ├── suggestions.md  — Improvement suggestions
    │   └── test-results.md — Pass/fail per test
    └── browser/
        ├── screenshots/           — Screenshots taken during test
        ├── console-<context>.log  — Console logs per capture point (e.g. console-after-login.log)
        └── network-<context>.json — Network requests (API, status, response payloads)
```

---

## Conventions

| Part | Format | Example |
|------|--------|---------|
| project-name | lowercase, no spaces | `gin`, `my-app`, `example-com` |
| run folder | `{project}_{env}_{scope}_{timestamp}` | `gin_local_smoke_2026-03-05_12-50-49` |
| timestamp | `YYYY-MM-DD_HH-mm-ss` | `2026-03-05_12-30-00` |
| screenshot filename | `{page}-{area}-{what}.png` | `contract-created-error-overlay.png` |
| console filename | `console-{context}.log` | `console-after-login.log`, `console-dashboard.log` |
| network filename | `network-{context}.json` | `network-after-login.json`, `network-after-submit.json` |

---

## Rules

- **Never** save console or network files to the workspace root. Always use full paths inside `browser/`.
- **gitignore** — If the MCP creates `console-*.log` in the workspace root, add to project `.gitignore`: `console-*.log`
- Use **descriptive context** for console and network filenames, not timestamps.
- If `console-*.log` or similar files appear in workspace root (e.g. from MCP auto-save), delete or move them and add to `.gitignore` if applicable.

---

## Context reuse

- Previous runs under `QA-AGENT/<project>/test/` provide context for new sessions.
- Agent reads `project-context.md` and most recent `task-plan.md` + `report/overview.md` before starting.
- User can ask "continue from last run" or "new test run".
