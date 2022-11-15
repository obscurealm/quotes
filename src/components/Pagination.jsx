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

  const isNotFirstPage = currentPage !== pageNumbers.at(0);
  const isNotLastPage = currentPage !== pageNumbers.at(-1);

  return (
    <>
      {isNotFirstPage && <Link href="#">Previous</Link>}

      <PageNumberLinks />

      {isNotLastPage && <Link href="#">Next</Link>}
    </>
  );
};

export default Pagination;
