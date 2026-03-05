# User profiles for QA testing

Use different **user profiles** to simulate varied behaviours and uncover unexpected bugs, security issues, and edge cases. **Always ask the user** before starting: test **all profiles** or **only normal**? Default: all profiles. Start with **normal** for simple tests.

---

## Profiles

| Profile | Behaviour | Focus |
|---------|-----------|-------|
| **normal** | Typical user; follows expected flow, fills forms correctly | Baseline behaviour |
| **power-clicker** | Rapid clicks, double-clicks, spam buttons, impatient taps | Race conditions, debounce, duplicate submits |
| **over-editor** | Changes fields repeatedly, clears and re-types, edits everything | Auto-save, dirty state, validation on change |
| **url-manipulator** | Adds query params, changes paths, modifies URL, direct deep links | Routing, params handling, 404, security |
| **keyboard-heavy** | Tab, Enter, shortcuts; minimal mouse | Focus order, a11y, keyboard nav |
| **impatient** | Submits before filling, skips steps, rushes through | Validation, required fields, error states |
| **copy-paster** | Long text, special chars, emoji, HTML, scripts | Input validation, sanitization, XSS |
| **back-button** | Browser back, refresh mid-flow, resubmit | State restoration, back/forward, rehydration |
| **edge-case** | Empty, very long strings, negative numbers, invalid formats | Boundary handling, validation |
| **security-tester** | SQL-like strings, XSS attempts, invalid auth, weird payloads | Injection, auth bypass, security |
| **ui-ux-design** | Check components, layout, responsivity; resize viewport; verify clarity, consistency, feedback | UI/UX, component layout, mobile/desktop breakpoints |

---

## When to use

- **All profiles** — Full coverage; different behaviours reveal different bugs. **Default.**
- **Normal only** — Quick smoke or simple flow; baseline check.
- **Ask every time** — Never assume; always ask before starting tests.
