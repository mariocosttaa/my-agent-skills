---
name: git-commits
description: >
  Guides Git commit messages and workflow: grouping changes, conventional commit format,
  branching (checkout, carry changes to feature branch, push). Use when the user wants to
  commit, write commit messages, follow commit rules, switch branches with uncommitted
  changes, or push to a feature branch. Always ask preferred commit language (English or
  other) and when in doubt ask before acting unless explicitly told to just do it.
---

# Git Commits & Branching

Skill para mensagens de commit consistentes, agrupamento de ficheiros e fluxo de branches (checkout com alterações, push para feature branch). Baseada em Conventional Commits e boas práticas de branching.

---

## Antes de agir: perguntar

1. **Idioma dos commits** — Perguntar sempre: "Queres as mensagens de commit em inglês ou noutra língua?" antes de redigir ou sugerir mensagens. Não assumir inglês por defeito.
2. **Em caso de dúvida** — Se não tiveres a certeza (ex.: como agrupar ficheiros, que tipo usar, se fazer um ou vários commits), **pergunta ao utilizador** em vez de avançar. Só avança sem perguntar se o utilizador disser explicitamente para "fazer" ou "aplicar" sem mais detalhes.

---

## Agrupamento de alterações (guideline, não rígido)

### Foco por commit
- **Agrupar ficheiros relacionados** que formam uma alteração lógica completa.
- **Manter cada commit focado** numa única mudança (atomic commits).
- **Não misturar** alterações não relacionadas no mesmo commit.

**Número de ficheiros:** Não há máximo fixo. Um valor de referência é ~5 ficheiros por commit quando faz sentido (ex.: Model + Resource + Controller + Request + Component da mesma feature). O limite é **subjetivo** e depende do diff: muitas alterações pequenas e relacionadas podem justificar um único commit; poucos ficheiros mas com mudanças muito distintas devem ser commits separados.

### Agrupar no mesmo commit quando:
- Mesma feature (ex.: Model + Resource + Controller + Request + Component).
- Correções de bug relacionadas em vários ficheiros.
- Refactor que afeta vários componentes relacionados.

### Commits separados quando:
- Bug fix isolado.
- Atualizações de documentação.
- Alterações de estilo.
- Features ou fixes não relacionados.

---

## Formato da mensagem de commit

### Estrutura (Conventional Commits + corpo em bullets)

```
type[(scope)]: brief description

- bullet point for each file/change
- keep it concise and clear
```

- **type** (obrigatório): ver lista abaixo.
- **scope** (opcional): parte do codebase afetada, ex. `feat(auth):`, `fix(api):`.
- **description**: resumo curto em modo imperativo ("add" não "added"); idioma conforme combinado com o utilizador (EN ou outro).
- **body** (opcional): bullets ou parágrafos com detalhe; usar bullets por ficheiro/alteração quando útil.

### Tipos (Conventional Commits)
- `feat:` Nova funcionalidade (MINOR em SemVer).
- `fix:` Correção de bug (PATCH em SemVer).
- `docs:` Documentação.
- `style:` Formatação/estilo (sem mudança de lógica).
- `refactor:` Refatoração.
- `perf:` Performance.
- `test:` Testes.
- `ci:` Configuração CI/CD.
- `build:` Build ou dependências.
- `chore:` Manutenção, configs, tarefas gerais.

### Breaking changes
- No **footer**: `BREAKING CHANGE: descrição`.
- Ou no prefixo: `feat(api)!: descrição` (o `!` antes dos `:`).

---

## Exemplos de mensagens

### Bom — ficheiros relacionados
```
feat: implement user management CRUD

- Add UserModel with relationships
- Create UserResource with ID hashing
- Add UserCreateRequest validation
- Implement UserCreateModal component
- Update PanelUsersController
```

### Bom — um ficheiro
```
fix: resolve date parsing in booking calendar

- Fix timezone handling in DateSelectionCalendar.tsx
```

### Bom — com scope e breaking change
```
feat(api)!: require auth for all endpoints

- Add middleware to protect routes
- Update OpenAPI spec

BREAKING CHANGE: unauthenticated requests now return 401
```

### Mau — muitos temas no mesmo commit
```
feat: various improvements

- Add user management
- Fix booking calendar
- Update documentation
- Refactor modal components
```

### Mau — descrição vaga
```
fix: stuff
```

---

## Workflow antes de commitar

1. Ver que ficheiros mudaram: `git status` (e opcionalmente `git diff`).
2. Agrupar ficheiros relacionados (respeitando a guideline de foco).
3. Escrever mensagem clara no formato acima (no idioma acordado).
4. Testar as alterações antes de commitar.

### Comandos úteis
```bash
git status
git add file1.php file2.php file3.php
git commit -m "type: description

- change 1
- change 2"
git push origin <branch-name>
```

---

## Branching: levar alterações para outra branch e push

Quando o utilizador quer **mudar de branch mas levar alterações** (não commitadas) para uma branch de feature e fazer push:

### Opção A — alterações já commitadas
- Fazer checkout da branch de destino (ex.: feature/xyz).
- Se as alterações foram feitas noutra branch: fazer merge ou rebase dessa branch em feature/xyz, depois `git push origin feature/xyz`.

### Opção B — alterações ainda não commitadas (stash)
1. Guardar alterações: `git stash push -u -m "descrição breve"` (inclui untracked com `-u`).
2. Mudar de branch: `git checkout feature/nome-da-feature` (ou `git switch feature/nome-da-feature`).
3. Aplicar o stash: `git stash pop` (ou `git stash apply` para manter o stash).
4. Resolver conflitos se aparecerem.
5. Commitar e push: `git add ...`, `git commit -m "..."`, `git push origin feature/nome-da-feature`.

### Nomes de branches (boas práticas)
- `feature/descricao` — nova funcionalidade.
- `bugfix/descricao` ou `fix/descricao` — correção de bug.
- `docs/descricao` — documentação.
- Evitar commits diretos em `main`/`master`; usar feature branches e merge/PR.

### Antes de push
- Atualizar a branch com o remoto se necessário: `git pull origin <branch> --rebase` (ou `git pull` conforme fluxo do projeto).
- Evitar `git commit --amend` em commits já pushed (quebra histórico partilhado).

---

## Boas práticas

### Fazer
- Commits atómicos (uma mudança lógica por commit).
- Mensagens descritivas no formato type: description (+ body).
- Testar antes de commitar.
- Usar o idioma acordado para mensagens.
- Branching por feature/fix; push para a branch correta.

### Evitar
- Muitos ficheiros não relacionados no mesmo commit.
- Mensagens vagas ("fix", "update").
- Misturar features e fixes no mesmo commit.
- Commitar sem testar.
- Amend em commits já pushed sem acordo de equipa.

---

## Checklist rápido antes de commitar

- [ ] Estes ficheiros são relacionados? (foco por commit)
- [ ] A mensagem está clara e no formato type: description?
- [ ] Usei o idioma combinado (EN ou outro)?
- [ ] Testei as alterações?
- [ ] O commit corresponde a uma única mudança lógica?

Quando houver dúvida: perguntar ao utilizador. Para mais detalhe (Conventional Commits, SemVer, revert), ver [reference.md](reference.md).
