import convertMarkdownToHtmlUtil from "../../../src/utils/convertMarkdownToHtml";

describe("convertMarkdownToHtml util", () => {
  it("can be constructed with markdown", () => {
    const convertMarkdownToHtml = new convertMarkdownToHtmlUtil("**yusuf**");

    expect(convertMarkdownToHtml.markdown).toEqual("**yusuf**");
  });
});
