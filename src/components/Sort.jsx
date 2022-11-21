import { useRouter } from "next/router";

const Sort = ({ style }) => {
  const { push } = useRouter();

  const handleDropdownChange = (event) => {
    push({
      pathname: "/",
      query: {
        sort: event.target.value,
        page: 1,
      },
    });
  };

  return (
    <div data-testid="sort" style={style}>
      Sort by:{" "}
      <select data-testid="sortByDropdown" onChange={handleDropdownChange}>
        <option value="latest">Latest first</option>
        <option value="oldest">Oldest first</option>
      </select>
    </div>
  );
};

export default Sort;
