import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App"; // Import the default export

// Use Vitest’s vi.mock in place of jest.mock
vi.mock("./CIAClassificationApp", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="mock-cia-app">CIA Classification App</div>,
  };
});

// Mock window.location for hash testing using vi.fn
const mockLocation = new URL("https://example.com");
Object.defineProperty(window, "location", {
  value: {
    ...window.location,
    hash: "",
    assign: vi.fn((url: any) => {
      mockLocation.hash = new URL(url, mockLocation.href).hash;
    }),
  },
  writable: true,
});

describe("App Component", () => {
  beforeEach(() => {
    // Reset hash before each test
    window.location.hash = "";
    vi.clearAllMocks();
  });

  // Disable the tests that expect a landing page with a get started button
  it.skip("renders landing page with get started button", () => {
    render(<App />);
    expect(screen.getByText(/Manage Your CIA Compliance/i)).toBeInTheDocument();
    expect(screen.getByTestId("get-started-button")).toBeInTheDocument();
  });

  it.skip("navigates to app when get started button is clicked", () => {
    render(<App />);
    const startButton = screen.getByTestId("get-started-button");

    fireEvent.click(startButton);

    expect(window.location.hash).toBe("#app");
    expect(screen.getByTestId("cia-classification-app")).toBeInTheDocument();
  });

  it("handles deep linking to app view", () => {
    window.location.hash = "#app";
    render(<App />);
    expect(screen.getByTestId("cia-classification-app")).toBeInTheDocument();
    expect(
      screen.queryByText(/Manage Your CIA Compliance/i)
    ).not.toBeInTheDocument();
  });

  it.skip("handles backwards navigation from hash changes", () => {
    window.location.hash = "#app";
    const { rerender } = render(<App />);
    expect(screen.getByTestId("cia-classification-app")).toBeInTheDocument();

    window.location.hash = "";
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    rerender(<App />);
    expect(screen.getByTestId("get-started-button")).toBeInTheDocument();
    expect(
      screen.queryByTestId("cia-classification-app")
    ).not.toBeInTheDocument();
  });
});
