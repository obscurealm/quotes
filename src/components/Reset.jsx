import { useRouter } from "next/router";

const Reset = () => {
  const { push, query } = useRouter();

  return (
    <button
      data-testid="resetButton"
      className="button"
      onClick={() =>
        push({
          pathname: "/",
          query: { ...query, filter: "All", page: 1, search: null },
        })
      }
    >
      Reset
    </button>
  );
};

export default Reset;
