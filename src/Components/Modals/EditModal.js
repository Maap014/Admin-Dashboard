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
  const [errors, setErrors] = useState("");
  const validateForm = () => {
    if (editedInfo.name && editedInfo.email && editedInfo.role) {
      return true;
    } else {
      let errorMessage = [];
      for (const [key, value] of Object.entries(editedInfo))
        if (!value) {
          errorMessage.push(key);
        }
      setErrors(errorMessage.join(" and "));
      return false;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSubmit(editedInfo);
    closeModal();
    console.log(editedInfo);
  };
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
            {errors && (
              <div className="error">{`Please include: ${errors}`}</div>
            )}
            <div className="btn-container">
              <button
                type="submit"
                className="submit-btn btn"
                onClick={handleSubmit}
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
