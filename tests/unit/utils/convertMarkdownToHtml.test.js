import convertMarkdownToHtmlUtil from "../../../src/utils/convertMarkdownToHtml";

describe("convertMarkdownToHtml util", () => {
  it("can return an HTML response", () => {
    const convertMarkdownToHtml = new convertMarkdownToHtmlUtil();

    const html = convertMarkdownToHtml.execute("**yusuf**");

    expect(html).toEqual("<strong>yusuf</strong>");
  });
});
