import React from 'react';

const SortBySelect = ({ sortBy, handSortByOnChange }) => {
  return (
    <>
      <div className="col s6">
        <select
          value={sortBy}
          onChange={handSortByOnChange}
          className="browser-default dropdown-menu"
        >
          <option value="NEWEST">Newest</option>
          <option value="OLDEST">Oldest</option>
          <option value="AMOUNT_HIGHEST">Highest Amount</option>
          <option value="AMOUNT_LOWEST">Lowest Amount</option>
        </select>
      </div>
    </>
  );
};

export default SortBySelect;
