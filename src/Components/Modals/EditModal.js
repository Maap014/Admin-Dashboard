import { useState } from "react";

const Modal = ({ closeModal, defaultValue, onSubmit }) => {
  const [editedInfo, setEditedInfo] = useState(
    defaultValue.original || {
      name: "",
      email: "",
      role: "",
    }
  );
  const handleChange = (e) => {
    setEditedInfo({ ...editedInfo, [e.target.name]: e.target.value });
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSubmit(editedInfo);
  //   closeModal();
  // };
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
            <input
              id="name"
              name="name"
              type="text"
              value={editedInfo.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="text"
              value={editedInfo.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={editedInfo.roleType}
              onChange={handleChange}
            >
              <option>Select:</option>
              <option>admin</option>
              <option>Member</option>
            </select>
            <div className="btn-container">
              <button
                type="submit"
                className="submit-btn btn"
                // onClick={handleSubmit}
              >
                Save
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
        </form>
      </div>
    </div>
  );
};

export default Modal;
