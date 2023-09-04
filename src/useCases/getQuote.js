export default class GetQuoteUseCase {
  constructor(gateway) {
    this.gateway = gateway;
  }

  async execute(timestamp) {
    const quote = await this.gateway.retrieveQuote(timestamp);

    const dialogues = quote.dialogue
      .filter((dialogue) => dialogue !== "")
      .map((dialogue) => {
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
  }
}
