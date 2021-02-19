import Quotes from "../../../src/components/Quotes";
import { render, screen } from "@testing-library/react";

describe("Quotes component", () => {
  it("can display quotes", () => {
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
  });
});
