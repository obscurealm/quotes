import Reset from "../../../src/components/Reset";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Reset component", () => {
  it("displays the reset button", () => {
    render(<Reset />);

    expect(screen.getByText("Reset")).toBeTruthy();
  });

  it("styles the reset button", () => {
    render(<Reset style={{ marginBottom: "1rem" }} />);

    expect(screen.getByTestId("resetButton")).toHaveStyle({
      marginBottom: "1rem",
    });
  });

  describe("when clicking the reset button", () => {
    const routerMock = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("sets the filter query parameter to 'All'", () => {
      useRouter.mockReturnValue({
        query: {
          filter: "Tingker Bell Quotes",
        },
        push: routerMock,
      });

      render(<Reset />);

      fireEvent.click(screen.getByText("Reset"));

      expect(routerMock).toHaveBeenCalledTimes(1);
      expect(routerMock).toHaveBeenCalledWith({
        pathname: "/",
        query: expect.objectContaining({
          filter: "All",
        }),
      });
    });

    it("removes the page query parameter", () => {
      useRouter.mockReturnValue({
        query: {
          page: "1",
        },
        push: routerMock,
      });

      render(<Reset />);

      fireEvent.click(screen.getByText("Reset"));

      expect(routerMock).toHaveBeenCalledTimes(1);
      expect(routerMock).toHaveBeenCalledWith({
        pathname: "/",
        query: expect.objectContaining({
          page: null,
        }),
      });
    });

    it("removes the search query parameter", () => {
      useRouter.mockReturnValue({
        query: {
          search: "ting",
        },
        push: routerMock,
      });

      render(<Reset />);

      fireEvent.click(screen.getByText("Reset"));

      expect(routerMock).toHaveBeenCalledTimes(1);
      expect(routerMock).toHaveBeenCalledWith({
        pathname: "/",
        query: expect.objectContaining({
          search: null,
        }),
      });
    });

    it("keeps required query parameters", () => {
      useRouter.mockReturnValue({
        query: {
          required: "true",
        },
        push: routerMock,
      });

      render(<Reset />);

      fireEvent.click(screen.getByText("Reset"));

      expect(routerMock).toHaveBeenCalledTimes(1);
      expect(routerMock).toHaveBeenCalledWith({
        pathname: "/",
        query: expect.objectContaining({
          required: "true",
        }),
      });
    });
  });
});
