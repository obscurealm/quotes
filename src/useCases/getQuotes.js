export default class GetQuotesUseCase {
  constructor(gateway) {
    this.gateway = gateway;
  }

  async execute() {
    const quotes = await this.gateway.retrieveQuotes();

    return quotes.map((quote) => {
      const dialogues = quote.dialogue
        .filter((dialogue) => dialogue !== "")
        .map((dialogue) => {
          const delimiter = ": ";

          if (dialogue.includes(delimiter)) {
            const [author, ...text] = dialogue.split(delimiter);

            return {
              author: author,
              text: text.join(delimiter),
            };
          }

          return {
            author: null,
            text: dialogue,
          };
        });

      return {
        timestamp: quote.timestamp,
        dialogue: dialogues,
        meta: quote.meta,
      };
    });
  }
}
