import Link from "next/link";

const Pagination = ({ pageSize, totalCount, currentPage }) => {
  const totalNumberOfPages = totalCount / pageSize;

  const pageNumbers = Array.from(
    { length: totalNumberOfPages },
    (x, i) => i + 1
  );

  const PageNumberLinks = () =>
    pageNumbers.map((pageNumber) => (
      <span
        key={pageNumber}
        style={
          currentPage === pageNumber
            ? {
                borderStyle: "solid",
              }
            : null
        }
      >
        {pageNumber}
      </span>
    ));

  return (
    <>
      {currentPage !== pageNumbers.at(0) && <Link href="#">Previous</Link>}
      <PageNumberLinks />

      {currentPage !== pageNumbers.at(-1) && <Link href="#">Next</Link>}
    </>
  );
};

export default Pagination;
