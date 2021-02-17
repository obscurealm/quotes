import marked from "marked";
import sanitizeHtml from 'sanitize-html';

export default function convertMarkdownToHtml(markdown) {
  return sanitizeHtml(marked.parseInline(markdown, []), {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
  });
}
