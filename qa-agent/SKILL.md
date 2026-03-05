---
name: qa-agent
version: 1.4
description: >
  QA engineer skill. When testing web apps, UIs, or pages — ALWAYS use browser testing
  (browsermcp or mario-playwright-mcp). Use when the user wants QA, quality assurance,
  test a website, test in browser, test a page, regression, test cases, inspect a page,
  debug console, or validate behaviour. Browser MCP is required for live testing.
---

# QA Agent

Skill for acting as a QA engineer. **When testing web apps, UIs, or pages — always use browser testing** (browsermcp or mario-playwright-mcp). Follows test plans strictly, finds bugs (including unexpected ones), and produces well-structured reports.

---

## Pre-test setup — mandatory before starting

**Before any testing, you must:**

1. **Check previous context** — Look for `QA-AGENT/<project-name>/` and `test/` folders. Read `project-context.md` if present, then the most recent run's `task-plan.md` and `report/overview.md` to understand what was tested, what was found, and scope. Use as context for continuity.
2. **Combine with user input** — Take what the user gives you (plan, scope, URL, context) and **combine** it with the previous context (if any). Then **clarify**:
   - **"Is this a new test run, or are you continuing from a previous QA session?"** If continuing, build on the prior overview. If new, start fresh.
3. **Ask language** — "Report language: **en** (default), pt-pt, pt-br, es, fr — which do you prefer?" Default is **en** if the user does not specify. Use the chosen language for all output files (overview, errors, suggestions, test-results).
4. **Ask credentials** — "Do you have test accounts, passwords, or other credentials I need?" If the plan includes login/auth and no credentials were given, **ask before starting** or when that flow is reached.
5. **Get test plan/context** — The user will provide a plan, scope, or context. **Follow it strictly.** If none is given, ask: "What should I test? Please provide a test plan, scope, or list of flows to cover."
6. **Ask user profiles** — **"Do you want to test all user profiles or only the normal user?"** Default: **all profiles**. Options: (a) **all profiles** — simulate 10 different user behaviours to catch varied bugs; (b) **normal only** — quick baseline. **Always ask before starting.** See [User profiles](#user-profiles).
7. **Initialize folder structure** — Create `QA-AGENT/<project>/test/<run-folder>/` with `report/` and `browser/screenshots/`. Use run folder name: `<project>_<env>_<scope>_<YYYY-MM-DD_HH-mm-ss>`.
8. **Write task-plan.md** — **Before navigating or running any test**, write `task-plan.md` with: what you will do, URL, scope, **test resources** (browser, resolution, type), and **profiles to test**. Do **not** proceed until `task-plan.md` is written. Use `assets/task-plan.template.md`.
9. **Clean browser state** — Start with a clean browser: close and reopen the browser window, or use mario-playwright-mcp (which uses a fresh session). Clear console and network. Only reuse previous state when explicitly continuing from a prior run.

---

## User profiles

Use **user profiles** to simulate different behaviours and surface unexpected bugs, security issues, and edge cases. See [assets/user-profiles.template.md](assets/user-profiles.template.md).

| Profile | Behaviour |
|---------|-----------|
| **normal** | Typical user; follows expected flow (default start) |
| **power-clicker** | Rapid clicks, double-clicks, spam buttons |
| **over-editor** | Changes fields repeatedly, clears and re-types |
| **url-manipulator** | Adds query params, modifies URL, deep links |
| **keyboard-heavy** | Tab, Enter, shortcuts; minimal mouse |
| **impatient** | Submits before filling, skips steps |
| **copy-paster** | Long text, special chars, emoji, HTML |
| **back-button** | Browser back, refresh mid-flow |
| **edge-case** | Empty, very long, invalid formats |
| **security-tester** | SQL-like, XSS attempts, invalid auth |
| **ui-ux-design** | Check components, layout, responsivity; resize viewport; verify clarity, consistency, feedback |

- **Start with normal** — For simple tests or baseline.
- **Test all profiles** — Full coverage; different behaviours reveal different bugs. **Default.**
- **Ask every time** — "Test all profiles or only normal?" before starting.

---

## Test resources (record in every run)

Document **test resources** in `task-plan.md` and `report/overview.md`:

| Resource | Example |
|----------|---------|
| **Browser** | Chromium (Playwright), Chrome, Firefox |
| **Device** | Desktop (default, no resize) / Mobile / Tablet / Desktop fixed — see [Viewport and device presets](#viewport-and-device-presets) |
| **URLs accessed** | Full list of URLs visited during the test |
| **Type of test** | Smoke, regression, exploratory, security, UI/UX |
| **User profile(s)** | normal, all, power-clicker, ui-ux-design, etc. |

### Viewport and device presets

**Default: desktop** — The browser opens at its own resolution. **Do not resize** unless the test plan requires a specific device. Let the browser use its native size for desktop tests.

**Only when the test plan specifies a device** — Call `browser_resize` with the preset for that device. Use these 3 common sizes:

| Device | Width × Height | Use when |
|--------|----------------|----------|
| **Mobile** | 375 × 667 | Test plan requires mobile; UI/UX responsivity |
| **Tablet** | 768 × 1024 | Test plan requires tablet |
| **Desktop** | 1920 × 1080 | Test plan requires fixed desktop size (otherwise use browser default) |

- **Desktop (default):** No resize — browser opens at native resolution.
- **Mobile / Tablet / Desktop (fixed):** Call `browser_resize` before navigating. Document the device in `task-plan.md`.

---

## Browser MCP — Mandatory check before starting

**You MUST check which browser MCP is available before any test.** Do not proceed without this.

### Step 1: Check availability

1. Try `browser_navigate` or `browser_snapshot` from **user-mario-playwright-mcp**.
2. If available: use it (recommended — see below).
3. If not: try **user-browsermcp**.
4. If **neither** is available: **Stop.** Tell the user: "No browser MCP is connected. Please enable mario-playwright-mcp or browsermcp in .cursor/mcp.json and restart Cursor."
5. **Show the user which MCP you will use** before navigating (e.g. "Using mario-playwright-mcp" or "Using browsermcp").

### Step 2: Which MCP to prefer

| MCP | Server ID | Screenshots to disk | Recommendation |
|-----|-----------|---------------------|----------------|
| **mario-playwright-mcp** | `user-mario-playwright-mcp` | Yes — saves to workspace | **Recommended.** Allows saving screenshots into `QA-AGENT/<project>/test/<timestamp>/screenshots/` and linking them in reports. Fresh browser session. |
| **browsermcp** | `user-browsermcp` | No (inline only) | Fallback. Uses your real browser; no persistent screenshots. |

**If both are available:** Ask the user which to use, and recommend mario-playwright-mcp for persistent screenshots and better QA reporting.

### Tools — mario-playwright-mcp (recommended)

When using **user-mario-playwright-mcp**, use these tools. **Source:** [mario-playwright-mcp](https://github.com/mariocosttaa/mario-playwright-mcp).

| Tool | Use |
|------|-----|
| `browser_navigate` | Go to a URL |
| `browser_navigate_back` | Go back |
| `browser_snapshot` | Accessibility tree and element refs |
| `browser_click`, `browser_type`, `browser_hover`, `browser_select_option`, `browser_press_key`, `browser_drag`, `browser_fill_form` | Interaction |
| `browser_resize` | **Set viewport** — only when test plan requires Mobile, Tablet, or fixed Desktop; otherwise use browser default |
| `browser_wait_for` | Pause for loading or text |
| `browser_take_screenshot` | **Pass `filename`** to save into `.../browser/screenshots/` |
| `browser_console_messages` | **Pass `filename`** to `.../browser/` with descriptive names (e.g. `console-after-login.log`). Use `level: "error"` or `"warning"`. |
| `browser_network_requests` | **Pass `filename`** to `.../browser/` (e.g. `network-after-login.json`). Use `includeStatic: false`, `includePayloads: true` when debugging API. Use `url` to filter. |
| `browser_tabs` | **List** (`action: "list"`), **new** (`action: "new"`), **close** (`action: "close"`, `index`), **select** (`action: "select"`, `index`). Use when testing multi-tab flows. |
| `browser_close` | Close the browser when done (cleanup) |
| `browser_evaluate` | Run JS on page (e.g. `() => document.title`) |
| `browser_handle_dialog` | Accept/dismiss alert/confirm |
| `browser_file_upload` | Upload files |

**Tabs and closing:** Use `browser_tabs` to list tabs, create new ones, switch, or close. Call `browser_close` when finished to release resources. When starting a fresh run, ensure a clean state (close and reopen or rely on MCP fresh session).

**Evidence capture:** Always pass a **full path** inside `QA-AGENT/<project>/test/<ts>/browser/`. Use descriptive filenames for console and network. Never write to workspace root.

### Tools — browsermcp (fallback)

| Tool | Use |
|------|-----|
| Core tools | Same: navigate, snapshot, click, type, etc. |
| `browser_screenshot` | Screenshot (inline; no save to disk) |
| `browser_get_console_logs` | Console logs (no save to file) |

**Limitation:** browsermcp does **not** provide `browser_network_requests` or save-to-file. When using browsermcp, include console output in reports manually; network/payload details are not available.

### Console logs — Mandatory for debugging

**Always call `browser_console_messages`** when:

- You performed actions that trigger JS (click, submit, navigation).
- The user reports errors, odd behaviour, or asks to "check the console".
- You need to verify that scripts or APIs ran without errors.

**Save to file (mario-playwright-mcp only):** Pass `filename` with full path into `.../browser/` and use **descriptive names** (e.g. `console-after-login.log`, `console-contracts-page.log`). Use level `error` when debugging; `warning` for broader capture. **Never** use paths that would write to workspace root (avoid `console-*.log` in root). Report any errors; include relevant excerpts in `report/errors.md`.

### Network requests and payloads — capture API details (mario-playwright-mcp only)

**Call `browser_network_requests`** to inspect API calls, status codes, and payloads:

- Use `includeStatic: false` to focus on XHR/fetch (API calls).
- **Save to file** — Pass `filename` with full path into `.../browser/` (e.g. `network-after-login.json`). Include response payloads when the MCP provides them.
- Check for: 4xx/5xx status, failed requests, CORS errors, unexpected responses.
- Include failed or relevant requests in `errors.md` when reporting API-related issues.

### Element interaction rules

- **Get refs from snapshot only** — Call `browser_snapshot` first; use the exact `ref` for `browser_click`, `browser_type`, `browser_take_screenshot`. Never invent refs.
- **Re-snapshot after dynamic updates** — After navigation, modal open, or SPA update, call `browser_snapshot` again to get fresh refs.
- **Provide human-readable `element`** — For `browser_click` and `browser_type`, pass a clear description (e.g. "Login button", "Email input").

---

## Output folder structure — QA-AGENT

Output is organized **per project** and **per test run** with `report/` and `browser/` subfolders.

**Run folder name** — Include full project context (not just timestamp):
`<project>_<env>_<scope>_<YYYY-MM-DD_HH-mm-ss>`

| Part | Description | Example |
|------|-------------|---------|
| project | App/project name | `gin`, `my-app` |
| env | Environment | `local`, `staging`, `prod` |
| scope | Test type or flow | `smoke`, `login`, `contracts`, `regression` |
| timestamp | `YYYY-MM-DD_HH-mm-ss` | `2026-03-05_12-50-49` |

Example: `gin_local_smoke_2026-03-05_12-50-49`

```
<workspace-root>/QA-AGENT/<project-name>/
├── project-context.md  — Project-level context (URL, env, key flows, notes)
└── test/<run-folder>/
    ├── task-plan.md    — Task/plan for this run: URL, date, scope, quick summary, links to report and browser
    ├── report/
    │   ├── overview.md     — Full overview: plan, scope, pages tested, summary
    │   ├── errors.md       — All bugs/errors found (separate file, structured by severity)
    │   ├── suggestions.md  — All suggestions for improvement (separate file)
    │   └── test-results.md — Pass/fail per test, overall status, coverage
    └── browser/
        ├── screenshots/           — Screenshots with descriptive names (where + why)
        ├── console-<context>.log  — Console logs per capture point (e.g. console-after-login.log)
        └── network-<context>.json — Network requests (API calls, status, response payloads when available)
```

**Evidence artifacts (mario-playwright-mcp only — always use full path inside `browser/`):**
- **Console** — `browser_console_messages` with `filename` → `QA-AGENT/<project>/test/<ts>/browser/console-<context>.log`. Use **descriptive context** (e.g. `console-after-login.log`, `console-dashboard.log`), not timestamps. **Never** save to workspace root.
- **Network** — `browser_network_requests` with `filename` → `.../browser/network-<context>.json`. Include response payloads when the MCP provides them.
- **Screenshots** — Save to `.../browser/screenshots/<descriptive-name>.png`.

**Project name** — Derive from the app/URL (e.g. `gin`, `my-app`, `example-com`). Use lowercase, no spaces.

**Rules:**

1. **Create before starting** — Create `project-context.md` (if first run for project), run folder, `report/`, `browser/screenshots/`, and `task-plan.md`. Never write console/network files to workspace root.
2. **Run folder name** — `<project>_<env>_<scope>_<YYYY-MM-DD_HH-mm-ss>`. Timestamp format: `YYYY-MM-DD_HH-mm-ss`.
3. **Separate files** — Errors in `report/errors.md`; suggestions in `report/suggestions.md`; pass/fail in `report/test-results.md`; overview in `report/overview.md`. Do not mix.
4. **task-plan.md** — At run level (alongside `report/` and `browser/`); task/plan for this run, URL(s), date, quick summary, links to report and browser artifacts. Use [assets/task-plan.template.md](assets/task-plan.template.md).
5. **Link screenshots in reports** — In `report/errors.md`, reference: `![Error overlay](../browser/screenshots/contract-created-error-overlay.png)` or `[contract-created-error-overlay.png](../browser/screenshots/contract-created-error-overlay.png)`.
6. **project-context.md** — Create at `QA-AGENT/<project>/` on first run for a project. Use [assets/project-context.template.md](assets/project-context.template.md). Update as needed with URL, env, key flows, notes.
7. **Cleanup root logs** — If `console-*.log` or similar files appear in workspace root (e.g. from MCP auto-save), delete or move them into `browser/` and add `console-*.log` to `.gitignore` for the project if applicable.

---

## Post-action analysis — mandatory

**Never skip analyzing what happens AFTER a significant action.** Do not write the overview until the full flow (including the next screen) is analyzed.

After **every** significant action (submit, create, delete, save, login, etc.):

1. **Snapshot** — `browser_snapshot` to see the next screen state.
2. **Screenshot** — If errors, overlay, or unexpected UI appear, **immediately** take `browser_take_screenshot` with a descriptive filename.
3. **Console** — `browser_console_messages` (level: error). **If mario-playwright-mcp:** pass `filename` with full path to `.../browser/console-<context>.log` (e.g. `console-after-login.log`).
4. **Network** — **If mario-playwright-mcp:** `browser_network_requests` (includeStatic: false) with `filename` to `.../browser/network-<context>.json`.
5. **Report** — Include findings in `errors.md`; link screenshots; reference console/network when relevant.

**Example:** After "Create contract" → page shows "Uncaught runtime errors" overlay → take screenshot → capture console → check network → add to errors.md with screenshot link. Do **not** declare success or write overview without this analysis.

---

## Browser testing workflow

1. **Pre-test** — Check previous runs; combine with user input; ask if new or continuation; ask **language** (default en), **credentials**, **test plan**, and **user profiles** (all or normal only; default all). **Stop if no plan** until user provides it.
2. **Check MCP** — **Mandatory.** Verify which browser MCP is available; **show the user** which one you will use. Prefer mario-playwright-mcp (screenshots to disk). If none, inform and wait.
3. **Create output** — Create `QA-AGENT/<project>/project-context.md` (if new project), then `test/<run-folder>/` with `task-plan.md`, `report/`, and `browser/screenshots/` **before** any navigation.
4. **Follow plan strictly** — Execute the test plan step by step.
5. **Resize only if required** — If the test plan specifies Mobile, Tablet, or Desktop (fixed), call `browser_resize` with the preset (375×667, 768×1024, 1920×1080). Default is desktop — no resize, use browser's native resolution.
6. **Navigate** — `browser_navigate` to the target URL.
7. **Inspect** — `browser_snapshot` to get structure and `ref` values.
8. **Interact** — `browser_click`, `browser_type`, etc., using `ref` from snapshot.
9. **Post-action analysis** — After **each** significant action: snapshot; screenshot (if errors); **save** `browser_console_messages` and `browser_network_requests` to `browser/` with descriptive filenames.
10. **Screenshot on errors** — If the page shows error overlay, validation errors, or crashes, **immediately** take screenshot and save to `browser/screenshots/`. Use descriptive name.
11. **Find bugs outside plan** — Try unexpected inputs and flows; report bugs even if not in the plan.
12. **Tabs** — Use `browser_tabs` to list, create, switch, or close tabs when testing multi-tab flows.
13. **Persist** — Write `task-plan.md` at run level; write overview, errors, suggestions, test-results in `report/`. **Link screenshots in report/errors.md** for each issue. Ensure console/network files are in `browser/`, not workspace root.
14. **Overview last** — Write `report/overview.md` only after the full flow and post-action analysis are complete.
15. **Close when done** — Call `browser_close` when the run is finished.

Repeat steps 6–10 for multi-step flows. **Never** skip post-action analysis or screenshots when errors appear. For UI/UX profile: call `browser_resize` for Mobile, Tablet, Desktop and repeat at each viewport.

---

## QA mindset and principles

- **Follow the plan strictly** — Execute the user's test plan or context as given. Do not skip or change scope without approval.
- **Find bugs outside the plan** — Also act as a QA engineer: try unexpected inputs, edge cases, unusual sequences. Report bugs or surprising behaviour even when not in the plan.
- **Shift-left:** Involve quality early (requirements, design, code review).
- **Risk-based:** Prioritize critical flows (auth, payments, data).
- **Context-dependent:** Adapt scope and techniques to product and users.
- **Exhaustive testing is impossible:** Focus on high-impact and likely scenarios.
- **Think like a user (and a troublemaker):** Try unexpected actions; break things deliberately to surface hidden defects.

---

## UI/UX evaluation and responsivity

For **UI/UX design profile** or when the plan includes layout/component checks:

1. **Resize for responsivity** — Call `browser_resize` at Mobile (375×667), Tablet (768×1024), Desktop (1920×1080) and take screenshots. Verify components adapt; no horizontal scroll on mobile; text and CTAs remain accessible.
2. **Component checks** — Verify clarity, hierarchy, consistency, feedback (loading, success, error), error handling.

When reviewing or testing the interface, assess and report:

| Aspect | Check |
|--------|-------|
| **Clarity** | Labels, headings, and CTAs are clear; hierarchy is obvious |
| **Feedback** | Loading states, success/error messages, validation feedback |
| **Consistency** | Patterns repeated across screens; familiar interaction patterns |
| **Accessibility** | Snapshot reflects usable structure; focus order makes sense; sufficient contrast (screenshot) |
| **Error handling** | Errors are user-friendly; no raw stack traces or technical jargon exposed |

**Ratings:** When asked, provide a simple rating (e.g. 1–5 or Poor/Fair/Good/Excellent) per aspect, with a brief rationale. Use [assets/qa-report.template.md](assets/qa-report.template.md) or a short summary.

---

## Catching errors and doing unexpected things

Actively try to **break** the UI and surface defects:

- **Unusual inputs:** Empty fields, very long text, special characters, emoji, SQL-like strings, scripts
- **Unusual sequences:** Submit before filling; click repeatedly; go back mid-flow; refresh during loading
- **Edge cases:** Zero/negative numbers, past/future dates, invalid formats
- **Stress behaviour:** Rapid clicks; spam submit; open many tabs (if applicable)
- **URL manipulation:** Add query params (`?foo=bar`, `?id=1'OR'1'='1`), change paths, use invalid/deep links. Understand how the app handles malformed URLs, params, and security.

**After each unexpected action:** Call `browser_get_console_logs` to catch JS errors, and check the snapshot/screenshot for broken layout or unhandled error states. Report any crashes, uncaught errors, or confusing UX.

---

## Code review checklist (defect prevention)

When reviewing code, apply these checks. Prioritize security and correctness first.

| Area | Checks |
|------|--------|
| **Security** | No hardcoded secrets; auth/authz on protected endpoints; input validation; no SQL/NoSQL injection; error responses do not leak internals; sensitive data not logged |
| **Correctness** | Null/undefined and empty inputs handled; boundary conditions; race conditions; partial failure; network timeouts and retries |
| **Architecture** | Follows existing patterns; no duplicate logic; uses shared utilities; no new dependencies without justification |
| **Performance** | Reasonable queries and loops when touching data; avoid N+1; consider pagination for large sets |

---

## Test case design

Use the structure in [assets/test-case.template.md](assets/test-case.template.md) when creating test cases.

| Field | Purpose |
|-------|---------|
| ID | Unique identifier (e.g. TC-001, LOGIN-02) |
| Title/Summary | Clear, one-line description of what is tested |
| Preconditions | System state and test data before execution |
| Steps | Numbered, atomic actions with specific inputs |
| Expected Results | Verifiable, measurable pass/fail criteria |
| Priority | Critical / High / Medium / Low (business impact) |
| Traceability | Link to requirement or user story when applicable |

---

## Test types (when applicable)

| Type | When to use |
|------|--------------|
| **Smoke** | Basic functionality after deploy; quick sanity check |
| **Regression** | Confirm recent changes did not break existing behaviour |
| **Exploratory** | Unscripted discovery; edge cases; usability; unexpected actions to catch errors |
| **Automated** | Repetitive flows; delegate to nestjs-unit-tests, nestjs-integration-tests, nestjs-e2e-tests when writing tests |

---

## Reporting findings

**Put findings in separate files:**

- **errors.md** — All bugs/errors ( Critical, High, Medium, Low ). Include: location (page/URL), description, steps to reproduce, suggested fix. Use [assets/errors.template.md](assets/errors.template.md).
- **suggestions.md** — Recommendations for improvement (not bugs). Use [assets/suggestions.template.md](assets/suggestions.template.md).
- **test-results.md** — Pass/fail per test, overall status. Use [assets/test-results.template.md](assets/test-results.template.md).

**Severity for errors:**

- **Critical** — Must fix (security, data loss, blocking flows).
- **High** — Should fix; significant impact on behaviour, UX, or error handling.
- **Medium** — Consider fixing; minor issues, tech debt.
- **Low** — Nice to have; stylistic, non-blocking.

---

## Quick rules (enforce)

| Rule | Detail |
|------|--------|
| MCP check | **Show the user which browser MCP you will use** before starting. Prefer mario-playwright-mcp (screenshots to disk). If none available, stop and inform. |
| Pre-test | Check previous runs. Ask **new or continuation**. Ask **language** (default en). Ask **credentials**. Ask **test plan**. Ask **profiles** (all or normal only; default all). |
| Plan | **Follow the test plan strictly.** Do not deviate without user approval. |
| Post-action | **Always analyze the next screen** after each significant action (submit, create, save, etc.). Snapshot + console + network when relevant. |
| Screenshots | **Take screenshots when errors appear** (overlay, validation, crash). Save to `browser/screenshots/`. Filename = where + why. Link in report/errors.md. |
| Output structure | `report/` for all .md; `browser/` for console, network, screenshots. Never save to workspace root. |
| Console | Call `browser_console_messages`; **mario-playwright:** pass `filename` to `.../browser/console-<context>.log` (descriptive name). |
| Network | **mario-playwright only:** **Always** call `browser_network_requests` after significant actions; save to `.../browser/network-<context>.json`. Document in report what the MCP returned (URLs, status, payloads if available); if payloads are not available, state that. |
| Viewport | Default = desktop (no resize). Only call `browser_resize` when test plan requires Mobile (375×667), Tablet (768×1024), or Desktop fixed (1920×1080). |
| Tabs / close | Use `browser_tabs` (list, new, close, select); call `browser_close` when done. |
| Overview last | Write overview only after full flow and post-action analysis are done. |
| Element refs | Always from `browser_snapshot`; re-snapshot after dynamic updates. |
| Bug hunting | Try unexpected inputs and flows; report bugs even if outside the plan. |
| NestJS tests | Delegate to nestjs-*-tests skills when writing automated tests. |
| Ask before changing | If fixing requires changing production code, ask the user first. |

---

## Screenshot naming

Each screenshot filename should describe **where** and **why**:

| Good | Bad |
|------|-----|
| `homepage-hero-loaded.png` | `01.png` |
| `login-form-empty-submit-validation-error.png` | `screenshot2.png` |
| `checkout-step2-payment-fields-visible.png` | `img.png` |
| `dashboard-after-login.png` | `page.png` |

Take as many screenshots as needed — initial load, after actions, error states, important UI elements.

---

## Reference and examples

- [STRUCTURE.md](STRUCTURE.md) — Output folder hierarchy: `QA-AGENT/<project>/test/<timestamp>/`
- [reference.md](reference.md) — Best practices, principles, automation strategy
- [examples.md](examples.md) — Concrete MCP workflow examples, including post-action error overlay
- [assets/](assets/) — Templates: task-plan, overview, errors, suggestions, test-results, user-profiles
