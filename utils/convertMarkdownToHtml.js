import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

const convertMarkdownToHtml = (markdown) => {
  return sanitizeHtml(marked.parseInline(markdown, []), {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "del"]),
    allowedAttributes: {
      img: sanitizeHtml.defaults.allowedAttributes.img.concat(["style"]),
    },
  });
};

export default convertMarkdownToHtml;
