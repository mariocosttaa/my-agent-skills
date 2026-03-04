# Exemplos de Skills bem estruturadas

## Exemplo 1 — Skill mínima

Pasta: `~/.cursor/skills/commit-helper/`

**SKILL.md:**

```markdown
---
name: commit-helper
description: Generates conventional commit messages by analyzing git diffs. Use when the user asks for help writing commit messages or reviewing staged changes.
---

# Commit Helper

1. Run `git diff --cached` (or `git status`) to see staged changes.
2. Summarize scope (e.g. feat, fix, docs) and short description.
3. Output in format: `type(scope): description` with optional body.
```

Estrutura de ficheiros:

```
commit-helper/
└── SKILL.md
```

---

## Exemplo 2 — Skill com referência e README

Pasta: `.cursor/skills/code-review/`

**SKILL.md:**

```markdown
---
name: code-review
description: Reviews code for quality, security, and maintainability. Use when reviewing pull requests, code changes, or when the user asks for a code review.
---

# Code Review

## Quick Start

1. Check correctness and edge cases.
2. Verify security (e.g. injection, XSS).
3. Assess readability and maintainability.
4. Ensure tests cover the changes.

## Feedback format

- 🔴 **Critical**: Must fix before merge
- 🟡 **Suggestion**: Consider improving
- 🟢 **Nice to have**: Optional

For detailed standards, see [STANDARDS.md](references/STANDARDS.md).
```

**references/STANDARDS.md** (conteúdo resumido): checklist de segurança, convenções de estilo, etc.

**README.md:** descrição da skill, quando usar, estrutura da pasta (para humanos).

Estrutura:

```
code-review/
├── SKILL.md
├── README.md
└── references/
    └── STANDARDS.md
```

---

## Exemplo 3 — Skill com scripts

Pasta: `.cursor/skills/deploy-app/`

**SKILL.md:**

```markdown
---
name: deploy-app
description: Deploys the application to staging or production. Use when the user mentions deployment, releases, or environments.
---

# Deploy App

## Usage

1. Run validation: `python scripts/validate.py`
2. Deploy: `./scripts/deploy.sh <environment>` (staging | production)
```

Estrutura:

```
deploy-app/
├── SKILL.md
├── scripts/
│   ├── validate.py
│   └── deploy.sh
└── README.md
```

---

## Exemplo 4 — Regra .mdc (Rule, não Skill)

Ficheiro: `.cursor/rules/typescript-standards.mdc`

```markdown
---
description: TypeScript and React conventions for this project. Use when editing .ts or .tsx files.
globs: "**/*.{ts,tsx}"
alwaysApply: false
---

# TypeScript Standards

- Use strict mode; avoid `any`.
- Prefer functional components and hooks in React.
- Export types from a dedicated types file per feature.
```

Isto é uma **Rule**, não uma Skill: vive em `.cursor/rules/`, usa `globs` e `alwaysApply`, e não tem pasta com SKILL.md.

---

## Resumo

| Exemplo | Conteúdo | Quando usar como modelo |
|---------|----------|-------------------------|
| 1 | Só SKILL.md | Skill muito simples, sem extras |
| 2 | SKILL + references + README | Skill com documentação detalhada |
| 3 | SKILL + scripts + README | Skill que executa scripts |
| 4 | .mdc em .cursor/rules/ | Regras de projeto (não skill) |
