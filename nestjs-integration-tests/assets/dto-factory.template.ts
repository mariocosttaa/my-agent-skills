// test/factories/create-{entity}-dto.factory.ts
// Factory for request body (POST/PUT); update here when API contract changes.

export interface Create{Entity}DtoMock {
  // add fields matching your DTO, e.g. email, password, name
}

export const create{Entity}DtoMock = (
  overrides: Partial<Create{Entity}DtoMock> = {},
): Create{Entity}DtoMock => ({
  // base values used in most tests
  ...overrides,
});
