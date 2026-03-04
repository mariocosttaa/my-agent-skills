---
name: nestjs-unit-tests
description: >
  Guides writing NestJS unit tests with Jest: file placement, naming (*.spec.ts), syntax, and
  commenting. Use when creating or editing unit tests for NestJS services, controllers, guards,
  pipes, or interceptors. Enforces comments in English (one or two lines, objective) and
  best practices: isolated tests, mocked dependencies, reset mocks. Does not cover integration
  or E2E tests.
---

# NestJS Unit Tests

Skill para escrever testes unitários em NestJS seguindo boas práticas: posição e nome do ficheiro, sintaxe com Jest e `TestingModule`, e **comentários em inglês** (uma ou duas linhas, objetivos) para facilitar a leitura.

---

## Ao criar ou editar testes: perguntar antes de executar e corrigir

1. **Executar e corrigir testes:** Ao criar ou alterar testes unitários, **perguntar** ao utilizador se quer que executes os testes e, se falharem, os corriga. Não assumir que deve correr e corrigir automaticamente.
2. **Alterar só ficheiros de teste:** Se para fazer os testes passarem for necessário alterar **outro ficheiro fora do teste** (ex.: o service, o controller, um módulo ou config), **não o faças**. Em vez disso, **pergunta** ao utilizador: explica o que está a falhar e que alteração no código de produção (ou noutro ficheiro) seria necessária, e pergunta se deseja que apliques essa alteração ou se prefere resolver de outra forma.

Resumo: perguntar se deve testar e corrigir; ao corrigir, só mexer em ficheiros `*.spec.ts`; qualquer mudança noutro ficheiro exige pergunta prévia.

---

## Posição e nome do ficheiro

- **Posição:** O ficheiro de teste fica **no mesmo diretório** que o ficheiro que testa (co-location).
- **Nome:** `{nome-do-ficheiro}.spec.ts`
  - Exemplos: `users.service.spec.ts`, `users.controller.spec.ts`, `auth.guard.spec.ts`, `validate-payload.pipe.spec.ts`

Estrutura de exemplo:
```
src/
  users/
    users.service.ts
    users.service.spec.ts      ← unit test do service
    users.controller.ts
    users.controller.spec.ts   ← unit test do controller
```

Não colocar testes unitários em pastas separadas (ex.: `test/unit/`); manter junto ao código.

---

## Comentários (obrigatório como padrão)

- **Idioma:** Sempre **inglês**.
- **Estilo:** Uma linha, ou duas se necessário; objetivos e breves.
- **Onde:** Nos pontos que ajudam a ler o teste: no início do `describe`, no `beforeEach` (o que está a ser preparado), no início de cada `it` (cenário) e, dentro do `it`, em passos não óbvios (ex.: porque se faz um mock específico, o que se está a afirmar).
- **Não:** Encher cada linha de comentário; comentar o óbvio. O objetivo é facilitar a leitura sem poluir.

Exemplo de densidade adequada:
```typescript
// Unit tests for UserService: creation and password hashing.
describe('UserService', () => {
  let service: UserService;
  let mockRepo: jest.Mocked<UserRepository>;

  // Build testing module with mocked repository before each test.
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: { save: jest.fn() } },
      ],
    }).compile();

    service = module.get(UserService);
    mockRepo = module.get(UserRepository);
  });

  afterEach(() => jest.resetAllMocks());

  it('should hash the password before saving the user', async () => {
    mockRepo.save.mockResolvedValue({ id: 1, email: 'test@test.com' });

    await service.createUser({ email: 'test@test.com', password: '123456' });

    const savedUser = mockRepo.save.mock.calls[0][0];
    expect(savedUser.password).not.toBe('123456');
    expect(savedUser.password).toMatch(/^\$2b\$/); // bcrypt format
  });
});
```

---

## Sintaxe e estrutura

### Framework
- **Jest** (default no NestJS) com `@nestjs/testing`: `Test.createTestingModule()`.
- Um `describe` por classe/ficheiro testado; `it` por cenário comportamental.

### Setup e teardown
- **beforeEach:** Criar o `TestingModule`, compilar, obter a instância do service/controller e dos mocks. Não partilhar estado entre testes.
- **afterEach:** Chamar `jest.resetAllMocks()` para evitar que mocks de um teste afetem outro.
- **beforeAll/afterAll:** Só se for estritamente necessário (ex.: custo alto de setup); preferir `beforeEach` para isolamento.

### Mocking
- Dependências (repositórios, outros services) via `providers` com `useValue: { method: jest.fn() }`.
- Para tipos: `jest.Mocked<Repository>` ou `jest.Mocked<SomeService>`.
- Evitar excesso de mocks: testar o comportamento real da unidade; mockar só o que é externo.

### O que testar (unit)
- **Services:** Lógica de negócio, transformações, validações (com dependências mockadas).
- **Controllers:** Chamadas ao service e formato de resposta (service mockado; não testar HTTP real aqui — isso é integração).
- **Guards, Pipes, Interceptors:** Comportamento isolado com inputs/saídas controlados.
- **Não testar:** Modules (apenas configuração); métodos privados diretamente (testar via API pública).

### Nomes de testes
- `it('should ...')` com verbo que descreve o comportamento esperado: "should hash the password before saving", "should return 404 when user not found".
- Evitar nomes vagos como "works" ou "test create".

---

## Regras rápidas

| Regra | Detalhe |
|-------|--------|
| Ficheiro | `*.spec.ts` junto ao ficheiro testado |
| Comentários | Inglês, 1–2 linhas, objetivos; presentes mas sem exagero |
| Dependências | Mockar com `useValue` e `jest.fn()` |
| Reset | `afterEach(() => jest.resetAllMocks())` |
| Isolamento | Testes independentes; não depender da ordem de execução |
| Assertions | Validar comportamento e dados relevantes (ex.: password hasheada, valor retornado) |

---

## Exemplo mínimo (service)

Ver [reference.md](reference.md) para exemplos completos com comentários (service, controller, guard) e boas práticas adicionais. Um template de partida para um service está em `assets/service.spec.template.ts`.
