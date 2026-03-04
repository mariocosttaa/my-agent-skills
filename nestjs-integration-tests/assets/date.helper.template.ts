// test/helpers/date.helper.ts
// Fixed date for integration tests; use with jest.useFakeTimers to avoid flaky date assertions.

export const TEST_DATE = new Date('2024-01-15T10:00:00.000Z');

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
