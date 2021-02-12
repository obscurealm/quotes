import getQuotesUseCase from "../../../src/useCases/getQuotes";

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

export function getListOfQuotes() {
  const getQuotes = new getQuotesUseCase();

  return getQuotes.execute();
}
