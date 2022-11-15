import Pagination from "../../../src/components/Pagination";
import { render, screen } from "@testing-library/react";

describe("Pagination component", () => {
  it("displays the total number of pages based on page size", () => {
    render(<Pagination pageSize={2} totalCount={10} />);

    expect(screen.getByText(/1/)).toBeVisible();
    expect(screen.getByText(/2/)).toBeVisible();
    expect(screen.getByText(/3/)).toBeVisible();
    expect(screen.getByText(/4/)).toBeVisible();
    expect(screen.getByText(/5/)).toBeVisible();
  });
});
