import GetQuotesUseCase from "../../../src/useCases/getQuotes.js";
import quotes from "../../../tests/fixtures/quotes.js";

describe("getQuotes use case", () => {
  it("returns an array response", async () => {
    const gateway = {
      retrieveQuotes: jest.fn().mockResolvedValue(quotes),
    };
    const getQuotes = new GetQuotesUseCase(gateway);

    expect(await getQuotes.execute()).toEqual([
      {
        timestamp: 1593013680,
        dialogue: [
          { author: "Ting", text: "_Hello!_" },
          {
            author: "Yusuf",
            text: "Goodbye!",
          },
        ],
      },
      {
        timestamp: 1593013680,
        dialogue: [
          { author: "Ting", text: "_Goodbye!_" },
          {
            author: "Yusuf",
            text: "Hello!",
          },
        ],
      },
      {
        timestamp: 1593013680,
        dialogue: [
          { author: "Ting", text: "Another one!" },
          {
            author: "Yusuf",
            text: "What do you think of `data: data`?",
          },
        ],
      },
    ]);
  });
});
