import NotionGateway from "../../../src/gateways/notionGateway";
import GetQuoteUseCase from "../../../src/useCases/getQuote";
import * as getQuote from "./[quote]";

export default (req, res) => {
  if (req.method === "GET") {
    const {
      query: { quote },
    } = req;

    res.status(200);
    res.json({
      data: getQuote.getAQuote(quote),
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

export const getAQuote = async (slug) => {
  const gateway = new NotionGateway(
    process.env.NOTION_API_TOKEN,
    process.env.NOTION_PAGE_ID
  );
  const getQuote = new GetQuoteUseCase(gateway);

  return await getQuote.execute(parseInt(slug));
};
