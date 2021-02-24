import fs from "fs";
import { join, resolve } from "path";
import matter from "gray-matter";

export default class MarkdownGateway {
  constructor(files) {
    this.quotesDirectory = files;
  }

  retrieveQuote(file) {
    const slug = file.replace(/\.md$/, "");
    const fullPath = join(
      resolve('./', this.quotesDirectory),
      `${slug}.md`
    );
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data: frontMatter, content: quote } = matter(fileContents);

    return { frontMatter, quote };
  }

  retrieveQuotes() {
    const files = fs.readdirSync(resolve('./', this.quotesDirectory));

    return files.map((file) => {
      return this.retrieveQuote(file);
    });
  }
}
