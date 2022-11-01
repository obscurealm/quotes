import Quotes from "../../../src/components/Quotes";
import { render, screen } from "@testing-library/react";

describe("Quotes component", () => {
  it("displays quotes with links", () => {
    const quotes = [
      {
        timestamp: "1613649600",
        dialogue: [{ author: "Yusuf", text: "speedieboi" }],
      },
      {
        timestamp: "1614610800",
        dialogue: [
          {
            author: "Ting",
            text: "I don't know the meaning of the word evil.",
          },
        ],
      },
    ];

    render(<Quotes quotes={quotes} />);

    expect(screen.getByTestId("quotes").children).toHaveLength(2);
    expect(
      screen.getByText("18 February 2021 at 12:00pm").closest("a")
    ).toHaveAttribute("href", "/quotes/1613649600");
    expect(
      screen.getByText("1 March 2021 at 3:00pm").closest("a")
    ).toHaveAttribute("href", "/quotes/1614610800");
  });

  it("sorts quotes with the latest timestamp at the top", () => {
    const quotes = [
      {
        timestamp: "1613649600", // 18 Feb
        dialogue: [],
      },
      {
        timestamp: "1614610800", // 1 Mar
        dialogue: [],
      },
      {
        timestamp: "1612649600", // 6 Feb
        dialogue: [],
      },
    ];

    render(<Quotes quotes={quotes} />);

    const sortedQuotes = screen.getByTestId("quotes").childNodes;

    expect(sortedQuotes[0]).toHaveTextContent("6 Feb");
    expect(sortedQuotes[1]).toHaveTextContent("18 Feb");
    expect(sortedQuotes[2]).toHaveTextContent("1 Mar");
  });
});
