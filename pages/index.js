import Filter from "../src/components/Filter";
import Layout from "../src/components/Layout";
import Quotes from "../src/components/Quotes";
import Search from "../src/components/Search";
import NotionGateway from "../src/gateways/notionGateway";
import GetQuotesUseCase from "../src/useCases/getQuotes";
import { useState } from "react";

const Home = ({ quotes }) => {
  const [results, setResults] = useState(quotes);

  return (
    <>
      <Layout title="Home">
        <Search
          quotes={quotes}
          setQuotes={setResults}
          style={{ clear: "right", marginBottom: "1rem" }}
        />
        <Filter quotes={quotes} setQuotes={setResults} />
        <Quotes quotes={results} />
      </Layout>
    </>
  );
};

const getListOfQuotes = async () => {
  const gateway = new NotionGateway(
    process.env.NOTION_API_TOKEN,
    process.env.NOTION_PAGE_ID
  );
  const getQuotes = new GetQuotesUseCase(gateway);

  return await getQuotes.execute();
};

export const getServerSideProps = async () => {
  const quotes = await getListOfQuotes();

  return {
    props: {
      quotes,
    },
  };
};

export default Home;
