import Filter from "../src/components/Filter";
import Layout from "../src/components/Layout";
import Loader from "../src/components/Loader";
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

  const updatedQuotes = data.data.quotes;

  const searchedQuotes =
    query.search == undefined || query.search == null
      ? updatedQuotes
      : updatedQuotes?.filter((quote) =>
          quote.dialogue.some((message) =>
            message.text.toLowerCase().includes(query.search.toLowerCase())
          )
        );

  const filteredQuotes =
    query.filter == undefined || query.filter == null || query.filter == "All"
      ? searchedQuotes
      : searchedQuotes?.filter(
          (quote) => quote.meta.workspacePage === query.filter
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
        <Quotes quotes={filteredQuotes || []} />
      </Layout>
    </>
  );
};

export default Home;
