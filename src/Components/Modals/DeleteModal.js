import React from "react";

const DeleteModal = ({ closeModal }) => {
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
          <button type="submit" className="submit-btn btn">
            Delete
          </button>
          <button className="btn">Cancle</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
