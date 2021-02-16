import GetQuotesUseCase from "../../../src/useCases/getQuotes.js";
import MarkdownGateway from "../../../src/gateways/markdownGateway";

describe("getQuotes use case", () => {
  it("returns an array response", async () => {
    const gateway = new MarkdownGateway("tests/fixtures/quotes")
    const getQuotes = new GetQuotesUseCase(gateway);

    expect(getQuotes.execute()).toEqual([
      {
        timestamp: 1593013680,
        dialogue: [
          { author: "Ting", text: "_Hello!_" },
          {
            author: "Yusuf",
            text:
              "Goodbye!",
          },
        ],
      },
      {
        timestamp: 1593013680,
        dialogue: [
          { author: "Ting", text: "_Goodbye!_" },
          {
            author: "Yusuf",
            text:
              "Hello!",
          },
        ],
      },
    ]);
  });
});
