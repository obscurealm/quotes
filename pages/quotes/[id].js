import Layout from "../../src/components/Layout";
import Quote from "../../src/components/Quote";
import NotionGateway from "../../src/gateways/notionGateway";
import GetQuoteUseCase from "../../src/useCases/getQuote";

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
    process.env.NOTION_PAGE_ID,
  );
  const getQuote = new GetQuoteUseCase(gateway);

  return await getQuote.execute(parseInt(slug));
};

export const getServerSideProps = async ({ params }) => {
  const quote = await getAQuote(params.id);

  return {
    props: {
      quote,
    },
  };
};

export default QuotePage;
