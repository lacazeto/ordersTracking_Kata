import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import App from "./App";

test("renders App", () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
});
