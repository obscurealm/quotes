import Quote from "../../../src/components/Quote";
import { render, screen } from "@testing-library/react";

describe("Quote component", () => {
  it("displays the quote", () => {
    const quote = {
      timestamp: "1613649600",
      dialogue: [{ author: "Yusuf", text: "speedieboi" }],
    };

    render(<Quote quote={quote} />);

    expect(screen.getByText("18 February 2021 at 12:00pm")).toBeVisible();
    expect(screen.getByText("Yusuf")).toBeTruthy();
    expect(screen.getByText("speedieboi")).toBeTruthy();
  });

  it("displays the quote with a link", () => {
    const quote = {
      timestamp: "1613649600",
      dialogue: [{ author: "Yusuf", text: "speedieboi" }],
    };

    render(<Quote quote={quote} hasLink={true} />);

    expect(screen.getByText("18 February 2021 at 12:00pm").closest('a')).toHaveAttribute("href", "/quotes/1613649600");
  })

  it("displays the quote without a link", () => {
    const quote = {
      timestamp: "1613649600",
      dialogue: [{ author: "Yusuf", text: "speedieboi" }],
    };

    render(<Quote quote={quote} hasLink={false} />);

    expect(screen.getByText("18 February 2021 at 12:00pm").closest('a')).toBeNull();
  })
});
