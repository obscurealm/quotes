import Reset from "../../../src/components/Reset";
import { render, screen } from "@testing-library/react";

describe("Reset component", () => {
  it("displays the reset button", () => {
    render(<Reset />);

    expect(screen.getByText("Reset")).toBeTruthy();
  });

  it("styles the reset button", () => {
    render(<Reset style={{ marginBottom: "1rem" }} />);

    expect(screen.getByTestId("resetButton")).toHaveStyle({
      marginBottom: "1rem",
    });
  });
});
