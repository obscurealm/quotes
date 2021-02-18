import getQuotes from "../../pages/api/quotes";

describe("GET /api/quotes", () => {
  describe("when the request method is not GET", () => {
    it("returns status 405", async () => {
      const response = {
        status: jest.fn(),
        json: jest.fn(),
      };

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
      const response = {
        status: jest.fn(),
        json: jest.fn(),
      };

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
        })
      );
    });
  });
});