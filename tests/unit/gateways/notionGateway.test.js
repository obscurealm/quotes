import { Client, collectPaginatedAPI } from "@notionhq/client";
import NotionGateway from "../../../src/gateways/notionGateway";
import {
  results,
  annotatedResults,
  firstPageResults,
  secondPageResults,
} from "../../fixtures/notion/quotes";

jest.mock("@notionhq/client");

const retrievePage = (title) =>
  jest.fn().mockResolvedValue({
    object: "page",
    properties: {
      title: {
        title: [
          {
            plain_text: title,
          },
        ],
      },
    },
  });

it("constructs with multiple tokens", () => {
  Client.mockImplementationOnce(() => ({
    blocks: {
      children: {
        list: jest.fn(),
      },
    },
  })).mockImplementationOnce(() => ({
    blocks: {
      children: {
        list: jest.fn(),
      },
    },
  }));

  new NotionGateway("somerandomtoken,anotherrandomtoken", null);

  expect(Client).toBeCalledWith({ auth: "somerandomtoken" });
  expect(Client).toBeCalledWith({ auth: "anotherrandomtoken" });
  expect(Client).toBeCalledTimes(2);
});

describe("when retrieving an empty list of quotes", () => {
  it("returns an empty list", async () => {
    Client.mockImplementationOnce(() => ({
      blocks: {
        children: {
          list: jest.fn(),
        },
      },
      pages: {
        retrieve: retrievePage("Emperor King Yusuf Quotes"),
      },
    })).mockImplementationOnce(() => ({
      blocks: {
        children: {
          list: jest.fn(),
        },
      },
      pages: {
        retrieve: retrievePage("Tingker Bell Quotes"),
      },
    }));

    collectPaginatedAPI.mockResolvedValue([]);

    const gateway = new NotionGateway(
      "somerandomtoken,anotherrandomtoken",
      "pageId,anotherPageId"
    );

    const quotes = await gateway.retrieveQuotes();

    expect(quotes).toEqual([]);
  });
});

describe("when retrieving a non-empty list of quotes", () => {
  let gateway;
  const list = jest.fn();
  const anotherList = jest.fn();

  beforeAll(async () => {
    Client.mockImplementationOnce(() => ({
      blocks: {
        children: {
          list: list,
        },
      },
      pages: {
        retrieve: retrievePage("Emperor King Yusuf Quotes"),
      },
    })).mockImplementationOnce(() => ({
      blocks: {
        children: {
          list: anotherList,
        },
      },
      pages: {
        retrieve: retrievePage("Tingker Bell Quotes"),
      },
    }));

    collectPaginatedAPI
      .mockResolvedValue(results)
      .mockResolvedValueOnce([...firstPageResults, ...secondPageResults])
      .mockResolvedValueOnce([]);

    gateway = new NotionGateway(
      "somerandomtoken,anotherrandomtoken",
      "pageId,anotherPageId"
    );
  });

  describe("with multiple quotes", () => {
    let quotes;

    beforeAll(async () => {
      quotes = await gateway.retrieveQuotes();
    });

    it("calls Notion API with multiple page IDs", async () => {
      expect(collectPaginatedAPI).toBeCalledWith(
        list,
        expect.objectContaining({ block_id: "pageId" })
      );
      expect(collectPaginatedAPI).toBeCalledWith(
        anotherList,
        expect.objectContaining({ block_id: "anotherPageId" })
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
            meta: {
              workspacePage: "Emperor King Yusuf Quotes",
            },
          }),
          expect.objectContaining({
            timestamp: 1644249000,
            dialogue: ["Y: uwu"],
            meta: {
              workspacePage: "Emperor King Yusuf Quotes",
            },
          }),
          expect.objectContaining({
            timestamp: 1644759000,
            dialogue: ["T: -_-"],
            meta: {
              workspacePage: "Emperor King Yusuf Quotes",
            },
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
      collectPaginatedAPI.mockResolvedValue(annotatedResults);

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
