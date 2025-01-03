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
import { Spinner } from "./Loader/spinner";

const Dashboard = () => {
  const [modalEditOPen, setModalEditOpen] = useState(false);
  const [modalDeleteOPen, setModalDeleteOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [deleteType, setDeleteType] = useState(null);
  const [isloading, setIsLoading] = useState(false);

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
                  setDeleteType("monoDelete");
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
    setIsLoading(true);
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((res) => res.json())
      .then((dataInfo) => {
        setIsLoading(false);
        setData(dataInfo);
      })
      .catch((err) => {
        setIsLoading(false);
      });
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
    setGlobalFilter,
    selectedFlatRows,
    state: { pageIndex, globalFilter },
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
  const handleGobalDelete = () => {
    setData(
      data.filter((d) => {
        return !selectedFlatRows.some((row) => row.original.id === d.id);
      })
    );
  };

  return (
    <div className="dashboard-container">
      <div className="Global-actions-container">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <span className="Global-delete-container">
          <CiTrash
            className="Global-delete-icon"
            onClick={() => {
              selectedFlatRows.length !== 0
                ? setModalDeleteOpen(true)
                : setModalDeleteOpen(false);
              setDeleteType("checked-Delete");
            }}
          />
        </span>
      </div>
      <div className="table-container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {!isloading ? (
              <tr>
                <td colSpan={headerGroups[0].headers.length}>
                  <div
                    style={{
                      width: "100%",
                      height: 400,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Spinner />
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr
                      className={row.isSelected ? "selected" : ""}
                      {...row.getRowProps()}
                    >
                      {row.cells.map((cell) => {
                        return (
                          <td className="info-column" {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination-container">
        <span style={{ float: "left" }}>
          {selectedFlatRows.length} of {rows.length}{" "}
          {selectedFlatRows.length > 1 ? "rows" : "row"} selected
        </span>
        <div className="pag-conatiner">
          <div style={{ width: "max-content" }}>
            Page <strong> {pageIndex + 1} </strong>of{" "}
            <strong>{pageOptions.length}</strong>
          </div>

          <div className="page-num page-btn">
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
        </div>
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
          type={deleteType}
          handleGobalDelete={() => handleGobalDelete()}
          handleDelete={() => handleDelete(selectedRowId)}
          id={selectedRowId}
          closeModal={() => {
            setModalDeleteOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
