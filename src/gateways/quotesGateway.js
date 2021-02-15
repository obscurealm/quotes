import fs from "fs";
import { join } from "path";

export default class QuotesGateway {
  constructor(files) {
    this.quotesDirectory = files;
  }

  retrieveMarkdownFiles() {
    return fs.readdirSync(join(process.cwd(), this.quotesDirectory));
  }
}
