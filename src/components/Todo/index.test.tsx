import { render, screen } from "@testing-library/react";

import { Todo } from ".";
import { Status, Todo as TodoModel } from "../../types";

const mockTodo: TodoModel = {
  id: 1,
  attributes: {
    title: "title",
    description: "description",
    status: Status.Active,
  },
};

describe("Todo", () => {
  test("display todo", () => {
    render(<Todo todo={mockTodo} />);

    expect(screen.getByText("title"));
    expect(screen.getByText("description"));
  });
});
