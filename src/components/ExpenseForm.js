import React, { useState, useContext } from 'react';
import { ExpensesContext } from '../context/ExpenseContext';
import { Button } from 'react-materialize';
import { useEffect } from 'react';

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

  const { state, dispatch } = useContext(ExpensesContext);
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
      dispatch({
        type: 'EDIT_EXPENSE',
        id: currentExpense.id,
        amount: Number(amount),
        description: description.trim()
      });
      dispatch({ type: 'RESET_CURRENT_EXPENSE' });
      setAmount('');

      setFocus(false);
      setDescription('');
    }
    e.preventDefault();
  };

  const handleKeyDown = event => {
    if (event.keyCode === KEY_ESCAPE) {
      setAmount('');
      setDescription('');
      dispatch({ type: 'RESET_CURRENT_EXPENSE' });
      setFocus(false);
    }
  };

  const addExpense = e => {
    if (description.trim().length > 0) {
      e.preventDefault();
      dispatch({
        type: 'ADD_EXPENSE',
        amount: Number(amount),
        description: description.trim()
      });
      setAmount('');
      setDescription('');
    }
    setSortBy('NEWEST');
    setFocus(false);
    e.preventDefault();
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
