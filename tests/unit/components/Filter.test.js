import Filter from "../../../src/components/Filter";
import React from "react";
import { render, screen } from "@testing-library/react";

describe("Filter component", () => {
  it("displays the filter button", () => {
    render(<Filter />);

    expect(screen.getByText("Filter")).toBeTruthy();
  });

  it("displays the dropdown", () => {
    render(<Filter />);

    const dropdown = screen.getByRole("combobox");
    const dropdownOptions = dropdown.childNodes;

    expect(dropdown).toBeInTheDocument();
    expect(dropdownOptions).toHaveLength(3);
    expect(dropdownOptions[0]).toHaveValue("All");
    expect(dropdownOptions[1]).toHaveValue("Emperor King Yusuf Quotes");
    expect(dropdownOptions[2]).toHaveValue("Tingker Bell Quotes");
  });
});
