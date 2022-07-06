import Breadcrumbs from "../../../src/components/Breadcrumbs";
import { render, screen } from "@testing-library/react";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      asPath: "/quotes/foo/bar",
    };
  },
}));

describe("Breadcrumbs component", () => {
  it("displays the breadcrumbs excluding the current path", () => {
    render(<Breadcrumbs />);

    expect(screen.getByText(/Home/).closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText(/foo/).closest("a")).toHaveAttribute(
      "href",
      "/quotes/foo"
    );
    expect(screen.queryByText(/bar/)).not.toBeInTheDocument();
  });
});
