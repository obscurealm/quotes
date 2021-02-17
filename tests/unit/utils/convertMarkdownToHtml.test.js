import convertMarkdownToHtml from "../../../utils/convertMarkdownToHtml";

describe("convertMarkdownToHtml util", () => {
  it("can return an HTML response", () => {
    const html = convertMarkdownToHtml("**yusuf**");

    expect(html).toEqual("<strong>yusuf</strong>");
  });
});
