import { vi } from "vitest";

/**
 * Sets up the necessary mocks for App component tests
 * @param hashValue - The hash value to set for window.location
 * @param options - Additional configuration options
 */
export const setupAppTest = (
  hashValue: string = "",
  options = {
    mockClassificationApp: true,
    mockLandingPage: true,
  }
) => {
  // Reset all mocks
  vi.resetAllMocks();

  // Mock window.location with the specified hash
  Object.defineProperty(window, "location", {
    value: {
      hash: hashValue,
      pathname: "/",
      search: "",
      replace: vi.fn(),
      assign: vi.fn(),
    },
    writable: true,
  });

  // Mock matchMedia for theme detection
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // Set up component mocks based on options
  if (options.mockClassificationApp) {
    vi.mock("../CIAClassificationApp", () => ({
      __esModule: true,
      default: vi.fn(() => ({
        type: "div",
        props: {
          "data-testid": "cia-classification-app",
          children: "CIA Classification App",
        },
      })),
    }));
  }

  if (options.mockLandingPage) {
    vi.mock("../components/LandingPage", () => ({
      __esModule: true,
      default: vi.fn(() => ({
        type: "div",
        props: {
          "data-testid": "landing-page",
          children: [
            {
              type: "h1",
              props: {
                children: "Welcome to the CIA Compliance Manager",
              },
            },
            {
              type: "button",
              props: {
                "data-testid": "get-started-button",
                children: "Get Started",
              },
            },
          ],
        },
      })),
    }));
  }

  // Return a cleanup function
  return () => {
    vi.resetAllMocks();
    vi.resetModules();
  };
};
