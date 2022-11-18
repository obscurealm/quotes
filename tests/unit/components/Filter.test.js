import Filter from "../../../src/components/Filter";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Filter component", () => {
  it("displays the filter button", () => {
    render(<Filter quotes={[]} />);

    expect(screen.getByText("Filter")).toBeTruthy();
  });

  it("displays the dropdown", () => {
    render(<Filter quotes={[]} />);

    const dropdown = screen.getByRole("combobox");

    expect(dropdown).toBeInTheDocument();
  });

  it("displays workspace pages as dropdown options", () => {
    const quotes = [
      {
        timestamp: "1613649600",
        dialogue: [{ author: "Y", text: "poo" }],
        meta: {
          workspacePage: "Emperor King Yusuf Quotes",
        },
      },
      {
        timestamp: "1613649600",
        dialogue: [{ author: "Y", text: "speedieboi" }],
        meta: {
          workspacePage: "Emperor King Yusuf Quotes",
        },
      },
      {
        timestamp: "1614610800",
        dialogue: [
          {
            author: "T",
            text: "I don't know the meaning of the word evil.",
          },
        ],
        meta: {
          workspacePage: "Tingker Bell Quotes",
        },
      },
    ];

    render(<Filter quotes={quotes} />);

    const dropdown = screen.getByRole("combobox");
    const dropdownOptions = dropdown.childNodes;

    expect(dropdownOptions).toHaveLength(3);
    expect(dropdownOptions[0]).toHaveValue("All");
    expect(dropdownOptions[1]).toHaveValue("Emperor King Yusuf Quotes");
    expect(dropdownOptions[2]).toHaveValue("Tingker Bell Quotes");
  });

  it("filters quotes by workspace page", () => {
    const routerMock = jest.fn();

    jest.clearAllMocks();

    useRouter.mockReturnValue({
      push: routerMock,
    });

    let quotes = [
      {
        timestamp: "1613649600",
        dialogue: [{ author: "Y", text: "poo" }],
        meta: {
          workspacePage: "Emperor King Yusuf Quotes",
        },
      },
      {
        timestamp: "1613649600",
        dialogue: [{ author: "Y", text: "speedieboi" }],
        meta: {
          workspacePage: "Emperor King Yusuf Quotes",
        },
      },
      {
        timestamp: "1614610800",
        dialogue: [
          {
            author: "T",
            text: "I don't know the meaning of the word evil.",
          },
        ],
        meta: {
          workspacePage: "Tingker Bell Quotes",
        },
      },
    ];

    render(<Filter quotes={quotes} />);

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Tingker Bell Quotes" },
    });

    fireEvent.click(screen.getByText("Filter"));

    expect(routerMock).toHaveBeenCalledTimes(1);
    expect(routerMock).toHaveBeenCalledWith({
      pathname: "/",
      query: { filter: "Tingker Bell Quotes", page: 1 },
    });
  });

  describe("when 'All' is selected after already filtering", () => {
    it("resets quotes back to initial list", () => {
      const routerMock = jest.fn();

      jest.clearAllMocks();

      useRouter.mockReturnValue({
        push: routerMock,
      });

      let quotes = [
        {
          timestamp: "1613649600",
          dialogue: [{ author: "Y", text: "poo" }],
          meta: {
            workspacePage: "Emperor King Yusuf Quotes",
          },
        },
        {
          timestamp: "1614610800",
          dialogue: [
            {
              author: "T",
              text: "I don't know the meaning of the word evil.",
            },
          ],
          meta: {
            workspacePage: "Tingker Bell Quotes",
          },
        },
      ];

      render(<Filter quotes={quotes} />);

      fireEvent.change(screen.getByRole("combobox"), {
        target: { value: "Tingker Bell Quotes" },
      });
      fireEvent.click(screen.getByText("Filter"));

      expect(routerMock).toHaveBeenCalledTimes(1);
      expect(routerMock).toHaveBeenCalledWith({
        pathname: "/",
        query: { filter: "Tingker Bell Quotes", page: 1 },
      });

      fireEvent.change(screen.getByRole("combobox"), {
        target: { value: "All" },
      });
      fireEvent.click(screen.getByText("Filter"));

      expect(routerMock).toHaveBeenCalledTimes(2);
      expect(routerMock).toHaveBeenCalledWith({
        pathname: "/",
        query: { filter: "All", page: 1 },
      });
    });
  });

  it("styles the filter", () => {
    render(<Filter quotes={[]} style={{ marginBottom: "1rem" }} />);

    expect(screen.getByTestId("filter")).toHaveStyle({
      marginBottom: "1rem",
    });
  });
});
