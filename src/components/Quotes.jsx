import React from "react";
import Quote from "./Quote";

const Quotes = ({ quotes }) => {
  return (
    <div data-testid="quotes">
      {quotes.map((quote, index) => (
        <Quote key={index} quote={quote} />
      ))}
    </div>
  );
};

export default Quotes;
