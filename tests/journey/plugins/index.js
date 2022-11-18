const http = require("http");
const next = require("next");
const nock = require("nock");
const {
  emperorKingYusufQuotes,
  tingkerBellQuotes,
} = require("../../journey/fixtures/quotes");

const plugins = async (on, config) => {
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

      const [emperorKingYusufPageId, tingkerBellPageId] =
        process.env.NOTION_PAGE_ID.split(",");

      const firstPageIdUrl = new RegExp(
        `\/v1\/pages\/${emperorKingYusufPageId}`
      );
      const secondPageIdUrl = new RegExp(`\/v1\/pages\/${tingkerBellPageId}`);

      nock("https://api.notion.com")
        .persist()
        .get(firstPageIdUrl)
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
        .get(secondPageIdUrl)
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

      const firstBlockIdUrl = new RegExp(
        `\/v1\/blocks\/${emperorKingYusufPageId}`
      );
      const secondBlockIdUrl = new RegExp(`\/v1\/blocks\/${tingkerBellPageId}`);

      nock("https://api.notion.com")
        .persist()
        .get(firstBlockIdUrl)
        .reply(200, {
          results: emperorKingYusufQuotes,
        })
        .get(secondBlockIdUrl)
        .reply(200, {
          results: tingkerBellQuotes,
        });

      return null;
    },
  });

  return config;
};

exports.plugins = plugins;
