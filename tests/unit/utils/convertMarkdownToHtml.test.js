import convertMarkdownToHtmlUtil from "../../../src/utils/convertMarkdownToHtml";

describe("convertMarkdownToHtml util", () => {
  it("can be constructed with markdown", () => {
    const convertMarkdownToHtml = new convertMarkdownToHtmlUtil("**yusuf**");

    expect(convertMarkdownToHtml.markdown).toEqual("**yusuf**");
  });

  it("can return a HTML response", () => {
    const convertMarkdownToHtml = new convertMarkdownToHtmlUtil("**yusuf**");

    const html = convertMarkdownToHtml.execute();

    expect(html).toEqual("<strong>yusuf</strong>");
  });
});
