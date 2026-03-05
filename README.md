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

**Optional global rule:** `no-commit-trailers.mdc` — never add `Made-with: Cursor` to commits. This repo includes it at `.cursor/rules/no-commit-trailers.mdc`. Copy to `~/.cursor/rules/` for global effect.

---

## Skills

| Skill | Description | Install |
|-------|-------------|---------|
| **create-cursor-skill** | Create new Cursor skills from scratch | `git clone -b create-cursor-skill https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/create-cursor-skill ~/.cursor/skills/` |
| **create-workflow** | Workflow skills (generic or repo-specific) | `git clone -b create-workflow https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/create-workflow ~/.cursor/skills/` |
| **docker** | Docker, Dockerfile, docker-compose | `git clone -b docker https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/docker ~/.cursor/skills/` |
| **gin-workflow** | GIN workflow (Jira + repo) | `git clone -b gin-workflow https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/gin-workflow ~/.cursor/skills/` |
| **git-commits** | Commits, Conventional Commits, branching | `git clone -b git-commits https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/git-commits ~/.cursor/skills/` |
| **github-readme** | GitHub README structure and badges | `git clone -b github-readme https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/github-readme ~/.cursor/skills/` |
| **nestjs-e2e-tests** | E2E with Playwright (NestJS) | `git clone -b nestjs-e2e-tests https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/nestjs-e2e-tests ~/.cursor/skills/` |
| **nestjs-integration-tests** | NestJS API + DB integration tests | `git clone -b nestjs-integration-tests https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/nestjs-integration-tests ~/.cursor/skills/` |
| **nestjs-unit-tests** | NestJS unit tests (Jest) | `git clone -b nestjs-unit-tests https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/nestjs-unit-tests ~/.cursor/skills/` |
| **qa-agent** | QA + browser testing, user profiles, test resources | `git clone -b qa-agent https://github.com/mariocosttaa/my-agent-skills.git && cp -r my-agent-skills/qa-agent ~/.cursor/skills/` |

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

- **`main`** — all skills, latest
- **`<skill-name>`** — that skill only, latest
- **`versions`** — tagged releases; use `git checkout <skill>/v1.x` for a specific version

---

## Repo

[https://github.com/mariocosttaa/my-agent-skills](https://github.com/mariocosttaa/my-agent-skills)
