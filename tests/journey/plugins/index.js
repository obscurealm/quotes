const http = require("http");
const next = require("next");
const nock = require("nock");
const {
  emperorKingYusufQuotes,
  tingkerBellQuotes,
} = require("../../journey/fixtures/quotes");

module.exports = async (on, config) => {
  const app = next({ dev: true, dir: "../" });
  const handleNextRequests = app.getRequestHandler();
  const port = 4000;

  await app.prepare();

  const nextServer = new http.Server(async (req, res) => {
    return handleNextRequests(req, res);
  });

  await new Promise((resolve, reject) => {
    nextServer.listen(port, (err) => {
      if (err) {
        return reject(err);
      }
      console.log(
        `\x1b[32mready\x1b[0m - started server on 0.0.0.0:${port}, url: http://localhost:${port}`
      );
      resolve();
    });
  });

  on("task", {
    clearNock() {
      nock.restore();
      nock.cleanAll();

      return null;
    },

    stubNotionApi() {
      if (!nock.isActive()) {
        nock.activate();
      }

      nock("https://api.notion.com")
        .get(/\/v1\/pages\/.*/)
        .reply(200, {
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
        })
        .get(/\/v1\/pages\/.*/)
        .reply(200, {
          object: "page",
          properties: {
            title: {
              title: [
                {
                  plain_text: "Tingker Bell Quotes",
                },
              ],
            },
          },
        });

      nock("https://api.notion.com")
        .get(/\/v1\/blocks\/.*/)
        .reply(200, {
          results: emperorKingYusufQuotes,
        })
        .get(/\/v1\/blocks\/.*/)
        .reply(200, {
          results: tingkerBellQuotes,
        });

      return null;
    },
  });

  return config;
};
