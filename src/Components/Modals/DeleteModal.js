import React from "react";

const DeleteModal = ({ closeModal, id, handleDelete }) => {
  console.log(id);
  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <p>DO YOU WANT TO DELETE?</p>
        <div className="btn-container">
          <button
            type="submit"
            className="submit-btn btn"
            onClick={() => {
              handleDelete(id);
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
            Cancle
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
