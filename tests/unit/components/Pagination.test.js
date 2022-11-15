import Pagination from "../../../src/components/Pagination";
import { render, screen } from "@testing-library/react";

describe("Pagination component", () => {
  it("displays the total number of pages given the page size", () => {
    render(<Pagination pageSize={2} totalCount={10} />);

    expect(screen.getByText(/1/)).toBeVisible();
    expect(screen.getByText(/2/)).toBeVisible();
    expect(screen.getByText(/3/)).toBeVisible();
    expect(screen.getByText(/4/)).toBeVisible();
    expect(screen.getByText(/5/)).toBeVisible();
  });

  it("highlights the current page number", () => {
    render(<Pagination pageSize={2} totalCount={6} currentPage={2} />);

    expect(screen.getByText(/1/)).not.toHaveStyle({
      "border-style": "solid",
    });
    expect(screen.getByText(/2/)).toHaveStyle({
      "border-style": "solid",
    });
    expect(screen.getByText(/3/)).not.toHaveStyle({
      "border-style": "solid",
    });
  });
});
