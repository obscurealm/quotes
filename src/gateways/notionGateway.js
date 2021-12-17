import { Client } from "@notionhq/client";

export default class notionGateway {
  constructor(token) {
    this.client = new Client({auth: token});
  }
}
