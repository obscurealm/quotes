import { useState } from "react";

const Filter = ({ quotes, setResults }) => {
  const [workspacePage, setWorkspacePage] = useState("All");

  const handleDropdownChange = (event) => {
    setWorkspacePage(event.target.value);
  };

  const workspacePages = quotes
    .map((quote) => quote.meta.workspacePage)
    .filter((value, index, self) => self.indexOf(value) === index);

  const filterQuotes = (workspacePage) =>
    workspacePage == "All"
      ? quotes
      : quotes.filter((quote) => quote.meta.workspacePage === workspacePage);

  return (
    <>
      <select onChange={handleDropdownChange} data-testid="workspacePageFilter">
        <option value="All">All</option>
        {workspacePages.map((workspacePage, index) => (
          <option key={index} value={workspacePage}>
            {workspacePage}
          </option>
        ))}
      </select>
      <button
        data-testid="filterButton"
        onClick={() => setResults(filterQuotes(workspacePage))}
      >
        Filter
      </button>
    </>
  );
};

export default Filter;
