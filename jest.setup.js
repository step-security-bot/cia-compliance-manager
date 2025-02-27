import { act } from "react-dom/test-utils";

// Make act available globally for tests
global.act = act;

// Setup mock timers
jest.useFakeTimers();

// Silence console errors in test
const originalError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === "string" &&
    (args[0].includes("act(...)") ||
      args[0].includes("Warning: An update to") ||
      args[0].includes("was not wrapped in act"))
  ) {
    return;
  }
  originalError.call(console, ...args);
};

// Add required browser mocks
if (typeof window !== "undefined") {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: function () {},
        removeListener: function () {},
      };
    };
}
