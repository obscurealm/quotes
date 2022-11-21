import Filter from "../src/components/Filter";
import Layout from "../src/components/Layout";
import Loader from "../src/components/Loader";
import Pagination from "../src/components/Pagination";
import Quotes from "../src/components/Quotes";
import Reset from "../src/components/Reset";
import Search from "../src/components/Search";
import useSWR from "swr";
import { useRouter } from "next/router";

const Home = () => {
  const { query } = useRouter();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data } = useSWR("/api/quotes", fetcher);

  if (!data)
    return (
      <Layout>
        <Loader />
      </Layout>
    );

  let updatedQuotes = data.data.quotes;

  updatedQuotes = updatedQuotes.sort(
    (quoteA, quoteB) => quoteA.timestamp - quoteB.timestamp
  );

  const searchedQuotes =
    query.search === undefined || query.search == null
      ? updatedQuotes
      : updatedQuotes?.filter((quote) =>
          quote.dialogue.some((message) =>
            message.text.toLowerCase().includes(query.search.toLowerCase())
          )
        );

  const filteredQuotes =
    query.filter === undefined || query.filter == null || query.filter === "All"
      ? searchedQuotes
      : searchedQuotes?.filter(
          (quote) => quote.meta.workspacePage === query.filter
        );

  const pageSize = 5;

  const paginatedQuotes =
    query.page === undefined || query.page === null
      ? filteredQuotes?.slice(0, pageSize)
      : filteredQuotes?.slice(
          (query.page - 1) * pageSize,
          query.page * pageSize
        );

  return (
    <>
      <Layout title="Home">
        <Search style={{ clear: "right", marginBottom: "1rem" }} />
        <Filter
          quotes={updatedQuotes}
          style={{ clear: "right", marginBottom: "1rem" }}
        />
        <Reset />
        <Quotes quotes={paginatedQuotes || []} />
        <Pagination pageSize={pageSize} totalCount={filteredQuotes.length} />
      </Layout>
    </>
  );
};

export default Home;
