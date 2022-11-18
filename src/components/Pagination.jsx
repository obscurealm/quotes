import Link from "next/link";

const Pagination = ({ pageSize, totalCount, currentPage, style }) => {
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
          query: { page: pageNumber },
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
        <Link href="#" style={{ marginRight: spacingBetweenLinks }}>
          Previous
        </Link>
      )}

      <PageNumberLinks />

      {isNotLastPage && <Link href="#">Next</Link>}
    </div>
  );
};

export default Pagination;
