import React, { useEffect, useMemo, useState } from "react";
import { COLUMNS } from "./columns";
import { useTable, usePagination } from "react-table";

const Dashboard = () => {
  const columns = useMemo(() => COLUMNS, []);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((res) => res.json())
      .then((dataInfo) => setData(dataInfo))
      .catch((err) => console.error(err));
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    rows,
    page, // we'll use page here to dispaly the active rows
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
    },
    usePagination
  );

  const nPages = Math.ceil(data?.length / 10);
  const pageNumbers = [...Array(nPages > 0 ? nPages + 1 : []).keys()].slice(1);
  console.log(pageNumbers);
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <span>
          <strong>
            Page {pageIndex + 1} of {pageOptions.length}{" "}
          </strong>
        </span>
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >{`<<`}</button>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >{`<`}</button>
        {pageNumbers.map((pageNumber) => (
          <button>{pageNumber}</button>
        ))}
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >{`>`}</button>
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >{`>>`}</button>
      </div>
    </>
  );
};

export default Dashboard;
