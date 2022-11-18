import { useRouter } from "next/router";

const Reset = ({ style }) => {
  const router = useRouter();

  return (
    <button
      data-testid="resetButton"
      style={style}
      onClick={() =>
        router.push({
          pathname: "/",
          query: { ...router.query, filter: null, page: null, search: null },
        })
      }
    >
      Reset
    </button>
  );
};

export default Reset;
