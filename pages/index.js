import Head from "next/head";
import { getListOfQuotes } from "./api/quotes";

const Home = ({ quotes }) => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <h1>Quotes</h1>
      {quotes.map((quote, index) => (
        <div key={index}>
          <h2>{quote.timestamp}</h2>
          {quote.dialogue.map((dialogue, index) => (
            <p key={index}>
              <strong>{dialogue.author}</strong>: {dialogue.text}
            </p>
          ))}
        </div>
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
