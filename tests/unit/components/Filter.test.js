import Filter from "../../../src/components/Filter";
import React from "react";
import { render, screen } from "@testing-library/react";

describe("Filter component", () => {
  it("displays the filter button", () => {
    render(<Filter />);

    expect(screen.getByText("Filter")).toBeTruthy();
  });
});
