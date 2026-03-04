---
name: github-readme
description: >
  Creates and improves GitHub README files with badges, description, Mermaid diagrams, preview images, objective, quick start, and examples. Use when the user wants to create a README, write a GitHub README, document a repo, add badges to README, or improve an existing README. Always asks questions first (build mode) before writing.
---

# GitHub README Skill

Cria e melhora READMEs de repositórios GitHub com estrutura profissional: badges, descrição, diagramas Mermaid, preview (imagem/GIF), objetivo, quick start e exemplos. **Modo build:** o agente pergunta antes de escrever e lembra que o utilizador pode alterar tudo.

---

## Regra obrigatória: perguntar antes de escrever

**Nunca** gerar o README completo de imediato. Operar em **modo build**:

1. **Antes de escrever**, fazer perguntas para recolher:
   - Nome do projeto/repositório
   - Linguagens, frameworks e libs principais (para badges)
   - Descrição curta (uma ou duas frases)
   - Objetivo principal do projeto
   - Passos de quick start (comandos, pré-requisitos)
   - Se precisa de diagrama Mermaid (fluxo, arquitetura, pipeline)
   - Se quer imagem ou GIF de preview da aplicação
   - Seções extras (comandos, estrutura do projeto, API, testes, licença)

2. **Resumir** as respostas e perguntar: *"Queres alterar algo antes de eu gerar o README?"*

3. **Só depois** de confirmar (ou do utilizador dizer para avançar), gerar o conteúdo do README.

4. **No final**, dizer que o README é um rascunho e que pode ser editado/alterado à vontade.

Se o utilizador já tiver dado todas as informações numa mensagem, ainda assim listar o que se vai usar e perguntar *"Confirmas ou queres alterar algo?"* antes de gerar.

---

## Estrutura do README

Seguir esta ordem e incluir apenas o que fizer sentido para o projeto. Ver [reference.md](reference.md) para exemplos e detalhes.

| Secção | Conteúdo |
|--------|----------|
| **Título** | Nome do projeto/repo (H1), opcionalmente com emoji (ex.: `# 🚀 Nome do Projeto`). |
| **Versão / tagline** | Linha opcional com versão ou frase curta em **negrito**. |
| **Badges** | Ícones de linguagens, libs e ferramentas (shields.io). Uma linha de badges, sem quebras. |
| **Descrição** | Um ou dois parágrafos: o que é o projeto, para quem é, destaque principal. |
| **Preview** | Se aplicável: imagem ou GIF da aplicação com legenda. |
| **Como funciona / Objetivo** | Explicação do fluxo, pipeline ou objetivo; opcionalmente com diagrama Mermaid ou imagem exportada. |
| **Quick start** | Pré-requisitos e passos numerados (clone, install, config, run). Com blocos de código quando fizer sentido. |
| **Comandos / Tabela** | Tabela de comandos úteis (ex.: `npm run X`, `rails Y`) se relevante. |
| **Estrutura do projeto** | Tabela ou árvore das pastas principais e o que fazem. |
| **Exemplos** | Exemplo mínimo de uso (comandos ou código). |
| **Limitações / Recomendações** | Opcional; só se fizer sentido. |
| **Licença** | Licença (ex.: MIT) e link para ficheiro LICENSE. |

---

## Badges (shields.io)

- Usar **uma linha** de badges, sem quebras, para linguagem, runtime, frameworks e libs principais.
- Formato típico: `[![Nome](URL-do-shield)](link-opcional)`
- Exemplos de texto: Node.js 18+, Rails 8, PostgreSQL, Docker, Mermaid, License MIT.
- Cores e estilo: manter consistente (for-the-badge ou flat; ver [reference.md](reference.md)).

---

## Mermaid e imagens

- **Mermaid:** Se o utilizador quiser diagrama (fluxo, pipeline, arquitetura), propor o código Mermaid e indicar que no GitHub o Mermaid é renderizado nativamente; para .docx ou outros contextos, pode ser necessário exportar PNG (ex.: `mermaid-cli`) e referenciar a imagem no README.
- **Preview:** Se houver imagem ou GIF de preview, colocar após a descrição, com legenda em *itálico*.

---

## Tom e estilo

- Linguagem clara e objetiva.
- Listas e tabelas para comandos e estrutura.
- Blocos de código com syntax highlighting (bash, javascript, etc.).
- Manter o README navegável: TOC opcional em projetos grandes.

---

## Após gerar

- Dizer ao utilizador que pode **alterar** qualquer parte.
- Se faltar algo (ex.: variáveis de ambiente, testes), sugerir que se pode acrescentar numa próxima iteração.

---

## Referências

- Estrutura detalhada e exemplos de blocos: [reference.md](reference.md).
