# Docker skill

Cursor skill that guides editing and managing **Docker**, **Dockerfile** and **docker-compose** following best practices.

## What it does

- **Recommends** use of `.env` (and `.env.example`) for ports, passwords and config — no static values in Compose or Dockerfile.
- **Guides** file structure: everything at root vs `docker/` folder for production.
- **Applies** docker-compose patterns: `env_file`, `${VAR:-default}` interpolation, healthchecks, named volumes.
- **Applies** Dockerfile patterns: multi-stage, no secrets in ENV/ARG, lockfile and reproducible build.
- **Supports** local vs production with overrides (`docker-compose.override.yml`, `docker-compose.prod.yml`, etc.) and, when needed, worker with shared network/volumes.

## When it activates

When the user works with Docker, Dockerfile, docker-compose, containers or deploy. The skill description in Cursor determines automatic activation.

## Files

| File | Use |
|------|-----|
| `SKILL.md` | Main instructions for the agent. |
| `reference.md` | Detailed patterns, service examples, overrides and variables. |
| `README.md` | This file — documentation for humans (not injected into the agent). |

## Install

```bash
git clone -b docker https://github.com/mariocosttaa/my-agent-skills.git
cp -r my-agent-skills/docker ~/.cursor/skills/
```
