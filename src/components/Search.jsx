import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Search = () => {
  const { push, query } = useRouter();
  const search = query.search || "";
  const [searchTerm, setSearchTerm] = useState(search);

  useEffect(() => {
    setSearchTerm(search);
  }, [search]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      push({
        pathname: "/",
        query: { ...query, search: searchTerm, page: 1 },
      });
    }
  };

  return (
    <div data-testid="search">
      <input
        data-testid="searchBox"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <button
        data-testid="searchButton"
        className="button"
        onClick={() =>
          push({
            pathname: "/",
            query: { ...query, search: searchTerm, page: 1 },
          })
        }
      >
        Search
      </button>
    </div>
  );
};

export default Search;
