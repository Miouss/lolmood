import React from "react";

function SearchOption({ regions }) {
  return (
    <>
      {regions.map((region) => (
        <option key={region}>{region}</option>
      ))}
    </>
  );
}

export default SearchOption;
