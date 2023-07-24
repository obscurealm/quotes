import useSWR from "swr";

const useQuotes = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data = { data: { quotes: null } }, error } = useSWR(
    "/api/quotes",
    fetcher,
  );

  return {
    quotes: data.data.quotes,
    error,
  };
};

export default useQuotes;
