import { render, screen, fireEvent } from "@testing-library/react";
import { FilterButtons } from ".";
// import { Status, Todo as TodoModel } from "../../types";

describe("FilterButtons", () => {
  test("display buttons", async () => {
    render(<FilterButtons />);

    expect(screen.getByText("Filters"));
    expect(screen.getByText("All"));
    expect(screen.getByText("Active"));
    expect(screen.getByText("Completed"));
    expect(screen.getByText("Favourites"));
    fireEvent.click(screen.getByText("Filters"));
    fireEvent.click(screen.getByText("All"));
    fireEvent.click(screen.getByText("Active"));
    fireEvent.click(screen.getByText("Completed"));
    fireEvent.click(screen.getByText("Favourites"));
  });
});
