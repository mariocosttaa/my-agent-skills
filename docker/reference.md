# Referência: Docker e Docker Compose

Padrões detalhados para a skill Docker: estrutura de ficheiros, overrides, variáveis e exemplos.

---

## 1. Estrutura de ficheiros por cenário

### Só desenvolvimento local
- Raiz do projeto: `docker-compose.yml` (e opcionalmente `docker-compose.override.yml` para overrides locais automáticos).
- `.env` (não commitado) e `.env.example` (commitado) na raiz.

### Local + produção (tudo na raiz)
- `docker-compose.yml` — base (serviços, env_file, ports com variáveis).
- `docker-compose.override.yml` — overrides de desenvolvimento (opcional; carregado automaticamente com `docker compose up`).
- `docker-compose.prod.yml` ou `docker-compose.local.yml` — overrides explícitos:
  - Produção: `docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d`
  - Local com overrides: `docker compose -f docker-compose.yml -f docker-compose.local.yml up -d`

### Local + produção (pasta docker/)
- Raiz: `docker-compose.yml` (e opcionalmente override) para desenvolvimento.
- `docker/` com ficheiros de produção, ex.: `docker/docker-compose.prod.yml`, para manter a raiz mais limpa ou quando a stack de produção é diferente.

---

## 2. Variáveis e .env

### Conteúdo típico de .env.example
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

# Opcional: para workers que ligam a serviços externos
# POSTGRES_HOST=gin-api-postgres
# POSTGRES_PORT=5432
# REDIS_HOST=gin-api-redis
# REDIS_PORT=6379
```

### Regras
- Ports no host: sempre via variável com default, ex.: `POSTGRES_HOST_PORT=5432`, `REDIS_HOST_PORT=6379`, `PORT=4444`.
- Passwords: sem valor default no Compose; obrigatório no `.env` (e documentado em `.env.example`).
- `.env` nunca no Git; `.env.example` sem valores reais, só placeholders.

---

## 3. docker-compose: padrões

### Serviço app com env e ports
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

### Postgres com healthcheck
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

### Redis (com password opcional)
```yaml
  redis:
    image: redis:7-alpine
    container_name: my-api-redis
    restart: unless-stopped
    ports:
      - "${REDIS_HOST_PORT:-6379}:6379"
    volumes:
      - my-api-redis:/data
    # Se precisar de password: command com variável do .env (REDIS_PASSWORD)
```

---

## 4. Worker que partilha rede/volumes com a API

Base (`docker-compose.yml`): worker com volumes próprios e variáveis para host/porta do Postgres/Redis.

Override local (`docker-compose.local.yml`): mesma rede e volume partilhado com a stack da API.

```yaml
# docker-compose.local.yml — override para desenvolvimento
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

Uso: criar rede e volume antes (uma vez):  
`docker network create gin-api_default` e `docker volume create gin-api_gin-api-static`.  
Depois: `docker compose -f docker-compose.yml -f docker-compose.local.yml up -d`.

---

## 5. Dockerfile: multi-stage (Node/Nest)

- **Stage 1 (builder):** instalar dependências (incl. dev para build), copiar código, correr build.
- **Stage 2 (production):** só runtime, artefactos do build, dependências de produção.

Exemplo resumido:
- Builder: `NODE_ENV=development yarn install --frozen-lockfile`, depois `yarn build`.
- Final: `COPY --from=builder /usr/src/app/dist ./`, `yarn install --production --frozen-lockfile`, `CMD` com pm2-runtime ou node.

Não colocar segredos em `ENV`/`ARG`; usar `env_file` ou secrets em runtime.

---

## 6. Precedência de variáveis (Compose)

Ordem (maior prioridade primeiro): argumentos da CLI → `environment` no ficheiro → `env_file` → variáveis de shell/`.env` na raiz.

Usar `env_file: .env` e, nos ports e variáveis sensíveis, interpolação `${VAR:-default}` no Compose; valores reais só no `.env`.

---

## 7. Comandos úteis

- Ver configuração resolvida: `docker compose config`
- Listar variáveis no contentor: `docker compose exec <service> env`
- Local: `cp .env.example .env` e editar `.env`; depois `docker compose up -d`
- Produção com override: `docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d`
