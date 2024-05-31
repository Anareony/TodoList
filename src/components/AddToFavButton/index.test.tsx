import { fireEvent, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { AddToFavButton } from ".";

describe("AddToFavButton", () => {
  test("Display todos", async () => {
    render(<AddToFavButton id={1} />);

    const favButton = screen.getByTestId("toggleFav");
    const favIcon = screen.getByTestId("favIcon");
    expect(favButton);
    fireEvent.click(favButton);
    expect(favIcon).toHaveStyle("color: #fadb14");
    fireEvent.click(favButton);
    expect(favIcon).toHaveStyle("color: #83839c");
  });
});
