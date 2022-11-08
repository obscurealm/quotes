import { Client } from "@notionhq/client";
import convertDateTimeToUnixTime from "../../utils/convertDateTimeToUnixTime";
import convertDateTimeToUtc from "../../utils/convertDateTimeToUtc";

const BLOCK_TYPE = {
  HeadingTwo: "heading_2",
  Paragraph: "paragraph",
};

export default class NotionGateway {
  constructor(tokens, pageIds) {
    this.workspaces = tokens.split(",").map((token, index) => ({
      client: new Client({ auth: token }),
      pageId: pageIds?.split(",")[index],
    }));
  }

  async retrieveQuotes() {
    const blocksInWorkspaces = await Promise.all(
      this.workspaces.map(async ({ client, pageId }) => {
        const title = (
          await client.pages.retrieve({
            page_id: pageId,
          })
        ).properties.title.title[0].plain_text;

        let response = await client.blocks.children.list({
          block_id: pageId,
        });
        let blocks = response.results;

        while (response.has_more) {
          response = await client.blocks.children.list({
            block_id: pageId,
            start_cursor: response.next_cursor,
          });

          blocks = blocks.concat(response.results);
        }

        return { title, blocks };
      })
    );

    return blocksInWorkspaces.reduce((quotes, { title, blocks }) => {
      const datetimeBlocks = blocks.filter(
        (block) => block.type === BLOCK_TYPE.HeadingTwo
      );

      const quote = datetimeBlocks.map((datetimeBlock, datetimeBlockIndex) => {
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
          .map((block) =>
            block.paragraph.rich_text
              .map((content) => {
                if (content.hasOwnProperty("annotations"))
                  content.plain_text = this.formatAnnotatedText(
                    content.annotations,
                    content.plain_text
                  );

                return content.plain_text;
              })
              .join("")
          );

        return {
          timestamp: convertDateTimeToUnixTime(
            convertDateTimeToUtc(
              datetimeBlock.heading_2.rich_text[0].text.content,
              process.env.NOTION_PAGE_TZ
            )
          ),
          dialogue,
          meta: {
            workspacePage: title,
          },
        };
      });

      return quotes.concat(quote);
    }, []);
  }

  async retrieveQuote(timestamp) {
    const quotes = await this.retrieveQuotes();

    return quotes.find((quote) => quote.timestamp === timestamp);
  }

  isSingleQuoteMessage(nextBlockIndex) {
    return nextBlockIndex === -1;
  }

  formatAnnotatedText(annotations, text) {
    if (annotations.bold) {
      text = "**" + text + "**";
    }
    if (annotations.italic) {
      text = "_" + text + "_";
    }
    if (annotations.strikethrough) {
      text = "~~" + text + "~~";
    }
    if (annotations.underline) {
      text = "<u>" + text + "</u>";
    }
    if (annotations.code) {
      text = "`" + text + "`";
    }

    return text;
  }
}
