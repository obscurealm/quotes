import QuotesGateway from "../../../src/gateways/quotesGateway.js";

describe("quotes gateway", () => {
  it("can be constructed with a quotes directory", () => {
    const gateway = new QuotesGateway("../fixtures/quotes");

    expect(gateway.quotesDirectory).toEqual("../fixtures/quotes");
  });

  it("can return a list of markdown files", () => {
    const gateway = new QuotesGateway("tests/fixtures/quotes");

    expect(gateway.retrieveMarkdownFiles()).toEqual(["1.md", "2.md"]);
  });

  it("can return a list of quotes", () => {
    const gateway = new QuotesGateway("tests/fixtures/quotes");

    expect(gateway.retrieveQuotes()).toEqual([
      "**Ting**: _Hello!_\n" + "\n" + "**Yusuf**: Goodbye!\n",
      "**Ting**: _Goodbye!_\n" + "\n" + "**Yusuf**: Hello!\n",
    ]);
  });
});
