import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import firebase from '../Firestore';
import moment from 'moment';

const SORT_OPTIONS = {
  NEWEST: { column: 'createdAt', direction: 'desc' },
  OLDEST: { column: 'createdAt', direction: 'asc' },
  AMOUNT_ASC: { column: 'amount', direction: 'asc' },
  AMOUNT_DESC: { column: 'amount', direction: 'desc' }
};

const auth = firebase.auth();
const db = firebase.firestore();

const useExpenses = (userId, sortBy = 'NEWEST', startDate, endDate) => {
  const [fetchedExpenses, setFetchedExpenses] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection('expenses')
      .where('userId', '==', userId)
      .orderBy(SORT_OPTIONS[sortBy].column, SORT_OPTIONS[sortBy].direction)
      .onSnapshot(async snapshot => {
        const newExpenses = snapshot.docs.map(doc => ({ ...doc.data() }));
        setFetchedExpenses(newExpenses);
      });
    return () => unsubscribe();
  }, [sortBy, userId]);

  return fetchedExpenses;
};

export const ExpensesContext = createContext();

export const ExpenseProvider = props => {
  const initialState = {
    expenses: [],
    filteredExpenses: [],
    currentExpense: '',
    sortBy: 'NEWEST',
    loggedIn: false,
    userId: '',
    filteredStartDate: moment()
      .subtract(6, 'days')
      .toDate(),
    filteredEndDate: moment()
      .endOf('day')
      .toDate()
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setState(s => ({ ...s, userId: user.uid }));
      } else {
        setState(s => ({ ...s, userId: '' }));
      }
    });
  }, [state.userId]);

  const expenses = useExpenses(
    state.userId,
    state.sortBy,
    state.filterStartDate,
    state.filterEndDate,
    state.expenses
  );

  useEffect(() => {
    setState(s => ({ ...s, expenses }));
  }, [expenses]);

  return (
    <ExpensesContext.Provider value={{ state, setState }}>
      {props.children}
    </ExpensesContext.Provider>
  );
};
