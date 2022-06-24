import { Client } from "@notionhq/client";
import NotionGateway from "../../../src/gateways/notionGateway";
import {
  results,
  annotatedResults,
  firstPageResults,
  secondPageResults,
} from "../../fixtures/notion/quotes";

jest.mock("@notionhq/client");

const list = jest.fn();

Client.mockImplementation(() => {
  return {
    blocks: {
      children: {
        list: list,
      },
    },
  };
});

it("constructs with a token", () => {
  new NotionGateway("somerandomtoken", null);

  expect(Client).toBeCalledWith({ auth: "somerandomtoken" });
});

describe("when retrieving an empty list of quotes", () => {
  it("returns an empty list", async () => {
    list.mockResolvedValueOnce({
      object: "list",
      results: [],
      next_cursor: null,
      has_more: false,
    });
    const gateway = new NotionGateway("somerandomtoken", "pageId");

    const quotes = await gateway.retrieveQuotes();

    expect(quotes).toEqual([]);
  });
});

describe("when retrieving a non-empty list of quotes", () => {
  let gateway;

  beforeAll(async () => {
    list
      .mockResolvedValue({
        object: "list",
        results: results,
        has_more: false,
      })
      .mockResolvedValueOnce({
        object: "list",
        results: firstPageResults,
        next_cursor: "5",
        has_more: true,
      })
      .mockResolvedValueOnce({
        object: "list",
        results: secondPageResults,
        has_more: false,
      });

    gateway = new NotionGateway("somerandomtoken", "pageId");
  });

  describe("with multiple quotes", () => {
    let quotes;

    beforeAll(async () => {
      quotes = await gateway.retrieveQuotes();
    });

    it("calls Notion API with a page ID", async () => {
      expect(list).toBeCalledWith(
        expect.objectContaining({ block_id: "pageId" })
      );
    });

    it("returns a formatted list", async () => {
      expect(quotes).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            timestamp: 1634828760,
            dialogue: [
              "Y: Good evening Tingker Bell! :tingker-bell:",
              "T: Good evening Emperor King Yusuf! :emperor-king-yusuf:",
            ],
          }),
          expect.objectContaining({
            timestamp: 1644249000,
            dialogue: ["Y: uwu"],
          }),
          expect.objectContaining({
            timestamp: 1644759000,
            dialogue: ["T: -_-"],
          }),
        ])
      );
    });
  });

  describe("with a single quote", () => {
    it("returns a single quote", async () => {
      const quote = await gateway.retrieveQuote(1655476800);

      expect(quote).toEqual(
        expect.objectContaining({
          timestamp: 1655476800,
          dialogue: [
            "Y: Good afternoon Tingker Bell! :tingker-bell:",
            "T: Good afternoon Emperor King Yusuf! :emperor-king-yusuf:",
          ],
        })
      );
    });
  });

  describe("with an annotated quote", () => {
    it("returns a formatted quote", async () => {
      list.mockResolvedValueOnce({
        object: "list",
        results: annotatedResults,
        next_cursor: null,
        has_more: false,
      });

      const quote = await gateway.retrieveQuote(1656064800);

      expect(quote).toEqual(
        expect.objectContaining({
          timestamp: 1656064800,
          dialogue: [
            "Y: **bold**_italic_~~strikethrough~~",
            "T: <u>underline</u>`code`",
          ],
        })
      );
    });
  });
});
