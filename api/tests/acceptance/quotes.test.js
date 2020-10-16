const request = require("supertest");
const app = require("../../../server");

describe("GET /quotes", () => {
  it("return status 200", (done) => {
    request(app).get("/quotes").expect(200, done);
  });

  it("returns content type JSON", (done) => {
    request(app).get("/quotes").expect("Content-Type", /json/, done);
  });

  it("returns a list of quotes", (done) => {
    var response = {
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

    request(app).get("/quotes").expect(response, done);
  });
});
