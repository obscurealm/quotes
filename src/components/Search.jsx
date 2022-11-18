import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Search = ({ style = {} }) => {
  const router = useRouter();
  const search = router.query.search || "";
  const [searchTerm, setSearchTerm] = useState(search);

  useEffect(() => {
    setSearchTerm(search);
  }, [search, router]);

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
    </div>
  );
};

export default Search;
