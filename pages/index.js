import Layout from "../src/components/Layout";
import Quotes from "../src/components/Quotes";
import Search from "../src/components/Search";
import NotionGateway from "../src/gateways/notionGateway";
import GetQuotesUseCase from "../src/useCases/getQuotes";
import { useState } from "react";

const Home = ({ quotes }) => {
  const [searchResults, setSearchResults] = useState(quotes);

  return (
    <>
      <Layout title="Home">
        <h1>Quotes</h1>
        <Search quotes={searchResults} setQuotes={setSearchResults} />
        <Quotes quotes={searchResults} />
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
