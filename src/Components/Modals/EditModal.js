import React from "react";

const Modal = ({ closeModal }) => {
  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form action="">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input name="name" type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input name="email" type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select name="role">
              <option value="0">Select:</option>
              <option value="1">admin</option>
              <option value="2">Member</option>
            </select>
            <div className="btn-container">
              <button type="submit" className="submit-btn btn">
                Save
              </button>
              <button className="btn">Cancle</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
