import { useRouter } from "next/router";

const Sort = () => {
  const { push } = useRouter();

  const handleDropdownChange = (event) => {
    push({
      pathname: "/",
      query: {
        sort: "oldest",
        page: 1,
      },
    });
  };

  return (
    <>
      Sort by:{" "}
      <select onChange={handleDropdownChange}>
        <option>Latest first</option>
        <option>Oldest first</option>
      </select>
    </>
  );
};

export default Sort;
