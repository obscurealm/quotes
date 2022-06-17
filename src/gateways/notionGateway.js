import { Client } from "@notionhq/client";
import convertDateTimeToUnixTime from "../../utils/convertDateTimeToUnixTime";

const BLOCK_TYPE = {
  HeadingTwo: "heading_2",
  Paragraph: "paragraph",
};

export default class NotionGateway {
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

    const datetimeBlocks = blocks.filter(
      (block) => block.type === BLOCK_TYPE.HeadingTwo
    );

    return datetimeBlocks.map((datetimeBlock, datetimeBlockIndex) => {
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
        .filter((block) => block.type === BLOCK_TYPE.Paragraph)
        .map((block) => block.paragraph.text[0].plain_text);

      return {
        timestamp: convertDateTimeToUnixTime(
          datetimeBlock.heading_2.text[0].text.content
        ),
        dialogue,
      };
    });
  }

  isSingleQuoteMessage(nextBlockIndex) {
    return nextBlockIndex === -1;
  }
}
