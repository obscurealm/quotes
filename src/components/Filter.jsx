import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Filter = ({ quotes }) => {
  const { push, query } = useRouter();
  const filter = query.filter;
  const [workspacePage, setWorkspacePage] = useState(filter);

  useEffect(() => {
    setWorkspacePage(filter);
  }, [filter]);

  const handleDropdownChange = (event) => {
    setWorkspacePage(event.target.value);
    push({
      pathname: "/",
      query: {
        ...query,
        filter: event.target.value,
        page: 1,
      },
    });
  };

  const workspacePages = quotes
    ?.map((quote) => quote.meta.workspacePage)
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <div data-testid="filter">
      <select
        value={workspacePage}
        onChange={handleDropdownChange}
        data-testid="workspacePageFilter"
      >
        <option key="All">All</option>
        {workspacePages?.map((workspacePage) => (
          <option key={workspacePage}>{workspacePage}</option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
