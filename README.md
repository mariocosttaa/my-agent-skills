# my-agent-skills

**Cursor Agent Skills** — capabilities that guide the AI for specific tasks (commits, Docker, NestJS, QA, README, workflows). Follows [agentskills.io](https://agentskills.io).

[![Cursor](https://img.shields.io/badge/Cursor-Skills-0052CC?style=flat&logo=cursor)](https://cursor.com) [![agentskills.io](https://img.shields.io/badge/agentskills.io-format-green?style=flat)](https://agentskills.io)

---

## Rules vs Skills (Cursor)

| | Rules | Skills |
|---|-------|--------|
| **When** | Every prompt (or per file) | When relevant to the task |
| **Where** | `.cursor/rules/` (project) or `~/.cursor/rules/` (global) | `~/.cursor/skills/<name>/` or `.cursor/skills/<name>/` |
| **Structure** | Single `.mdc` file | Folder with `SKILL.md`, `reference.md`, `assets/` |

**Optional rule:** `no-commit-trailers.mdc` — never add `Made-with: Cursor` to commits. Create locally in `~/.cursor/rules/` for global effect.

---

## Skills

| Skill | Description | Install (latest) |
|-------|-------------|------------------|
| **create-cursor-skill** | Create new Cursor skills from scratch | `git clone https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/create-cursor-skill ~/.cursor/skills/` |
| **create-workflow** | Workflow skills (generic or repo-specific) | `git clone https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/create-workflow ~/.cursor/skills/` |
| **docker** | Docker, Dockerfile, docker-compose | `git clone https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/docker ~/.cursor/skills/` |
| **gin-workflow** | GIN workflow (Jira + repo) | `git clone https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/gin-workflow ~/.cursor/skills/` |
| **git-commits** | Commits, Conventional Commits, branching | `git clone https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/git-commits ~/.cursor/skills/` |
| **github-readme** | GitHub README structure and badges | `git clone https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/github-readme ~/.cursor/skills/` |
| **nestjs-e2e-tests** | E2E with Playwright (NestJS) | `git clone https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/nestjs-e2e-tests ~/.cursor/skills/` |
| **nestjs-integration-tests** | NestJS API + DB integration tests | `git clone https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/nestjs-integration-tests ~/.cursor/skills/` |
| **nestjs-unit-tests** | NestJS unit tests (Jest) | `git clone https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/nestjs-unit-tests ~/.cursor/skills/` |
| **qa-agent** | QA + browser testing, user profiles, test resources | `git clone https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/qa-agent ~/.cursor/skills/` |

**Install all:** `git clone https://github.com/mariocosttaa/my-agent-skills.git && cd my-agent-skills && cp -r create-* docker gin-workflow git-* github-readme nestjs-* qa-agent ~/.cursor/skills/`

Install per project: use `.cursor/skills/` instead of `~/.cursor/skills/`.

---

## MCP requirements

Some skills use **MCP (Model Context Protocol)**. You must enable the required MCP in `.cursor/mcp.json`.

| Skill | Required MCP | Purpose |
|-------|--------------|---------|
| **qa-agent** | **mario-playwright-mcp** or **browsermcp** | Browser testing (navigate, snapshot, screenshot, console, network). Without MCP, the skill cannot run browser tests. |

> Add the MCP server to `.cursor/mcp.json` and restart Cursor before using qa-agent for web testing.

---

## Versioning

- **Latest** — clone main (or skill branch for single skill). Skill root = current.
- **Specific version** — clone repo, checkout `versions` branch, use `<skill>/versions/vX.Y/` (e.g. `git-commits/versions/v1.0/`).

Each skill has a `versions/` folder. Released snapshots go in `versions/vX.Y/`.

---

## Repo

[https://github.com/mariocosttaa/my-agent-skills](https://github.com/mariocosttaa/my-agent-skills)
