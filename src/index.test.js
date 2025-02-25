import React from "react";
import { render } from "./utils/test-utils";
import "@testing-library/jest-dom";
import CIAClassificationApp from "./CIAClassificationApp";

test("renders CIAClassificationApp without crashing", () => {
  const div = document.createElement("div");
  render(<CIAClassificationApp />, div);
});
