import getQuote from "../../pages/api/quotes/[quote]";

describe("GET /api/quotes/[quote]", () => {
  describe("when the request method is not GET", () => {
    it("returns status 405", async () => {
      const response = {
        status: jest.fn(),
        json: jest.fn()
      };

      const req = {
        query: "test",
        method: "POST",
      };

      await getQuote(req, response);

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
});
