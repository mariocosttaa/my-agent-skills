# E2E Tests (Browser) skill

Skill para o Cursor que guia a escrita de **testes E2E em browser** com **Playwright**.

## O que cobre

- **Ferramenta:** Playwright (auto-waiting, multi-browser).
- **Page Object Model (POM):** Obrigatório; seletores e ações encapsulados em classes em `e2e/pages/`.
- **Seletores:** data-testid > getByRole/getByLabel > getByText; evitar CSS/XPath.
- **Fixtures:** Extensão do `test` para Page Objects e sessão autenticada (`authenticatedPage`), evitando repetir login.
- **Estrutura:** `e2e/tests/`, `e2e/pages/`, `e2e/fixtures/`; `playwright.config.ts`.
- **Comentários:** Em inglês, 1–2 linhas, objetivos.
- **Escopo:** Happy paths críticos (login, registo, fluxos principais, permissões); não edge cases.

## O que não cobre

- Testes **unitários** (ver skill nestjs-unit-tests).
- Testes de **integração só API** (ver skill nestjs-integration-tests).

## Ativação

A skill é aplicada quando o utilizador cria ou edita testes E2E em browser (Playwright, Page Objects, Cypress, fluxos de login/UI, etc.).
