import Layout from "../src/components/Layout";
import Quotes from "../src/components/Quotes";
import NotionGateway from "../src/gateways/notionGateway";
import GetQuotesUseCase from "../src/useCases/getQuotes";

const Home = ({ quotes }) => {
  return (
    <>
      <Layout title="Home">
        <h1>Quotes</h1>
        <Quotes quotes={quotes} />
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
