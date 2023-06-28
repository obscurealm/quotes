import Filter from "../src/components/Filter";
import Layout from "../src/components/Layout";
import Loader from "../src/components/Loader";
import Pagination from "../src/components/Pagination";
import Quotes from "../src/components/Quotes";
import Reset from "../src/components/Reset";
import Search from "../src/components/Search";
import Sort from "../src/components/Sort";
import { getListOfQuotes } from "./api/quotes";
import { useRouter } from "next/router";

const Home = ({ quotes }) => {
  const { query } = useRouter();

  if (quotes === null)
    return (
      <Layout>
        <Loader />
      </Layout>
    );

  const { search, filter = "All", sort, page = 1 } = query;

  quotes = quotes.sort((quoteA, quoteB) =>
    sort === "oldest"
      ? quoteA.timestamp - quoteB.timestamp
      : quoteB.timestamp - quoteA.timestamp
  );

  const searchedQuotes =
    search == null
      ? quotes
      : quotes.filter((quote) =>
          quote.dialogue.some((message) =>
            message.text.toLowerCase().includes(search.toLowerCase())
          )
        );

  const filteredQuotes =
    filter === "All"
      ? searchedQuotes
      : searchedQuotes.filter((quote) => quote.meta.workspacePage === filter);

  const pageSize = 5;

  const paginatedQuotes = filteredQuotes.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <>
      <Layout>
        <Search style={{ marginBottom: "1rem" }} />
        <Filter quotes={quotes} style={{ marginBottom: "1rem" }} />
        <Reset style={{ marginBottom: "1rem" }} />
        <Sort />
        <Quotes quotes={paginatedQuotes} />
        <Pagination pageSize={pageSize} totalCount={filteredQuotes.length} />
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const quotes = await getListOfQuotes();

  return {
    props: {
      quotes,
    },
    revalidate: 10,
  };
}

export default Home;
