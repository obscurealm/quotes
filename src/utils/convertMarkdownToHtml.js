import marked from 'marked'

export default class ConvertMarkdownToHtmlUtil {
  constructor(markdown) {
    this.markdown = markdown;
  }

  execute() {
    return marked.parseInline(this.markdown, [])
  }
}
