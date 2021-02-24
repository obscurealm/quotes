import marked from "marked";
import sanitizeHtml from "sanitize-html";

const convertMarkdownToHtml = (markdown) => {
  return sanitizeHtml(marked.parseInline(markdown, []), {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
  });
};

export default convertMarkdownToHtml;
