import { Client } from "@notionhq/client";
import NotionGateway from "../../../src/gateways/notionGateway.js";
import {
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

it("constructs with a page ID", () => {
  const gateway = new NotionGateway(null, "pageId");

  expect(gateway.pageId).toEqual("pageId");
});

describe("when retrieving a list of quotes", () => {
  let quotes;

  beforeAll(async () => {
    list
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

    const gateway = new NotionGateway("somerandomtoken", "pageId");

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
          datetime: "21 Oct 2021 at 16:06",
          dialogue: [
            "Y: Good evening Tingker Bell! :tingker-bell:",
            "T: Good evening Emperor King Yusuf! :emperor-king-yusuf:",
          ],
        }),
        expect.objectContaining({
          datetime: "7 Feb 2022 at 15:50",
          dialogue: ["Y: uwu"],
        }),
      ])
    );
  });
});
