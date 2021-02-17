import marked from "marked";

export default class ConvertMarkdownToHtmlUtil {
  constructor() {}

  execute(markdown) {
    return marked.parseInline(markdown, []);
  }
}
