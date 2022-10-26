import Search from "../../../src/components/Search";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Search component", () => {
  it("displays the search button", () => {
    render(<Search />);

    expect(screen.getByText("Search")).toBeTruthy();
  });

  it("displays the search box", () => {
    render(<Search />);

    expect(screen.getByTestId("search")).toBeTruthy();
  });

  describe("filters quotes", () => {
    it("matching the search term", () => {
      let quotes = [
        {
          timestamp: 1593013680,
          dialogue: [
            { author: "Ting", text: "Another one!" },
            { author: "Yusuf", text: "What do you think of `data: data`?" },
          ],
        },
        {
          timestamp: 1593013680,
          dialogue: [
            { author: "Ting", text: "_Hello!_" },
            { author: "Yusuf", text: "Goodbye!" },
          ],
        },
      ];

      const setQuotes = (updatedQuotes) => (quotes = updatedQuotes);

      render(<Search quotes={quotes} setQuotes={setQuotes} />);

      fireEvent.change(screen.getByTestId("search"), {
        target: { value: "Hello!" },
      });

      fireEvent.click(screen.getByText("Search"));

      expect(quotes).toEqual([
        {
          timestamp: 1593013680,
          dialogue: [
            { author: "Ting", text: "_Hello!_" },
            { author: "Yusuf", text: "Goodbye!" },
          ],
        },
      ]);
    });

    it("ignoring the casing of the search term", () => {
      const searchTeam = "Hello!";
      const dialogueText = "hello!";

      let quotes = [
        {
          timestamp: 1593013680,
          dialogue: [{ author: "Ting", text: dialogueText }],
        },
      ];

      const setQuotes = (updatedQuotes) => (quotes = updatedQuotes);

      render(<Search quotes={quotes} setQuotes={setQuotes} />);

      fireEvent.change(screen.getByTestId("search"), {
        target: { value: searchTeam },
      });

      fireEvent.click(screen.getByText("Search"));

      expect(quotes).toEqual([
        {
          timestamp: 1593013680,
          dialogue: [{ author: "Ting", text: dialogueText }],
        },
      ]);
    });

    it("ignoring the casing of the dialogue text", () => {
      const searchTeam = "hello!";
      const dialogueText = "Hello!";

      let quotes = [
        {
          timestamp: 1593013680,
          dialogue: [{ author: "Ting", text: dialogueText }],
        },
      ];

      const setQuotes = (updatedQuotes) => (quotes = updatedQuotes);

      render(<Search quotes={quotes} setQuotes={setQuotes} />);

      fireEvent.change(screen.getByTestId("search"), {
        target: { value: searchTeam },
      });

      fireEvent.click(screen.getByText("Search"));

      expect(quotes).toEqual([
        {
          timestamp: 1593013680,
          dialogue: [{ author: "Ting", text: dialogueText }],
        },
      ]);
    });
  });
});
