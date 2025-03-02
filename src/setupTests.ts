process.env.NODE_ENV = "test";

import "@testing-library/jest-dom";
import { vi, expect, afterEach, beforeAll, afterAll } from "vitest";
import { cleanup } from "@testing-library/react";
import { configure } from "@testing-library/react";
import {
  suppressCanvasErrors,
  mockCanvasContext,
} from "./tests/testSetupHelpers";

// Configure testing library
configure({
  asyncUtilTimeout: 5000,
  computedStyleSupportsPseudoElements: false,
});

// Suppress console errors during tests but save the original for important errors
const originalError = console.error;
console.error = (...args) => {
  // Ignore certain errors that are expected during tests
  if (
    typeof args[0] === "string" &&
    (args[0].includes("act(...)") ||
      args[0].includes("Warning: An update to") ||
      args[0].includes("was not wrapped in act") ||
      args[0].includes("Failed to create chart") ||
      args[0].includes("can't acquire context") ||
      args[0].includes("Warning.*validateDOMNesting") ||
      args[0].includes("Warning.*ReactDOM.render is no longer supported") ||
      args[0].includes("Warning.*ReactDOMTestUtils.act is deprecated") ||
      args[0].includes("ReactDOMTestUtils.act"))
  ) {
    return;
  }
  originalError.call(console, ...args);
};

// Define interface for Chart.js mock
interface MockChartInstance {
  ctx: CanvasRenderingContext2D | null;
  config: any;
  data: any;
  options: any;
  canvas: HTMLCanvasElement | null;
  update: () => void;
  destroy: () => void;
  resize: () => void;
}

// Better Chart.js mock with proper typing
vi.mock("chart.js/auto", () => {
  return {
    __esModule: true,
    default: class MockChart implements MockChartInstance {
      static register(): void {}
      static defaults = {
        font: {},
        plugins: {},
      };

      ctx: CanvasRenderingContext2D | null;
      config: any;
      data: any;
      options: any;
      canvas: HTMLCanvasElement | null;

      constructor(ctx: CanvasRenderingContext2D | null, config: any) {
        this.ctx = ctx;
        this.config = config;
        this.data = config?.data || { datasets: [] };
        this.options = config?.options || {};
        this.canvas = ctx ? ctx.canvas : null;
      }

      update(): void {
        // Mock implementation
      }

      destroy(): void {
        // Mock implementation
      }

      resize(): void {
        // Mock implementation
      }
    },
  };
});

// Mock chart.js for older imports
vi.mock("chart.js", () => ({
  Chart: class MockChart {
    constructor() {}
    update() {}
    destroy() {}
  },
  // Fixed the spelling warning - this is correct as it's Chart.js API terminology
  registerables: [],
}));

// Ensure tests are isolated from each other
afterEach(() => {
  // Always clean up React components
  cleanup();

  // Reset all mocks between tests
  vi.resetAllMocks();

  // Make sure we're always using real timers after each test
  vi.useRealTimers();
});

// Create a more complete canvas context mock
const createCanvasMock = (): CanvasRenderingContext2D => {
  const canvas = document.createElement("canvas");
  return {
    canvas,
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    measureText: vi.fn(() => ({ width: 0 })),
    fillText: vi.fn(),
    setTransform: vi.fn(),
    drawImage: vi.fn(),
    scale: vi.fn(),
    rotate: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    createLinearGradient: vi.fn(() => ({
      addColorStop: vi.fn(),
    })),
    getImageData: vi.fn(() => ({
      data: new Uint8ClampedArray(4),
    })),
    putImageData: vi.fn(),
    fillRect: vi.fn(),
    translate: vi.fn(),
    // Required properties to satisfy TS interface
    globalAlpha: 1,
    globalCompositeOperation: "source-over",
    imageSmoothingEnabled: true,
    // Fixed: Changed CanvasImageSmoothingQuality to ImageSmoothingQuality
    imageSmoothingQuality: "low" as ImageSmoothingQuality,
    fillStyle: "#000",
    strokeStyle: "#000",
    shadowBlur: 0,
    shadowColor: "#000",
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    lineWidth: 1,
    lineCap: "butt" as CanvasLineCap,
    lineJoin: "miter" as CanvasLineJoin,
    miterLimit: 10,
    lineDashOffset: 0,
    font: "10px sans-serif",
    textAlign: "start" as CanvasTextAlign,
    textBaseline: "alphabetic" as CanvasTextBaseline,
    direction: "ltr" as CanvasDirection,
    clip: vi.fn(),
    isPointInPath: vi.fn(),
    isPointInStroke: vi.fn(),
    createPattern: vi.fn(),
    createRadialGradient: vi.fn(() => ({
      addColorStop: vi.fn(),
    })),
    setLineDash: vi.fn(),
    getLineDash: vi.fn(() => []),
    closePath: vi.fn(),
    ellipse: vi.fn(),
    rect: vi.fn(),
    quadraticCurveTo: vi.fn(),
    bezierCurveTo: vi.fn(),
    strokeText: vi.fn(),
    strokeRect: vi.fn(),
    resetTransform: vi.fn(),
    getTransform: vi.fn(),
  } as unknown as CanvasRenderingContext2D;
};

// Fix the canvas getContext mock with proper typing
HTMLCanvasElement.prototype.getContext = vi.fn(() => createCanvasMock()) as any;

// Simple matchMedia mock
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

// Mock ResizeObserver
window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Simple RAF implementation that doesn't rely on timers
window.requestAnimationFrame = vi.fn((callback) => {
  callback(0);
  return 1;
});
window.cancelAnimationFrame = vi.fn();

// Mock environment variables
vi.stubGlobal("APP_VERSION", "0.0.0-test");

// Setup global test environment
// Fix: Use the correct type for console spy
let consoleErrorSpy: ReturnType<typeof vi.spyOn> | undefined;

beforeAll(() => {
  // Suppress expected canvas errors
  consoleErrorSpy = suppressCanvasErrors();

  // Mock canvas context for all tests
  mockCanvasContext();

  // Mock window.matchMedia
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
});

// Cleanup after all tests
afterAll(() => {
  vi.clearAllMocks();
  // Restore console.error after all tests
  consoleErrorSpy?.mockRestore();
});
