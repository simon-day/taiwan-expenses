import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { ExpensesContext } from '../context/ExpenseContext';
import { useContext } from 'react';

const DateRangePickers = props => {
  const { state, setState } = useContext(ExpensesContext);
  return (
    <>
      <div className="col s6">
        <DatePicker
          withPortal
          placeholderText="Select start date"
          dateFormat="dd/MM"
          selected={new Date(state.filteredStartDate)}
          onChange={date =>
            setState({
              ...state,
              filteredStartDate: moment(date).startOf('day')
            })
          }
          todayButton="Go To Today"
        />
      </div>
      <div className="col s6">
        <DatePicker
          withPortal
          placeholderText="Select end date"
          dateFormat="dd/MM"
          selected={new Date(state.filteredEndDate)}
          onChange={date =>
            setState({ ...state, filteredEndDate: moment(date).endOf('day') })
          }
          todayButton="Go To Today"
        />
      </div>
    </>
  );
};

export default DateRangePickers;
