import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

export default class QuotesGateway {
  constructor(files) {
    this.quotesDirectory = files;
  }

  retrieveMarkdownFiles() {
    return fs.readdirSync(join(process.cwd(), this.quotesDirectory));
  }

  retrieveQuotes(fields = []) {
    const files = this.retrieveMarkdownFiles();

    return files.map((file) => {
      const timestamp = file.replace(/\.md$/, "");
      const fullPath = join(
        join(process.cwd(), this.quotesDirectory),
        `${timestamp}.md`
      );
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const quote = {};

      fields.forEach((field) => {
        if (field === "content") {
          quote[field] = content;
        }

        if (data[field]) {
          quote[field] = data[field];
        }
      });

      return quote;
    });
  }
}
