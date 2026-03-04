# NestJS Unit Tests skill

Skill para o Cursor que guia a escrita de **testes unitários** em NestJS com Jest.

## O que cobre

- **Posição do ficheiro:** junto ao código testado (co-location).
- **Nome do ficheiro:** `*.spec.ts` (ex.: `users.service.spec.ts`).
- **Sintaxe:** `Test.createTestingModule()`, mocks com `useValue` e `jest.fn()`, `afterEach(() => jest.resetAllMocks())`.
- **Comentários:** sempre em **inglês**, uma ou duas linhas, objetivos; presentes nos pontos que facilitam a leitura (describe, beforeEach, it, passos não óbvios).
- **O que testar:** Services, Controllers (com service mockado), Guards, Pipes, Interceptors. Não testar Modules nem métodos privados diretamente.

## O que não cobre

- Testes de **integração** (API + DB real, Supertest) — ver skill dedicada.
- Testes **E2E** (browser, Playwright/Cypress) — ver skill dedicada.

## Ficheiros

| Ficheiro       | Uso |
|----------------|-----|
| `SKILL.md`     | Instruções principais para o agente. |
| `reference.md` | Exemplos completos (service, controller, guard) com comentários. |
| `README.md`    | Este ficheiro — documentação para humanos. |

## Ativação

A skill é aplicada quando o utilizador cria ou edita testes unitários em projetos NestJS (ficheiros `*.spec.ts`, menção a unit tests, Jest, etc.).
