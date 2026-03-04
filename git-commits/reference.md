# Referência: Git Commits & Branching

Detalhe complementar à skill git-commits (Conventional Commits, SemVer, revert, estratégias de branch).

---

## Conventional Commits (resumo)

Especificação: [conventionalcommits.org](https://www.conventionalcommits.org/)

- **Estrutura:** `<type>[(scope)]: <description>` + body opcional + footer opcional.
- **Types** usados na skill: feat, fix, docs, style, refactor, perf, test, ci, build, chore.
- **Scope:** substantivo que descreve a área (ex.: `parser`, `api`, `auth`).
- **BREAKING CHANGE:** no footer ou `!` após type/scope (ex.: `feat!:`).

---

## SemVer e tipos

- `fix` → PATCH (1.0.x)
- `feat` → MINOR (1.x.0)
- BREAKING CHANGE → MAJOR (x.0.0)

---

## Revert

Para reverter commits, pode usar o tipo `revert` e referenciar os SHAs no footer:

```
revert: let us never again speak of the noodle incident

Refs: 676104e, a215868
```

---

## Estratégias de branch (referência)

- **Git Flow:** main (produção), develop (integração), feature/*, bugfix/*, release/*.
- **GitHub Flow:** main + feature branches; deploy a partir de main.
- **Trunk-based:** main sempre deployável; branches de curta duração.

A skill não impõe uma estratégia; adaptar ao projeto (e perguntar se não houver convenção).

---

## Stash útil

- `git stash list` — listar stashes.
- `git stash drop` — remover último stash após pop.
- `git stash branch nome-branch` — criar branch e aplicar o stash (útil para não misturar com outro trabalho).
