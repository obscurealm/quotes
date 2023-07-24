import { Client, collectPaginatedAPI } from "@notionhq/client";
import getQuotes from "../../pages/api/quotes";

jest.mock("@notionhq/client");

Client.mockImplementation(() => {
  return {
    blocks: {
      children: {
        list: jest.fn(),
      },
    },
    pages: {
      retrieve: jest.fn().mockResolvedValue({
        object: "page",
        properties: {
          title: {
            title: [
              {
                plain_text: "Emperor King Yusuf Quotes",
              },
            ],
          },
        },
      }),
    },
  };
});

collectPaginatedAPI.mockResolvedValue([]);

describe("GET /api/quotes", () => {
  const response = {
    status: jest.fn(),
    json: jest.fn(),
  };

  describe("when the request method is not GET", () => {
    it("returns status 405", async () => {
      const req = {
        method: "POST",
      };

      await getQuotes(req, response);

      expect(response.status).toBeCalledWith(405);
      expect(response.json).toBeCalledWith({
        errors: [
          {
            status: "405",
            title: "Method Not Allowed",
          },
        ],
      });
    });
  });

  describe("when the request method is GET", () => {
    it("returns status 200", async () => {
      const req = {
        method: "GET",
      };

      await getQuotes(req, response);

      expect(response.status).toBeCalledWith(200);
      expect(response.json).toBeCalledWith(
        expect.objectContaining({
          data: {
            quotes: expect.any(Object),
          },
        }),
      );
    });
  });
});
