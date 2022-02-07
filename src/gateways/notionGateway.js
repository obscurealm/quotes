import { Client } from "@notionhq/client";

export default class notionGateway {
  constructor(token, pageId) {
    this.client = new Client({ auth: token });
    this.pageId = pageId;
  }

  async retrieveQuotes() {
    const results = (
      await this.client.blocks.children.list({ block_id: this.pageId })
    ).results;

    return [
      {
        datetime: results[0].heading_2.text[0].text.content,
        dialogue: [results[1].paragraph.text[0].plain_text],
      },
    ];
  }
}
