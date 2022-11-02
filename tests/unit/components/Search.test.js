import Search from "../../../src/components/Search";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Quote from "../../../src/components/Quote";

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
    it("matching the exact search term", () => {
      const searchTeam = "Hello!";
      const dialogueText = "Hello!";

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
            { author: "Ting", text: dialogueText },
            { author: "Yusuf", text: "Goodbye!" },
          ],
        },
      ];

      const setResults = (updatedQuotes) => (quotes = updatedQuotes);

      render(<Search quotes={quotes} setResults={setResults} />);

      fireEvent.change(screen.getByTestId("searchBox"), {
        target: { value: searchTeam },
      });

      fireEvent.click(screen.getByText("Search"));

      expect(quotes).toEqual([
        {
          timestamp: 1593013680,
          dialogue: [
            { author: "Ting", text: dialogueText },
            { author: "Yusuf", text: "Goodbye!" },
          ],
        },
      ]);
    });

    it("including the search term", () => {
      const searchTeam = "Hello!";
      const dialogueText = "_Hello!_";

      let quotes = [
        {
          timestamp: 1593013680,
          dialogue: [
            { author: "Yusuf", text: "Goodbye!" },
            { author: "Ting", text: dialogueText },
          ],
        },
      ];

      const setResults = (updatedQuotes) => (quotes = updatedQuotes);

      render(<Search quotes={quotes} setResults={setResults} />);

      fireEvent.change(screen.getByTestId("searchBox"), {
        target: { value: searchTeam },
      });

      fireEvent.click(screen.getByText("Search"));

      expect(quotes).toEqual([
        {
          timestamp: 1593013680,
          dialogue: [
            { author: "Yusuf", text: "Goodbye!" },
            { author: "Ting", text: dialogueText },
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

      const setResults = (updatedQuotes) => (quotes = updatedQuotes);

      render(<Search quotes={quotes} setResults={setResults} />);

      fireEvent.change(screen.getByTestId("searchBox"), {
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

      const setResults = (updatedQuotes) => (quotes = updatedQuotes);

      render(<Search quotes={quotes} setResults={setResults} />);

      fireEvent.change(screen.getByTestId("searchBox"), {
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

    it("pressing the enter/return key", () => {
      const searchTeam = "hello!";
      const dialogueText = "Hello!";

      let quotes = [
        {
          timestamp: 1593013680,
          dialogue: [{ author: "Yusuf", text: dialogueText }],
        },
        {
          timestamp: 1593013681,
          dialogue: [{ author: "Ting", text: "Bye!" }],
        },
      ];

      const setResults = (updatedQuotes) => (quotes = updatedQuotes);

      render(<Search quotes={quotes} setResults={setResults} />);

      const searchBox = screen.getByTestId("searchBox");

      fireEvent.change(searchBox, {
        target: { value: searchTeam },
      });

      fireEvent.keyDown(searchBox, { key: "Enter", keyCode: 13 });

      expect(quotes).toEqual([
        {
          timestamp: 1593013680,
          dialogue: [{ author: "Yusuf", text: dialogueText }],
        },
      ]);
    });
  });

  it("clears the search box", () => {
    render(<Search quotes={[]} setResults={jest.fn()} />);

    fireEvent.change(screen.getByTestId("searchBox"), {
      target: { value: "Hello!" },
    });

    fireEvent.click(screen.getByText("Reset"));

    expect(screen.getByTestId("searchBox")).toHaveValue("");
  });

  it("styles the search", () => {
    render(
      <Search
        quotes={[]}
        setResults={jest.fn()}
        style={{ marginBottom: "1rem" }}
      />
    );

    expect(screen.getByTestId("search")).toHaveStyle({
      marginBottom: "1rem",
    });
  });
});
