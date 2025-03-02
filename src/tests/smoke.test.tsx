import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("Smoke Test", () => {
  it("test environment works", () => {
    render(<div data-testid="test">Test</div>);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });

  it("mocking works with vi", () => {
    const mockFn = vi.fn(() => "mocked");
    expect(mockFn()).toBe("mocked");
    expect(mockFn).toHaveBeenCalled();
  });
});
