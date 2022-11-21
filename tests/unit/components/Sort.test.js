import Sort from "../../../src/components/Sort";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Sort component", () => {
  const routerMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useRouter.mockReturnValue({
      query: {
        sort: "",
      },
      push: routerMock,
    });
  });

  it("displays the 'Sort by:' text", () => {
    render(<Sort />);

    expect(screen.getByText("Sort by:")).toBeVisible();
  });

  it("displays the dropdown", () => {
    render(<Sort />);

    const dropdown = screen.getByRole("combobox");

    expect(dropdown).toBeInTheDocument();
  });

  it("displays sort by options as dropdown options", () => {
    render(<Sort />);

    const dropdown = screen.getByRole("combobox");
    const dropdownOptions = dropdown.childNodes;

    expect(dropdownOptions).toHaveLength(2);
    expect(dropdownOptions[0]).toHaveValue("latest");
    expect(dropdownOptions[1]).toHaveValue("oldest");
  });

  it("sets the sort query parameter to 'oldest'", () => {
    render(<Sort />);

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "oldest" },
    });

    expect(routerMock).toHaveBeenCalledTimes(1);
    expect(routerMock).toHaveBeenCalledWith({
      pathname: "/",
      query: { sort: "oldest", page: 1 },
    });
  });

  it("sets the sort query parameter to 'latest'", () => {
    render(<Sort />);

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "latest" },
    });

    expect(routerMock).toHaveBeenCalledTimes(1);
    expect(routerMock).toHaveBeenCalledWith({
      pathname: "/",
      query: { sort: "latest", page: 1 },
    });
  });
});
