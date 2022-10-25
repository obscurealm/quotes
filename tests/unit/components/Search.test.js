import Search from "../../../src/components/Search";
import React from "react";
import { render, screen } from "@testing-library/react";

describe("Search component", () => {
  it("displays the search button", () => {
    render(<Search />);

    expect(screen.getByText("Search")).toBeTruthy();
  });
});
