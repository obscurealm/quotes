import { Client } from "@notionhq/client";

export default class notionGateway {
  constructor(token, pageId) {
    this.client = new Client({auth: token})
    this.pageId = pageId
  }
}
