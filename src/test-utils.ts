import React from "react";
import { vi } from "vitest";
import { render as testingLibraryRender } from "@testing-library/react";

// Re-export everything from testing library
export * from "@testing-library/react";

// Export Vitest's mocking utilities
export { vi };

// Export any custom render functions
export const render = testingLibraryRender;

// Helper function for mocking components that returns a React component
export function mockComponent(name: string) {
  return vi.fn().mockImplementation((props: any) => {
    return React.createElement("div", {
      "data-testid": `mocked-${name}`,
      "data-props": JSON.stringify(props),
    });
  });
}

// Add any other test helpers here
