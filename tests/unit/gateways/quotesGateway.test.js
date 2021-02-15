import QuotesGateway from "../../../src/gateways/quotesGateway.js";

describe("quotes gateway", () => {
  it("can be constructed with a quotes directory", () => {
    const gateway = new QuotesGateway("../fixtures/quotes");

    expect(gateway.quotesDirectory).toEqual("../fixtures/quotes");
  });

  it("can return list of markdown files", () => {
    const gateway = new QuotesGateway("tests/fixtures/quotes");

    expect(gateway.retrieveMarkdownFiles()).toEqual(["1.md", "2.md"]);
  });
});
