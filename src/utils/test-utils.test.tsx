import React from "react";
import { render, screen } from "@testing-library/react";
import { renderWithContext, TestProviderProps } from "./test-utils";

// Create mock components for testing
const TestComponent: React.FC<{ testProp?: string }> = ({
  testProp = "default",
}) => <div data-testid="test-component">{testProp}</div>;

const ContextConsumer: React.FC = () => {
  // This would typically use a context value, but we'll just render something
  // to verify the context wrapper is working
  return <div data-testid="context-consumer">Context Consumer</div>;
};

describe("test-utils", () => {
  describe("renderWithContext", () => {
    it("renders a component with default context", () => {
      renderWithContext(<TestComponent />);

      // Check if component renders
      expect(screen.getByTestId("test-component")).toBeInTheDocument();
      expect(screen.getByTestId("test-component")).toHaveTextContent("default");
    });

    it("renders a component with custom props", () => {
      renderWithContext(<TestComponent testProp="custom value" />);

      // Check if props are passed correctly
      expect(screen.getByTestId("test-component")).toHaveTextContent(
        "custom value"
      );
    });

    it("renders a component with custom context options", () => {
      const customOptions: TestProviderProps = {
        theme: "dark",
        // Add other context options as needed
      };

      renderWithContext(<ContextConsumer />, customOptions);

      // Check if component renders with context
      expect(screen.getByTestId("context-consumer")).toBeInTheDocument();
    });

    it("returns all the usual render methods from RTL", () => {
      const result = renderWithContext(<TestComponent />);

      // Check if render result has expected methods
      expect(result).toHaveProperty("rerender");
      expect(result).toHaveProperty("unmount");
      expect(result).toHaveProperty("container");
    });
  });
});
