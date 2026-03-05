# docker

Cursor skill for **Docker**, **Dockerfile** and **docker-compose** — best practices, .env usage, local vs production.

## What this skill does

- **Env vars** — `.env` and `.env.example` for ports, secrets; no hardcoded values in Compose or Dockerfile.
- **Structure** — Root layout vs `docker/` folder for production.
- **Compose** — `env_file`, `${VAR:-default}`, healthchecks, named volumes.
- **Dockerfile** — Multi-stage builds, no secrets in ENV/ARG, reproducible builds.
- **Overrides** — `docker-compose.override.yml`, `docker-compose.prod.yml` for local vs prod.

## When to use

- Docker, Dockerfile, docker-compose, containers, deploy.

## Files

| File | Use |
|------|-----|
| `SKILL.md` | Agent instructions |
| `reference.md` | Patterns, service examples, overrides |

## Install

**Latest:**
```bash
git clone https://github.com/mariocosttaa/my-agent-skills.git
cp -r my-agent-skills/docker ~/.cursor/skills/
```

**Specific version:** clone repo → checkout `versions` → copy `docker/versions/vX.Y/` to `~/.cursor/skills/docker/`.

---

→ [See all skills](https://github.com/mariocosttaa/my-agent-skills)
