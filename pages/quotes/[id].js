import { getAQuote } from "../api/quotes/[quote]";
import { getListOfQuotes } from "../api/quotes";
import Layout from "../../src/components/Layout";
import Quote from "../../src/components/Quote";

const QuotePage = ({ quote }) => {
  return (
    <>
      <Layout title="Quote">
        <Quote quote={quote} />
      </Layout>
    </>
  );
};

export const getStaticProps = ({ params }) => {
  const quote = getAQuote(params.id);

  return {
    props: {
      quote,
    },
  };
}

export const getStaticPaths = () => {
  const quotes = getListOfQuotes();

  return {
    paths: quotes.map((quote) => {
      return {
        params: {
          id: quote.timestamp,
        },
      };
    }),
    fallback: false,
  };
}

export default QuotePage;
