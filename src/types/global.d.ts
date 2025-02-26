// Global type definitions file that TS will automatically load

import "@testing-library/jest-dom";
import { expect as vitestExpect } from "vitest";

declare global {
  // Extend the existing Expect interface from Vitest
  namespace Vi {
    interface Assertion {
      // Jest DOM matchers
      toBeInTheDocument(): Assertion;
      toBeVisible(): Assertion;
      toBeRequired(): Assertion;
      toHaveAttribute(attr: string, value?: string): Assertion;
      toHaveClass(...classNames: string[]): Assertion;
      toHaveStyle(css: Record<string, any>): Assertion;
      toHaveFocus(): Assertion;
      toHaveTextContent(text: string | RegExp): Assertion;
      toHaveValue(value: any): Assertion;
      toBeEnabled(): Assertion;
      toBeDisabled(): Assertion;
      toBeEmpty(): Assertion;
      toBePartiallyChecked(): Assertion;
      toHaveDescription(text: string | RegExp): Assertion;
      toContainElement(element: Element | null): Assertion;
      toBeChecked(): Assertion;
      toBeUndefined(): Assertion;

      // Mock matchers
      toHaveBeenCalled(): Assertion;
      toHaveBeenCalledTimes(times: number): Assertion;
      toHaveBeenCalledWith(...args: any[]): Assertion;
      toHaveBeenNthCalledWith(n: number, ...args: any[]): Assertion;
      toHaveReturned(): Assertion;

      // Other matchers
      toBeGreaterThan(number: number): Assertion;
      toBeGreaterThanOrEqual(number: number): Assertion;
      toBeLessThan(number: number): Assertion;
      toBeLessThanOrEqual(number: number): Assertion;
      toMatch(pattern: RegExp | string): Assertion;
      toEqual(value: any): Assertion;
      toBeTruthy(): Assertion;
    }
  }

  // Add VITEST_COVERAGE property to window
  interface Window {
    VITEST_COVERAGE?: boolean;
  }
}
