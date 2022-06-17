import { Client } from "@notionhq/client";

export default class notionGateway {
  constructor(token, pageId) {
    this.client = new Client({ auth: token });
    this.pageId = pageId;
  }

  async retrieveQuotes() {
    let response = await this.client.blocks.children.list({
      block_id: this.pageId,
    });
    let blocks = response.results;

    while (response.has_more) {
      response = await this.client.blocks.children.list({
        block_id: this.pageId,
        start_cursor: response.next_cursor,
      });

      blocks = blocks.concat(response.results);
    }

    const datetimeBlocks = blocks.filter((block) => block.type === "heading_2");

    const quotes = datetimeBlocks.map((datetimeBlock, datetimeBlockIndex) => {
      const blockIndex = blocks.findIndex(
        (block) => block.id === datetimeBlock.id
      );

      const nextBlockIndex = blocks.findIndex(
        (block) => block.id === datetimeBlocks[datetimeBlockIndex + 1]?.id
      );

      const dialogueBlocks = this.isSingleQuoteMessage(nextBlockIndex)
        ? blocks.slice(blockIndex + 1)
        : blocks.slice(blockIndex + 1, nextBlockIndex);

      const dialogue = dialogueBlocks
        .filter((block) => block.type === "paragraph")
        .map((block) => block.paragraph.text[0].plain_text);

      return {
        datetime: datetimeBlock.heading_2.text[0].text.content,
        dialogue,
      };
    });

    return quotes;
  }

  isSingleQuoteMessage(nextBlockIndex) {
    return nextBlockIndex === -1;
  }
}
