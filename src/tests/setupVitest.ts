import "@testing-library/jest-dom";
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// This setup file will be referenced in vite.config.ts

// Add custom matchers or global mocks here
// Example for adding a custom matcher for jest-dom
declare global {
  namespace Vi {
    interface Assertion {
      toBeInTheDocument(): void;
      toHaveClass(className: string): void;
      toHaveTextContent(text: string | RegExp): void;
    }
  }
}

// Extend Vitest's expect with Jest DOM matchers
expect.extend({
  toBeInTheDocument: (received) => {
    const pass =
      received !== null &&
      received !== undefined &&
      received.ownerDocument !== undefined;
    return {
      message: () =>
        `expected ${received} ${pass ? "not " : ""}to be in the document`,
      pass,
    };
  },
  // Add other Jest DOM matchers if needed
});

// Clean up after each test
afterEach(() => {
  cleanup();
});

// Define global mocks as needed
