import React from "react";
import { render } from "@testing-library/react";
import CIAClassificationApp from "./CIAClassificationApp";
import { vi } from "vitest";

vi.mock("chart.js/auto", () => ({
  __esModule: true,
  default: class MockChart {
    constructor() {
      this.destroy = vi.fn();
    }
    destroy() {}
  },
}));

test("renders CIAClassificationApp without crashing", () => {
  const { unmount } = render(<CIAClassificationApp />);
  unmount();
});
