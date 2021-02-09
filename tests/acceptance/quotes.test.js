import getQuotes from "../../pages/api/quotes";

describe("GET /api/quotes", () => {
  it("returns status 200", async () => {
    const response = {
      status: jest.fn().mockReturnValue({ end: jest.fn() }),
      json: jest.fn(),
    };

    const req = {
      method: "GET",
    };

    await getQuotes(req, response);

    expect(response.status).toBeCalledWith(200);
  });

  it("returns a list of quotes", async () => {
    const expectedResponse = {
      data: {
        quotes: [
          {
            timestamp: "1593013680",
            quote: [
              { name: "Ting", message: "Butt it’s wrong? *strokes beard*" },
              {
                name: "Yusuf",
                message:
                  "I don’t know if you are stroking my beard or your imaginary beard…",
              },
            ],
          },
        ],
      },
    };

    const response = {
      status: jest.fn().mockReturnValue({ end: jest.fn() }),
      json: jest.fn().mockReturnValue({ end: jest.fn() }),
    };

    const req = {
      method: "GET",
    };

    await getQuotes(req, response);

    expect(response.json).toBeCalledWith(expectedResponse);
  });
});
