// Unit tests for {ServiceName}: {brief description of responsibilities}.
describe('{ServiceName}', () => {
  let service: {ServiceName};
  let mockDep: jest.Mocked<{DepType}>;

  // Create testing module with mocked dependencies before each test.
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {ServiceName},
        {
          provide: {DepToken},
          useValue: {
            // Add methods used by the service, e.g. findOne: jest.fn(), save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<{ServiceName}>({ServiceName});
    mockDep = module.get({DepToken});
  });

  afterEach(() => jest.resetAllMocks());

  it('should {expected behaviour in one line}', async () => {
    // Arrange: set up mock return values.
    // Act: call the method under test.
    // Assert: expect outcomes and mock calls.
  });
});
