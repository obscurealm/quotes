import QuotesGateway from "../../../src/gateways/quotesGateway.js";

describe("quotes gateway", () => {
  it("can be constructed with a quotes directory", () => {
    const gateway = new QuotesGateway("../fixtures/quotes");

    expect(gateway.quotesDirectory).toEqual("../fixtures/quotes");
  });

  it("can return a list containing quotes' contents", () => {
    const gateway = new QuotesGateway("tests/fixtures/quotes");

    expect(gateway.retrieveQuotes(["content"])).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          content: "\n**Ting**: _Hello!_\n\n**Yusuf**: Goodbye!\n",
        }),
        expect.objectContaining({
          content: "\n**Ting**: _Goodbye!_\n\n**Yusuf**: Hello!\n",
        }),
      ])
    );
  });

  it("can return a list containing quotes' front matter", () => {
    const gateway = new QuotesGateway("tests/fixtures/quotes");

    expect(gateway.retrieveQuotes(["front"])).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          front: "matter",
        }),
        expect.objectContaining({
          front: "matter",
        }),
      ])
    );
  });
});
