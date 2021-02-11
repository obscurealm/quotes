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
      expect(response.json).toBeCalledWith({
        data: {
          quotes: [
            {
              timestamp: "1593013680",
              dialogue: [
                { author: "Ting", text: "Butt it’s wrong? *strokes beard*" },
                {
                  author: "Yusuf",
                  text:
                    "I don’t know if you are stroking my beard or your imaginary beard…",
                },
              ],
            },
          ],
        },
      });
    });
  });
});
