import { Client } from "@notionhq/client";
import NotionGateway from "../../../src/gateways/notionGateway.js";

jest.mock("@notionhq/client");

const list = jest.fn().mockResolvedValue([]);

Client.mockImplementation(() => {
  return {
    blocks: {
      children: {
        list: list,
      },
    },
  };
});

describe("notion gateway", () => {
  it("can be constructed with a token", () => {
    new NotionGateway("somerandomtoken", null);

    expect(Client).toBeCalledWith({ auth: "somerandomtoken" });
  });

  it("can be constructed with a page ID", () => {
    const gateway = new NotionGateway(null, "pageId");

    expect(gateway.pageId).toEqual("pageId");
  });

  describe("when retrieving a list of quotes", () => {
    it("calls Notion API with a page ID", async () => {
      const gateway = new NotionGateway("somerandomtoken", "pageId");

      await gateway.retrieveQuotes();

      expect(list).toBeCalledWith(
        expect.objectContaining({ block_id: "pageId" })
      );
    });
  });
});
