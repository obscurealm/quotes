import marked from "marked";

export default function convertMarkdownToHtml(markdown) {
  return marked.parseInline(markdown, []);
}
