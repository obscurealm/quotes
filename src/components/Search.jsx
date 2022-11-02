import { useState } from "react";

const Search = ({ quotes, setResults, style = {} }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      setResults(filterQuotes(searchTerm));
    }
  };

  const filterQuotes = (searchTerm) =>
    quotes.filter((quote) =>
      quote.dialogue.some((message) =>
        message.text.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  return (
    <div data-testid="search" style={style}>
      <input
        data-testid="searchBox"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <button
        data-testid="searchButton"
        onClick={() => setResults(filterQuotes(searchTerm))}
      >
        Search
      </button>
      <button
        data-testid="resetButton"
        onClick={() => {
          setSearchTerm("");
          setResults(quotes);
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default Search;
