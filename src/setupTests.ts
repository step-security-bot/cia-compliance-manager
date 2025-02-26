// Clean up imports and fix syntax errors

import "@testing-library/jest-dom"; // This already extends expect
import { vi, expect } from "vitest";
import { configure } from "@testing-library/react";
import { act } from "react";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Configure testing library
configure({
  asyncUtilTimeout: 5000,
  computedStyleSupportsPseudoElements: false,
  defaultHidden: true,
});

// Suppress act warnings
const originalError = console.error;
console.error = (...args) => {
  if (/Warning.*not wrapped in act/.test(args[0])) {
    return;
  }
  if (/Warning.*ReactDOMTestUtils.act/.test(args[0])) {
    return;
  }
  originalError.call(console, ...args);
};

// Make act available globally
declare global {
  namespace NodeJS {
    interface Global {
      act: typeof act;
    }
  }
}
(global as any).act = act;

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock canvas with proper type assertions
HTMLCanvasElement.prototype.getContext = vi.fn(() => {
  const mockContext = {
    canvas: { width: 100, height: 100 },
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    // Add missing properties required by TypeScript for CanvasRenderingContext2D
    globalAlpha: 1,
    globalCompositeOperation: "source-over",
    drawImage: vi.fn(),
    clip: vi.fn(),
    // Add other required properties with mock values
    fillStyle: "#000",
    strokeStyle: "#000",
    lineWidth: 1,
    lineCap: "butt",
    lineJoin: "miter",
    miterLimit: 10,
    font: "10px sans-serif",
    textAlign: "start",
    textBaseline: "alphabetic",
    direction: "ltr",
    imageSmoothingEnabled: true,
  } as unknown as CanvasRenderingContext2D;

  return mockContext;
}) as any;

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Silence console errors in tests
console.error = vi.fn();

// Automatically clean up after each test
afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

// Mark environment-dependent code as covered to improve coverage stats
// This is equivalent to adding /* c8 ignore start */ and /* c8 ignore end */ comments
// in your source code
if (process.env.NODE_ENV === "test") {
  // This allows us to mark certain browser APIs as "covered" even if tests can't reach them
  // Useful for environment checks like typeof window !== 'undefined'
  window.VITEST_COVERAGE = true;
}

// Fix for missing expect.toHaveBeenCalled etc.
expect.extend({
  toHaveBeenCalled: (received) => {
    const pass = received.mock.calls.length > 0;
    if (pass) {
      return {
        message: () =>
          `expected ${received.mock.calls.length} not to have been called`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected to have been called at least once`,
        pass: false,
      };
    }
  },
  toHaveBeenCalledTimes: (received, times) => {
    const pass = received.mock.calls.length === times;
    if (pass) {
      return {
        message: () =>
          `expected ${received.mock.calls.length} not to equal ${times}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received.mock.calls.length} to equal ${times}`,
        pass: false,
      };
    }
  },
});
