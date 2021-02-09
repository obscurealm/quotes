import GetQuotesUseCase from "../../../src/useCases/getQuotes.js";

describe("getQuotes", () => {
  it("returns an array response", () => {
    const getQuotes = new GetQuotesUseCase();

    expect(getQuotes.execute()).toEqual([]);
  });
});
