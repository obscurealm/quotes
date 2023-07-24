import Filter from "../../../src/components/Filter";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Filter component", () => {
  const routerPushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useRouter.mockReturnValue({
      query: {
        filter: "",
      },
      push: routerPushMock,
    });
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

    expect(routerPushMock).toHaveBeenCalledTimes(1);
    expect(routerPushMock).toHaveBeenCalledWith({
      pathname: "/",
      query: { filter: "Tingker Bell Quotes", page: 1 },
    });
  });

  describe("when 'All' is selected after already filtering", () => {
    it("resets quotes back to initial list", () => {
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

      expect(routerPushMock).toHaveBeenCalledTimes(1);
      expect(routerPushMock).toHaveBeenCalledWith({
        pathname: "/",
        query: { filter: "Tingker Bell Quotes", page: 1 },
      });

      fireEvent.change(screen.getByRole("combobox"), {
        target: { value: "All" },
      });

      expect(routerPushMock).toHaveBeenCalledTimes(2);
      expect(routerPushMock).toHaveBeenCalledWith({
        pathname: "/",
        query: { filter: "All", page: 1 },
      });
    });
  });

  it("matches the filter query parameter by default", () => {
    useRouter.mockReturnValue({
      query: {
        filter: "Emperor King Yusuf Quotes",
      },
      push: routerPushMock,
    });

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

    expect(screen.getByTestId("workspacePageFilter")).toHaveValue(
      "Emperor King Yusuf Quotes",
    );
  });
});
