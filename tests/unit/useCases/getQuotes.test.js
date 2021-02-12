import GetQuotesUseCase from "../../../src/useCases/getQuotes.js";

describe("getQuotes use case", () => {
  it("returns an array response", () => {
    const getQuotes = new GetQuotesUseCase();

    expect(getQuotes.execute()).toEqual([
      {
        timestamp: "1593013680",
        dialogue: [
          { author: "Ting", text: "Butt it’s wrong? *strokes beard*" },
          {
            author: "Yusuf",
            text:
              "I don’t know if you are stroking my beard or your imaginary beard…",
          },
        ],
      },
    ]);
  });
});
