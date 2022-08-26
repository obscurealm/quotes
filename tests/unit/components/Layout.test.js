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
  it("displays the title", () => {
    const title = "Yusuf";

    render(<Layout title={title} />, {
      container: document.head,
    });

    expect(document.title).toEqual("Yusuf");
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
