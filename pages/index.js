import Head from "next/head";
import { getListOfQuotes } from "./api/quotes";
import Quote from "../src/components/Quote";

const Home = ({ quotes }) => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <h1>Quotes</h1>
      {quotes.map((quote, index) => (
        <Quote key={index} quote={quote} />
      ))}
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
