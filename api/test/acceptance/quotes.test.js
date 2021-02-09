import getQuotes from "../../../pages/api/quotes/index.js";

describe("/api/quotes", () => {
  it("returns a 200 if the method is GET", async () => {
    const response = {
      status: jest.fn().mockReturnValue({end: jest.fn()}),
    };

    const req = {
      method: "GET",
    };

    await getQuotes(req, response);

    expect(response.status).toBeCalledWith(200);
  });
});
