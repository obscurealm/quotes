import { useRouter } from "next/router";

const Reset = ({ style }) => {
  const { push, query } = useRouter();

  return (
    <button
      data-testid="resetButton"
      style={style}
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
