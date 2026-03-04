---
name: create-cursor-skill
description: >
  Guides users through creating Cursor Agent Skills from scratch. Use when the user wants to create
  a new skill, asks "how do I create a skill", "skill structure", "SKILL.md format", "where to put
  skills", or needs the full file structure, directory layout, frontmatter rules, optional .mdc rules
  context, README for skills, and best practices. Requires using Plan mode (Build) first to gather
  all requirements before implementing. Covers .agents/skills, .cursor/skills, SKILL.md frontmatter,
  references/, scripts/, assets/, and when to use skills vs .cursor/rules (.mdc).
---

# Create Cursor Skill

Guia para criar Agent Skills no Cursor seguindo o padrão oficial (agentskills.io) e as boas práticas.

---

## Antes de implementar: usar modo Plan (Build)

**Obrigatório** antes de criar ou escrever ficheiros da skill: garantir que se recolheu todo o contexto necessário.

1. **Sugerir ao utilizador** mudar para **Plan mode** no Cursor (`Cmd+.` / `Ctrl+.` → Plan, ou rotação com `Shift+Tab`) para a fase de descoberta.
2. No Plan mode (ou na primeira troca de mensagens), **recolher**:
   - Propósito e âmbito da skill (que tarefa/workflow cobre?)
   - Onde guardar: projeto (`.cursor/skills/` ou `.agents/skills/`) vs utilizador (`~/.cursor/skills/`)
   - Cenários de ativação (quando o agente deve aplicar a skill)
   - Conhecimento de domínio necessário (o que o agente não sabe à partida)
   - Preferências de formato de saída (templates, estilo)
   - Exemplos ou convenções existentes a seguir
3. **Só depois** de ter requisitos claros (e, se aplicável, plano revisto pelo utilizador), passar à implementação no Agent mode — criar pasta, SKILL.md, reference.md, README, etc.

Não avançar para criar ficheiros até que esta fase de descoberta esteja feita; caso falte informação, perguntar antes de continuar.

---

## Decisão rápida: Skill vs Rule (.mdc)

| Objetivo | Usar | Localização |
|----------|------|-------------|
| Capacidade reutilizável, carregada sob demanda | **Skill** | `.agents/skills/` ou `.cursor/skills/` ou `~/.cursor/skills/` |
| Instruções por projeto, globs, always apply | **Rule** | `.cursor/rules/*.mdc` ou `.cursor/rules/*.md` |

Skills são pacotes com `SKILL.md`; Rules são ficheiros `.mdc`/`.md` em `.cursor/rules/` com `description`, `globs`, `alwaysApply`. Ver [reference.md](reference.md) para detalhes de ambos.

---

## Estrutura obrigatória de uma Skill

Cada skill é uma **pasta** com um ficheiro **SKILL.md**:

```
skill-name/
├── SKILL.md              # Obrigatório — frontmatter YAML + instruções
├── reference.md          # Opcional — documentação detalhada
├── examples.md           # Opcional — exemplos de uso
├── README.md             # Opcional — para humanos (não injetado no agente)
├── scripts/              # Opcional — scripts executáveis
├── references/           # Opcional — ficheiros de referência (progressive disclosure)
└── assets/               # Opcional — templates, configs, imagens
```

**Regra:** O nome da pasta deve coincidir com o campo `name` do frontmatter (lowercase, hífens, máx. 64 caracteres).

---

## Onde guardar a skill

| Âmbito | Caminho |
|--------|---------|
| Projeto (repositório) | `.agents/skills/skill-name/` ou `.cursor/skills/skill-name/` |
| Utilizador (global) | `~/.cursor/skills/skill-name/` |

**Nunca** criar skills em `~/.cursor/skills-cursor/` — é reservado para skills internas do Cursor.

---

## SKILL.md — formato mínimo

```markdown
---
name: my-skill-name
description: Descrição curta do que a skill faz e quando o agente deve usá-la (máx. 1024 caracteres).
---

# Nome da Skill

## Instruções
Passo a passo para o agente.
```

### Frontmatter obrigatório

| Campo | Regras |
|-------|--------|
| `name` | Obrigatório. Lowercase, letras/números/hífens, máx. 64 caracteres. Deve coincidir com o nome da pasta. |
| `description` | Obrigatório. O que faz + quando ativar. Máx. 1024 caracteres. Em terceira pessoa (ex.: "Processes Excel files..." não "I process..."). |

### Frontmatter opcional

| Campo | Uso |
|-------|-----|
| `license` | SPDX ou referência a ficheiro de licença |
| `compatibility` | Agentes/ambiente compatíveis |
| `metadata` | author, version, tags |
| `disable-model-invocation` | Se `true`, a skill só é aplicada quando invocada explicitamente com `/skill-name` |

---

## Descrição eficaz

A descrição determina quando o agente aplica a skill. Incluir:

1. **O quê** — capacidades concretas.
2. **Quando** — termos de ativação (ex.: "Use when the user mentions PDF, Excel, deploy...").

Exemplo:

```yaml
description: >
  Analyzes Excel spreadsheets, creates pivot tables, generates charts.
  Use when working with .xlsx files, spreadsheets, or when the user asks for data analysis.
```

---

## Princípios ao escrever a skill

1. **Concisão** — só incluir o que o agente não sabe. Manter SKILL.md sob ~500 linhas.
2. **Progressive disclosure** — o essencial em SKILL.md; detalhes em `reference.md` ou `references/` e referenciar com links.
3. **Referências a um nível** — ligar de SKILL.md diretamente a ficheiros (ex.: `[reference.md](reference.md)`). Evitar árvores profundas.
4. **Sem paths Windows** — usar `scripts/helper.py`, nunca `scripts\helper.py`.

---

## Checklist antes de publicar

- [ ] Fase de descoberta feita (Plan/Build mode ou perguntas explícitas); requisitos claros antes de implementar
- [ ] `name` em lowercase com hífens, pasta com o mesmo nome
- [ ] `description` em terceira pessoa, com termos de ativação
- [ ] SKILL.md com instruções claras e passos concretos
- [ ] Documentação extra em reference(s) se necessário
- [ ] README.md opcional para quem navega a pasta
- [ ] Sem referências a `~/.cursor/skills-cursor/`

Para estrutura completa, .mdc vs skills, e exemplos, ver [reference.md](reference.md) e [examples.md](examples.md).
