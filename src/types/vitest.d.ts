import "@testing-library/jest-dom";
import { expect, Assertion } from "vitest";

// Add missing Jest DOM matchers
declare module "vitest" {
  interface Assertion<T = any> {
    // Jest DOM matchers
    toBeInTheDocument(): T;
    toBeVisible(): T;
    toBeRequired(): T;
    toHaveAttribute(attr: string, value?: string): T;
    toHaveClass(...classNames: string[]): T;
    toHaveStyle(css: Record<string, any>): T;
    toHaveFocus(): T;
    toHaveTextContent(text: string | RegExp): T;
    toHaveValue(value: any): T;
    toBeEnabled(): T;
    toBeDisabled(): T;
    toBeEmpty(): T;
    toBePartiallyChecked(): T;
    toHaveDescription(text: string | RegExp): T;
    toContainElement(element: Element | null): T;
    toBeChecked(): T;

    // Vitest expectation matchers we need
    toBe(expected: any): T;
    toBeDefined(): T;
    toBeTruthy(): T;
    toBeFalsy(): T;
    toEqual(expected: any): T;
    toStrictEqual(expected: any): T;
    toHaveLength(expected: number): T;
    toHaveProperty(key: string): T;
    toBeGreaterThan(n: number): T;
    toBeGreaterThanOrEqual(n: number): T;
    toBeLessThan(n: number): T;
    toBeLessThanOrEqual(n: number): T;
    toMatch(pattern: RegExp | string): T;

    // Spy/mock matchers
    toHaveBeenCalled(): T;
    toHaveBeenCalledTimes(times: number): T;
    toHaveBeenCalledWith(...args: any[]): T;
    toHaveBeenNthCalledWith(n: number, ...args: any[]): T;
    toHaveReturned(): T;
  }
}

// Extend the Window interface for our custom property
declare global {
  interface Window {
    VITEST_COVERAGE?: boolean;
  }
}
