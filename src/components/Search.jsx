import { useRouter } from "next/router";
import { useState } from "react";

const Search = ({ style = {} }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      router.push({
        pathname: "/",
        query: { ...router.query, search: searchTerm, page: 1 },
      });
    }
  };

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
        onClick={() =>
          router.push({
            pathname: "/",
            query: { ...router.query, search: searchTerm, page: 1 },
          })
        }
      >
        Search
      </button>
      <button
        data-testid="resetButton"
        onClick={() => {
          setSearchTerm("");

          router.push({
            pathname: "/",
            query: {},
          });
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default Search;
