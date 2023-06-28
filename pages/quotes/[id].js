import Layout from "../../src/components/Layout";
import Quote from "../../src/components/Quote";
import NotionGateway from "../../src/gateways/notionGateway";
import GetQuoteUseCase from "../../src/useCases/getQuote";
import { getListOfQuotes } from "../api/quotes";

const QuotePage = ({ quote }) => {
  return (
    <>
      <Layout showBreadcrumbs title="Quote">
        <Quote quote={quote} />
      </Layout>
    </>
  );
};

const getAQuote = async (slug) => {
  const gateway = new NotionGateway(
    process.env.NOTION_API_TOKEN,
    process.env.NOTION_PAGE_ID
  );
  const getQuote = new GetQuoteUseCase(gateway);

  return await getQuote.execute(parseInt(slug));
};

export async function getStaticProps({ params }) {
  const quote = await getAQuote(params.id);

  return {
    props: {
      quote,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const quotes = await getListOfQuotes();

  const paths = quotes.map((quote) => ({
    params: { id: quote.timestamp.toString() },
  }));

  return { paths, fallback: "blocking" };
}

export default QuotePage;
