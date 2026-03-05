# QA Agent — Reference

Detailed QA best practices used as context for the skill.

---

## Software Testing Principles

1. **Testing shows presence of defects** — Testing finds bugs but cannot prove software is defect-free.
2. **Exhaustive testing is impossible** — Focus on high-impact and likely scenarios; use risk assessment.
3. **Early testing saves time and money** — Shift-left; involve QA in requirements and design.
4. **Defect clustering** — Most bugs concentrate in few modules; focus effort there.
5. **Pesticide paradox** — Same tests stop finding new issues; refresh and diversify coverage.
6. **Testing is context dependent** — Tailor scope and techniques to product, users, regulations.
7. **Absence-of-errors fallacy** — Passing tests do not guarantee user or business value.

---

## Browser MCP — Usage Notes

### Snapshot and element refs

- `browser_snapshot` returns an accessibility tree and `ref` values for interactive elements.
- Use the exact `ref` from the snapshot for `browser_click` and `browser_type`; do not invent refs.
- If the page updates after an action (navigation, modal, SPA update), call `browser_snapshot` again.
- The snapshot is the single source of truth for element references.

### Console logs

- Call `browser_console_messages` (or `browser_get_console_logs`) after actions that trigger JS.
- Use level `error` to focus on failures. Interpret stack traces; report issues with severity and suggested fix.
- Console logs validate that scripts and APIs run correctly; use them for debugging and extra context.

### Network requests

- Call `browser_network_requests` (includeStatic: false) when debugging API flows.
- Check for 4xx/5xx status, failed requests, or unexpected payloads.
- Optionally save to file with `filename` for later analysis or reports.

### Screenshot vs snapshot

- **Snapshot** — Structure and element references; use for interaction and automation.
- **Screenshot** — Visual state; use when the user needs a visual check or documentation.

### Waits and dynamic content

- Use `browser_wait` when the page loads data asynchronously or has transitions.
- After `browser_wait`, call `browser_snapshot` to refresh element refs before interacting.

---

## Test Automation Strategy

- Automate repetitive tests (regression, smoke, sanity).
- Complement automation with manual and exploratory testing.
- Use Page Object Model and stable selectors (data-testid, role, label) when writing E2E code.
- Integrate tests into CI/CD for continuous feedback.
- Fix flaky tests; avoid brittle selectors (CSS classes, IDs that change often).

---

## Risk-based prioritisation

Prioritize tests by impact:

| Priority | Examples |
|----------|----------|
| Critical | Auth, payments, data persistence, security |
| High | Core user flows, integrations, permissions |
| Medium | Secondary flows, edge cases |
| Low | Cosmetic, non-blocking UX |

---

## UI/UX evaluation criteria

| Criterion | Questions to answer |
|-----------|---------------------|
| Clarity | Can the user understand what to do without guessing? |
| Feedback | Are loading, success, and error states visible and helpful? |
| Consistency | Are patterns (buttons, forms, navigation) repeated across screens? |
| Error handling | Are error messages user-friendly, not technical? |
| Accessibility | Does the snapshot show logical structure? Is content reachable? |

**Rating scale (when requested):** Poor (1) → Fair (2) → Good (3) → Very Good (4) → Excellent (5). Provide one-line rationale per aspect.

---

## Catching errors — unexpected and adversarial testing

| Strategy | Examples |
|----------|----------|
| Empty / missing input | Submit forms empty; omit required fields |
| Invalid formats | Wrong date format; letters in number fields; malformed email |
| Boundary values | Zero, negative, very large numbers; max length strings |
| Special characters | `<>"'&`, emoji, SQL snippets, script-like strings |
| Unusual sequences | Submit before load; double-click submit; back button mid-flow |
| Rapid interaction | Spam click; type very fast; submit multiple times |

After each action: check `browser_get_console_logs` and snapshot for crashes, uncaught errors, or broken UI.

---

## QA Best Practices Summary

| Practice | Description |
|----------|-------------|
| Shift-left | Test early in the lifecycle |
| Risk-based | Prioritize critical features and flows |
| Continuous testing | Integrate tests into CI/CD |
| Collaboration | Work with developers and stakeholders |
| Security | Include security checks in test strategy |
| Accessibility | Consider WCAG and inclusive design |
| Real devices | Test on production-like environments when possible |
| Console-first debugging | Use `browser_get_console_logs` to surface JS errors and API behaviour |
| UI/UX evaluation | Assess clarity, feedback, consistency, error handling, accessibility |
| Unexpected testing | Try unusual inputs and sequences to catch hidden errors |
