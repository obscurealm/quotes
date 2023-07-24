import GetQuotesUseCase from "../../../src/useCases/getQuotes";
import NotionGateway from "../../../src/gateways/notionGateway";

const getQuotes = async (req, res) => {
  if (req.method === "GET") {
    res.status(200);
    res.json({
      data: {
        quotes: await getListOfQuotes(),
      },
    });
  } else {
    res.status(405);
    res.json({
      errors: [
        {
          status: "405",
          title: "Method Not Allowed",
        },
      ],
    });
  }
};

export const getListOfQuotes = async () => {
  const gateway = new NotionGateway(
    process.env.NOTION_API_TOKEN,
    process.env.NOTION_PAGE_ID,
  );
  const getQuotes = new GetQuotesUseCase(gateway);

  return await getQuotes.execute();
};

export default getQuotes;
