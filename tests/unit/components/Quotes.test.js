import Quotes from "../../../src/components/Quotes";
import { render, screen } from "@testing-library/react";

describe("Quotes component", () => {
  it("can display quotes with links", () => {
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
});
