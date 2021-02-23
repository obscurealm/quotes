import GetQuoteUseCase from "../../../src/useCases/getQuote.js";
import MarkdownGateway from "../../../src/gateways/markdownGateway";

describe("getQuote use case", () => {
  it("returns an object response", () => {
    const gateway = new MarkdownGateway("tests/fixtures/quotes");
    const getQuote = new GetQuoteUseCase(gateway);

    expect(getQuote.execute("1.md")).toEqual({
      timestamp: 1593013680,
      dialogue: [
        { author: "Ting", text: "_Hello!_" },
        {
          author: "Yusuf",
          text: "Goodbye!",
        },
      ],
    });
  });
});
