import "@testing-library/jest-dom";

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

    // Other matchers (already defined by Vitest, so we don't need to redefine)
  }
}

// Fix Cypress type issues
interface Chainable<Subject = any> {
  tab(subject?: any): Chainable<Element>;
}

// Extend the Window interface for our custom property
declare global {
  interface Window {
    VITEST_COVERAGE?: boolean;
  }
}

// Export nothing - this is just for type declarations
export {};
