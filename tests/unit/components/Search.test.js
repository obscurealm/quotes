import Search from "../../../src/components/Search";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Search component", () => {
  const routerPushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useRouter.mockReturnValue({
      query: {
        search: "",
      },
      push: routerPushMock,
    });
  });

  it("displays the search button", () => {
    render(<Search />);

    expect(screen.getByText("Search")).toBeTruthy();
  });

  it("displays the search box", () => {
    render(<Search />);

    expect(screen.getByTestId("searchBox")).toBeTruthy();
  });

  describe("filters quotes", () => {
    it("matching/including the search term", () => {
      const searchTeam = "Hello!";

      render(<Search />);

      fireEvent.change(screen.getByTestId("searchBox"), {
        target: { value: searchTeam },
      });

      fireEvent.click(screen.getByText("Search"));

      expect(routerPushMock).toHaveBeenCalledTimes(1);
      expect(routerPushMock).toHaveBeenCalledWith({
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

      expect(routerPushMock).toHaveBeenCalledTimes(1);
      expect(routerPushMock).toHaveBeenCalledWith({
        pathname: "/",
        query: { page: 1, search: "hello!" },
      });
    });
  });

  it("matches the search query parameter by default", () => {
    useRouter.mockReturnValue({
      query: {
        search: "Yusuf",
      },
      push: routerPushMock,
    });

    render(<Search />);

    expect(screen.getByTestId("searchBox")).toHaveValue("Yusuf");
  });
});
