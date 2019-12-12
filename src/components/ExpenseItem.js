import React from 'react';
import { ExpensesContext } from '../context/ExpenseContext';
import { useContext } from 'react';
import moment from 'moment';
import { Button } from 'react-materialize';

const ExpenseItem = ({ description, amount, createdAt, id, setFocus }) => {
  const { dispatch } = useContext(ExpensesContext);

  return (
    <>
      <tr>
        <td>{description}</td>
        <td>${Number(amount).toLocaleString()}</td>
        {/* <td>{moment(createdAt).fromNow()}</td> */}
        <td>
          {moment(createdAt).isSame(moment(), 'day')
            ? moment(createdAt).fromNow()
            : moment(createdAt).format('DD/MM/YYYY - hA')}
        </td>
        <td>
          {' '}
          <Button
            className="edit-btn"
            small
            onClick={() => {
              window.scrollTo(0, 0);
              setFocus(true);
              dispatch({ type: 'SET_CURRENT_EXPENSE', id });
              // setCurrentExpense(expenses.find(expense => expense.id === id));
              // setIsEditing(true);
            }}
          >
            <i className="material-icons">edit</i>
          </Button>
          <Button
            className="delete-btn"
            small
            onClick={() => dispatch({ type: 'REMOVE_EXPENSE', id })}
          >
            <i className="material-icons">delete</i>
          </Button>
        </td>
      </tr>
    </>
  );
};

export default ExpenseItem;
