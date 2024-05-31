import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import App from ".";

describe("TodoList", () => {
  test("No data", async () => {
    render(<App />);
    expect(await screen.findByText(/no data/i)).toBeInTheDocument();
  });
});
