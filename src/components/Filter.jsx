const Filter = ({ quotes }) => {
  const workspacePages = quotes
    .map((quote) => quote.meta.workspacePage)
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <>
      <select>
        <option>All</option>
        {workspacePages.map((workspacePage, index) => (
          <option key={index}>{workspacePage}</option>
        ))}
      </select>
      <button data-testid="filterButton">Filter</button>
    </>
  );
};

export default Filter;
