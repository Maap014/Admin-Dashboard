import React, { useEffect, useMemo, useState } from "react";
import { COLUMNS } from "./columns";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useRowSelect,
} from "react-table";
import GlobalFilter from "./GlobalFilter";
import { CiEdit, CiTrash } from "react-icons/ci";
import { Checkbox } from "./Checkbox";

const Dashboard = () => {
  const columns = useMemo(() => {
    return [
      ...COLUMNS,
      {
        Header: "Actions",
        accessor: (id) => {
          return (
            <>
              <CiEdit style={{ cursor: "pointer" }} />
              <CiTrash
                onClick={() => handleDelete(id)}
                style={{ color: "red", marginLeft: 12, cursor: "pointer" }}
              />
            </>
          );
        },
      },
    ];
  }, []);

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((res) => res.json())
      .then((dataInfo) => {
        setData(dataInfo);
      })
      .catch((err) => console.error(err));
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    rows,
    page, // we'll use page here to dispaly the active rows
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    selectedFlatRows,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      });
    }
  );

  const [recordsPerPage] = useState(10);

  const numOfTotalPages = Math.ceil(data?.length / recordsPerPage);

  const pageNumbers = [...Array(numOfTotalPages + 1).keys()].slice(1);

  const handleDelete = (id) => {
    setData(() => data.filter((data) => data.id !== id));
  };

  console.log(rows.length);
  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
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
        <span style={{ float: "left" }}>
          {selectedFlatRows.length} of {rows.length}{" "}
          {selectedFlatRows.length > 1 ? "rows" : "row"} selected
        </span>
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
          <button key={pageNumber} onClick={() => gotoPage(pageNumber - 1)}>
            {pageNumber}
          </button>
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
