import Quote from "../../../src/components/Quote";
import { render, screen } from "@testing-library/react";

describe("Quote component", () => {
  it("can display the quote", async () => {
    const quote = {
      timestamp: "1613649600",
      dialogue: [{ author: "Yusuf", text: "speedieboi" }],
    };

    render(<Quote quote={quote} />);

    expect(await screen.findByText("18 February 2021 at 12:00pm")).toBeTruthy();
    expect(await screen.findByText("Yusuf")).toBeTruthy();
    expect(await screen.findByText("speedieboi")).toBeTruthy();
  });
});
