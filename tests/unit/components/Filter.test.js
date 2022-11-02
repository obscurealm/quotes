import Filter from "../../../src/components/Filter";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

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

    const setResults = (updatedQuotes) => (quotes = updatedQuotes);

    render(<Filter quotes={quotes} setResults={setResults} />);

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Tingker Bell Quotes" },
    });

    fireEvent.click(screen.getByText("Filter"));

    expect(quotes).toEqual([
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
    ]);
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

      const setResults = (updatedQuotes) => (quotes = updatedQuotes);

      render(<Filter quotes={quotes} setResults={setResults} />);

      fireEvent.change(screen.getByRole("combobox"), {
        target: { value: "Tingker Bell Quotes" },
      });
      fireEvent.click(screen.getByText("Filter"));

      fireEvent.change(screen.getByRole("combobox"), {
        target: { value: "All" },
      });
      fireEvent.click(screen.getByText("Filter"));

      expect(quotes).toHaveLength(2);
    });
  });
});
