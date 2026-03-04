# Skill: git-commits

Skill do Cursor para **mensagens de commit** e **fluxo de branches**: agrupamento de ficheiros, formato Conventional Commits, e workflow de checkout/stash/push para feature branches.

## Quando usar

- Escrever ou rever mensagens de commit.
- Decidir como agrupar ficheiros em commits.
- Mudar de branch levando alterações (stash → checkout → pop → commit → push).
- Seguir regras de commits do repositório.

## Conteúdo principal (SKILL.md)

- Perguntar idioma dos commits (EN ou outro) e, em dúvida, perguntar antes de agir.
- Guideline de agrupamento (foco por commit; número de ficheiros subjetivo).
- Formato: `type[(scope)]: description` + body em bullets.
- Tipos: feat, fix, docs, style, refactor, perf, test, ci, build, chore.
- Exemplos bons e maus.
- Workflow: stash → checkout → pop → commit → push para feature branch.
- Checklist antes de commitar.

## Ficheiros

- **SKILL.md** — Instruções para o agente.
- **reference.md** — Conventional Commits, SemVer, revert, estratégias de branch.
- **README.md** — Este ficheiro (para humanos; não injetado no agente).
