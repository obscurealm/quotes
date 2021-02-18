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
          const delimiter = ": "
          const [author, ...text] = dialogue.split(delimiter);

          return {
            author: author,
            text: text.join(delimiter),
          };
        });

      return {
        timestamp: quote.frontMatter.timestamp,
        dialogue: dialogues,
      };
    });
  }
}
