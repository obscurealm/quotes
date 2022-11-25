import Layout from "../../../src/components/Layout";
import React from "react";
import { render, screen } from "@testing-library/react";

jest.mock("next/head", () => {
  return {
    __esModule: true,
    default: (parameters) => {
      const children = parameters.children;

      return <>{children}</>;
    },
  };
});

jest.mock("next/router", () => ({
  useRouter() {
    return {
      asPath: "/quotes/foo/bar",
    };
  },
}));

describe("Layout component", () => {
  describe("when a title is provided", () => {
    it("displays the title", () => {
      const title = "Yusuf";

      render(<Layout title={title} />);

      expect(document.title).toEqual("Yusuf");
    });
  });

  describe("when a title isn't provided", () => {
    it("displays 'Quotes' as the title", () => {
      render(<Layout />);

      expect(document.title).toEqual("Quotes");
    });
  });

  it("displays the heading", () => {
    render(<Layout />);

    expect(screen.getByTestId("heading")).toHaveTextContent("Quotes");
  });

  it("displays the children", () => {
    render(<Layout>children</Layout>);

    expect(screen.getByText("children")).toBeTruthy();
  });

  it("displays the breadcrumbs when enabled", () => {
    render(<Layout showBreadcrumbs />);

    expect(screen.getByTestId("breadcrumbs")).toHaveTextContent("Home > foo");
  });

  it("displays no breadcrumbs when disabled", () => {
    render(<Layout />);

    expect(screen.queryByText("foo")).not.toBeInTheDocument();
  });
});
