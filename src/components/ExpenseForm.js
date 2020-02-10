import React, { useState, useContext } from 'react';
import { ExpensesContext } from '../context/ExpenseContext';
import { Button } from 'react-materialize';
import { useEffect } from 'react';
import uuid from 'uuid';
import firebase from '../Firestore';

const db = firebase.firestore();

const KEY_ESCAPE = 27;

const ExpenseForm = ({ setSortBy, focus, setFocus }) => {
  let descriptionInput = null;
  let amountInput = null;

  const setDescriptionInputRef = el => {
    descriptionInput = el;
  };

  const setAmountInputRef = el => {
    amountInput = el;
  };

  useEffect(() => {
    const focusTextInput = () => {
      if (descriptionInput && focus) {
        descriptionInput.focus();
      } else {
        descriptionInput.blur();
        amountInput.blur();
      }
    };
    focusTextInput();
  }, [descriptionInput, amountInput, focus]);

  const { state, setState } = useContext(ExpensesContext);
  const { currentExpense } = state;
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setAmount(currentExpense.amount || '');
    setDescription(currentExpense.description || '');
  }, [currentExpense]);

  const handleAmountChange = e => {
    const price = e.target.value;

    if (price.match(/^\d*$/)) {
      setAmount(price);
    }
  };

  const handleDescriptionChange = e => {
    setDescription(e.target.value);
  };

  const editExpense = e => {
    if (description.trim().length > 0) {
      e.preventDefault();

      let expensesRef = db.collection('expenses');
      expensesRef
        .where('id', '==', currentExpense.id)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            db.collection('expenses')
              .doc(doc.id)
              .update({ description, amount: Number(amount) });
          });
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });
      setState({ ...state, currentExpense: '' });
      setAmount('');
      setDescription('');
      setFocus(false);
    }
    e.persist();
  };

  const handleKeyDown = event => {
    if (event.keyCode === KEY_ESCAPE) {
      setAmount('');
      setDescription('');
      setFocus(false);
    }
  };

  const addExpense = async e => {
    if (description.trim().length > 0) {
      e.preventDefault();

      const expense = {
        id: uuid(),
        userId: state.userId,
        description,
        amount: Number(amount),
        createdAt: Date.now()
      };

      await db.collection('expenses').add(expense);

      setAmount('');
      setDescription('');
    } else {
      e.preventDefault();
    }
    // setSortBy('NEWEST');
    // setFocus(false);
  };
  return (
    <>
      <div className="row input-form">
        <form
          className="col s12"
          onSubmit={!currentExpense ? addExpense : editExpense}
        >
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">shopping_basket</i>
              <input
                className="expense-input"
                onKeyDown={handleKeyDown}
                ref={setDescriptionInputRef}
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontFamily: 'Titillium Web, sans-serif',
                  fontSize: '1rem'
                }}
                required
                autoComplete="off"
                type="text"
                value={description}
                name="description"
                onChange={handleDescriptionChange}
              />
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">attach_money</i>
              <input
                className="expense-input"
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontFamily: 'Titillium Web, sans-serif',
                  fontSize: '1rem'
                }}
                ref={setAmountInputRef}
                required
                autoComplete="off"
                type="text"
                name="amount"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
            {!currentExpense ? (
              <Button className="add-edit-btn" small>
                Add
              </Button>
            ) : (
              <Button className="add-edit-btn" small>
                Edit
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default ExpenseForm;
