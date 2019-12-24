import React from 'react';
import { ExpensesContext } from '../context/ExpenseContext';
import { useContext } from 'react';
import moment from 'moment';
import { Button } from 'react-materialize';
import firebase from '../Firestore';

const db = firebase.firestore();

const ExpenseItem = ({ description, amount, createdAt, id, setFocus }) => {
  const { state, setState } = useContext(ExpensesContext);

  const deleteExpense = () => {
    let expensesRef = db.collection('expenses');
    expensesRef
      .where('id', '==', id)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          db.collection('expenses')
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
              setState({
                ...state,
                currentExpense: state.expenses.find(
                  expense => expense.id === id
                )
              });
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
