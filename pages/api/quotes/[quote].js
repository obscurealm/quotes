import MarkdownGateway from "../../../src/gateways/markdownGateway";
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

export const getAQuote = (slug) => {
  const gateway = new MarkdownGateway("quotes");
  const getQuote = new GetQuoteUseCase(gateway);

  return getQuote.execute(`${slug}.md`);
}
