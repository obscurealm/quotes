import Quote from "../../../src/components/Quote";
import { render, screen } from "@testing-library/react";

describe("Quote component", () => {
  it("can display the quote", () => {
    const quote = {
      timestamp: "1613649600",
      dialogue: [{ author: "Yusuf", text: "speedieboi" }],
    };

    render(<Quote quote={quote} />);

    expect(screen.getByText("18 February 2021 at 12:00pm")).toBeTruthy();
    expect(screen.getByText("Yusuf")).toBeTruthy();
    expect(screen.getByText("speedieboi")).toBeTruthy();
  });
});
