---
name: nestjs-integration-tests
description: >
  Guides writing NestJS integration tests (API + DB): file placement in test/, naming (*.e2e-spec.ts),
  Supertest, test database, factories for request/response data, and fake timers for dates. Use when
  creating or editing integration or e2e tests for NestJS. Enforces factories/fixtures instead of
  inline test data, comments in English, and deterministic dates. Does not cover unit tests or
  browser E2E (Playwright/Cypress).
---

# NestJS Integration Tests

Skill para escrever testes de integração em NestJS: chamadas HTTP reais (Supertest), base de dados de teste, **factories** para dados reutilizáveis (evitar dados inline), **datas fixas** com fake timers, e comentários em inglês.

---

## Ao criar ou editar testes: perguntar antes de executar e corrigir

1. **Executar e corrigir testes:** Ao criar ou alterar testes de integração, **perguntar** ao utilizador se quer que executes os testes e, se falharem, os corriga. Não assumir que deve correr e corrigir automaticamente.
2. **Alterar só ficheiros de teste (e helpers/factories de teste):** Se para fazer os testes passarem for necessário alterar **código fora da pasta de testes** (ex.: controllers, services, módulos, config da app, migrations), **não o faças**. Em vez disso, **pergunta** ao utilizador: explica o que está a falhar e que alteração seria necessária noutro ficheiro, e pergunta se deseja que apliques essa alteração ou se prefere resolver de outra forma. É permitido alterar ficheiros dentro de `test/` (specs, factories, fixtures, helpers) para corrigir os testes.

Resumo: perguntar se deve testar e corrigir; ao corrigir, só mexer em ficheiros dentro de `test/`; qualquer mudança em `src/` ou noutra pasta exige pergunta prévia.

---

## Posição e nome do ficheiro

- **Posição:** Testes de integração ficam numa pasta **`test/`** na raiz do projeto (separada de `src/`).
- **Nome:** `*.e2e-spec.ts` (convenção NestJS) ou `*.integration-spec.ts`.
  - Exemplos: `test/app.e2e-spec.ts`, `test/users.e2e-spec.ts`, `test/auth.integration-spec.ts`.

Estrutura recomendada:
```
test/
  app.e2e-spec.ts
  users.e2e-spec.ts
  jest-e2e.json           ← config Jest para e2e (opcional)
  factories/               ← dados reutilizáveis (ver abaixo)
    user.factory.ts
    create-user-dto.factory.ts
  fixtures/                ← dados estáticos se necessário
  helpers/
    date.helper.ts         ← freeze time para datas determinísticas
```

Não colocar testes de integração junto ao código em `src/`; a pasta `test/` isola o contexto “app completa + HTTP + DB”.

---

## Factories em vez de dados inline (obrigatório como padrão)

- **Problema:** Definir objetos de teste (user, body do POST, resposta esperada) em cada teste torna a manutenção difícil: se a API mudar o corpo, é preciso alterar dezenas de sítios.
- **Solução:** Usar **factory functions** que devolvem um objeto base e aceitam **overrides** opcionais.

### Onde colocar
- **`test/factories/`** — uma factory por entidade ou DTO (ex.: `user.factory.ts`, `create-user-dto.factory.ts`).

### Formato da factory
- Função que retorna objeto base + spread de overrides: `{ ...base, ...overrides }`.
- Usar datas fixas vindas do helper de datas (ex.: `TEST_DATE`) para manter asserts determinísticos.

Exemplo:
```typescript
// test/factories/user.factory.ts
import { TEST_DATE } from '../helpers/date.helper';

export const createUserMock = (overrides: Partial<User> = {}) => ({
  id: 1,
  email: 'test@test.com',
  name: 'John Doe',
  role: 'user',
  createdAt: TEST_DATE,
  ...overrides,
});

export const createUserDtoMock = (overrides: Partial<CreateUserDto> = {}) => ({
  email: 'test@test.com',
  password: 'Password123!',
  name: 'John Doe',
  ...overrides,
});
```

Nos testes:
```typescript
// Não definir inline; usar factory.
await request(app.getHttpServer())
  .post('/users')
  .send(createUserDtoMock())           // base
  .expect(201);

await request(app.getHttpServer())
  .post('/users')
  .send(createUserDtoMock({ email: 'other@test.com' }))  // só muda o que importa
  .expect(201);
```

- **Fixtures:** Para listas ou dados que nunca variam (ex.: roles, países), pode usar ficheiros em `test/fixtures/` com dados estáticos. Para payloads e entidades que variam por cenário, preferir factories.

---

## Datas determinísticas (fake timers)

- **Problema:** `expect(entity.createdAt).toEqual(new Date())` falha por milissegundos (flaky tests).
- **Solução:** Congelar o tempo com **Jest Fake Timers** e uma data fixa centralizada.

### Helper recomendado
- **`test/helpers/date.helper.ts`** — exportar uma constante `TEST_DATE` (ex.: `new Date('2024-01-15T10:00:00.000Z')`) e uma função ou blocos `beforeEach`/`afterEach` que:
  - `jest.useFakeTimers()` e `jest.setSystemTime(TEST_DATE)` no setup;
  - `jest.runOnlyPendingTimers()` e `jest.useRealTimers()` no teardown.

Exemplo de uso nos specs:
```typescript
import { TEST_DATE, useFakeTime } from '../helpers/date.helper';

describe('Users API (integration)', () => {
  useFakeTime(); // aplica fake timers em beforeEach/afterEach

  it('POST /users sets createdAt', async () => {
    const res = await request(app.getHttpServer())
      .post('/users')
      .send(createUserDtoMock())
      .expect(201);
    expect(new Date(res.body.createdAt)).toEqual(TEST_DATE);
  });
});
```

- Factories devem usar `TEST_DATE` (ou equivalente) para `createdAt`/`updatedAt` para que os asserts não dependam do relógio real.
- Sempre restaurar timers reais no `afterEach` para não afetar outros testes ou runners.

---

## Comentários (padrão igual aos unit tests)

- **Idioma:** Sempre **inglês**.
- **Estilo:** Uma ou duas linhas, objetivos.
- **Onde:** No topo do `describe` (o que está a ser testado), em `beforeAll`/`beforeEach` (setup da app ou DB), e em passos não óbvios dentro dos `it` (ex.: por que se usa uma factory com certo override, o que se está a validar na resposta).

---

## Sintaxe e estrutura do spec

- **App:** `Test.createTestingModule({ imports: [AppModule] })` (ou módulos necessários), depois `createNestApplication()`, `app.init()` em `beforeAll`; `app.close()` em `afterAll`.
- **HTTP:** Usar **Supertest**: `request(app.getHttpServer()).get(...).post(...).expect(...)`.
- **Base de dados:** Usar uma **test database** separada (variável de ambiente, ex.: `DB_NAME=app_test`). Entre testes, limpar dados ou transações (ex.: `afterEach` com truncate/delete das tabelas usadas) para isolamento.
- **Assertions:** Validar status, corpo da resposta e, quando relevante, que os dados persistiram na DB (query direta ou re-get). Para campos de data, comparar com `TEST_DATE` (ou valor derivado do helper).

---

## Regras rápidas

| Regra | Detalhe |
|-------|--------|
| Pasta | `test/` na raiz |
| Nome | `*.e2e-spec.ts` ou `*.integration-spec.ts` |
| Dados de teste | Factories em `test/factories/` com overrides; não definir objetos inline |
| Datas | `TEST_DATE` + `useFakeTimers` / `jest.setSystemTime`; restaurar com `useRealTimers` |
| DB | Test DB dedicada; limpar entre testes quando necessário |
| Comentários | Inglês, 1–2 linhas, objetivos |
| HTTP | Supertest em `request(app.getHttpServer())` |

---

## Resumo

- **Onde:** `test/*.e2e-spec.ts`, com `test/factories/`, `test/helpers/`, opcionalmente `test/fixtures/`.
- **Dados:** Sempre que possível factories (e DTOs/request body) com overrides; fixtures para dados estáticos.
- **Datas:** Sempre determinísticas via fake timers e `TEST_DATE` (ou equivalente) no helper.
- **Comentários:** Em inglês, concisos, nos pontos que ajudam a ler o teste.

Ver [reference.md](reference.md) para exemplos completos de factories, date helper, e specs de integração. Templates em `assets/`: `date.helper.template.ts`, `factory.template.ts`, `dto-factory.template.ts`.
