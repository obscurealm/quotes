import Link from "next/link";

const Pagination = ({ pageSize, totalCount, currentPage }) => {
  const spacingBetweenLinks = "1rem";
  const totalNumberOfPages = totalCount / pageSize;

  const pageNumbers = Array.from(
    { length: totalNumberOfPages },
    (x, i) => i + 1
  );

  const PageNumberLinks = () =>
    pageNumbers.map((pageNumber) => (
      <Link
        href="#"
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
    <div
      style={{ marginTop: spacingBetweenLinks, padding: "0.5rem 0 0.5rem 0" }}
    >
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
