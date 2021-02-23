export default class GetQuoteUseCase {
  constructor(gateway) {
    this.quotesGateway = gateway;
  }

  execute(file) {
    const quote = this.quotesGateway.retrieveQuote(file);

    const dialogues = quote.quote
      .trim()
      .split("\n\n")
      .map((dialogue) => {
        const delimiter = ": ";
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
  }
}
