import React from 'react';
import { ExpensesContext } from '../context/ExpenseContext';
import { useContext } from 'react';
import moment from 'moment';
import { Button } from 'react-materialize';
import firebase from '../Firestore';

const db = firebase.firestore();

const ExpenseItem = ({ description, amount, createdAt, id, setFocus }) => {
  const { dispatch } = useContext(ExpensesContext);

  const deleteExpense = () => {
    let expensesRef = db.collection('expenses');
    let query = expensesRef
      .where('id', '==', id)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          let deleteDoc = db
            .collection('expenses')
            .doc(doc.id)
            .delete();
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  };

  return (
    <>
      <tr>
        <td>{description}</td>
        <td>${Number(amount).toLocaleString()}</td>
        {/* <td>{moment(createdAt).fromNow()}</td> */}
        <td>
          {moment(createdAt).isSame(moment(), 'day')
            ? moment(createdAt).fromNow()
            : moment(createdAt).format('DD/MM/YY - hA')}
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
          <Button className="delete-btn" small onClick={deleteExpense}>
            <i className="material-icons">delete</i>
          </Button>
        </td>
      </tr>
    </>
  );
};

export default ExpenseItem;
