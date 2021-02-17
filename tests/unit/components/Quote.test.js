import Quote from "../../../src/components/Quote";
import { render, screen } from "@testing-library/react";

describe("Quote component", () => {
  it("can display the quote", async () => {
    const quote = {
      timestamp: "123",
      dialogue: [{ author: "Yusuf", text: "speedieboi" }],
    };

    render(<Quote quote={quote} />);

    expect(await screen.findByText("123")).toBeTruthy();
    expect(await screen.findByText("Yusuf")).toBeTruthy();
    expect(await screen.findByText("speedieboi")).toBeTruthy();
  });
});
