import React, { useEffect } from 'react';
import { ExpensesContext } from '../context/ExpenseContext';
import { useContext, useState } from 'react';
import ExpenseItem from './ExpenseItem';
import ExpenseForm from './ExpenseForm';
import { Table } from 'react-materialize';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import DateRangePickers from './DateRangePickers';
import DateRangeSelect from './DateRangeSelect';
import SortBySelect from './SortBySelect';
import LoadingBar from '../LoadingBar';

const ExpenseDashboard = () => {
  const { state, setState } = useContext(ExpensesContext);
  const { filteredExpenses } = state;
  const { expenses } = state;
  const [showDatePicker, toggleShowDatePicker] = useState(false);
  const [focus, setFocus] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [sortBy, setSortBy] = useState('NEWEST');
  const [startDate, setStartDate] = useState(
    moment()
      .subtract(1, 'week')
      .toDate()
  );
  const [endDate, setEndDate] = useState(
    moment()
      .endOf('day')
      .toDate()
  );

  useEffect(() => {
    const filteredList = state.expenses.filter(
      expense =>
        expense.createdAt > state.filteredStartDate &&
        expense.createdAt < state.filteredEndDate
    );
    setState(s => ({ ...s, filteredExpenses: filteredList }));
  }, [state.expenses, state.filteredStartDate, state.filteredEndDate]);

  const renderExpenseList = () => {
    return filteredExpenses.map(expense => (
      <ExpenseItem
        setFocus={setFocus}
        key={expense.id}
        {...expense}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    ));
  };

  const renderTotalSpend = () => {
    return state.filteredExpenses.reduce(
      (total, exp) => total + Number(exp.amount),
      0
    );
  };

  const calculateAverageDailySpend = () => {
    const noOfDays =
      moment(state.filteredEndDate).diff(
        moment(state.filteredStartDate),
        'days'
      ) + 1;
    return Math.ceil(renderTotalSpend() / noOfDays);
  };

  const handSortByOnChange = e => {
    setSortBy(e.target.value);
  };

  if (!state.userId) {
    return <LoadingBar />;
  } else {
    return (
      <>
        <div className="container">
          <div className="center-align">
            <div className="expense-form">
              <ExpenseForm
                focus={focus}
                setFocus={setFocus}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                handSortByOnChange={handSortByOnChange}
                setSortBy={setSortBy}
              />
            </div>
            <div className="sort-by-container">
              <div className="row">
                <SortBySelect setSortBy={setSortBy} sortBy={sortBy} />
                <div className="col s6 ">
                  <div className="row date-pickers">
                    <DateRangeSelect
                      toggleShowDatePicker={toggleShowDatePicker}
                      startDate={startDate}
                      setStartDate={setStartDate}
                      endDate={endDate}
                      setEndDate={setEndDate}
                      sortBy={sortBy}
                    />
                    {showDatePicker && (
                      <DateRangePickers
                        state={state}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                      />
                    )}
                  </div>
                </div>
                <div className="row total-average">
                  <div className="col s6"></div>
                  <div className="col s6">
                    Total:{' '}
                    <span className="bold-text">
                      $
                      {state.filteredExpenses.length > 0 &&
                        renderTotalSpend().toLocaleString()}
                    </span>{' '}
                    / Daily Average:{' '}
                    <span className="bold-text">
                      $
                      {!expenses.length > 0
                        ? '0'
                        : calculateAverageDailySpend().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="table-container">
              <Table className="centered expenses-table highlight ">
                <thead>
                  <tr>
                    <th data-field="expense">Expense</th>
                    <th data-field="amount">Amount</th>
                    <th data-field="createdAt">Time Added</th>
                    <th data-field="price"></th>
                  </tr>
                </thead>
                <tbody>{state.filteredExpenses && renderExpenseList()}</tbody>
              </Table>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default ExpenseDashboard;
