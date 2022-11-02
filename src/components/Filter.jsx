import { useState } from "react";

const Filter = ({ quotes, setQuotes }) => {
  const [workspacePage, setWorkspacePage] = useState("All");

  const handleDropdownChange = (event) => {
    setWorkspacePage(event.target.value);
  };

  const workspacePages = quotes
    .map((quote) => quote.meta.workspacePage)
    .filter((value, index, self) => self.indexOf(value) === index);

  const filterQuotes = (workspacePage) =>
    quotes.filter((quote) => quote.meta.workspacePage === workspacePage);

  return (
    <>
      <select onChange={handleDropdownChange}>
        <option>All</option>
        {workspacePages.map((workspacePage, index) => (
          <option key={index} value={workspacePage}>
            {workspacePage}
          </option>
        ))}
      </select>
      <button
        data-testid="filterButton"
        onClick={() => setQuotes(filterQuotes(workspacePage))}
      >
        Filter
      </button>
    </>
  );
};

export default Filter;
