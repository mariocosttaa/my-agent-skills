---
name: docker
description: >
  Guides editing and managing Docker, Dockerfile, and docker-compose. Use when the user works with
  Docker, Dockerfile, docker-compose, containers, or deployment. Enforces .env for ports and
  secrets (no hardcoded values), recommends .env.example, and supports local vs production
  (override files, optional docker/ folder). Follows Docker and Compose best practices.
---

# Docker & Docker Compose

Skill to create, edit and manage Dockerfiles and docker-compose in a secure, portable way: variables in `.env`, no static ports or passwords, support for local vs production environments.

---

## Required: questions before creating or editing

**Do not create or modify Docker files** until you clarify the context. Ask the user:

1. **Stack** — What services exist or should exist? (e.g. NestJS API, Postgres, Redis, workers, static frontend)
2. **Environment** — Local only, production only, or both? If both, how do they differ (override files, `docker/` folder)?
3. **Current state** — Do `.env`, `.env.example`, `docker-compose.yml` or Dockerfile already exist? What is missing or needs fixing?
4. **Secrets** — Are there ports, passwords or API keys in plain text that should go in `.env`?

### Overview before implementing

After gathering answers, **show the user** what will be done:

- Files to create or modify (e.g. `.env.example`, `docker-compose.yml`, `Dockerfile`)
- Proposed structure (e.g. base + override for local/prod)
- Variables that will go in `.env`
- Suggested commands (e.g. `cp .env.example .env && docker compose up -d`)

Only proceed after confirmation or explicit request to execute.

---

## General principles

1. **Never** put ports, passwords, API keys or other secrets in static values in Compose or Dockerfile.
2. **Recommendation:** use `.env` file (and `.env.example` in the repo) for ports, credentials and per-environment config.
3. In Compose: `env_file: .env` and interpolation `"${VAR:-default}"` for ports and variables.
4. In Dockerfile: do not use `ENV` for secrets; secrets only at runtime (env_file, secrets, etc.).

---

## Before editing: check the project

1. **Look for** existing `.env`, `.env.example` or `.env.local` at root (or in the service folder).
2. If **no .env**:
   - Suggest creating `.env.example` with documented variables (ports, `POSTGRES_PASSWORD`, `REDIS_PASSWORD`, etc.) and instructions like: `cp .env.example .env` and edit `.env`.
   - Never create `.env` with real values in the repo; only `.env.example` can be committed.
3. If the project has **only local Docker** → keep `docker-compose.yml` (and optionally `docker-compose.override.yml`) at root.
4. If there is **Docker for local and production** (or multiple environments):
   - **Option A:** Files at root: `docker-compose.yml` (base), `docker-compose.override.yml` (local, auto-loaded), `docker-compose.prod.yml` or `docker-compose.local.yml` for explicit overrides.
   - **Option B:** `docker/` folder with production Compose (e.g. `docker/docker-compose.prod.yml`) and keep development Compose at root. Use when the production stack differs or to keep root cleaner.

If unsure between A and B, prefer **Option A** (all at root) and document usage in a Compose comment (e.g. `docker compose up` for local, `docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d` for production).

---

## docker-compose: rules

### Ports
- Always use variables with fallback: `"${PORT:-4444}:4444"`, `"${POSTGRES_HOST_PORT:-5432}:5432"`, `"${REDIS_HOST_PORT:-6379}:6379"`.
- Never hardcode numbers like `"4444:4444"` without a variable.

### Credentials and config
- `env_file: .env` on the service.
- In `environment`, use interpolation: `POSTGRES_USER: ${POSTGRES_USER:-gin}`, `POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}` (no default for passwords).
- Redis with password: use variable in `.env` and, if needed, `command: redis-server --requirepass ${REDIS_PASSWORD}` (ensure REDIS_PASSWORD is in .env).

### Volumes
- Prefer **named volumes** for data that must persist between deploys (e.g. `gin-api-pgdata`, `gin-api-static`).
- Bind mounts (e.g. `./static:/app/static`) only for local development when it makes sense; in local overrides you can use external shared volumes (e.g. with another repo on the same network).

### Healthchecks and depends_on
- For Postgres/Redis: define `healthcheck` and `depends_on` with `condition: service_healthy` or `condition: service_started` as appropriate for the service.

### Top comments
- Include a brief comment: local usage (e.g. `cp .env.example .env && docker compose up -d`) and, if applicable, deployment reference (e.g. Coolify, another repo).

---

## Dockerfile: rules

- **Multi-stage** when there is a build (e.g. Node/Nest): `builder` stage to install deps and compile; final stage only with runtime and artifacts.
- **Base image:** prefer official images and Alpine when suitable (e.g. `node:18-alpine`).
- **Secrets:** do not pass via `ARG`/`ENV` in build; use secret mounts or variables at runtime.
- **Lockfile:** use `COPY package.json yarn.lock ./` (or npm/pnpm equivalent) and `--frozen-lockfile` for reproducible builds.
- **Build in builder stage:** if the build needs devDependencies (e.g. Nest CLI), use `NODE_ENV=development` in the `yarn install` of the builder so they are not omitted; in the final stage use `yarn install --production --frozen-lockfile`.
- **Sensitive files:** ensure `.env`, `.env.*` (except example) and keys are not copied; use `.dockerignore` and avoid indiscriminate `COPY . .` with secrets in the tree.

See [reference.md](reference.md) for multi-stage patterns, healthchecks and overrides.

---

## Override and multiple files

- **Local:** `docker compose up` automatically loads `docker-compose.yml` + `docker-compose.override.yml` if it exists.
- **Production/other environment:** `docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d`. The file that comes later wins on conflicts.
- **Workers/consumers** that share network/volumes with the API: use override (e.g. `docker-compose.local.yml`) that defines external `networks` and `volumes`, and document prior creation: `docker network create ...`, `docker volume create ...`.

---

## When information is missing

- If you do not know the stack (e.g. API only or API + Postgres + Redis), ask or assume the minimum (only the main service).
- If the user does not specify environment (local vs prod), follow the recommendations above and leave it ready for both (base + override) with variables in `.env`.

---

## Summary of files to suggest/create

| Situation | Action |
|-----------|--------|
| No `.env` or `.env.example` | Create `.env.example` with PORT, POSTGRES_*, REDIS_*, etc., and advise `cp .env.example .env`. |
| Ports or passwords in plain text in Compose | Replace with `${VAR:-default}` and list variables in `.env.example`. |
| Dockerfile with secrets in ENV/ARG | Remove and document use of env_file/secrets at runtime. |
| Local + production | Propose base + override (e.g. `docker-compose.local.yml` or `docker-compose.prod.yml`) or `docker/` folder per option A/B above. |

For complete examples and healthcheck/override patterns, see [reference.md](reference.md).
