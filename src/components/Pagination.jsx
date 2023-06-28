import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Pagination.module.css";

const Pagination = ({ pageSize, totalCount, style }) => {
  const { query } = useRouter();
  const currentPage = parseInt(query.page) || 1;
  const totalNumberOfPages =
    totalCount % pageSize === 0
      ? totalCount / pageSize
      : totalCount / pageSize + 1;

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
        className={`${styles.paginationLink}${
          currentPage == pageNumber ? ` ${styles.currentPaginationLink}` : ""
        }`}
      >
        {pageNumber}
      </Link>
    ));

  const isNotFirstPage = currentPage !== pageNumbers.at(0);
  const isNotLastPage = currentPage !== pageNumbers.at(-1);

  return (
    <div data-testid="pagination" style={style}>
      {totalCount != 0 && isNotFirstPage && (
        <Link
          href={{
            pathname: "/",
            query: { ...query, page: currentPage - 1 },
          }}
          className={styles.paginationLink}
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
          className={styles.paginationLink}
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
