# Referência: Skills vs Rules, Estrutura e Formatos

## 1. Workflow ao criar uma skill — Plan mode (Build) primeiro

Antes de implementar qualquer ficheiro da skill, usar **Plan mode** no Cursor (ou equivalente "Build") para recolher tudo o que é necessário:

- **Como ativar:** `Cmd+.` / `Ctrl+.` → escolher Plan; ou `Shift+Tab` para alternar modos.
- **Objetivo:** pesquisa no codebase, perguntas de clarificação ao utilizador e definição de um plano revisto antes de escrever código.
- **O que recolher:** propósito, âmbito, localização (projeto vs utilizador), triggers, conhecimento de domínio, formato de saída, exemplos existentes.
- **Regra:** não criar SKILL.md nem outros ficheiros até que a fase de descoberta esteja concluída. Só depois passar a Agent mode para implementar.

---

## 2. Onde vivem Skills e Rules

### Skills (SKILL.md)

| Âmbito | Caminho |
|--------|---------|
| Projeto | `.agents/skills/<skill-name>/` |
| Projeto | `.cursor/skills/<skill-name>/` |
| Utilizador (global) | `~/.cursor/skills/<skill-name>/` |

Compatibilidade: Cursor também carrega de `.claude/skills/` e `.codex/skills/` (e equivalentes em `~`).

Cada skill é uma **pasta** com ficheiro **SKILL.md** obrigatório.

### Rules (regras de projeto)

| Tipo | Localização |
|------|-------------|
| Project Rules | `.cursor/rules/` |

Ficheiros: **.mdc** (com frontmatter) ou **.md**. Podem estar em subpastas (ex.: `.cursor/rules/frontend/components.mdc`).

---

## 3. Estrutura completa de uma Skill

```
skill-name/
├── SKILL.md                 # Obrigatório
├── reference.md             # Opcional — referência detalhada
├── examples.md              # Opcional — exemplos
├── README.md                # Opcional — documentação para humanos
├── scripts/                 # Opcional — scripts executáveis
│   ├── deploy.sh
│   └── validate.py
├── references/              # Opcional — vários .md (progressive disclosure)
│   └── REFERENCE.md
└── assets/                 # Opcional — templates, configs, imagens
    └── config-template.json
```

- **SKILL.md**: instruções principais; manter focado e < ~500 linhas.
- **reference(s)** e **examples**: carregados sob demanda quando o agente segue links.
- **scripts/**: referenciar no SKILL.md com caminhos relativos (ex.: `scripts/deploy.sh`).
- **README.md**: não é injetado no agente; serve quem navega a pasta.

---

## 4. Formato SKILL.md — frontmatter

### Campos obrigatórios

```yaml
---
name: my-skill-name
description: O que a skill faz e quando o agente deve usá-la (máx. 1024 caracteres).
---
```

- **name**: identificador único; só letras minúsculas, números e hífens; máx. 64 caracteres; deve coincidir com o nome da pasta.
- **description**: em terceira pessoa; incluir termos de ativação (ex.: "Use when the user mentions X, Y, Z").

### Campos opcionais

| Campo | Descrição |
|-------|-----------|
| `license` | Licença (SPDX ou referência a ficheiro) |
| `compatibility` | Requisitos de ambiente / agentes compatíveis |
| `metadata` | author, version, tags, etc. |
| `disable-model-invocation` | Se `true`, a skill só é aplicada quando invocada com `/skill-name` |

---

## 5. Formato .mdc (Rules)

Rules vivem em `.cursor/rules/` e controlam quando são aplicadas via frontmatter.

### Estrutura de um .mdc

```markdown
---
description: Descrição para o agente decidir quando aplicar (Apply Intelligently).
globs: "*.ts"              # Opcional — aplicar quando ficheiro corresponder
alwaysApply: false         # true = aplicar em toda a sessão
---

# Conteúdo da regra em Markdown
- Instrução 1
- Instrução 2
```

### Tipos de ativação (via UI / propriedades)

| Tipo | Comportamento |
|------|----------------|
| Always Apply | `alwaysApply: true` — em toda a sessão |
| Apply Intelligently | Descrição boa; agente decide pela relevância |
| Apply to Specific Files | `globs` definido (ex.: `*.ts`, `src/**/*.tsx`) |
| Apply Manually | Aplicada quando @-mencionada no chat (ex.: `@my-rule`) |

### Boas práticas para .mdc

- Nomes em kebab-case (ex.: `typescript-standards.mdc`).
- Sempre extensão `.mdc` para regras com frontmatter.
- Regras focadas e acionáveis; evitar duplicar o que já está no código.
- Manter sob ~500 linhas; referenciar ficheiros com `@ficheiro` em vez de colar conteúdo.

---

## 6. Diferença prática: Skill vs Rule

| Aspeto | Skill | Rule (.mdc) |
|--------|--------|-------------|
| Ficheiro principal | SKILL.md dentro de pasta | .mdc ou .md em .cursor/rules/ |
| Estrutura | Pasta com SKILL.md + opcional scripts/references/assets | Ficheiro único (ou pasta com vários .mdc) |
| Descoberta | Por nome/descrição; ou `/skill-name` | Por description/globs/alwaysApply ou @rule |
| Uso típico | Workflows, domínios, scripts reutilizáveis | Padrões de código, convenções por projeto |
| Âmbito | Projeto ou utilizador (conforme pasta) | Projeto (`.cursor/rules/`) |

---

## 7. Progressive disclosure

- **Descoberta**: agente vê só `name` e `description` (~100 tokens).
- **Ativação**: quando relevante, carrega SKILL.md completo.
- **Execução**: segue instruções e abre ficheiros referenciados (reference.md, examples, scripts) só quando necessário.

Por isso: manter SKILL.md enxuto; detalhe em `reference.md` ou `references/*.md` e ligar com links de um nível.

---

## 8. Scripts em skills

- Colocar em `scripts/` e referenciar com caminhos relativos: `scripts/deploy.sh`, `python scripts/validate.py`.
- Scripts devem ser autocontidos, com mensagens de erro úteis.
- Documentar dependências (pacotes, ambiente) no SKILL.md ou em reference.

---

## 9. README.md na pasta da skill

- **Não** é injetado no contexto do agente.
- Serve para humanos: explicar propósito, estrutura da pasta, quando usar cada ficheiro.
- Útil em repositórios e em `~/.cursor/skills/` para documentação local.
