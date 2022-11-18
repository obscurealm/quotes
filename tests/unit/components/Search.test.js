import Search from "../../../src/components/Search";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Search component", () => {
  it("displays the search button", () => {
    render(<Search />);

    expect(screen.getByText("Search")).toBeTruthy();
  });

  it("displays the search box", () => {
    render(<Search />);

    expect(screen.getByTestId("searchBox")).toBeTruthy();
  });

  it("displays the reset button", () => {
    render(<Search />);

    expect(screen.getByText("Reset")).toBeTruthy();
  });

  describe("filters quotes", () => {
    const routerMock = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();

      useRouter.mockReturnValue({
        push: routerMock,
      });
    });

    it("matching/including the search term", () => {
      const searchTeam = "Hello!";

      render(<Search />);

      fireEvent.change(screen.getByTestId("searchBox"), {
        target: { value: searchTeam },
      });

      fireEvent.click(screen.getByText("Search"));

      expect(routerMock).toHaveBeenCalledTimes(1);
      expect(routerMock).toHaveBeenCalledWith({
        pathname: "/",
        query: { page: 1, search: "Hello!" },
      });
    });

    it("pressing the enter/return key", () => {
      const searchTeam = "hello!";

      render(<Search />);

      const searchBox = screen.getByTestId("searchBox");

      fireEvent.change(searchBox, {
        target: { value: searchTeam },
      });

      fireEvent.keyDown(searchBox, { key: "Enter", keyCode: 13 });

      expect(routerMock).toHaveBeenCalledTimes(1);
      expect(routerMock).toHaveBeenCalledWith({
        pathname: "/",
        query: { page: 1, search: "hello!" },
      });
    });
  });

  it("clears the search box", () => {
    render(<Search />);

    fireEvent.change(screen.getByTestId("searchBox"), {
      target: { value: "Hello!" },
    });

    fireEvent.click(screen.getByText("Reset"));

    expect(screen.getByTestId("searchBox")).toHaveValue("");
  });

  it("styles the search", () => {
    render(<Search style={{ marginBottom: "1rem" }} />);

    expect(screen.getByTestId("search")).toHaveStyle({
      marginBottom: "1rem",
    });
  });
});
