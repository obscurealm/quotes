export default class GetQuoteUseCase {
  constructor(gateway) {
    this.markdownGateway = gateway;
  }

  execute(file) {
    const quote = this.markdownGateway.retrieveQuote(file);

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
