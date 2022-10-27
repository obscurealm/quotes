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

    expect(screen.getByTestId("searchBox")).toBeTruthy();
  });

  it("displays the clear button", () => {
    render(<Search />);

    expect(screen.getByText("Clear")).toBeTruthy();
  });

  it("clears the search box", () => {
    render(<Search quotes={[]} setQuotes={jest.fn()} />);

    fireEvent.change(screen.getByTestId("searchBox"), {
      target: { value: "Hello!" },
    });

    fireEvent.click(screen.getByText("Clear"));

    expect(screen.getByTestId("searchBox")).toHaveValue("");
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

      const setQuotes = (updatedQuotes) => (quotes = updatedQuotes);

      render(<Search quotes={quotes} setQuotes={setQuotes} />);

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

      const setQuotes = (updatedQuotes) => (quotes = updatedQuotes);

      render(<Search quotes={quotes} setQuotes={setQuotes} />);

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

      const setQuotes = (updatedQuotes) => (quotes = updatedQuotes);

      render(<Search quotes={quotes} setQuotes={setQuotes} />);

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

      const setQuotes = (updatedQuotes) => (quotes = updatedQuotes);

      render(<Search quotes={quotes} setQuotes={setQuotes} />);

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

      const setQuotes = (updatedQuotes) => (quotes = updatedQuotes);

      render(<Search quotes={quotes} setQuotes={setQuotes} />);

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
});
