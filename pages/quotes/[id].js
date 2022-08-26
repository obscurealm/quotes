import { getAQuote } from "../api/quotes/[quote]";
import Layout from "../../src/components/Layout";
import Quote from "../../src/components/Quote";

const QuotePage = ({ quote }) => {
  return (
    <>
      <Layout showBreadcrumbs title="Quote">
        <Quote quote={quote} />
      </Layout>
    </>
  );
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
