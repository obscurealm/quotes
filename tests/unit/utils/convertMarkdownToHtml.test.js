import convertMarkdownToHtml from "../../../utils/convertMarkdownToHtml";

describe("convertMarkdownToHtml util", () => {
  it("returns an HTML response", () => {
    const html = convertMarkdownToHtml("**yusuf**");

    expect(html).toEqual("<strong>yusuf</strong>");
  });

  it("returns an HTML response with strikethrough text", () => {
    const html = convertMarkdownToHtml("~~strike~~");

    expect(html).toEqual('<del>strike</del>');
  });

  it("returns a sanitised HTML response", () => {
    const html = convertMarkdownToHtml("<img src=x onerror=alert(1)//>");

    expect(html).toEqual('<img src="x" />');
  });
});
