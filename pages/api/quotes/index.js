import GetQuotesUseCase from "../../../src/useCases/getQuotes";
import MarkdownGateway from "../../../src/gateways/markdownGateway";

export default (req, res) => {
  if (req.method === "GET") {
    res.status(200);
    res.json({
      data: {
        quotes: getListOfQuotes(),
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

export const getListOfQuotes = () => {
  const gateway = new MarkdownGateway("quotes");
  const getQuotes = new GetQuotesUseCase(gateway);

  return getQuotes.execute();
}
