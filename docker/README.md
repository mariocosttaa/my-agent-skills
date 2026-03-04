# Docker skill

Skill para o Cursor que guia a edição e gestão de **Docker**, **Dockerfile** e **docker-compose** seguindo boas práticas.

## O que faz

- **Recomenda** uso de `.env` (e `.env.example`) para ports, passwords e configuração — sem valores estáticos no Compose ou Dockerfile.
- **Orienta** a estrutura de ficheiros: tudo na raiz vs pasta `docker/` para produção.
- **Aplica** padrões de docker-compose: `env_file`, interpolação `${VAR:-default}`, healthchecks, volumes nomeados.
- **Aplica** padrões de Dockerfile: multi-stage, sem segredos em ENV/ARG, lockfile e build reproduzível.
- **Suporta** cenários local vs produção com overrides (`docker-compose.override.yml`, `docker-compose.prod.yml`, `docker-compose.local.yml`) e, quando fizer sentido, worker em rede/volumes partilhados.

## Quando é ativada

Quando o utilizador trabalha com Docker, Dockerfile, docker-compose, contentores ou deploy. A descrição da skill no Cursor determina a ativação automática.

## Ficheiros

| Ficheiro        | Uso |
|-----------------|-----|
| `SKILL.md`      | Instruções principais para o agente. |
| `reference.md`  | Padrões detalhados, exemplos de serviços, overrides e variáveis. |
| `README.md`     | Este ficheiro — documentação para humanos (não injetado no agente). |

## Uso manual

Podes invocar explicitamente a skill no chat (conforme suportado pelo Cursor) para garantir que as sugestões seguem estas convenções.
