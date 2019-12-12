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
  const { state } = useContext(ExpensesContext);

  const { expenses } = state;

  const oldestExpense = [...expenses].sort(
    (a, b) => moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf()
  )[0];

  const handleChange = e => {
    switch (e.target.value) {
      case 'LAST_WEEK':
        setStartDate(
          moment()
            .subtract(7, 'days')
            .toDate()
        );
        setEndDate(moment().endOf('day'));
        toggleShowDatePicker(false);
        return;
      case 'THIS_MONTH':
        setStartDate(
          moment()
            .startOf('month')
            .toDate()
        );
        setEndDate(moment().endOf('day'));
        toggleShowDatePicker(false);
        return;
      case 'LAST_MONTH':
        setStartDate(
          moment()
            .subtract(1, 'months')
            .startOf('month')
        );
        setEndDate(
          moment()
            .subtract(1, 'months')
            .endOf('month')
        );
        toggleShowDatePicker(false);
        return;
      case 'ALL_TIME':
        setStartDate(moment(oldestExpense.createdAt) - 1);
        setEndDate(moment().endOf('day'));
        toggleShowDatePicker(false);
        return;
      case 'SPECIFIC_DATES':
        setStartDate(
          moment(startDate)
            .startOf('day')
            .toDate()
        );
        setEndDate(
          moment(endDate)
            .endOf('day')
            .toDate()
        );
        toggleShowDatePicker(true);
        return;
      default:
        setStartDate(moment().toDate());
        setEndDate(
          moment()
            .endOf('day')
            .toDate()
        );
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
