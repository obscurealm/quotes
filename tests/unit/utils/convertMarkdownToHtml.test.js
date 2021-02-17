import convertMarkdownToHtml from "../../../utils/convertMarkdownToHtml";

describe("convertMarkdownToHtml util", () => {
  it("can return an HTML response", () => {
    const html = convertMarkdownToHtml("**yusuf**");

    expect(html).toEqual("<strong>yusuf</strong>");
  });

  it("can return a sanitised HTML response", () => {
    const html = convertMarkdownToHtml("<img src=x onerror=alert(1)//>");

    expect(html).toEqual('<img src="x" />');
  });
});
