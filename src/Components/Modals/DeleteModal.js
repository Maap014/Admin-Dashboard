import React from "react";

const DeleteModal = ({
  closeModal,
  id,
  handleDelete,
  type,
  handleGobalDelete,
}) => {
  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <p>
          {type !== "checked-Delete"
            ? "DO YOU WANT TO DELETE?"
            : "DO YOU WANT TO DELETE SELECTED?"}
        </p>
        <div className="btn-container">
          <button
            type="submit"
            className="submit-btn btn"
            onClick={() => {
              type !== "checked-Delete"
                ? handleDelete(id)
                : handleGobalDelete();
              closeModal();
            }}
          >
            Delete
          </button>
          <button
            className="cancle-btn btn"
            onClick={() => {
              closeModal();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
