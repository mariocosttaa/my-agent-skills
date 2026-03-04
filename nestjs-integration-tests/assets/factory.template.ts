// test/factories/{entity}.factory.ts
// Factory for {Entity} mock data; use overrides to vary only what each test needs.
import { TEST_DATE } from '../helpers/date.helper';

export interface {Entity}Mock {
  id: number;
  // add fields matching your entity/DTO
  createdAt?: Date;
}

export const create{Entity}Mock = (overrides: Partial<{Entity}Mock> = {}): {Entity}Mock => ({
  id: 1,
  createdAt: TEST_DATE,
  ...overrides,
});
