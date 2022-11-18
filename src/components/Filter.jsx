import { useRouter } from "next/router";
import { useState } from "react";

const Filter = ({ quotes, style = {} }) => {
  const [workspacePage, setWorkspacePage] = useState("All");
  const router = useRouter();

  const handleDropdownChange = (event) => {
    setWorkspacePage(event.target.value);
  };

  const workspacePages = quotes
    ?.map((quote) => quote.meta.workspacePage)
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <div data-testid="filter" style={style}>
      <select onChange={handleDropdownChange} data-testid="workspacePageFilter">
        <option key="All">All</option>
        {workspacePages?.map((workspacePage) => (
          <option key={workspacePage}>{workspacePage}</option>
        ))}
      </select>
      <button
        data-testid="filterButton"
        onClick={() =>
          router.push({
            pathname: "/",
            query: { ...router.query, filter: workspacePage, page: 1 },
          })
        }
      >
        Filter
      </button>
    </div>
  );
};

export default Filter;
