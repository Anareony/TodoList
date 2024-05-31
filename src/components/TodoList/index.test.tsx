import { render, waitFor } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { TodoList } from ".";

describe("TodoList", () => {
  test("No data", async () => {
    render(<TodoList />);

    expect(await screen.findByText(/no data/i)).toBeInTheDocument();
  });

  test("Display todos", async () => {
    render(<TodoList />);

    await waitFor(() => {
      expect(screen.findAllByTestId("todo-item"));
      expect(screen.findAllByTestId("checkbox"));
      expect(screen.findAllByTestId("delete"));
      expect(screen.findAllByTestId("checkbox"));
    });
  });
});
