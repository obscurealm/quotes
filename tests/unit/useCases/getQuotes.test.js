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
        meta: {
          workspacePage: "Emperor King Yusuf Quotes",
        },
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
        meta: {
          workspacePage: "Emperor King Yusuf Quotes",
        },
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
        meta: {
          workspacePage: "Tingker Bell Quotes",
        },
      },
      {
        timestamp: 1593013680,
        dialogue: [{ author: "Ting", text: "Another one!" }],
        meta: {
          workspacePage: "Tingker Bell Quotes",
        },
      },
      {
        timestamp: 1593013681,
        dialogue: [
          { author: "Ting", text: "m8" },
          { author: null, text: "..." },
          { author: "Yusuf", text: "m10" },
        ],
        meta: {
          workspacePage: "Emperor King Yusuf Quotes",
        },
      },
    ]);
  });
});
