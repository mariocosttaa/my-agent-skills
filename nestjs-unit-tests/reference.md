# Reference: NestJS Unit Tests — Examples with Comments

Full examples following the skill's conventions: file placement, naming, and **comments in English** (one or two lines, objective).

---

## 1. Service unit test (users.service.spec.ts)

```typescript
// Unit tests for UserService: user creation and password hashing.
describe('UserService', () => {
  let service: UserService;
  let mockRepo: jest.Mocked<UserRepository>;

  // Create testing module with mocked repository; no real DB.
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    mockRepo = module.get(UserRepository);
  });

  afterEach(() => jest.resetAllMocks());

  it('should hash the password before saving the user', async () => {
    mockRepo.save.mockResolvedValue({ id: 1, email: 'test@test.com' } as User);

    await service.createUser({ email: 'test@test.com', password: '123456' });

    const savedUser = mockRepo.save.mock.calls[0][0];
    expect(savedUser.password).not.toBe('123456');
    expect(savedUser.password).toMatch(/^\$2b\$/); // bcrypt hash format
  });

  it('should return null when user is not found by email', async () => {
    mockRepo.findOne.mockResolvedValue(null);

    const result = await service.findByEmail('missing@test.com');

    expect(result).toBeNull();
    expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { email: 'missing@test.com' } });
  });
});
```

---

## 2. Controller unit test (users.controller.spec.ts)

Controller tests focus on calling the service and shaping the response; the service is mocked.

```typescript
// Unit tests for UserController: request handling and response shape.
describe('UserController', () => {
  let controller: UserController;
  let mockUserService: jest.Mocked<UserService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findById: jest.fn(),
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    mockUserService = module.get(UserService);
  });

  afterEach(() => jest.resetAllMocks());

  it('should return user when found by id', async () => {
    const user = { id: 1, email: 'test@test.com' };
    mockUserService.findById.mockResolvedValue(user);

    const result = await controller.getUser('1');

    expect(result).toEqual(user);
    expect(mockUserService.findById).toHaveBeenCalledWith(1);
  });

  it('should create user and return created entity', async () => {
    const dto = { email: 'new@test.com', password: 'secret' };
    const created = { id: 1, email: dto.email };
    mockUserService.createUser.mockResolvedValue(created);

    const result = await controller.createUser(dto);

    expect(result).toEqual(created);
    expect(mockUserService.createUser).toHaveBeenCalledWith(dto);
  });
});
```

---

## 3. Guard unit test (auth.guard.spec.ts)

Guards are tested in isolation by mocking the execution context and the services they use.

```typescript
// Unit tests for JwtAuthGuard: allow or deny based on token validation.
describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let mockAuthService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtAuthGuard,
        {
          provide: AuthService,
          useValue: { validateToken: jest.fn() },
        },
      ],
    }).compile();

    guard = module.get<JwtAuthGuard>(JwtAuthGuard);
    mockAuthService = module.get(AuthService);
  });

  afterEach(() => jest.resetAllMocks());

  it('should allow request when token is valid', async () => {
    const context = getMockExecutionContext({ user: { id: 1 } });
    mockAuthService.validateToken.mockResolvedValue(true);

    const result = await guard.canActivate(context);

    expect(result).toBe(true);
  });

  it('should deny request when token is missing', async () => {
    const context = getMockExecutionContext({});

    await expect(guard.canActivate(context)).rejects.toThrow(UnauthorizedException);
  });
});
// Helper getMockExecutionContext() should create a mock ExecutionContext for your app.
```

---

## 4. Comment placement checklist

- **Top of file / describe:** What is under test (e.g. "Unit tests for UserService: creation and password hashing").
- **beforeEach:** What is being set up (e.g. "Create testing module with mocked repository; no real DB").
- **afterEach:** Usually no comment unless non-standard (e.g. custom cleanup).
- **Each it:** Optional short comment if the scenario is not obvious from the name.
- **Inside it:** Comment non-obvious steps or assertions (e.g. "bcrypt hash format", "ensure repo was called with correct args").

Keep comments in **English**, one or two lines, and objective. Avoid stating the obvious.
