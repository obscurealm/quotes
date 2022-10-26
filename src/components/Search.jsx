import { useState } from "react";

const Search = ({ quotes, setQuotes }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
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
      <input
        data-testid="search"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button
        data-testid="searchButton"
        onClick={() => setQuotes(filterQuotes(searchTerm))}
      >
        Search
      </button>
    </>
  );
};

export default Search;
