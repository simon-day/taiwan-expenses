import React, { useContext } from 'react';
import { ExpensesContext } from '../context/ExpenseContext';

const SortBySelect = ({ sortBy, setSortBy, handSortByOnChange }) => {
  const { state, setState } = useContext(ExpensesContext);

  return (
    <>
      <div className="col s6">
        <select
          value={state.sortBy}
          onChange={e => setState({ ...state, sortBy: e.currentTarget.value })}
          className="browser-default dropdown-menu"
        >
          <option value="NEWEST">Newest</option>
          <option value="OLDEST">Oldest</option>
          <option value="AMOUNT_DESC">Highest Amount</option>
          <option value="AMOUNT_ASC">Lowest Amount</option>
        </select>
      </div>
    </>
  );
};

export default SortBySelect;
