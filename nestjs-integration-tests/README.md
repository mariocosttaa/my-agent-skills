# NestJS Integration Tests skill

Skill para o Cursor que guia a escrita de **testes de integração** em NestJS (API + DB), com Supertest.

## O que cobre

- **Posição e nome:** Ficheiros em `test/`, com nome `*.e2e-spec.ts` ou `*.integration-spec.ts`.
- **Dados de teste:** **Factories** em `test/factories/` com overrides — não definir objetos inline nos testes; opcionalmente **fixtures** em `test/fixtures/` para dados estáticos.
- **Datas:** **Datas determinísticas** via Jest fake timers e helper em `test/helpers/date.helper.ts` (`TEST_DATE`, `useFakeTime()`); usar em factories e asserts.
- **HTTP:** Supertest em `request(app.getHttpServer())`; app criada com `Test.createTestingModule` e `createNestApplication()`.
- **Base de dados:** Uso de test DB separada e limpeza entre testes quando necessário.
- **Comentários:** Em inglês, 1–2 linhas, objetivos (mesmo padrão da skill de unit tests).

## O que não cobre

- Testes **unitários** (ver skill nestjs-unit-tests).
- Testes **E2E com browser** (Playwright, Cypress).

## Estrutura recomendada

```
test/
  *.e2e-spec.ts
  factories/       ← user.factory.ts, create-user-dto.factory.ts, etc.
  fixtures/       ← dados estáticos (opcional)
  helpers/
    date.helper.ts
```

## Ativação

A skill é aplicada quando o utilizador cria ou edita testes de integração/e2e em NestJS (ficheiros em `test/`, `*.e2e-spec.ts`, Supertest, factories, test DB, etc.).
