# Reference: NestJS Integration Tests — Factories, Dates, Examples

Full examples: factories with overrides, date helper with fake timers, and integration spec with Supertest. Comments in English.

---

## 1. Date helper (test/helpers/date.helper.ts)

Centralizes a fixed test date and applies Jest fake timers so assertions on dates are deterministic.

```typescript
// Fixed date for all integration tests; avoids flaky assertions.
export const TEST_DATE = new Date('2024-01-15T10:00:00.000Z');

// Call inside describe(); sets up beforeEach/afterEach for fake timers.
export function useFakeTime(): void {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(TEST_DATE);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
}
```

Use `TEST_DATE` in factories (e.g. `createdAt: TEST_DATE`) and in assertions so that when the API changes response shape, you only update the factory.

---

## 2. Entity factory (test/factories/user.factory.ts)

Base object plus optional overrides; use for both seeding and asserting response shape.

```typescript
import { TEST_DATE } from '../helpers/date.helper';

export interface UserMock {
  id: number;
  email: string;
  name: string;
  role: string;
  createdAt: Date;
}

export const createUserMock = (overrides: Partial<UserMock> = {}): UserMock => ({
  id: 1,
  email: 'test@test.com',
  name: 'John Doe',
  role: 'user',
  createdAt: TEST_DATE,
  ...overrides,
});
```

---

## 3. DTO / request body factory (test/factories/create-user-dto.factory.ts)

Use for POST/PUT bodies so changes to the API contract are done in one place.

```typescript
export interface CreateUserDtoMock {
  email: string;
  password: string;
  name: string;
}

export const createUserDtoMock = (overrides: Partial<CreateUserDtoMock> = {}): CreateUserDtoMock => ({
  email: 'test@test.com',
  password: 'Password123!',
  name: 'John Doe',
  ...overrides,
});
```

---

## 4. Composed factory (test/factories/order.factory.ts)

Reuse other factories for nested or related data.

```typescript
import { createUserMock } from './user.factory';
import { createProductMock } from './product.factory';
import { TEST_DATE } from '../helpers/date.helper';

export const createOrderMock = (overrides: Partial<OrderMock> = {}) => ({
  id: 1,
  user: createUserMock(),
  product: createProductMock(),
  total: 99.99,
  createdAt: TEST_DATE,
  ...overrides,
});
```

---

## 5. Integration spec (test/users.e2e-spec.ts)

Uses app module, Supertest, factories, and fake time. Assumes test DB and cleanup are configured elsewhere (e.g. env, global setup).

```typescript
// Integration tests for Users API: create and get user via HTTP and DB.
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { useFakeTime, TEST_DATE } from './helpers/date.helper';
import { createUserDtoMock } from './factories/create-user-dto.factory';
import { createUserMock } from './factories/user.factory';

describe('Users API (integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => await app.close());

  useFakeTime();

  it('POST /users creates user and returns 201 with body matching factory shape', async () => {
    const dto = createUserDtoMock();

    const res = await request(app.getHttpServer())
      .post('/users')
      .send(dto)
      .expect(201);

    expect(res.body).toMatchObject({
      email: dto.email,
      name: dto.name,
    });
    expect(new Date(res.body.createdAt)).toEqual(TEST_DATE);
  });

  it('POST /users returns 400 when email is invalid', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send(createUserDtoMock({ email: 'not-an-email' }))
      .expect(400);
  });

  it('GET /users/:id returns user when found', async () => {
    // Assume user was created in DB or via helper; then assert response.
    const expected = createUserMock({ id: 1, email: 'get@test.com' });
    // ... create via API or repo, then:
    const res = await request(app.getHttpServer()).get('/users/1').expect(200);
    expect(res.body.email).toBe(expected.email);
  });
});
```

---

## 6. Comment placement (integration)

- **Top of file / describe:** What is under test (e.g. "Integration tests for Users API: create and get user via HTTP and DB").
- **beforeAll / beforeEach:** What is being set up (app init, DB cleanup, etc.).
- **Each it:** Optional short comment if the scenario is not obvious from the name.
- **Inside it:** Comment non-obvious steps (e.g. why a specific override is used, what part of the response is being asserted).

Keep comments in **English**, one or two lines, and objective.

---

## 7. Fixtures (optional, test/fixtures/)

Use for static data that does not vary per test (e.g. list of roles, countries).

```typescript
// test/fixtures/roles.fixture.ts
export const ROLES_FIXTURE = ['admin', 'user', 'guest'] as const;
```

Prefer factories when you need per-test variation (different emails, ids, dates); use fixtures only when the data is truly constant.
