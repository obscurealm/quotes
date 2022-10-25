import React, { useState } from "react";

const Search = ({ quotes, setQuotes }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterQuotes = (searchTerm) =>
    quotes.filter((quote) =>
      quote.dialogue.some((message) =>
        message.text.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  return (
    <>
      <input data-testid="search" value={searchTerm} onChange={handleChange} />
      <button onClick={() => setQuotes(filterQuotes(searchTerm))}>
        Search
      </button>
    </>
  );
};

export default Search;
