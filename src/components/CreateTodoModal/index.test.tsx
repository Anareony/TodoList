import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { CreateTodoModal } from ".";

describe("Todo Modal with form", () => {
  test("Open modal, type in inputs and confirm", async () => {
    render(<CreateTodoModal />);

    const openModalButton = screen.getByText(/create todo/i);
    fireEvent.click(openModalButton);
    await waitFor(() =>
      expect(screen.queryByText("Add Task")).toBeInTheDocument()
    );

    const titleInput = screen.getByTestId("title") as HTMLInputElement;
    fireEvent.change(titleInput, { target: { value: "new value title" } });

    const descTextArea = screen.getByTestId(
      "description"
    ) as HTMLTextAreaElement;
    fireEvent.change(descTextArea, {
      target: { value: "new value description" },
    });
    expect(descTextArea.value).toBe("new value description");

    const confirmButton = screen.getByText("Add Task");
    await waitFor(() => fireEvent.click(confirmButton));

    await waitFor(() =>
      expect(screen.queryByText("Add Task")).not.toBeVisible()
    );
  });
});
