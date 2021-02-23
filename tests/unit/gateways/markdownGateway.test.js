import MarkdownGateway from "../../../src/gateways/markdownGateway.js";

describe("markdown gateway", () => {
  it("can be constructed with a quotes directory", () => {
    const gateway = new MarkdownGateway("../fixtures/quotes");

    expect(gateway.quotesDirectory).toEqual("../fixtures/quotes");
  });

  it("can return a quotes' contents", () => {
    const gateway = new MarkdownGateway("tests/fixtures/quotes");

    expect(gateway.retrieveQuote("1.md")).toEqual(
      expect.objectContaining({
        quote: "\nTing: _Hello!_\n\nYusuf: Goodbye!\n",
      })
    );
  });

  it("can return a list containing quotes' contents", () => {
    const gateway = new MarkdownGateway("tests/fixtures/quotes");

    expect(gateway.retrieveQuotes(["content"])).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          quote: "\nTing: _Hello!_\n\nYusuf: Goodbye!\n",
        }),
        expect.objectContaining({
          quote: "\nTing: _Goodbye!_\n\nYusuf: Hello!\n",
        }),
      ])
    );
  });

  it("can return a list containing quotes' front matter", () => {
    const gateway = new MarkdownGateway("tests/fixtures/quotes");

    expect(gateway.retrieveQuotes(["front"])).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          frontMatter: { timestamp: 1593013680 },
        }),
        expect.objectContaining({
          frontMatter: { timestamp: 1593013680 },
        }),
      ])
    );
  });
});
