import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";

// Add the TestProviderProps interface
export interface TestProviderProps {
  theme?: "light" | "dark";
  // Add other context options as needed
}

// Custom wrapper with theme provider
const TestProvider: React.FC<{
  children: React.ReactNode;
  options?: TestProviderProps;
}> = ({ children, options = { theme: "light" } }) => {
  return <div data-theme={options.theme}>{children}</div>;
};

// Custom wrapper if needed in the future
const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// Add the renderWithContext function
export function renderWithContext(
  ui: ReactElement,
  options?: TestProviderProps,
  renderOptions?: Omit<RenderOptions, "wrapper">
) {
  return render(ui, {
    wrapper: (props) => <TestProvider options={options} {...props} />,
    ...renderOptions,
  });
}

// Re-export everything
export * from "@testing-library/react";
export { customRender as render };
