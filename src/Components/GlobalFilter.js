import React from "react";

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span>
      <input
        className="search-bar"
        type="text"
        placeholder="Enter value..."
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        onFocus={(e) => (e.target.placeholder = "")}
        onBlur={(e) => (e.target.placeholder = "Enter value...")}
      />
    </span>
  );
};

export default GlobalFilter;
