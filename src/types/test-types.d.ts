// Define comprehensive types for testing without external dependencies

// Define vi namespace
declare namespace vi {
  function fn(): any;
  function fn<T extends (...args: any[]) => any>(implementation: T): T;
  function mock(path: string, factory?: () => any): void;
  function spyOn(obj: any, method: string): any;
  function clearAllMocks(): void;
  function resetAllMocks(): void;
  function restoreAllMocks(): void;
}

interface MockFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T>;
  mock: {
    calls: Array<Parameters<T>>;
    results: Array<{ type: string; value: ReturnType<T> }>;
  };
  mockClear(): this;
  mockReset(): this;
  mockRestore(): this;
}

interface Assertion<T = any> {
  // Basic assertions
  toBe(expected: any): Assertion<T>;
  toEqual(expected: any): Assertion<T>;
  not: Assertion<T>;

  // Collection assertions
  toContain(item: any): Assertion<T>;
  toHaveLength(length: number): Assertion<T>;
  toEqual(value: any): Assertion<T>;

  // Property assertions
  toHaveProperty(name: string, value?: any): Assertion<T>;

  // DOM-related assertions
  toBeInTheDocument(): Assertion<T>;
  toBeVisible(): Assertion<T>;
  toHaveClass(className: string): Assertion<T>;
  toHaveTextContent(text: string | RegExp): Assertion<T>;
  toHaveValue(value: any): Assertion<T>;
  toHaveAttribute(name: string, value?: string): Assertion<T>;

  // Existence assertions
  toBeDefined(): Assertion<T>;
  toBeUndefined(): Assertion<T>;

  // Number comparisons
  toBeGreaterThan(n: number): Assertion<T>;
  toBeGreaterThanOrEqual(n: number): Assertion<T>;
  toBeLessThan(n: number): Assertion<T>;
  toBeLessThanOrEqual(n: number): Assertion<T>;

  // String assertions
  toMatch(pattern: RegExp | string): Assertion<T>;

  // Mock-related assertions
  toHaveBeenCalled(): Assertion<T>;
  toHaveBeenCalledTimes(times: number): Assertion<T>;
  toHaveBeenCalledWith(...args: any[]): Assertion<T>;

  // Truth assertions
  toBeTruthy(): Assertion<T>;
  toBeFalsy(): Assertion<T>;
}

// Extend global for window properties
interface Window {
  VITEST_COVERAGE?: boolean;
}

// Replace the need for importing expect
declare function expect<T>(actual: T): Assertion<T>;

// Fix for the Cypress command
declare namespace Cypress {
  interface Chainable {
    tab(subject?: any): Chainable<JQuery<HTMLElement>>;
  }

  interface Commands {
    add(
      name: string,
      options: { prevSubject: string | boolean },
      fn: (...args: any[]) => any
    ): void;
  }
}
