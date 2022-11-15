const Pagination = ({ pageSize, totalCount }) => {
  const totalNumberOfPages = totalCount / pageSize;

  const pageNumbers = Array.from(
    { length: totalNumberOfPages },
    (x, i) => i + 1
  );

  return pageNumbers.map((pageNumber) => (
    <span key={pageNumber}>{pageNumber}</span>
  ));
};

export default Pagination;
