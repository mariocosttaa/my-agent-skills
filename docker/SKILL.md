---
name: docker
description: >
  Guides editing and managing Docker, Dockerfile, and docker-compose. Use when the user works with
  Docker, Dockerfile, docker-compose, containers, or deployment. Enforces .env for ports and
  secrets (no hardcoded values), recommends .env.example, and supports local vs production
  (override files, optional docker/ folder). Follows Docker and Compose best practices.
---

# Docker & Docker Compose

Skill para criar, editar e gerir Dockerfiles e docker-compose de forma segura e portável: variáveis em `.env`, sem ports ou passwords estáticos, e suporte a ambientes local vs produção.

---

## Princípios gerais

1. **Nunca** colocar ports, passwords, API keys ou outros segredos em valores estáticos no Compose ou Dockerfile.
2. **Recomendação:** usar ficheiro `.env` (e `.env.example` no repo) para ports, credenciais e configuração por ambiente.
3. No Compose: `env_file: .env` e interpolação `"${VAR:-default}"` para ports e variáveis.
4. No Dockerfile: não usar `ENV` para segredos; segredos só em runtime (env_file, secrets, etc.).

---

## Antes de editar: verificar o projeto

1. **Procurar** se já existe `.env`, `.env.example` ou `.env.local` na raiz (ou na pasta do serviço).
2. Se **não existir .env**:
   - Sugerir criar `.env.example` com variáveis documentadas (ports, `POSTGRES_PASSWORD`, `REDIS_PASSWORD`, etc.) e instruções tipo: `cp .env.example .env` e editar `.env`.
   - Nunca criar `.env` com valores reais no repo; apenas `.env.example` pode ser commitado.
3. Se o projeto tiver **só Docker local** → manter `docker-compose.yml` (e opcionalmente `docker-compose.override.yml`) na raiz.
4. Se houver **Docker para local e produção** (ou múltiplos ambientes):
   - **Opção A:** Ficheiros na raiz: `docker-compose.yml` (base), `docker-compose.override.yml` (local, auto-carregado), `docker-compose.prod.yml` ou `docker-compose.local.yml` para overrides explícitos.
   - **Opção B:** Pasta `docker/` com Compose de produção (ex.: `docker/docker-compose.prod.yml`) e manter na raiz o Compose de desenvolvimento. Usar quando a stack de produção for distinta ou para manter a raiz mais limpa.

Se não tiver a certeza entre A e B, preferir **Opção A** (tudo na raiz) e documentar no comentário do Compose o uso (ex.: `docker compose up` para local, `docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d` para produção).

---

## docker-compose: regras

### Ports
- Usar sempre variáveis com fallback: `"${PORT:-4444}:4444"`, `"${POSTGRES_HOST_PORT:-5432}:5432"`, `"${REDIS_HOST_PORT:-6379}:6379"`.
- Nunca fixar números na forma `"4444:4444"` sem variável.

### Credenciais e configuração
- `env_file: .env` no serviço.
- Em `environment`, usar interpolação: `POSTGRES_USER: ${POSTGRES_USER:-gin}`, `POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}` (sem default para passwords).
- Redis com password: usar variável no `.env` e, se necessário, `command: redis-server --requirepass ${REDIS_PASSWORD}` (garantir que REDIS_PASSWORD está no .env).

### Volumes
- Preferir **volumes nomeados** para dados que devem persistir entre deploys (ex.: `gin-api-pgdata`, `gin-api-static`).
- Bind mounts (ex.: `./static:/app/static`) apenas para desenvolvimento local quando fizer sentido; em overrides locais pode usar volumes externos partilhados (ex.: com outro repo na mesma rede).

### Healthchecks e depends_on
- Para Postgres/Redis: definir `healthcheck` e `depends_on` com `condition: service_healthy` ou `condition: service_started` conforme o serviço.

### Comentários no topo
- Incluir comentário breve: uso local (ex.: `cp .env.example .env && docker compose up -d`) e, se aplicável, referência a deploy (ex.: Coolify, outro repo).

---

## Dockerfile: regras

- **Multi-stage** quando houver build (ex.: Node/Nest): stage `builder` para instalar deps e compilar; stage final só com runtime e artefactos.
- **Base image:** preferir imagens oficiais e Alpine quando adequado (ex.: `node:18-alpine`).
- **Segredos:** não passar por `ARG`/`ENV` no build; usar secret mounts ou variáveis em runtime.
- **Lockfile:** usar `COPY package.json yarn.lock ./` (ou npm/pnpm equivalent) e `--frozen-lockfile` para builds reproduzíveis.
- **Build em stage builder:** se o build precisar de devDependencies (ex.: Nest CLI), usar `NODE_ENV=development` no `yarn install` do builder para não as omitir; no stage final usar `yarn install --production --frozen-lockfile`.
- **Ficheiros sensíveis:** garantir que `.env`, `.env.*` (exceto exemplo) e chaves não são copiados; usar `.dockerignore` e não fazer `COPY . .` indiscriminado com segredos na árvore.

Ver [reference.md](reference.md) para padrões de multi-stage, healthchecks e overrides.

---

## Override e múltiplos ficheiros

- **Local:** `docker compose up` carrega automaticamente `docker-compose.yml` + `docker-compose.override.yml` se existir.
- **Produção/outro ambiente:** `docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d`. O ficheiro que vem depois ganha em conflitos.
- **Worker/consumers** que partilham rede/volumes com a API: usar override (ex.: `docker-compose.local.yml`) que define `networks` e `volumes` externos, e documentar criação prévia: `docker network create ...`, `docker volume create ...`.

---

## Quando faltar informação

- Se não souberes a stack (ex.: só API ou API + Postgres + Redis), pergunta ou assume o mínimo (só o serviço principal).
- Se o utilizador não especificar ambiente (local vs prod), seguir as recomendações acima e deixar preparado para ambos (base + override) com variáveis no `.env`.

---

## Resumo de ficheiros a sugerir/criar

| Situação | Ação |
|----------|------|
| Sem `.env` nem `.env.example` | Criar `.env.example` com PORT, POSTGRES_*, REDIS_*, etc., e avisar para `cp .env.example .env`. |
| Ports ou passwords em claro no Compose | Substituir por `${VAR:-default}` e listar variáveis no `.env.example`. |
| Dockerfile com segredos em ENV/ARG | Remover e documentar uso de env_file/secrets em runtime. |
| Local + produção | Propor base + override (ex.: `docker-compose.local.yml` ou `docker-compose.prod.yml`) ou pasta `docker/` conforme opção A/B acima. |

Para exemplos completos e padrões de healthcheck/override, ver [reference.md](reference.md).
