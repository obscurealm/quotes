import { getListOfQuotes } from "./api/quotes";
import Layout from "../src/components/Layout";
import Quotes from "../src/components/Quotes";

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

export const getServerSideProps = async () => {
  const quotes = await getListOfQuotes();

  return {
    props: {
      quotes,
    },
  };
};

export default Home;
