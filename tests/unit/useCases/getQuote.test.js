import GetQuoteUseCase from "../../../src/useCases/getQuote.js";
import quotes, { quoteWithEmptyDialogue } from "../../fixtures/quotes";

describe("getQuote use case", () => {
  it("returns an object response", async () => {
    const quote = quotes[0];
    const gateway = {
      retrieveQuote: jest.fn().mockResolvedValue(quote),
    };
    const getQuote = new GetQuoteUseCase(gateway);

    expect(await getQuote.execute(quote.timestamp)).toEqual({
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

  it("removes dialogue without an author or text", async () => {
    const gateway = {
      retrieveQuote: jest.fn().mockResolvedValue(quoteWithEmptyDialogue),
    };
    const getQuote = new GetQuoteUseCase(gateway);

    expect(await getQuote.execute(quoteWithEmptyDialogue.timestamp)).toEqual({
      timestamp: 1593013680,
      dialogue: [{ author: "Ting", text: "Another one!" }],
    });
  });
});
