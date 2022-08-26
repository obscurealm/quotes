import { getAQuote } from "../api/quotes/[quote]";
import Layout from "../../src/components/Layout";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import Quote from "../../src/components/Quote";

const QuotePage = ({ quote }) => {
  return (
    <>
      <Breadcrumbs />
      <Layout title="Quote">
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
