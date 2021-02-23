import MarkdownGateway from "../../../src/gateways/markdownGateway.js";

describe("markdown gateway", () => {
  const gateway = new MarkdownGateway("tests/fixtures/quotes");

  it("can be constructed with a quotes directory", () => {
    expect(gateway.quotesDirectory).toEqual("tests/fixtures/quotes");
  });

  it("can return a quotes' contents", () => {
    expect(gateway.retrieveQuote("1.md")).toEqual(
      expect.objectContaining({
        quote: "\nTing: _Hello!_\n\nYusuf: Goodbye!\n",
      })
    );
  });

  it("can return a quotes' front matter", () => {
    expect(gateway.retrieveQuote("2.md")).toEqual(
      expect.objectContaining({
        frontMatter: { timestamp: 1593013680 },
      })
    );
  });

  it("can return a list containing quotes' contents", () => {
    expect(gateway.retrieveQuotes()).toEqual(
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
    expect(gateway.retrieveQuotes()).toEqual(
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
