import React from "react";
import Quote from "./Quote";

const Quotes = ({ quotes }) => {
  return (
    <div data-testid="quotes">
      {quotes.length === 0 ? (
        <p>No quotes found.</p>
      ) : (
        [...quotes]
          .sort((quoteA, quoteB) => quoteA.timestamp - quoteB.timestamp)
          .map((quote, index) => (
            <Quote key={index} quote={quote} hasLink={true} />
          ))
      )}
    </div>
  );
};

export default Quotes;
