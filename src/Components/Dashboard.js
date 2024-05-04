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
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [rowToEdit, setRowToEdit] = useState(null);

  const columns = useMemo(() => {
    return [
      ...COLUMNS,
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ row }) => {
          const { id } = row.original;
          return (
            <>
              <CiEdit
                onClick={() => handleEdit(id - 1)}
                style={{ cursor: "pointer" }}
              />
              <CiTrash
                onClick={() => {
                  setSelectedRowId(id);
                  setModalDeleteOpen(true);
                }}
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

  const handleDelete = (targetid) => {
    setData((prevData) => prevData.filter((index) => index.id !== targetid));
  };
  const handleEdit = (id) => {
    setRowToEdit(id);
    setModalEditOpen(true);
  };
  const handleSubmit = (newRow) => {
    setData(
      rows.map((currRow, id) => {
        if (id === rowToEdit) return { ...newRow };

        return currRow.original;
      })
    );
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
          {page.map((row, i) => {
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
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
      {modalDeleteOPen && (
        <DeleteModal
          handleDelete={() => handleDelete(selectedRowId)}
          id={selectedRowId}
          closeModal={() => {
            setModalDeleteOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Dashboard;
