import Head from "next/head";
import { getListOfQuotes } from "./api/quotes";
import Quotes from "../src/components/Quotes";

const Home = ({ quotes }) => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <h1>Quotes</h1>
      <Quotes quotes={quotes} />
    </>
  );
};

export const getStaticProps = () => {
  const quotes = getListOfQuotes();

  return {
    props: {
      quotes,
    },
  };
};

export default Home;
