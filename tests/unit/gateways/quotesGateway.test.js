import QuotesGateway from "../../../src/gateways/quotesGateway.js";

describe("quotes gateway", () => {
  it("can be constructed with a quotes directory", () => {
    const gateway = new QuotesGateway('../fixtures/quotes');

    expect(gateway.quotesDirectory).toEqual('../fixtures/quotes');
  });
});
