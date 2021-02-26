import * as getQuote from "../../pages/api/quotes/[quote]";

describe("GET /api/quotes/[quote]", () => {
  const response = {
    status: jest.fn(),
    json: jest.fn(),
  };

  describe("when the request method is not GET", () => {
    it("returns status 405", async () => {
      const req = {
        method: "POST",
      };

      await getQuote.default(req, response);

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
    const getAQuoteSpy = jest.spyOn(getQuote, "getAQuote");

    const quote = {
      timestamp: 123,
      dialogue: [{ author: "Yusuf", text: "big boi" }],
    };

    getAQuoteSpy.mockReturnValue(quote);

    it("returns status 200", async () => {
      const req = {
        method: "GET",
        query: { quote: "" },
      };

      await getQuote.default(req, response);

      expect(response.status).toBeCalledWith(200);
      expect(response.json).toBeCalledWith(
        expect.objectContaining({
          data: quote,
        })
      );
    });
  });
});
