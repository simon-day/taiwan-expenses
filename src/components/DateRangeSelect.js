import React, { useContext } from 'react';
import moment from 'moment';
import { ExpensesContext } from '../context/ExpenseContext';

const DateRangeSelect = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  toggleShowDatePicker
}) => {
  const { state, setState } = useContext(ExpensesContext);

  const { expenses } = state;

  const oldestExpense = [...expenses].sort(
    (a, b) => moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf()
  )[0];

  console.log('oldest expense: ', oldestExpense);

  const handleChange = e => {
    switch (e.target.value) {
      case 'LAST_WEEK':
        setState({
          ...state,
          filteredStartDate: moment()
            .subtract(6, 'days')
            .toDate(),
          filteredEndDate: moment()
            .endOf('day')
            .toDate()
        });
        toggleShowDatePicker(false);
        return;
      case 'THIS_MONTH':
        setState({
          ...state,
          filteredStartDate: moment()
            .startOf('month')
            .toDate(),
          filteredEndDate: moment()
            .endOf('day')
            .toDate()
        });
        toggleShowDatePicker(false);
        return;
      case 'LAST_MONTH':
        setState({
          ...state,
          filteredStartDate: moment()
            .subtract(1, 'months')
            .startOf('month')
            .toDate(),
          filteredEndDate: moment()
            .subtract(1, 'months')
            .endOf('month')
            .toDate()
        });
        toggleShowDatePicker(false);
        return;
      case 'ALL_TIME':
        setState({
          ...state,
          filteredStartDate: moment(oldestExpense.createdAt)
            .startOf('day')
            .toDate(),
          filteredEndDate: moment()
            .endOf('day')
            .toDate()
        });
        toggleShowDatePicker(false);
        return;
      case 'SPECIFIC_DATES':
        toggleShowDatePicker(true);
        return;
      default:
        setState({
          ...state,
          filteredStartDate: moment().toDate(),
          filteredEndDate: moment()
            .endOf('day')
            .toDate()
        });
    }
  };

  return (
    <>
      <div>
        <select
          onChange={handleChange}
          className="browser-default dropdown-menu"
        >
          <option value="LAST_WEEK">Last 7 Days</option>
          <option value="THIS_MONTH">This Month</option>
          <option value="LAST_MONTH">Last Month</option>
          <option value="ALL_TIME">All Time</option>
          <option value="SPECIFIC_DATES">Specific Dates</option>
        </select>
      </div>
    </>
  );
};

export default DateRangeSelect;
