# Reference: Docker and Docker Compose

Detailed patterns for the Docker skill: file structure, overrides, variables, and examples.

---

## 1. File structure by scenario

### Local development only
- Project root: `docker-compose.yml` (and optionally `docker-compose.override.yml` for automatic local overrides).
- `.env` (not committed) and `.env.example` (committed) at root.

### Local + production (all at root)
- `docker-compose.yml` — base (services, env_file, ports via variables).
- `docker-compose.override.yml` — development overrides (optional; loaded automatically with `docker compose up`).
- `docker-compose.prod.yml` or `docker-compose.local.yml` — explicit overrides:
  - Production: `docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d`
  - Local with overrides: `docker compose -f docker-compose.yml -f docker-compose.local.yml up -d`

### Local + production (docker/ folder)
- Root: `docker-compose.yml` (and optional override) for development.
- `docker/` with production files, e.g. `docker/docker-compose.prod.yml`, to keep root cleaner or when production stack differs.

---

## 2. Variables and .env

### Typical .env.example contents
```bash
# App
PORT=4444
NODE_ENV=production

# Postgres
POSTGRES_USER=gin
POSTGRES_PASSWORD=change-me
POSTGRES_DATABASE=gin
POSTGRES_HOST_PORT=5432

# Redis
REDIS_HOST_PORT=6379
REDIS_PASSWORD=change-me

# Optional: for workers connecting to external services
# POSTGRES_HOST=gin-api-postgres
# POSTGRES_PORT=5432
# REDIS_HOST=gin-api-redis
# REDIS_PORT=6379
```

### Rules
- Host ports: always via variable with default, e.g. `POSTGRES_HOST_PORT=5432`, `REDIS_HOST_PORT=6379`, `PORT=4444`.
- Passwords: no default in Compose; required in `.env` (and documented in `.env.example`).
- `.env` never in Git; `.env.example` without real values, only placeholders.

---

## 3. docker-compose patterns

### App service with env and ports
```yaml
services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: my-api
    restart: unless-stopped
    env_file: .env
    environment:
      - NODE_ENV=production
      - POSTGRES_HOST=postgres
      - REDIS_HOST=redis
    ports:
      - "${PORT:-4444}:4444"
    volumes:
      - my-api-static:/usr/src/app/static
      - my-api-logs:/usr/src/app/logs
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started
```

### Postgres with healthcheck
```yaml
  postgres:
    image: postgres:15-alpine
    container_name: my-api-postgres
    restart: unless-stopped
    env_file: .env
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-gin}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DATABASE:-gin}
    ports:
      - "${POSTGRES_HOST_PORT:-5432}:5432"
    volumes:
      - my-api-pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $$POSTGRES_USER -d $$POSTGRES_DB"]
      interval: 5s
      timeout: 5s
      retries: 5
```

### Redis (with optional password)
```yaml
  redis:
    image: redis:7-alpine
    container_name: my-api-redis
    restart: unless-stopped
    ports:
      - "${REDIS_HOST_PORT:-6379}:6379"
    volumes:
      - my-api-redis:/data
    # If password needed: command with variable from .env (REDIS_PASSWORD)
```

---

## 4. Worker sharing network/volumes with API

Base (`docker-compose.yml`): worker with its own volumes and variables for Postgres/Redis host/port.

Local override (`docker-compose.local.yml`): same network and shared volume with the API stack.

```yaml
# docker-compose.local.yml — override for development
services:
  worker:
    volumes:
      - gin-api-static:/usr/src/app/static
      - gin-worker-logs:/usr/src/app/logs
    networks:
      - gin-api_default

networks:
  gin-api_default:
    external: true

volumes:
  gin-worker-logs:
  gin-api-static:
    external: true
    name: gin-api_gin-api-static
```

Usage: create network and volume first (once):  
`docker network create gin-api_default` and `docker volume create gin-api_gin-api-static`.  
Then: `docker compose -f docker-compose.yml -f docker-compose.local.yml up -d`.

---

## 5. Dockerfile: multi-stage (Node/Nest)

- **Stage 1 (builder):** install deps (incl. dev for build), copy code, run build.
- **Stage 2 (production):** runtime only, build artifacts, production deps.

Summary example:
- Builder: `NODE_ENV=development yarn install --frozen-lockfile`, then `yarn build`.
- Final: `COPY --from=builder /usr/src/app/dist ./`, `yarn install --production --frozen-lockfile`, `CMD` with pm2-runtime or node.

Do not put secrets in `ENV`/`ARG`; use `env_file` or runtime secrets.

---

## 6. Variable precedence (Compose)

Order (highest first): CLI args → `environment` in file → `env_file` → shell/.env variables at root.

Use `env_file: .env` and, for ports and sensitive vars, interpolation `${VAR:-default}` in Compose; real values only in `.env`.

---

## 7. Useful commands

- View resolved config: `docker compose config`
- List variables in container: `docker compose exec <service> env`
- Local: `cp .env.example .env` and edit `.env`; then `docker compose up -d`
- Production with override: `docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d`
