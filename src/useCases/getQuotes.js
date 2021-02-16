export default class GetQuotesUseCase {
  constructor(gateway) {
    this.quotesGateway = gateway;
  }

  execute() {
    const quotes = this.quotesGateway.retrieveQuotes();

    return quotes.map((quote) => {
      const dialogues = quote.quote
        .trim()
        .split("\n\n")
        .map((dialogue) => {
          const [author, text] = dialogue.split(": ");

          return {
            author: author,
            text: text,
          };
        });

      return {
        timestamp: quote.frontMatter.timestamp,
        dialogue: dialogues,
      };
    });
  }
}
