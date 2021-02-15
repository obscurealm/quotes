import fs from "fs";
import { join } from "path";

export default class QuotesGateway {
  constructor(files) {
    this.quotesDirectory = files;
  }

  retrieveMarkdownFiles() {
    return fs.readdirSync(join(process.cwd(), this.quotesDirectory));
  }

  retrieveQuotes() {
    const files = this.retrieveMarkdownFiles();

    return files.map((file) => {
      const timestamp = file.replace(/\.md$/, "");
      const fullPath = join(
        join(process.cwd(), this.quotesDirectory),
        `${timestamp}.md`
      );

      return fs.readFileSync(fullPath, "utf8");
    });
  }
}
