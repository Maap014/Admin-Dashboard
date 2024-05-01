import React from "react";

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span>
      <input
        type="text"
        placeholder="Enter value..."
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
};

export default GlobalFilter;
