import { useState } from "react";

const Filter = ({ quotes, setResults, style = {} }) => {
  const [workspacePage, setWorkspacePage] = useState("All");

  const handleDropdownChange = (event) => {
    setWorkspacePage(event.target.value);
  };

  const workspacePages = quotes
    .map((quote) => quote.meta.workspacePage)
    .filter((value, index, self) => self.indexOf(value) === index);

  const filterQuotes = () =>
    workspacePage == "All"
      ? quotes
      : quotes.filter((quote) => quote.meta.workspacePage === workspacePage);

  return (
    <div data-testid="filter" style={style}>
      <select onChange={handleDropdownChange} data-testid="workspacePageFilter">
        <option key="All">All</option>
        {workspacePages.map((workspacePage) => (
          <option key={workspacePage}>{workspacePage}</option>
        ))}
      </select>
      <button
        data-testid="filterButton"
        onClick={() => setResults(filterQuotes())}
      >
        Filter
      </button>
    </div>
  );
};

export default Filter;
