import "@testing-library/jest-dom";

// Mock matchMedia for tests
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock canvas for Chart.js
HTMLCanvasElement.prototype.getContext = jest.fn();

// Suppress console errors during tests but save the original for important errors
const originalError = console.error;
console.error = (...args) => {
  // Ignore certain errors that are expected during tests
  if (
    /Warning.*not wrapped in act/i.test(args[0]) ||
    /Warning.*validateDOMNesting/i.test(args[0]) ||
    /Warning.*ReactDOM.render is no longer supported/i.test(args[0]) ||
    /Warning.*ReactDOMTestUtils\.act is deprecated/i.test(args[0]) || // Fixed regex pattern with escaped dot
    /ReactDOMTestUtils\.act/i.test(args[0]) // Another pattern to catch the same warning
  ) {
    return;
  }

  originalError.apply(console, args);
};

// Mock Chart.js
jest.mock("chart.js/auto", () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      destroy: jest.fn(),
      update: jest.fn(),
    })),
  };
});
