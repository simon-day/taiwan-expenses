import React, { useState, useContext } from 'react';
import { ExpensesContext } from '../context/ExpenseContext';
import { Button } from 'react-materialize';
import { useEffect } from 'react';

const KEY_ESCAPE = 27;

const ExpenseForm = ({ setSortBy, focus, setFocus }) => {
  let textInput = React.createRef();
  const { state, dispatch } = useContext(ExpensesContext);

  const { currentExpense } = state;

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setFocus(true);
    textInput.current.focus();
    setAmount(currentExpense.amount || '');
    setDescription(currentExpense.description || '');
  }, [currentExpense]);

  const handleAmountChange = e => {
    const price = e.target.value;

    if (price.match(/^\d*$/)) {
      setAmount(price);
    }
  };

  useEffect(() => {
    textInput.current.blur();
  }, [focus]);

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
      textInput.current.blur();
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
                autoFocus={focus}
                ref={textInput}
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
                required
                autoComplete="off"
                type="text"
                name="amount"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
            {!currentExpense ? (
              <Button small>Add</Button>
            ) : (
              <Button small>Edit</Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default ExpenseForm;
