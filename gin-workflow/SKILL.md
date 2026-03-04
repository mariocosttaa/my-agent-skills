---
name: gin-workflow
description: Planificação e execução rápida do fluxo de trabalho por requisito no projeto GIN (Jira + repositório). Usar quando o utilizador indicar um requisito Jira (ex. GIN-AZ-42), pedir para criar/abrir uma feature, escrever requisitos.md ou implementacao.md, atualizar o README, ou seguir o workflow de desenvolvimento por requisito. Ao trabalhar no README, usar a skill github-readme para mantê-lo simples e organizado e ligar aos ficheiros requisitos.md e implementacao.md.
---

# GIN Workflow — Requisito → Implementação

Fluxo de trabalho por requisito: do registo no Jira até à integração no repositório. Os ficheiros `requisitos.md` e `implementacao.md` são **sempre em português de Portugal** e fazem parte permanente do repositório.

## Ciclo de vida do requisito (referência)

| Passo | Onde | O que fazer |
|-------|------|-------------|
| 1 | Jira | Registar o requisito como issue; anotar o código (ex.: GIN-AZ-42). |
| 2 | Jira/Kanban | Ao iniciar desenvolvimento, mover a issue para "Em progresso". |
| 3 | Repositório | Criar a feature branch: `git checkout -b GIN-AZ-42`. |
| 4 | Repositório | Criar o directório da feature: `/GIN-AZ-42/`. |
| 5 | Ficheiro .md | Criar `GIN-AZ-42/requisitos.md` com a descrição do requisito (pt-PT). |
| 6 | Código | Implementar; commits granulares e descritivos na branch. |
| 7 | Ficheiro .md | Ao concluir, preencher/organizar `GIN-AZ-42/implementacao.md` (pt-PT). |
| 8 | Jira + Repo | Mover a issue para "Concluído"; abrir pull request. |

---

## Comportamento do agente

### Quando o utilizador entrega o requisito

1. **Identificar o código Jira** (ex.: GIN-AZ-42). Se não for dado, perguntar.
2. **Criar a estrutura** (se ainda não existir):
   - Branch: `git checkout -b GIN-AZ-42` (a partir da branch de desenvolvimento adequada).
   - Directório: `/<código-jira>/` (ex.: `/GIN-AZ-42/`).
3. **Criar `requisitos.md`** dentro desse directório:
   - Conteúdo: **Descrição do requisito** em pt-PT (texto que o utilizador forneceu ou que migraste do documento de requisitos).
   - Formato livre mas claro; pode usar secções (objectivo, critérios de aceitação, notas).
4. **Criar `implementacao.md`** no mesmo directório:
   - Inicialmente **vazio** ou com apenas o cabeçalho/template mínimo abaixo.
5. Confirmar ao utilizador: directório criado, `requisitos.md` com a descrição, `implementacao.md` vazio/pronto a preencher.

### Durante a implementação

- O utilizador pode dar indicações, restrições ou preferências; o agente pode perguntar quando for útil.
- **Atualizar `implementacao.md`** à medida que se implementa: o que foi feito, decisões técnicas, ficheiros alterados, notas.
- Manter commits granulares e mensagens descritivas na branch da feature.

### Ao concluir a implementação

- **Revisar e organizar `implementacao.md`**: tornar o texto conciso e estruturado (resumo do implementado, alterações principais, notas para consulta futura).
- Garantir que está em **português de Portugal**.
- Não remover informação importante; apenas organizar e resumir.
- **Atualizar o README** do repositório (ver secção abaixo).

---

## README do repositório

- **Quando:** Ao criar uma nova feature (directório + `requisitos.md`/`implementacao.md`) ou ao concluir implementação, o agente deve **propor ou aplicar alterações ao README** para que este continue simples e organizado.
- **Como:** Usar a skill **github-readme** ao trabalhar no README: seguir a sua estrutura (descrição, quick start, secções claras) e tom. Perguntar antes de reescrever o README inteiro, conforme essa skill.
- **Conteúdo obrigatório no README:** Incluir uma secção que **refira ou ligue** aos ficheiros de requisito e implementação por feature, por exemplo:
  - **"Requisitos e implementação"** (ou nome equivalente): indicar que cada feature tem a sua pasta (ex.: `GIN-AZ-42/`) com:
    - `requisitos.md` — descrição do requisito (pt-PT);
    - `implementacao.md` — resumo do que foi implementado (pt-PT).
  - Opcionalmente: lista ou tabela com links para cada feature, e.g. `[GIN-AZ-42](GIN-AZ-42/requisitos.md)` e `[Implementação GIN-AZ-42](GIN-AZ-42/implementacao.md)`, ou instrução clara do tipo "em cada pasta `<código-jira>/` existem `requisitos.md` e `implementacao.md`".
- Objetivo: quem abre o repositório encontra no README a explicação do projeto e, na mesma secção ou próxima, onde estão os requisitos e a documentação de implementação.

---

## Templates (pt-PT)

### Estrutura mínima para `requisitos.md`

```markdown
# [Código Jira] — Descrição breve

## Descrição do requisito

[Texto do requisito em português de Portugal.]

## Critérios de aceitação / notas

- (opcional)
```

### Estrutura mínima para `implementacao.md` (início vazio ou com cabeçalho)

```markdown
# Implementação — [Código Jira]

## Resumo

[Preencher ao concluir.]

## Alterações realizadas

[Preencher durante e ao concluir.]

## Notas

[Opcional.]
```

Durante o trabalho, o conteúdo pode ser mais extenso; na conclusão, condensar num resumo organizado e conciso.

---

## Regras rápidas

- **Idioma**: `requisitos.md` e `implementacao.md` sempre em **português de Portugal**.
- **Localização**: ambos no directório da feature, e.g. `GIN-AZ-42/requisitos.md` e `GIN-AZ-42/implementacao.md`.
- **Branch**: nome igual ao código Jira (ex.: `GIN-AZ-42`).
- **Commits**: granulares e descritivos na branch da feature.
- **README**: ao criar ou concluir uma feature, atualizar o README; usar a skill **github-readme** para mantê-lo simples e organizado; incluir secção que ligue ou refira `requisitos.md` e `implementacao.md` de cada feature.
