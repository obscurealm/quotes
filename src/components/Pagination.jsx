import Link from "next/link";
import { useRouter } from "next/router";

const Pagination = ({ pageSize, totalCount, style }) => {
  const { query } = useRouter();
  const currentPage = parseInt(query.page) || 1;
  const spacingBetweenLinks = "1rem";
  const totalNumberOfPages = totalCount / pageSize;

  const pageNumbers = Array.from(
    { length: totalNumberOfPages },
    (x, i) => i + 1
  );

  const PageNumberLinks = () =>
    pageNumbers.map((pageNumber) => (
      <Link
        href={{
          pathname: "/",
          query: { ...query, page: pageNumber },
        }}
        key={pageNumber}
        style={
          currentPage === pageNumber
            ? {
                borderStyle: "solid",
                padding: "0.25rem",
                marginRight: spacingBetweenLinks,
              }
            : {
                marginRight: spacingBetweenLinks,
              }
        }
      >
        {pageNumber}
      </Link>
    ));

  const isNotFirstPage = currentPage !== pageNumbers.at(0);
  const isNotLastPage = currentPage !== pageNumbers.at(-1);

  return (
    <div data-testid="pagination" style={style}>
      {isNotFirstPage && (
        <Link
          href={{
            pathname: "/",
            query: { ...query, page: currentPage - 1 },
          }}
          style={{ marginRight: spacingBetweenLinks }}
        >
          Previous
        </Link>
      )}

      <PageNumberLinks />

      {isNotLastPage && (
        <Link
          href={{
            pathname: "/",
            query: { ...query, page: currentPage + 1 },
          }}
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
