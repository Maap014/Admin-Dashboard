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
import Pagination from "./Pagination";
import EditModal from "./Modals/EditModal";
import DeleteModal from "./Modals/DeleteModal";

const Dashboard = () => {
  const [modalEditOPen, setModalEditOpen] = useState(false);
  const [modalDeleteOPen, setModalDeleteOpen] = useState(false);
  const columns = useMemo(() => {
    return [
      ...COLUMNS,
      {
        Header: "Actions",
        accessor: (id) => {
          return (
            <>
              <CiEdit
                onClick={() => setModalEditOpen(true)}
                style={{ cursor: "pointer" }}
              />
              <CiTrash
                onClick={() => setModalDeleteOpen(true)}
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
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <Checkbox {...getToggleAllPageRowsSelectedProps()} />
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

  const handleDelete = (id) => {
    setData(() => data.filter((data) => data.id !== id));
  };
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
              <tr
                className={row.isSelected ? "selected" : ""}
                {...row.getRowProps()}
              >
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
        <Pagination
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          pageOptions={pageOptions}
          pageCount={pageCount}
          gotoPage={gotoPage}
          nextPage={nextPage}
          previousPage={previousPage}
          pageIndex={pageIndex}
        />
      </div>
      {modalEditOPen && (
        <EditModal
          closeModal={() => {
            setModalEditOpen(false);
          }}
        />
      )}
      {modalDeleteOPen && (
        <DeleteModal
          closeModal={() => {
            setModalDeleteOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Dashboard;
