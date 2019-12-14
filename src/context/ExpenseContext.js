import React, { createContext, useReducer } from 'react';
import ExpenseReducer from '../reducers/ExpenseReducer';
import moment from 'moment';
import { useEffect } from 'react';
import firebase from '../Firestore';

const auth = firebase.auth();

export const ExpensesContext = createContext();

const initialState = {
  expenses: [
    {
      id: 6,
      description: 'Gym',
      amount: 350,
      createdAt: moment().subtract(14, 'days')
    },
    { id: 1, description: 'TEST', amount: 100, createdAt: moment() },
    { id: 22, description: '2nd Dec', amount: 33, createdAt: moment() },
    {
      id: 2,
      description: 'Books',
      amount: 250,
      createdAt: moment().subtract(1, 'days')
    },
    {
      id: 3,
      description: 'Dinner',
      amount: 210,
      createdAt: moment().subtract(2, 'days')
    },
    {
      id: 4,
      description: 'Water Bill',
      amount: 300,
      createdAt: moment().subtract(3, 'days')
    },
    {
      id: 7,
      description: 'Toiletries',
      amount: 110,
      createdAt: moment().subtract(5, 'days')
    },
    {
      id: 8,
      description: 'Beer',
      amount: 82,
      createdAt: moment().subtract(6, 'days')
    },
    {
      id: 5,
      description: 'Rent',
      amount: 15000,
      createdAt: moment().subtract(1, 'weeks')
    },
    {
      id: 10,
      description: 'iPhone',
      amount: 22000,
      createdAt: moment().subtract(1, 'month')
    },
    {
      id: 199,
      description: 'Start of Dec',
      amount: 111,
      createdAt: moment().subtract(9, 'days')
    },
    {
      id: 9,
      description: 'Phone Bill',
      amount: 420,
      createdAt: moment().subtract(3, 'weeks')
    }
  ],
  filteredExpenses: [],
  currentExpense: '',
  sortBy: 'NEWEST'
};

export const ExpenseProvider = props => {
  const [state, dispatch] = useReducer(
    ExpenseReducer,
    JSON.parse(localStorage.getItem('state')) || initialState
  );

  auth.onAuthStateChanged(user => {
    if (user) {
      return console.log('User Logged in: ', user);
    }
    console.log('User Logged Out');
  });

  useEffect(() => {
    initialState.filteredExpenses = [...initialState.expenses];
  }, []);

  return (
    <ExpensesContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ExpensesContext.Provider>
  );
};
