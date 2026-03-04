---
name: nestjs-e2e-tests
description: >
  Guides writing browser E2E tests with Playwright: Page Object Model (POM), selectors (data-testid,
  role, label), fixtures for auth/setup, and test structure. Use when creating or editing E2E tests
  that run in a real browser (frontend + API). Enforces POM, stable selectors, comments in English.
  Does not cover unit or API-only integration tests.
---

# E2E Tests (Browser) — Playwright

Skill para escrever testes E2E em browser com **Playwright**: **Page Object Model (POM)** obrigatório, seletores estáveis (data-testid, role, label), **fixtures** para autenticação/setup, e comentários em inglês. Foco em happy paths críticos do negócio.

---

## Ao criar ou editar testes: perguntar antes de executar e corrigir

1. **Executar e corrigir testes:** Ao criar ou alterar testes E2E, **perguntar** ao utilizador se quer que executes os testes e, se falharem, os corriga. Não assumir que deve correr e corrigir automaticamente.
2. **Alterar só ficheiros de teste (e2e/):** Se para fazer os testes passarem for necessário alterar **código fora da pasta E2E** (ex.: componentes do frontend, páginas, API, config), **não o faças**. Em vez disso, **pergunta** ao utilizador: explica o que está a falhar e que alteração noutro ficheiro seria necessária (ex.: adicionar `data-testid`, alterar texto ou fluxo), e pergunta se deseja que apliques essa alteração. É permitido alterar ficheiros dentro de `e2e/` (specs, pages, fixtures) para corrigir os testes.

Resumo: perguntar se deve testar e corrigir; ao corrigir, só mexer em ficheiros dentro de `e2e/`; qualquer mudança no frontend ou backend exige pergunta prévia.

---

## Ferramenta

- **Playwright** — consenso da comunidade para E2E em browser (auto-waiting, multi-browser, uma única suite).
- Não usar seletores CSS/XPath frágeis; preferir atributos e roles que resistam a mudanças de UI.

---

## Page Object Model (POM) — obrigatório

- **Problema:** Selectors espalhados nos testes quebram quando a UI muda (IDs, classes); manutenção difícil.
- **Solução:** Uma classe por página (ou secção relevante) que encapsula locators e ações. Os testes usam apenas a API do Page Object.

### Onde colocar
- **`e2e/pages/`** ou **`tests/pages/**`** — ex.: `login.page.ts`, `dashboard.page.ts`. Opcional: `base.page.ts` com métodos comuns (navegação, esperas).

### Regras
- Cada Page Object recebe `Page` do Playwright no construtor; expõe métodos como `goto()`, `login(email, password)`, `expectWelcomeMessage(name)`.
- **Selectors ficam só dentro do Page Object** — os specs não usam `page.getByTestId(...)` diretamente; usam `loginPage.login(...)`.
- Se um selector mudar, altera-se apenas no Page Object; os testes continuam válidos.

---

## Seletores — ordem de preferência

| Prioridade | Seletor | Exemplo | Quando usar |
|------------|---------|---------|-------------|
| 1.º | **data-testid** | `page.getByTestId('email-input')` | Elementos sem texto estável, listas, componentes dinâmicos. |
| 2.º | **Role + name** | `page.getByRole('button', { name: 'Login' })` | Botões, links, headings acessíveis. |
| 3.º | **Label** | `page.getByLabel('Email')` | Inputs associados a labels. |
| 4.º | **Text** | `page.getByText('Bem-vindo')` | Conteúdo visível estável. |
| Evitar | CSS / XPath | `page.locator('#btn-submit')` | Quebra com redesigns e refactors. |

- No código (Page Objects), preferir **data-testid** para inputs e botões de formulário quando o texto ou a estrutura mudar com frequência; usar **getByRole** e **getByLabel** para acessibilidade e estabilidade.
- Comentários no código devem indicar, se útil, por que se escolheu um seletor (ex.: "data-testid because label changes per locale").

---

## Estrutura de pastas

```
e2e/                          # ou playwright/ ou tests/e2e/
  tests/                      # specs
    auth/
      login.spec.ts
      register.spec.ts
    users/
      user-journey.spec.ts
  pages/                      # Page Objects (POM)
    login.page.ts
    dashboard.page.ts
    base.page.ts              # opcional: métodos comuns
  fixtures/                   # extensões do Playwright (auth, page objects)
    auth.fixture.ts           # authenticatedPage, loginPage, etc.
  utils/                      # opcional: factories, helpers
    data-factory.ts
  playwright.config.ts
```

- Specs em `e2e/tests/` (ou equivalente); Page Objects em `e2e/pages/`; fixtures em `e2e/fixtures/`.
- Nomes de ficheiros: `*.spec.ts` para testes; `*.page.ts` para Page Objects; `*.fixture.ts` para extensões do Playwright.

---

## Fixtures do Playwright — auth e setup repetido

- **Problema:** Fazer login (ou outro setup) em cada teste duplica código e torna os testes longos.
- **Solução:** Estender `test` do Playwright com **fixtures** que fornecem, por exemplo, uma página já autenticada ou Page Objects prontos a usar.

Exemplo de ideia (detalhes em [reference.md](reference.md)):
- Fixture `authenticatedPage`: antes de entregar a página ao teste, navega para login e preenche credenciais; o teste recebe já uma sessão autenticada.
- Fixtures `loginPage`, `dashboardPage`: constroem os Page Objects a partir de `page`, para usar como `test('...', async ({ loginPage, dashboardPage }) => { ... })`.

Assim evitas repetir o fluxo de login em dezenas de testes; mantém os specs focados na jornada a validar.

---

## Isolamento e estabilidade

- **Isolamento:** Cada teste deve ser independente (novo browser context; Playwright trata isto por defeito). Não depender da ordem de execução nem de estado deixado por outro teste.
- **beforeEach:** Se necessário, ir a uma URL base (ex.: `/`) ou limpar estado para garantir ponto de partida conhecido.
- **Dados:** Usar **factories** (como nos integration tests) para dados de teste; não hardcodar strings/objetos inline em muitos sítios.
- **O que testar:** **Happy paths críticos** — login/logout, registo, fluxos principais (ex.: checkout), permissões (admin vs user). Não usar E2E para edge cases; isso fica para unit/integration.

---

## Comentários (padrão igual às outras skills de testes)

- **Idioma:** Sempre **inglês**.
- **Estilo:** Uma ou duas linhas, objetivos.
- **Onde:** No topo do ficheiro ou do `describe` (o que está a ser testado); em Page Objects (responsabilidade da página); em fixtures (o que a fixture faz); em passos não óbvios dentro do teste.

---

## Regras rápidas

| Regra | Detalhe |
|-------|--------|
| Ferramenta | Playwright |
| Padrão | Page Object Model; seletores só dentro de pages |
| Seletores | data-testid > getByRole/getByLabel > getByText > evitar CSS/XPath |
| Estrutura | e2e/tests/, e2e/pages/, e2e/fixtures/ |
| Auth repetida | Fixtures (ex.: authenticatedPage) |
| Dados | Factories quando aplicável (reutilizar padrão dos integration tests) |
| Foco | Happy paths críticos; poucos testes E2E |
| Comentários | Inglês, 1–2 linhas, objetivos |

---

## Resumo

- **POM** para todas as páginas/fluxos testados; seletores estáveis (data-testid, role, label).
- **Fixtures** para login e Page Objects; specs limpos e sem repetição de setup.
- **Estrutura** clara: tests/, pages/, fixtures/, config.
- **Comentários** em inglês, concisos.

Ver [reference.md](reference.md) para exemplos completos de Page Object, fixture de auth e spec. Templates em `assets/`: `page.template.ts`, `auth.fixture.template.ts`, `playwright.config.snippet.ts`.
