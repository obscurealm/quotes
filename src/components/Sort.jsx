import { useRouter } from "next/router";

const Sort = () => {
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
    <>
      Sort by:{" "}
      <select onChange={handleDropdownChange}>
        <option value="latest">Latest first</option>
        <option value="oldest">Oldest first</option>
      </select>
    </>
  );
};

export default Sort;
