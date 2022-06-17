export default class GetQuotesUseCase {
  constructor(gateway) {
    this.gateway = gateway;
  }

  async execute() {
    const quotes = await this.gateway.retrieveQuotes();

    return quotes.map((quote) => {
      const dialogues = quote.dialogue.map((dialogue) => {
        const delimiter = ": ";
        const [author, ...text] = dialogue.split(delimiter);

        return {
          author: author,
          text: text.join(delimiter),
        };
      });

      return {
        timestamp: quote.timestamp,
        dialogue: dialogues,
      };
    });
  }
}
