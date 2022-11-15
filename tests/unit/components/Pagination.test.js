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

  describe("when the current page is the last page", () => {
    it("displays the previous link", () => {
      render(<Pagination pageSize={2} totalCount={6} currentPage={3} />);

      expect(screen.getByText("Previous").closest("a")).toHaveAttribute(
        "href",
        "#"
      );
    });

    it("hides the next link", () => {
      render(<Pagination pageSize={2} totalCount={6} currentPage={3} />);

      expect(screen.queryByText("Next")).not.toBeInTheDocument();
    });
  });

  describe("when the current page is the first page", () => {
    it("displays the next link", () => {
      render(<Pagination pageSize={2} totalCount={6} currentPage={1} />);

      expect(screen.getByText("Next").closest("a")).toHaveAttribute(
        "href",
        "#"
      );
    });
  });
});
