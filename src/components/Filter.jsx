import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Filter = ({ quotes, style = {} }) => {
  const router = useRouter();
  const filter = router.query.filter;
  const [workspacePage, setWorkspacePage] = useState(filter);

  useEffect(() => {
    setWorkspacePage(filter);
  }, [filter, router]);

  const handleDropdownChange = (event) => {
    setWorkspacePage(event.target.value);
  };

  const workspacePages = quotes
    ?.map((quote) => quote.meta.workspacePage)
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <div data-testid="filter" style={style}>
      <select
        value={workspacePage}
        onChange={handleDropdownChange}
        data-testid="workspacePageFilter"
      >
        <option key="All">All</option>
        {workspacePages?.map((workspacePageOption) => (
          <option key={workspacePageOption}>{workspacePageOption}</option>
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
