import { useState } from "react";

const Search = ({ quotes, setQuotes }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      setQuotes(filterQuotes(searchTerm));
    }
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
        data-testid="searchBox"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <button
        data-testid="searchButton"
        onClick={() => setQuotes(filterQuotes(searchTerm))}
      >
        Search
      </button>
      <button
        data-testid="resetButton"
        onClick={() => {
          setSearchTerm("");
          setQuotes(quotes);
        }}
      >
        Reset
      </button>
    </>
  );
};

export default Search;
