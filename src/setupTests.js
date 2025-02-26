import "@testing-library/jest-dom";

// Mock window.matchMedia for tests - use a better implementation
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
      addEventListener: function () {},
      removeEventListener: function () {},
      dispatchEvent: function () {},
    };
  };

// Silence specific console errors and warnings in tests
const originalError = console.error;
console.error = (...args) => {
  // Check for strings first to avoid undefined errors
  if (args[0] && typeof args[0] === "string") {
    const errorMsg = args[0];

    // Canvas error - ignore
    if (errorMsg.includes("HTMLCanvasElement.prototype.getContext")) {
      return;
    }

    // Match Media error - ignore
    if (errorMsg.includes("Error detecting color scheme preference")) {
      return;
    }

    // React act warnings - ignore
    if (
      errorMsg.includes("ReactDOMTestUtils.act is deprecated") ||
      errorMsg.includes("Warning: `ReactDOMTestUtils.act`")
    ) {
      return;
    }
  }

  originalError.apply(console, args);
};

// Mock Chart.js
jest.mock("chart.js/auto", () => {
  return class Chart {
    static defaults = { color: "#666" };
    static register = jest.fn();
    destroy = jest.fn();
    constructor() {
      return {
        destroy: jest.fn(),
        update: jest.fn(),
      };
    }
  };
});
