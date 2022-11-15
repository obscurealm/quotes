const Pagination = ({ pageSize, totalCount, currentPage }) => {
  const totalNumberOfPages = totalCount / pageSize;

  const pageNumbers = Array.from(
    { length: totalNumberOfPages },
    (x, i) => i + 1
  );

  return pageNumbers.map((pageNumber) => (
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
};

export default Pagination;
