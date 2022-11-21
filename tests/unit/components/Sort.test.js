import Sort from "../../../src/components/Sort";
import { render, screen } from "@testing-library/react";

describe("Sort component", () => {
  it("displays the 'Sort by:' text", () => {
    render(<Sort />);

    expect(screen.getByText("Sort by:")).toBeVisible();
  });
});
