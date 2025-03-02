import { vi } from "vitest";
import "@testing-library/jest-dom";

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

// Define global mocks as needed
