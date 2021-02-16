import Head from "next/head";
import { getListOfQuotes } from "./api/quotes";
import convertMarkdownToHtmlUtil from "../src/utils/convertMarkdownToHtml";

const Home = ({ quotes }) => {
  const convertMarkdownToHtml = new convertMarkdownToHtmlUtil();

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <h1>Quotes</h1>
      {quotes.map((quote, index) => (
        <div key={index} data-cy="quote">
          <h2>{quote.timestamp}</h2>
          {quote.dialogue.map((dialogue, index) => (
            <p key={index}>
              <strong>{dialogue.author}</strong>:{" "}
              <span
                dangerouslySetInnerHTML={{
                  __html: convertMarkdownToHtml.execute(dialogue.text),
                }}
              />
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
