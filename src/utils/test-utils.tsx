import React from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { act } from "react";

function render(
  ui: React.ReactElement,
  options: Omit<RenderOptions, "wrapper"> = {}
) {
  let result: ReturnType<typeof rtlRender>;
  act(() => {
    result = rtlRender(ui, options);
  });
  return result!;
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
