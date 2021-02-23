import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

export default class MarkdownGateway {
  constructor(files) {
    this.quotesDirectory = files;
  }

  retrieveQuote(file) {
    const slug = file.replace(/\.md$/, "");
    const fullPath = join(
      join(process.cwd(), this.quotesDirectory),
      `${slug}.md`
    );
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data: frontMatter, content: quote } = matter(fileContents);

    return { frontMatter, quote };
  }

  retrieveQuotes() {
    const files = fs.readdirSync(join(process.cwd(), this.quotesDirectory));

    return files.map((file) => {
      return this.retrieveQuote(file);
    });
  }
}
