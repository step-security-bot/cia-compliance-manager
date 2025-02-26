import "@testing-library/jest-dom";
import { configure } from "@testing-library/react";
import { act } from "react";

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
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock canvas with proper type assertions
HTMLCanvasElement.prototype.getContext = jest.fn(() => {
  const mockContext = {
    canvas: { width: 100, height: 100 },
    clearRect: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    // Add missing properties required by TypeScript for CanvasRenderingContext2D
    globalAlpha: 1,
    globalCompositeOperation: "source-over",
    drawImage: jest.fn(),
    clip: jest.fn(),
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
}) as jest.Mock;

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Silence console errors in tests
console.error = jest.fn();
