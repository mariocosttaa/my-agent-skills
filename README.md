# my-skills

Cursor Agent Skills e Rules para personalizar o comportamento do AI.

## Como fazer download de uma skill

Cada skill tem a sua própria **branch**. Para descarregar só uma skill:

```bash
# Clonar e escolher a branch da skill
git clone -b <skill-name> https://github.com/<user>/my-skills.git
cd my-skills
```

Ou, se já tens o repo clonado:

```bash
git fetch origin
git checkout <skill-name>
```

### Branches disponíveis

| Branch | Skill |
|--------|-------|
| `create-cursor-skill` | Criar novas skills no Cursor |
| `docker` | Docker, Dockerfile, docker-compose |
| `gin-workflow` | Workflow GIN (Jira + repositório) |
| `git-commits` | Mensagens de commit e branching |
| `github-readme` | README do GitHub |
| `nestjs-e2e-tests` | E2E com Playwright (NestJS) |
| `nestjs-integration-tests` | Testes de integração NestJS |
| `nestjs-unit-tests` | Testes unitários NestJS |

A branch `main` contém todas as skills.

## Instalação no Cursor

Depois de descarregar, copia a pasta da skill para:

- **Global:** `~/.cursor/skills/<skill-name>/`
- **Por projeto:** `.cursor/skills/<skill-name>/` ou `.agents/skills/<skill-name>/`

Exemplo:

```bash
# Instalar docker skill globalmente
cp -r docker ~/.cursor/skills/
```
