// This file augments the Vitest types to include Jest DOM matchers

import { expect } from "vitest";
import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

// Extend the Expect interface
declare global {
  namespace Vi {
    interface JestAssertion<T = any>
      extends TestingLibraryMatchers<T, JestAssertion<T>> {
      // Additional matchers that aren't included in TestingLibraryMatchers
      toHaveBeenCalled(): JestAssertion<T>;
      toHaveBeenCalledTimes(times: number): JestAssertion<T>;
      toHaveBeenCalledWith(...args: any[]): JestAssertion<T>;
      toBeTruthy(): JestAssertion<T>;
      toBeUndefined(): JestAssertion<T>;
      toBeGreaterThan(number: number): JestAssertion<T>;
      toBeGreaterThanOrEqual(number: number): JestAssertion<T>;
      toBeLessThan(number: number): JestAssertion<T>;
      toBeLessThanOrEqual(number: number): JestAssertion<T>;
      toMatch(pattern: RegExp | string): JestAssertion<T>;
      toEqual(value: any): JestAssertion<T>;
    }
  }

  interface Window {
    VITEST_COVERAGE?: boolean;
  }
}

// Define vi namespace explicitly
declare namespace vi {
  const fn: typeof import("vitest").vi.fn;
  const mock: typeof import("vitest").vi.mock;
  const spyOn: typeof import("vitest").vi.spyOn;
  const clearAllMocks: typeof import("vitest").vi.clearAllMocks;
  const resetAllMocks: typeof import("vitest").vi.resetAllMocks;
  const restoreAllMocks: typeof import("vitest").vi.restoreAllMocks;
}
