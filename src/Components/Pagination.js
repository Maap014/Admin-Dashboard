import React from "react";

const Pagination = ({
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  pageIndex,
}) => {
  return (
    <>
      <button
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
      >{`<<`}</button>
      <button
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
      >{`<`}</button>
      {pageOptions.map((pageOption) => (
        <button
          className={pageIndex + 1 === pageOption + 1 ? "pageActive" : ""}
          key={pageOption}
          onClick={() => gotoPage(pageOption)}
        >
          {pageOption + 1}
        </button>
      ))}
      <button onClick={() => nextPage()} disabled={!canNextPage}>{`>`}</button>
      <button
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
      >{`>>`}</button>
    </>
  );
};

export default Pagination;
